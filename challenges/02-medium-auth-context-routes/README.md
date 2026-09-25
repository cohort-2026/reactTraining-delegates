# Challenge 2 (medium): Auth context and protected routes

## The scenario

TaskBoard is getting accounts. The pages are built: a public **home page** at `/`, a **login page** at `/login`, and two private pages, **Dashboard** at `/dashboard` and **Settings** at `/settings`. There is also a small mock auth server in `src/api/authApi.ts` that behaves like a real one: every call takes a moment, and the session survives a page refresh.

What is missing is everything that joins them up. Right now anybody can open the private pages, the login form does nothing useful, and the nav bar always says "Log in". Your job is to build the auth layer: an `AuthProvider` with a `useAuth()` Hook, a `RequireAuth` guard, a safe "take me back where I was" redirect after login, and a nav bar that knows who is logged in.

This is a **build** challenge, not a bug hunt. The files you need to finish are marked with numbered `TODO` comments.

## What is provided

| File | What it is |
|---|---|
| `src/api/authApi.ts` | The mock auth server: `login(email, password)`, `getSession()` and `logout()`. Each returns a Promise and takes 50 to 150 ms. The session is kept in `localStorage`. **You do not need to change it.** |
| `src/auth/types.ts` | The `User`, `Session`, `AuthStatus` and `AuthContextValue` types. |
| `src/auth/AuthContext.ts` | The context object, created for you. |
| `src/routes.tsx` | All the routes. `AuthProvider` wraps the `Layout`, and `/dashboard` and `/settings` are nested under `RequireAuth`. The tests use this same `routes` array. |
| `src/pages/*` | Home, Login (the form is done), Dashboard, Settings and NotFound. |

Demo accounts: `ada@taskboard.dev` (Ada Lovelace) and `grace@taskboard.dev` (Grace Hopper). The password for both is `taskboard`.

## What to build

| TODO | File | Build this |
|---|---|---|
| 1 | `src/auth/AuthProvider.tsx` | Owns `user` and `status` (`"loading"`, `"authenticated"` or `"anonymous"`), restores the session on mount with `getSession()`, and provides `login` and `logout` through `AuthContext`. |
| 2 | `src/auth/useAuth.ts` | Reads the context, and throws a helpful error if there is no `<AuthProvider>` above it. |
| 3 | `src/auth/RequireAuth.tsx` | Shows a loading status while the session is checked; sends anonymous users to `/login?redirect=<where they were going>`; otherwise renders the private page. |
| 4 | `src/auth/safeRedirect.ts` | Validates the `redirect` value so the login page can never send someone to another site. |
| 5 | `src/pages/Login.tsx` | After a successful login, go to the (validated) redirect target. |
| 6 | `src/components/Layout.tsx` | Shows the user's name and a **Log out** button when logged in, and a **Log in** link when not. |

## Acceptance criteria

- [ ] `useAuth()` returns `{ user, status, login, logout }`. `status` starts as `"loading"` and becomes `"authenticated"` or `"anonymous"` once `getSession()` answers.
- [ ] Calling `useAuth()` outside `<AuthProvider>` throws an error whose message mentions `AuthProvider`.
- [ ] The home page (`/`) works for everybody.
- [ ] A logged-out visitor who opens `/dashboard` or `/settings` lands on the **Log in** page, and the URL becomes `/login?redirect=<the original path and query string>`. For example, `/settings?tab=notifications` becomes `/login?redirect=%2Fsettings%3Ftab%3Dnotifications`.
- [ ] After logging in, the user goes to the page in `redirect`, including its query string. With no `redirect`, they go to `/dashboard`.
- [ ] Unsafe `redirect` values are ignored and the user goes to `/dashboard` instead. Only paths that start with a **single** `/` are allowed. These must all be rejected: `https://evil.example/steal`, `//evil.example/steal`, `/\evil.example/steal`, `javascript:alert(1)` and `dashboard`.
- [ ] A wrong password shows the error message ("Incorrect email or password.") in an element with `role="alert"`, and the user stays on the login page.
- [ ] The session survives a refresh. A logged-in user who reloads `/dashboard` sees the dashboard again, **without** the login page flashing up first.
- [ ] While the session is being checked, a private page shows a loading message in an element with `role="status"` (for example "Checking your session…").
- [ ] When logged in, the nav bar shows the user's name and a **Log out** button, and no **Log in** link.
- [ ] **Log out** ends the session, returns the user to the home page, and shows the **Log in** link again. The private pages are protected again afterwards.
- [ ] `npm run typecheck`, `npm run lint` and `npm run build` all succeed, and `npm test` passes.

