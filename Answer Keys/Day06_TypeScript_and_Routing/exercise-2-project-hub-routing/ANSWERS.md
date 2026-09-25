# Answers: Day 6, Exercise 2 (harder): Project Hub with React Router

Exercise folder: `Exercises/Day06_TypeScript_and_Routing/exercise-2-project-hub-routing/`
Corrected project: `fixed/` (run `npm install`, then `npm run typecheck`, `npm test -- --run`, `npm run build`, `npm run lint`).

The exercise has **5 bugs** across four files. Line numbers refer to the broken files. The project uses `react-router` 8 in data mode. The route objects live in `src/routes.tsx` (rather than inline in `main.tsx`, as in the handbook) so that the tests can render the same routes with `createMemoryRouter`; `main.tsx` passes them to `createBrowserRouter` and renders `RouterProvider` from `"react-router/dom"`.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/pages/Layout.tsx`, line 1 | The app does not load. Browser: the Vite error overlay `Failed to resolve import "react-router-dom" from "src/pages/Layout.tsx". Does the file exist?`. `npm test`: the same error and `no tests`. `npm run typecheck`: `TS2307: Cannot find module 'react-router-dom' or its corresponding type declarations` | The import uses the old package name. Only `react-router` is installed; React Router 8 removed `react-router-dom` | Install and import `react-router`. Module 6.3 "Defining routes" (Troubleshooting: react-router-dom) |
| 2 | `src/routes.tsx`, line 17 | `/projects/1`, `/projects/2`, `/projects/99` and the project links all show "404 Not Found" with no navigation bar. No type error. Tests "shows the project page for /projects/1", "opens a project from the dashboard list", "shows a friendly page for an unknown project id" and "marks the current project's link as current…" fail | `path: "projects/projectId"` has no colon, so it only matches the literal URL `/projects/projectId`. Every real project URL matches no route and falls through to the root `errorElement` | URL parameters are declared with `:`. Module 6.3 "Defining routes" and "URL parameters and not found pages"; Lab 6.2 Troubleshooting ("`useParams` returns `undefined`") |
| 3 | `src/pages/Layout.tsx`, line 16 | Clicking **Settings** reloads the whole page: the screen flashes, the Network tab shows a new document request and any in-memory state would be lost. The Settings link is never highlighted. In the tests the click goes nowhere (jsdom does not perform full-page navigation). Tests "moves between pages from the navigation bar" and "marks only the link for the current page as current" fail | A plain `<a href>` is used for an internal link. The browser handles the click itself and requests a new document instead of letting the router change the URL; a plain anchor also never gets the `active` class or `aria-current` | Use `Link` or `NavLink` for internal links. Module 6.3 "Layouts, links and Outlet"; Lab 6.2 Troubleshooting ("Links cause full page reloads") |
| 4 | `src/pages/Login.tsx`, line 11 | Visiting `/settings` logged out correctly shows Log in, but after logging in you always land on the **Dashboard**, not Settings. No type error. Tests "returns the user to Settings after logging in" and "does not return to the login page when going Back…" fail | `RequireAuth` sends `state={{ from: location.pathname }}`, but `Login` reads `returnTo`, which is always `undefined`, so `from` falls back to `"/"`. The cast hides the mismatch from TypeScript | Protected routes and navigation state. Module 6.4 "Protected routes"; Lab 6.3 Troubleshooting ("Always sent to `/` after login…") |
| 5 | `src/pages/Project.tsx`, line 6 (visible once bug 2 is fixed) | Every project URL, including the valid `/projects/1`, shows "Project not found". `npm run typecheck`: `TS2367: This comparison appears to be unintentional because the types 'string' and 'number' have no overlap`. Tests "shows the project page for /projects/1", "opens a project from the dashboard list" and "moves between pages from the navigation bar" fail | `Number(projectId)` turns the parameter into a number, but the ids in `projects.ts` are strings (`"1"`, `"2"`), and `===` never treats a string and a number as equal | URL params are always strings; compare like with like. Module 6.3 "URL parameters and not found pages"; Module 6.1 "Object types, unions and optional fields" |

**How the bugs interact.** Bug 1 stops everything, so fix it first. After that, each remaining bug fails only its own tests, except that bugs 2 and 5 both break the project pages: with bug 2 you get the root "404 Not Found" page, and once it is fixed you get the in-layout "Project not found" page until bug 5 is fixed too. With all five fixed, `npm run typecheck` is clean and all 12 tests pass.

## Fixes

**Bug 1: old package name** (`Layout.tsx`)

```tsx
// Before
import { NavLink, Outlet } from "react-router-dom";

// After
import { NavLink, Outlet } from "react-router";
```

Reject `npm install react-router-dom` as a fix: that package stopped at version 7, so it would put a second, older copy of React Router into a project whose router is created with version 8. Mixing the two is not supported.

**Bug 2: parameter without a colon** (`routes.tsx`)

```tsx
// Before
{ path: "projects/projectId", element: <Project /> },

// After
{ path: "projects/:projectId", element: <Project /> },
```

**Bug 3: plain anchor for an internal link** (`Layout.tsx`)

```tsx
// Before
<a href="/settings">Settings</a>

// After
<NavLink to="/settings">Settings</NavLink>
```

**Bug 4: navigation state read with the wrong name** (`Login.tsx`)

```tsx
// Before
const from = (location.state as { returnTo?: string } | null)?.returnTo ?? "/";

// After
const from = (location.state as { from?: string } | null)?.from ?? "/";
```

Renaming the property in `RequireAuth` to `returnTo` instead is equally correct, as long as both sides match.

**Bug 5: comparing a number with string ids** (`Project.tsx`)

```tsx
// Before
const project = projects.find((p) => p.id === Number(projectId));

// After
const project = projects.find((p) => p.id === projectId);
```

## Debrief suggestion (10 minutes)

- Bug 1: ask why tutorials still show `react-router-dom`. Package names change between major versions; check the official docs and `package.json` rather than copying old snippets.
- Bugs 2 and 5 together make a good "two bugs, one symptom" story. Ask delegates what told them the first fix had worked (the page changed from the root 404 to the in-layout "Project not found"). Point out that TypeScript caught bug 5 but not bug 2: route paths are just strings.
- Bug 3: open the Network tab and click Settings with and without the fix. Ask what would be lost on a full reload in TaskBoard (all state not saved to `localStorage`).
- Bug 4: highlight that the `as { returnTo?: string }` cast is a promise to TypeScript, not a check, which is why no error appeared. Casts hide mistakes; use them rarely.
- Remind the room that `RequireAuth` is user experience only: the server must enforce real security (Day 9).
- Note for trainers: the handbook says `<NavLink to="/">` without `end` is active on every page. In React Router 8 the root link is special-cased and is only active at exactly `/`, so a missing `end` on the root link does not show a symptom; `end` still matters for other parent links such as `/projects` versus `/projects/1`. The fixed project keeps `end` on the Dashboard link, matching the handbook.
