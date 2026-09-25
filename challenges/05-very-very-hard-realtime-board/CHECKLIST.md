# Challenge 05: manual checks

The tests prove each piece works on its own. These checks prove the whole thing works for two real people in two real browsers, including the awkward moments: two edits at once, a tab closed mid-change, a network that drops. Run them once the tests pass.

## Setting up

1. From `starter/`, run `npm run dev`. Leave it running. The server is on http://localhost:8787 and the client on http://localhost:5173.
2. Open http://localhost:5173 in **two separate browsers** (for example Chrome and Firefox), or one normal window and one private window. Put them side by side. The steps call them **Window A** and **Window B**.
3. The data lives in memory, so restarting the server resets it. Every demo user's password is `password123`.

The steps say "DevTools" for the developer tools (F12, or Cmd+Option+I on macOS).

## Logging in and connecting

- [ ] A wrong password shows **Username or password is incorrect.** So does a username that does not exist, with exactly the same wording.
- [ ] Log in as `alice` in Window A. The **Product launch** board loads, the badge says **owner**, and the presence bar shows one avatar (**1 online**).
- [ ] In DevTools, **Network**, filter by **WS** and reload. There is one connection to `ws://localhost:8787/ws`. Its URL has **no** `?token=` or any other query string.
- [ ] Click that connection and open **Messages**. The first message sent is `{"type":"auth","token":"...","boardId":"launch"}` and the first one received is a `snapshot`.
- [ ] Reload a few times. After each reload there is still exactly **one** open socket, not one more each time (StrictMode runs your effect twice in development).

## Two people, one board

Log in as `bob` in Window B.

- [ ] Both windows now show **2 online**, with avatars for Alice and Bob. Hovering over an avatar shows the name and role.
- [ ] Alice adds a task called *Hire a DJ* to **To do**. It appears in Window A at once, then in Window B within a moment, without a reload.
- [ ] Bob moves *Hire a DJ* to **In progress** with the → button. Alice's copy moves too. The small version number on the card goes up by one each time it changes.
- [ ] Bob renames *Record the demo video*. Alice sees the new name.
- [ ] Bob deletes *Hire a DJ* (he is a member, but Alice created it). **Bob does not have a Delete button on it.** He does have one on *Book the launch venue*, which he created.
- [ ] Alice (the owner) can delete any task. When she deletes one, it disappears from Bob's board too.

## Two tabs, one person

- [ ] Open a second tab in Window B and log in as `bob` again. Alice still sees **2 online**, not 3, and did not receive a second `presence.join` (check her socket's **Messages**).
- [ ] Close Bob's second tab. Alice still sees Bob.
- [ ] Close Bob's last tab. Within a second or two, Bob's avatar disappears from Alice's presence bar.

## The server refuses, even when the UI is bypassed

Hidden buttons are a courtesy. These checks prove the server is the one saying no. You will send messages by hand from the DevTools **Console**.

First, in the window you are testing, open the **Console** and run this to get a socket of your own, authenticated as the logged-in user:

```js
const { token } = JSON.parse(sessionStorage.getItem("taskboard.session"));
const ws = new WebSocket("ws://localhost:8787/ws");
ws.onmessage = (e) => console.log("←", JSON.parse(e.data));
ws.onclose = (e) => console.log("closed", e.code, e.reason);
ws.onopen = () => ws.send(JSON.stringify({ type: "auth", token, boardId: "launch" }));
```

- [ ] **No token, no socket.** Run the snippet again, but send `{ type: "task.delete", clientMutationId: "x", taskId: "t-1", baseVersion: 1 }` instead of the `auth` message. The console prints `closed 4001`.
- [ ] **Waiting is not allowed either.** Open a socket and send nothing. After about 5 seconds it is closed with `4001`.
- [ ] **A viewer cannot write.** Log in as `carol` (viewer) in Window B. She sees the board but no add forms, and no arrows, **Edit** or **Delete** buttons. Run the snippet, then:

  ```js
  ws.send(JSON.stringify({ type: "task.delete", clientMutationId: "c1", taskId: "t-1", baseVersion: 1 }));
  ```

  The console shows `{type: "error", code: "FORBIDDEN", clientMutationId: "c1", ...}`. *Write the press release* is still on everyone's board, and Alice's socket received nothing.
- [ ] **No access, no board.** Still as Carol, change `boardId: "launch"` to `boardId: "ops"` in the snippet and run it. The console prints `closed 4003`.
- [ ] **A member cannot delete other people's tasks.** As Bob, send a `task.delete` for `t-1` (Alice's). The reply is `FORBIDDEN`.
- [ ] **The board comes from the session, not the message.** As Alice on **Product launch**, send a `task.update` for `t-5` (a task on **Ops rota**), with `baseVersion: 1` and `changes: { title: "Hijacked" }`. The reply is `NOT_FOUND`, and Bob's **Ops rota** board is unchanged.
- [ ] **Garbage is refused, politely.** Send `ws.send("not json")`, then `ws.send(JSON.stringify({ type: "task.move", clientMutationId: "m", taskId: "t-1", baseVersion: "one" }))`. Both get an `INVALID` error, and the socket stays open.
- [ ] **A forged token is refused.** In the snippet, change one character in the middle part of `token` before sending `auth`. The console prints `closed 4001`.