> **Good to know:** this is a mock login, not real security. The "session" is a JSON object in `localStorage` under the key `taskboard.session`. To log out by hand while testing, open DevTools, go to **Application**, then **Local Storage**, and delete that key.

## How to run it

Open a terminal in the `starter` folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173) and type the URLs from the checklist straight into the address bar. |
| `npm test` | Runs the automated checks against the real routes, in memory. They re-run every time you save; press `q` to quit. All 19 tests pass when you are finished. On the starter, 18 of them fail. That is expected. |
| `npm run typecheck` | Runs the TypeScript compiler in check-only mode. It prints nothing when there are no errors. |
| `npm run lint` | Runs ESLint. |
| `npm run build` | Type-checks, then builds for production. |

**Do not change the test files** (`src/app.test.tsx`). Change the app until they pass.

> **Tip:** work through the TODOs in order and run `npm test` after each one. The `useAuth and AuthProvider` tests go green first, then `Protected routes`, then the rest.

## Revise these handbook sections

- **Day 5:** Module 5.1 "Cleanup functions", Module 5.2 "Fetching in an effect" and "Cancelling stale requests", Module 5.4 "What is a custom Hook?"
- **Day 6:** Module 6.2 "Typing custom Hooks"; Module 6.3 "Layouts, links and Outlet"; Module 6.4 "useNavigate and useSearchParams" and "Protected routes"; Lab 6.3
- **Day 7:** Module 7.1 "Creating and providing context" and "Consuming context with a custom Hook"; Lab 7.1

## Hints

<details><summary>Hint 1: the provider and the Hook</summary>

Follow the `ThemeProvider` / `useTheme` pattern from Day 7, Module 7.1. The context is created with `null` as its default value, so `useAuth()` can check `if (!ctx) throw new Error("useAuth() must be used inside <AuthProvider>")`. That check also removes `null` from the return type.

In the provider, restore the session in a `useEffect` with an empty dependency array. The call is asynchronous, so use an `ignore` flag in the cleanup function, exactly like fetching data on Day 5.

</details>

<details><summary>Hint 2: why "loading" matters</summary>

On a refresh, React state starts empty. If `RequireAuth` only asks "is there a user?", the answer is "no" for the first 100 ms, and it redirects a logged-in user to the login page. That is the flash the criteria forbid.

The fix is a third state. While `status` is `"loading"`, do not redirect and do not render the page; show `<p role="status">Checking your session…</p>` and wait.

</details>

<details><summary>Hint 3: building and reading the redirect</summary>

In `RequireAuth`, `useLocation()` gives you `pathname` and `search`. Put them together and let `URLSearchParams` do the encoding: `` `/login?${new URLSearchParams({ redirect })}` ``. Use `<Navigate ... replace />` so the protected URL does not stay in history.

On the login page, `useSearchParams()` reads it back (already decoded). Validate it, then `navigate(target, { replace: true })`.

For validation, think about how a *browser* reads each rejected example. `//evil.example` is a "protocol-relative" URL: same scheme, different host. Browsers treat `\` like `/`, so `/\evil.example` is the same trick. A good extra check is `new URL(target, window.location.origin).origin === window.location.origin`.

</details>

<details><summary>Hint 4: logging out lands on the login page?</summary>

If you log out on `/settings` and end up on `/login?redirect=%2Fsettings`, the order of events is the problem. When the user becomes anonymous, `RequireAuth` is still on screen and redirects to login, and that redirect wins over your navigation home. Leave the private page **before** the session disappears: navigate home first, then call `logout()`.

</details>

## Stretch goals

Finished? Try one or more of these. Keep `npm test` green.

- **Skip the form when already logged in.** If a logged-in user opens `/login?redirect=/settings`, send them straight to the (validated) redirect target.
- **Session expiry.** Sessions have an `expiresAt` time. Log the user out automatically when it passes (a `setTimeout` in the provider, cleared on cleanup), and show "Your session has expired" on the login page.
- **Loader-based guard.** React Router can run a `loader` before a route renders. Replace `RequireAuth` with a loader on the private routes that calls `getSession()` and `throw redirect("/login?redirect=...")` when there is none. What do you gain, and how does the loader share state with your `AuthProvider`?
- **Remember me.** Add a checkbox to the login form. When it is unticked, keep the session in `sessionStorage` instead, so it ends when the tab is closed.
