# Challenge 04 (very hard): Role-based access in Next.js, enforced on the server

## The scenario

TaskBoard has moved to Next.js 16 and the team is ready for more than one kind of user. Product wants three roles:

- **Admins** can do everything, and they decide everybody else's role.
- **Editors** do the day-to-day work: they create, edit and move tasks. They may delete tasks they created themselves, but nobody else's, and they cannot manage users.
- **Viewers** (stakeholders, auditors) can read the board and nothing else.

A teammate has built the pages, the components and a small in-memory data store, and wired the UI to a permission function called `can()`, so that buttons a role cannot use are hidden. Then they ran out of time. The session code is a stub, `can()` says no to everything, and the Server Actions and the JSON API do whatever anybody asks, believing every field the browser sends.

Your job is to make the server the thing that decides. By the end, a viewer who copies an editor's **Delete** request out of DevTools and replays it must be refused, even though nothing in the UI ever showed them a button.

This is the fourth of five auth challenges. Each one is standalone: everything you need is in this folder, and no database, Supabase account or internet connection is needed.

## What is provided

| File | What it is |
|---|---|
| `lib/db.ts` | The in-memory data store: users, tasks and `verifyCredentials()`. It resets when the server restarts. It does **no** permission checks, like a real database client. **You do not need to change it.** |
| `lib/demo-users.ts`, `lib/types.ts`, `lib/action-state.ts` | Demo accounts, shared types, and the error messages the tests expect (`ERRORS`). |
| `app/**/page.tsx`, `components/` | The pages and UI. They already call `getSession()` and `can()`, so they start working as soon as those do. |
| `lib/session.ts` | **Yours.** Sign, verify, set and clear the session cookie. Stubs with TODOs. |
| `lib/permissions.ts` | **Yours.** The `can(user, action, resource)` policy. It currently returns `false`. |
| `lib/schemas.ts` | **Yours.** Zod schemas for every input. Only the role and status enums exist. |
| `lib/csrf.ts` | **Yours.** `isSameOrigin(request)` for the route handler. It currently returns `true`. |
| `proxy.ts` | **Yours.** Route protection for `/board` and `/admin`. |
| `app/login/actions.ts` | **Yours.** `login` and `logout` Server Actions. |
| `app/board/actions.ts`, `app/admin/actions.ts`, `app/api/tasks/route.ts` | **Yours.** A working first draft with no checks at all. |
| `*.test.ts`, `test/` | The automated checks. Do not change the test files. |

### Demo accounts

Every account uses the password `password123` (the login page shows this too).

| Email | Role |
|---|---|
| `admin@example.com` | admin |
| `editor@example.com` | editor |
| `viewer@example.com` | viewer |

The board starts with four tasks. *Plan the sprint* and *Fix the login page* were created by the admin; *Write release notes* and *Update the style guide* were created by the editor.

## The permission matrix

✅ allowed, ❌ refused.

| Action (`can(user, action, resource)`) | Resource | admin | editor | viewer |
|---|---|---|---|---|
| `task:read`: see the board and `GET /api/tasks` | none | ✅ | ✅ | ✅ |
| `task:create`: add a task | none | ✅ | ✅ | ❌ |
| `task:update`: edit a task's title | any task | ✅ | ✅ | ❌ |
| `task:move`: change a task's status | any task | ✅ | ✅ | ❌ |
| `task:delete`: delete a task | a task they created | ✅ | ✅ | ❌ |
| `task:delete` | someone else's task | ✅ | ❌ | ❌ |
| `task:delete` | no task given | ❌ | ❌ | ❌ |
| `user:manage`: open `/admin` | none | ✅ | ❌ | ❌ |
| `user:manage`: change a user's role | another user | ✅ | ❌ | ❌ |
| `user:manage` | themselves | ❌ | ❌ | ❌ |

Two rules sit underneath the table:

- **Deny by default.** No user, an unknown role, an unknown action, or a missing or wrong-type resource: the answer is `false`.
- **Nobody changes their own role.** That stops the last admin demoting themselves and locking everyone out.

A resource is either `{ type: "task", ownerId }` or `{ type: "user", id }`. The types are already in `lib/permissions.ts`.

## What to build

### Sessions