## Optimistic updates and rollback

- [ ] In DevTools, **Network**, set Window A to **Offline**. Add a task. It appears at once, faded, with a dashed border and **Saving…**. Set Window A back to **No throttling**: a moment later the card turns solid and shows `v1`. (Throttling presets such as *Slow 3G* do not reliably slow WebSocket messages, which is why this uses **Offline**.)
- [ ] **Conflict.** In Window A (Alice), click **Edit** on *Book the launch venue* and type *Venue: the old library*, but **do not save yet**. In Window B (Bob), rename the same task to *Venue: the rooftop* and save. Alice's card behind her open editor now shows `v2`. Now save Alice's edit. Her card briefly shows her title, then switches back to *Venue: the rooftop*, and a message appears: **Someone else changed this task first. Showing their version.** Both windows end up with Bob's title and the same version number.

  (The card sends the version Alice *started editing from*, so the server can tell that she never saw Bob's change. If it sent the version at the moment she clicked **Save**, her edit would silently overwrite Bob's.)
- [ ] **Rollback when the task has gone.** Put Window A **Offline** (DevTools, **Network**). As Alice, rename *Record the demo video*. In Window B, Bob deletes *Record the demo video* (he created it). Set Window A back to **No throttling**. After the reconnect, Alice's rename is rejected, the card disappears, and the message says **That task no longer exists.**
- [ ] Click **Dismiss** on the message. It goes away.

## Reconnecting and the offline queue

- [ ] **Server restart.** Stop the dev server (Ctrl+C) and start it again with `npm run dev`. Both windows show **Connection lost. Reconnecting…** and then reconnect by themselves within a few seconds. Because the server keeps data in memory, the board is back to the seed data, and both windows show that (anything added earlier is gone). You are still logged in: the token is still valid, since the secret did not change.
- [ ] **Backoff.** Stop the server and leave it stopped for 30 seconds. In DevTools, **Network**, **WS**, the failed connection attempts are further and further apart (roughly 0.5 s, 1 s, 2 s, 4 s...), not a steady stream. Start the server again: the window reconnects within the current wait.
- [ ] **Offline changes.** In Window A, DevTools, **Network**, choose **Offline**. The banner says **Connection lost. Reconnecting…** Add a task called *Written offline* and move another task. Both show on screen at once, marked **Saving…**, and the banner counts **2 changes** waiting. Window B does not see them yet.
- [ ] Set Window A back to **No throttling**. Within a few seconds the banner goes away, both changes are confirmed in Window A, and Window B shows them. *Written offline* appears **once** in each window, not twice.
- [ ] **Changes made by others while you were away.** Put Window A offline again. In Window B, delete a task and rename another. Bring Window A back online. After the reconnect, Window A shows the deletion and the rename.

## Sessions that end

- [ ] Stop the dev server. In `server/.env` (copy it from `.env.example` in the starter root if it does not exist), set `TOKEN_TTL=30s`, then start the server again with `npm run dev`. Log in as Alice and wait 30 seconds without touching anything. The socket is closed with `4001` (check **Network**, **WS**), the app goes back to the login page, and it says **Your session has expired. Please log in again.** It does not try to reconnect in a loop. Remove `TOKEN_TTL` from `server/.env` afterwards.
- [ ] **Log out** in Window A. Its socket closes and Alice's avatar disappears from Window B.

## Production build

- [ ] `npm run build` succeeds, and `npm run typecheck` and `npm run lint` report no errors.
- [ ] Set `NODE_ENV=production` without setting `JWT_SECRET`, and start the server with `NODE_ENV=production npm run start -w server`. It refuses to start and tells you to set `JWT_SECRET`.
