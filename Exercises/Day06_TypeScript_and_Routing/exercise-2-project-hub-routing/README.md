# Day 6, Exercise 2 (harder): Project Hub with React Router

## The scenario

Your team is turning a single-page tool into a small multi-page "Project Hub" with React Router, following the Day 6 patterns: `createBrowserRouter`, a shared `Layout` with `NavLink`s and an `Outlet`, a `projects/:projectId` page, a not-found page, and a Settings page protected by `RequireAuth` with a mock login. The developer who started it has gone on leave. The app does not even load, and their notes say "project pages broken, login is weird". Your job is to find and fix the mistakes.

**This exercise contains 5 bugs.**

## What the app should do

The data lives in `src/data/projects.ts`: project `1` is **Website** and project `2` is **Mobile app**. The routes are defined in `src/routes.tsx` and used by `src/main.tsx`.

- [ ] `/` shows the **Dashboard** with a link to each project.
- [ ] `/projects/1` shows **Website** and its description; `/projects/2` shows **Mobile app**.
- [ ] An unknown project id, such as `/projects/99`, shows "Project not found" with a link back to the dashboard, inside the normal layout.
- [ ] An unknown path, such as `/banana`, shows "404 Not Found".
- [ ] Every link in the navigation bar changes the page **without a full page reload**, and the link for the current page is highlighted in bold.
- [ ] Visiting `/settings` while logged out sends you to the **Log in** page.
- [ ] After logging in, you land back on the page you originally asked for (Settings), and it says "Logged in as" followed by your name.
- [ ] After logging in, the browser **Back** button does not take you to the login page again.
- [ ] `npm run typecheck` reports no errors, `npm run build` succeeds, and there are no errors in the browser Console.

> **Good to know:** this is a mock login stored in `localStorage`, not real security. To log out while testing, open DevTools, go to **Application**, then **Local Storage**, and delete the `user` key.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173) and type the URLs from the checklist straight into the address bar. |
| `npm run typecheck` | Runs the TypeScript compiler in check-only mode and lists every type error. It prints nothing when there are none. |
| `npm test` | Runs the automated checks against the real routes, in memory. They re-run every time you save; press `q` to quit. All 12 tests pass when the app is fixed. |
| `npm run build` | Type-checks, then builds for production. |
| `npm run lint` | Runs ESLint. It reports no problems. |

> **Tip:** keep the DevTools **Network** tab open while you click around. In a single-page app, moving between pages should not create a new document request.

## Revise these handbook sections

Day 6 handbook:

- Module 6.3: "Defining routes" (including "Troubleshooting: react-router-dom"), "Layouts, links and Outlet" and "URL parameters and not found pages"
- Module 6.4: "useNavigate and useSearchParams" and "Protected routes"
- Lab 6.2 and Lab 6.3 hints and Troubleshooting tables

## Hints

<details><summary>Hint 1</summary>

Nothing will work until the app can load at all. Read the error in the browser (or the first line of `npm test`) and ask yourself which package is actually listed in `package.json`.

</details>

<details><summary>Hint 2</summary>

Project pages go wrong in two different ways, one after the other. First compare the route's `path` with the handbook: how does React Router know that part of a URL is a *parameter*? Then, once the project page appears, read what `npm run typecheck` says about `Project.tsx`. What type is every URL parameter, and what type are the ids in `projects.ts`?

</details>

<details><summary>Hint 3</summary>

`RequireAuth` and `Login` pass a message to each other through navigation state. Check that both sides use exactly the same name for it. And look closely at *how* each item in the navigation bar is written.

</details>
