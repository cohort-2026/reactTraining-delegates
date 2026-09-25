# Challenge 04: manual checks

The tests call your code directly. These checks use the real app in a real browser, which is how an attacker would try it. Run them once the tests pass.

Start the app from the `starter/` folder with `npm run dev` and open http://localhost:3000. Use Chrome, Edge or Firefox; the steps say "DevTools" for the developer tools (F12, or Cmd+Option+I on macOS). The data resets whenever you restart the server.

## Signing in and out

- [ ] Visiting http://localhost:3000/board while signed out sends you to `/login`. So does `/admin`.
- [ ] A wrong password shows **Invalid email or password**. So does an email that does not exist, with exactly the same wording.
- [ ] Logging in as `editor@example.com` takes you to `/board` and the header says **Signed in as Eddie Editor** with an **editor** badge.
- [ ] **Log out** takes you back to `/login`. Typing http://localhost:3000/board into the address bar then sends you to `/login` again.

## The cookie

Log in as any user, then open DevTools, **Application** (Chrome, Edge) or **Storage** (Firefox), **Cookies**, `http://localhost:3000`.

- [ ] There is one cookie called `session`. **HttpOnly** is ticked and **SameSite** is `Lax`.
- [ ] In the DevTools **Console**, `document.cookie` does **not** include the session.
- [ ] Paste the cookie's value into https://jwt.io (or decode the middle part with `atob`). It contains `sub`, `name`, `role`, `iat` and `exp`, and nothing secret: no password, no email.
- [ ] Log in as the viewer. In the cookie editor, change a character in the middle part of the value (the payload), then reload `/board`. You are sent to `/login`.
- [ ] Stop the dev server, run `npm run build` then `npm run start`, and log in again. The `session` cookie is now also marked **Secure**. (Chrome, Edge and Firefox accept Secure cookies on `http://localhost`; Safari may not, so use one of those. Stop the server and go back to `npm run dev` afterwards.)

## What each role sees

- [ ] **Viewer:** no add form (the page says **You have read-only access**), and no **Edit**, move or **Delete** buttons on any task. No **Admin** link.
- [ ] **Editor:** can add, edit and move every task. **Delete** appears only on *Write release notes* and *Update the style guide* (and on any task you add). No **Admin** link, and typing http://localhost:3000/admin in the address bar sends you back to `/board`.
- [ ] **Admin:** everything, plus the **Admin** link. On `/admin`, every other user's role can be changed, and your own row is disabled.
- [ ] After adding, editing, moving or deleting a task, the board updates straight away, without a refresh.
- [ ] A title of 1 or 2 characters, or only spaces, is refused with **Invalid input**.

## The server refuses, even when the UI is bypassed

This is the part that matters. Hidden buttons are a courtesy; these checks prove the server is the one saying no.

- [ ] **Replay a Server Action as a viewer.**
  1. Log in as the **editor**. Open DevTools, **Network**, and add a new task called `Replay me`.
  2. Right-click the `POST` request to `board` (it has a `Next-Action` request header) and choose **Copy**, **Copy as fetch**.
  3. Log out, then log in as the **viewer**.
  4. Paste the copied `fetch(...)` into the DevTools **Console**, but first change `Replay me` in its body to `Viewer was here`. Run it.
  5. Reload the board. There is **no** task called `Viewer was here`. (If you look at the response in the Network tab, it contains **You do not have permission to do that**.)
- [ ] **Delete someone else's task as an editor.** As the admin, add a task, then open DevTools, **Network**, delete that task, and copy the request as fetch. Log in as the editor, change the task id in the copied body to `t-1` (*Plan the sprint*, the admin's task), and run it. *Plan the sprint* is still on the board.
- [ ] **Promote yourself.** As the admin, change the viewer's role on `/admin` and copy that request as fetch. Change it back, log out and log in as the viewer. Run the copied fetch with the body changed to make `u-viewer` an `admin`. Log in as the admin again: the viewer is still a viewer.
- [ ] **Smuggle an owner.** As the editor, in DevTools **Elements**, add `<input name="createdBy" value="u-admin">` inside the add-task form, then add a task. The new task says **Created by Eddie Editor**.

## The JSON API

Run these in the DevTools **Console** while signed in on http://localhost:3000.

- [ ] As the viewer, `await (await fetch("/api/tasks")).json()` returns the tasks.
- [ ] As the viewer, this is refused with status `403`:

  ```js
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "Viewer via the API" }),
  }).then((r) => r.status);
  ```

- [ ] As the editor, the same request returns `201`, and the new task appears on the board after a reload, **Created by Eddie Editor**.
- [ ] **A cross-site request forgery from another port.** Stay signed in as the editor. In a second terminal, start any other local web server on a different port: for example `npm run dev` in one of the earlier challenges' `starter/` folders (http://localhost:5173). Open that page, open **its** Console, and run:

  ```js
  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    mode: "no-cors",
    credentials: "include",
    headers: { "content-type": "text/plain" },
    body: JSON.stringify({ title: "Forged from another port" }),
  });
  ```

  The terminal running TaskBoard logs `POST /api/tasks 403`, and no task called `Forged from another port` appears on the board.

  Why this matters: `localhost:5173` and `localhost:3000` are different **origins** but the same **site**, so the browser *does* send your `SameSite=Lax` cookie, and a `text/plain` body needs no CORS preflight. The Origin check is the only thing standing in the way. To see it, make `isSameOrigin` return `true` for a moment and run the fetch again: the task is created. Then put your check back.
- [ ] Your comment in `app/api/tasks/route.ts` explains why this handler checks `Origin` itself.

## Finally

- [ ] `npm test -- --run`, `npm run typecheck`, `npm run lint` and `npm run build` all pass.
- [ ] Search your code for `role ===` and `role !==`. Apart from the policy in `lib/permissions.ts` (and the Zod schemas), there should be none.