- [ ] **Log in** is a Server Action. It validates the form with Zod, checks the password with `verifyCredentials()`, and gives the same message (`ERRORS.badLogin`) for a wrong password and an unknown email.
- [ ] On success it signs a JWT with [`jose`](https://github.com/panva/jose) and stores it in a cookie, then redirects to `/board`. The role in the token comes from the user store, never from the form.
- [ ] The cookie is **HttpOnly**, **SameSite=Lax**, `path=/`, and **Secure in production** (but not in development, so it still works on `http://localhost`).
- [ ] The signing secret comes from `SESSION_SECRET`. `.env.example` holds a development-only default. The app refuses to sign or verify anything if the secret is missing or shorter than 32 characters.
- [ ] A token that has been edited, signed with another secret, marked `"alg": "none"`, has expired, or carries a role that does not exist is treated as **signed out**.
- [ ] **Log out** is a Server Action that deletes the cookie and redirects to `/login`.

### The policy

- [ ] `can(user, action, resource)` in `lib/permissions.ts` implements the matrix above, and it is the **only** place that knows the rules. No page, action or route compares `user.role === "admin"` itself.

### Route protection (first line of defence)

- [ ] `proxy.ts` runs on `/board` and `/admin` (and anything under them).
- [ ] A signed-out visitor to either is redirected to `/login`.
- [ ] A signed-in user who may not `user:manage` is redirected from `/admin` to `/board`.

### Server-side enforcement (the real defence)

- [ ] Every Server Action (`createTask`, `updateTask`, `moveTask`, `deleteTask`, `changeRole`) checks, in this order: the session (`ERRORS.notSignedIn`), the input with Zod (`ERRORS.invalid`), that the task or user exists (`ERRORS.notFound`), and `can()` (`ERRORS.forbidden`). Only then does it touch the store.
- [ ] A new task's owner is the signed-in user. Any `createdBy`, `userId` or `role` field sent by the client is ignored.
- [ ] Ownership for delete is read from the **store**, not from anything in the request.
- [ ] An editor can delete their own task but gets `ERRORS.forbidden` for anyone else's. An admin can delete any task.
- [ ] Calling a mutation directly as a viewer fails, and the data is unchanged.
- [ ] Titles are trimmed and must be 3 to 120 characters. Statuses and roles must be one of the known values.

### The JSON API and CSRF

- [ ] `GET /api/tasks` returns `401` when signed out, otherwise `200 { tasks }`.
- [ ] `POST /api/tasks` returns, in this order: `403 { error: ERRORS.crossSite }` when the `Origin` header is missing, `null`, or not this site; `401` when signed out; `403` when the policy says no; `400` for a body that is not JSON or fails validation; and `201 { task }` on success.
- [ ] In a comment in `app/api/tasks/route.ts`, explain in a sentence or two why this handler needs its own Origin check when the Server Actions do not. (Hint: read *Allowed origins* in the Next.js data security guide.)

### Finished means

- [ ] `npm test -- --run`, `npm run typecheck`, `npm run lint` and `npm run build` all pass.
- [ ] Every item in [`CHECKLIST.md`](CHECKLIST.md) is ticked. The tests cannot open a browser, so the checklist covers what they cannot.

## The contract the tests rely on

The tests build their own session tokens (some genuine, some forged) and put them in a fake cookie jar, so your session code must match this shape:

- The cookie is called `session` (`SESSION_COOKIE` in `lib/session.ts`).
- Its value is a JWT signed with **HS256**, using the bytes of `process.env.SESSION_SECRET` as the key (`new TextEncoder().encode(secret)`).
- The user's id is the `sub` claim, and the token also carries `name` and `role` claims and an `exp` expiry of no more than a week.
- `getSession()` returns `{ id, name, role }` or `null`.
- The Server Actions take `(previousState, formData)` and return `{ error: string | null }`, using the messages in `ERRORS` from `lib/action-state.ts`.

The tests mock `next/headers` (cookies), `next/navigation` (`redirect`) and `next/cache` (`revalidatePath`), so they run without starting Next.js. Your code should simply import those modules as normal.

## How to run it

Open a terminal in the `starter/` folder.

1. Install the packages:

   ```bash
   cd starter
   npm install
   ```

2. Create `.env.local` from the example file:

   | Windows (PowerShell) | macOS (Terminal) |
   |---|---|
   | `Copy-Item .env.example .env.local` | `cp .env.example .env.local` |

3. Use any of these:

   | Command | What it does |
   |---|---|
   | `npm run dev` | Starts the app at http://localhost:3000. Press Ctrl+C to stop it. |
   | `npm test` | Runs the automated checks and re-runs them on every save; press `q` to quit. Use `npm test -- --run` to run them once. |
   | `npm run typecheck` | Checks the TypeScript types. |
   | `npm run lint` | Runs ESLint. |
   | `npm run build` | Builds for production. `npm run start` then runs the build. |

Most of the 169 tests fail at first. A few pass by accident, because a `can()` that always says no is right whenever the answer should be no. They all pass when you are finished.

Until you have written `login` and `getSession`, the app only shows the login page, and logging in says **TODO: login is not implemented yet**. That is expected. Meanwhile `GET /api/tasks` is wide open: try it in the browser now, and again when you have finished.

**This is Next.js 16.** Middleware is now called **proxy**: the file is `proxy.ts` and the function is `proxy`. Much of what you will find online still says `middleware.ts`. The documentation that matches your installed version is inside the package: start with `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`, then `node_modules/next/dist/docs/01-app/02-guides/authentication.md` and `node_modules/next/dist/docs/01-app/02-guides/data-security.md`.

## Revise these handbook sections

Day 6 handbook (`Markdown Handbooks/Day06_Delegate_Handbook_TypeScript_and_Routing.md`):

- Module 6.1: *Object types, unions and optional fields* (the `Resource` union)
- Module 6.4: *Protected routes*, and why that was only the user-experience half

Day 8 handbook (`Markdown Handbooks/Day08_Delegate_Handbook_Styling_Forms_and_React_19_Features.md`):

- Module 8.3: *Describing data with a Zod schema*
- Module 8.4: *Form actions with useActionState*

Day 9 handbook (`Markdown Handbooks/Day09_Delegate_Handbook_Full_Stack_React_with_Next_js.md`):

- Module 9.2: *Caching and revalidation*
- Module 9.3: *Defining Server Actions* and, above all, *Server Actions are public endpoints*
- Module 9.5: *Sign up, log in and log out* and *Protecting pages on the server*

## Hints

<details><summary><strong>Hint 1: where do I start?</strong></summary>

Work from the inside out: the tests are split the same way.

1. `lib/schemas.ts` and `lib/permissions.ts`. Run `npm test -- lib/permissions` until it is green. It is a pure function, so it is the easiest place to get the rules exactly right.
2. `lib/session.ts`, then `npm test -- lib/session`.
3. `app/login/actions.ts`. You can now log in in the browser.
4. `proxy.ts`.
5. The board and admin actions, then the route handler.

</details>

<details><summary><strong>Hint 2: signing and verifying with jose</strong></summary>

```ts
const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const token = await new SignJWT({ name, role })
  .setProtectedHeader({ alg: "HS256" })
  .setSubject(id)
  .setIssuedAt()
  .setExpirationTime("8h")
  .sign(key);

const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
```

`jwtVerify` throws when anything is wrong, so wrap it in `try`/`catch` and return `null`. A valid signature only proves the server issued the token. It does not prove the claims are the shape you expect, so run `payload` through a Zod schema before you trust `role`.

Read `process.env.NODE_ENV` inside `createSession()`, not at the top of the file, when you decide the `secure` flag. The tests change it between runs.

</details>

<details><summary><strong>Hint 3: a policy table instead of a pile of ifs</strong></summary>

One readable shape is a table from role to action to rule, where a rule is either `true` or a small function of `(user, resource)`:

```ts
const POLICY: Record<Role, Partial<Record<Action, Rule>>> = {
  editor: {
    "task:create": true,
    "task:delete": (user, resource) =>
      resource?.type === "task" && resource.ownerId === user.id,
    // ...
  },
  // ...
};
```

Anything missing from the table is denied. Careful with lookups by a string that came from outside: `POLICY["constructor"]` is not `undefined`, because every object inherits a `constructor`. `Object.hasOwn(POLICY, role)` avoids that trap.

</details>

<details><summary><strong>Hint 4: the proxy can see cookies but not the store</strong></summary>

The proxy gets a `NextRequest`, so read the cookie with `request.cookies.get("session")?.value` and verify it with the same function `getSession()` uses. Redirect with `NextResponse.redirect(new URL("/login", request.url))`.

The `matcher` must be written out as plain strings in the file (Next.js reads it when it builds, not when it runs). `"/board/:path*"` matches `/board` and everything under it.

Do not make the proxy your only check. It sees a path and a cookie, nothing more: it does not know which Server Action a `POST` is running, or which task that action is about to delete. Only the action itself can ask "who are you, and may you do *this*, to *that*?"

</details>

<details><summary><strong>Hint 5: CSRF, Server Actions and route handlers</strong></summary>

A cross-site request forgery is another site making the user's browser send a request to yours, with your cookie attached. Two things protect the Server Actions already: the `SameSite=Lax` cookie is not sent on cross-site `POST`s, and Next.js compares each action's `Origin` header with the `Host` header and refuses a mismatch.

A route handler is plain HTTP: Next.js does none of that for you. And `SameSite` alone is not enough: `http://localhost:5173` and `http://localhost:3000` are different *origins* but the same *site*, so a page on another port gets your cookie sent along. `CHECKLIST.md` has you try exactly that. In `isSameOrigin`, compare `new URL(origin).host` with the `x-forwarded-host` header, falling back to `host`, then to `new URL(request.url).host`. Compare the whole host: `origin.startsWith("http://localhost:3000")` would also accept `http://localhost:3000.evil.example`.

</details>

## Stretch goals

- **Audit log.** Record every allowed *and* refused mutation (who, what, which resource, when, outcome) in the store, and show the last 20 entries on `/admin`. Refused attempts are the interesting ones.
- **Role changes take effect without logging in again.** Right now a demoted editor keeps editing until their token expires, because the role lives in the token. Make `getSession()` look the user up in the store on every request and use the store's role (and treat a deleted user as signed out). Think about what the proxy can and cannot do here, and write a test that demotes a signed-in editor and then calls `createTask`.
- **Rate-limited login.** After five failed attempts for the same email within 15 minutes, refuse further attempts with a friendly message until the window passes, without revealing whether the email exists. Test it with `vi.useFakeTimers()`.
- **A real 403 page.** Use Next.js's `forbidden()` and a `forbidden.tsx` file instead of redirecting from `/admin` (check the installed docs: it needs a config flag).

Do not change the test files.
