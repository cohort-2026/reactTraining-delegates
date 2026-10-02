# Projects and Lab Guide

This guide summarizes the delegate labs in Days 1–10: what each day builds, the outcomes for each lab, and the main steps to complete them. Follow the matching Day handbook for full explanations, hints, troubleshooting and completion checklists.

## How to Use the Project Folders

- Begin with the day's `starter/` files and follow the matching lab steps below and in the handbook.
- Days 1–2 have separate starter folders for each lab. Days 3–8 build the TaskBoard forward; start from `starter/taskboard/` or continue your own project, and use the day's `solution/` checkpoint only to check work or catch up.
- Day 9 starts a new Next.js project. Day 10 starts from the authenticated Next.js project completed on Day 9.
- Run the app and checks described in the lab README. Commit and push at the milestones requested by the handbook.
- Most React projects require Node.js 24 LTS and npm. API-based labs need an internet connection; Days 7–8 need the local json-server API; Days 9–10 need Supabase. Day 10 also uses GitHub Actions and Vercel.

## Day 1: Web and JavaScript Essentials

**Day outcome:** Set up the development tools and GitHub workflow, build a semantic HTML/CSS profile page, and write basic JavaScript functions and loops.

1. **Lab 1.1 — Environment Setup and First GitHub Repository.** **Outcome:** a verified local toolchain and a `react-course` repository pushed to GitHub. **Steps:** install Node.js LTS, VS Code, Git and Chrome or Edge; verify `node`, `npm`, `git` and `code` versions; install Prettier, ESLint and Auto Rename Tag and enable format-on-save; create a GitHub account if needed; create and open `react-course`; add a README with your name and course goal; configure Git, initialize the repository and commit; create an empty GitHub repository, add it as `origin`, push `main`, and share its URL with the trainer.
2. **Lab 1.2 — Build a Static Profile Page.** **Outcome:** a personal page using semantic sections, Flexbox navigation, a Grid of skills and a button hover state. **Steps:** create `profile-page/index.html` and `style.css`; generate the HTML skeleton and link the stylesheet; add header/navigation, About, Skills and Goals sections, and footer; style the navigation with Flexbox and skills as three Grid cards; add and style a button and hover state; inspect the page in the browser DevTools; commit and push.
3. **Lab 1.3 — JavaScript Exercises: Tip Calculator and Grade Checker.** **Outcome:** working return-value functions and a student report with correct grades and pass count. **Steps:** create `js-basics/lab1-3.js`; implement `calculateTip` and `totalWithTip` (reusing the first function); implement the three grade bands in `getGrade`; create four student objects; loop through them and log each grade; count passing students; run with `node lab1-3.js`, verify the output, and commit and push.

## Day 2: Modern JavaScript and Your First React App

**Day outcome:** Transform data with array methods and immutable updates, fetch remote data with error handling, and scaffold TaskBoard in React with Vite.

1. **Lab 2.1 — Data Transformation Drills.** **Outcome:** readable product reports made with array methods and no `for` loops, while preserving the source data. **Steps:** create an array of six product objects; use `map` for names, `filter` for in-stock items under R500, `find` for product 4 and `reduce` for in-stock value; use `map` plus spread to mark product 2 out of stock; use `filter` to remove product 5; log labeled results and the unchanged original array; run with Node and commit.
2. **Lab 2.2 — Fetch and Display Data from a Public API.** **Outcome:** a numbered to-do report with completion counts and friendly failure handling. **Steps:** write `async loadTodos(limit)`; fetch JSONPlaceholder todos using the limit; check `res.ok` and parse JSON; wrap the request in `try`/`catch`/`finally`; log each title with a number and done/open marker; count completed items with `filter`; test a deliberately wrong URL and verify the program does not crash and the `finally` message appears; restore the URL and commit.
3. **Lab 2.3 — Scaffold the TaskBoard Capstone.** **Outcome:** a Vite React TaskBoard starter running locally and pushed to its own GitHub repository. **Steps:** create the Vite React project with ESLint inside `react-course`; install dependencies and start the dev server; replace `App.jsx` with the TaskBoard heading and tagline; simplify the CSS and set the document title; create an empty GitHub repository and push the project from its own Git repository; check the page and browser console.

## Day 3: React Fundamentals

**Day outcome:** Build reusable components, render data-driven lists with keys and conditions, and assemble the first static TaskBoard board.

1. **Lab 3.1 — Build a Reusable Component Set.** **Outcome:** reusable `Button` and `Card` components with props, defaults, children and styles. **Steps:** create `Button` with variant, size and children props; build its classes from props; create `Card` with an optional title and children; add the component styles and restore the stylesheet import if needed; render both variants and titled/untitled cards in `App`; inspect with React DevTools, check for warnings and commit.
2. **Lab 3.2 — Render a Product Catalogue from Static Data.** **Outcome:** an eight-product grid with correct stock badges, keys and an empty state. **Steps:** export eight products with id, name, price, category, stock and rating; create `ProductCard` for product details and conditional stock/rating display; create `ProductGrid` to map cards with keys; render the grid; test the empty-products state and restore the data; style with CSS Grid and commit.
3. **Lab 3.3 — TaskBoard: Static Task List UI.** **Outcome:** TaskBoard displays mock tasks in three correctly counted status columns. **Steps:** add eight tasks with string ids, title, optional assignee, points and `todo`/`doing`/`done` status; create `Header` with app name and task count; update `Board` to map the three statuses into `Column`s; have each `Column` render keyed `TaskCard`s and an empty message; show task details while omitting missing assignees; style a three-column board; make `App` render only `Header` and `Board`, then commit and push.

## Day 4: State and Interactivity

**Day outcome:** Use React state and event handlers for counters, accordions, a cart and a fully interactive TaskBoard.

1. **Lab 4.1 — Counter, Toggle and Accordion Exercises.** **Outcome:** independent component state plus parent-controlled accordion state. **Steps:** build a counter with plus, minus (minimum zero), reset and updater-based Plus 5; build a light/dark toggle; build accordion items that open independently; lift open-item state to the parent and add Show all/Hide all; inspect state in React DevTools and commit.
2. **Lab 4.2 — Shopping Cart.** **Outcome:** a cart with unique product lines, working quantity controls and derived totals. **Steps:** reuse the Day 3 catalogue; add an Add to cart action to product cards; create `Shop` to own cart state as product ids and quantities; increment existing lines rather than duplicating them; create `Cart` with plus/minus and Remove controls; remove lines at zero; derive item count and total instead of storing them; disable adding out-of-stock products and commit.
3. **Lab 4.3 — TaskBoard: Add, Complete, Edit and Delete.** **Outcome:** tasks can be created, moved between statuses, renamed and deleted, with completion progress shown in the header. **Steps:** move the task array into `App` state; add an `AddTaskForm` and create-task handler; implement immutable status-change, rename and delete handlers; pass handlers through `Board` and `Column` to each card; add a status selector, inline editing and confirmed deletion to `TaskCard`; derive the done count in `Header`; test all actions and commit.

## Day 5: Effects, Refs and Custom Hooks

**Day outcome:** Synchronize TaskBoard with APIs, timers, browser storage and the document; build reusable data Hooks.

1. **Lab 5.1 — Search-as-You-Type with Debouncing.** **Outcome:** product search waits for a pause in typing, cancels stale requests and shows all request states. **Steps:** create a controlled search component with query and debounced-query state; update the debounced value after 400 ms and clean up the timer; fetch DummyJSON results for queries of at least two characters; cancel obsolete requests with `AbortController`; render loading, error, empty and result states; verify request count and stale-result behavior in DevTools, then commit.
2. **Lab 5.2 — Weather Dashboard from a Public API.** **Outcome:** a reusable `useFetch` Hook powers a city-selectable weather view with loading and error handling. **Steps:** create `useFetch`; define three cities and coordinates; build an Open-Meteo URL from the selected city; display temperature, wind and response update time; show loading and friendly error states; change cities to verify refetching and cancellation; check for console warnings and commit.
3. **Lab 5.3 — TaskBoard: Persistence and Seed Data.** **Outcome:** tasks persist across refreshes, seed from JSONPlaceholder on first use, and can be reset. **Steps:** create `useLocalStorage`; replace TaskBoard's task state with the Hook; only when no stored tasks exist, fetch five todos and map them into the Task shape; show a loading state until seeding completes; focus the add-task input with a ref; update the browser tab title with the open-task count; add Reset board; verify refresh and reset behavior, then commit and push.

## Day 6: TypeScript and Routing

**Day outcome:** Convert TaskBoard to typed React code, create multi-page routes and add a mock protected route.

1. **Lab 6.1 — Convert TaskBoard to TypeScript.** **Outcome:** TaskBoard's Day 5 features work with no TypeScript errors or `any` types. **Steps:** create a new Vite `react-ts` project and bring across the Git history; copy the source and rename component files to `.tsx` and other source files to `.ts`; define `Status` and `Task`; type component props, Hook generics, events and refs; run `npx tsc --noEmit -p tsconfig.app.json` and fix errors; run and test all features, then commit and push.
2. **Lab 6.2 — Multi-Page TaskBoard.** **Outcome:** dashboard, project and settings pages share a layout and have refresh-safe URLs. **Steps:** install React Router; create Layout, Dashboard, Project, Settings and NotFound pages; configure nested routes with `createBrowserRouter`; add `projectId` to task types/data; render all tasks on Dashboard and project-filtered tasks on Project; add active `NavLink`s and URL-based search; test navigation, Back, refresh and unknown routes, then commit.
3. **Lab 6.3 — Protected Routes with a Mock Login.** **Outcome:** logged-out visitors are redirected from Settings and return to their requested page after login. **Steps:** create `useAuth` with user, login and logout backed by local storage; add a Login page and route; create `RequireAuth` around Settings; preserve the requested route in navigation state and return there with replacement navigation after login; show the user and Log out in Layout; test direct access, login, logout and browser Back, then commit and push. This is a routing exercise, not real security.

## Day 7: State Management and Server State

**Day outcome:** Share theme/auth with Context, centralize client state in Zustand, and move task data to a cached REST API layer.

1. **Lab 7.1 — Theme Switcher and Shared Auth with Context.** **Outcome:** theme and user state are shared across the app and theme preference persists. **Steps:** create ThemeContext, ThemeProvider and `useTheme`; apply the theme to the document and add dark CSS variables and a toggle; persist the theme; create AuthContext/AuthProvider and move user/login/logout into it; update `useAuth`; wrap the router with both providers; verify immediate header updates and provider error behavior, then commit.
2. **Lab 7.2 — TaskBoard State Refactor.** **Outcome:** task update logic is represented by a reducer and a persisted Zustand store rather than prop drilling and Outlet context. **Steps:** implement reducer actions for add, move, rename and delete; test the reducer directly; install Zustand and build a persisted task store using the reducer; remove task props/context from the component tree; read state/actions through selectors; add an assignee filter store (keep URL search in the URL if already implemented); verify interactions and persistence, then commit.
3. **Lab 7.3 — TaskBoard Data Layer with TanStack Query.** **Outcome:** task reads and writes use json-server, while TanStack Query handles cache, loading, errors and mutations. **Steps:** install TanStack Query, devtools and json-server; create `db.json` and run the API on port 3001; add the QueryClient provider and devtools; implement task fetch/create/update/delete API helpers; read tasks with `useQuery` and keep UI filters in Zustand; add mutation Hooks that invalidate task queries; show loading/error states and disable pending controls; test with the API stopped and slow-network throttling, then commit and push.

## Day 8: Styling, Forms and React 19 Features

**Day outcome:** Restyle the app accessibly, validate reusable create/edit forms and provide instant optimistic task creation.

1. **Lab 8.1 — Restyle TaskBoard with Tailwind and shadcn/ui.** **Outcome:** responsive, dark-mode-ready TaskBoard using reusable UI primitives. **Steps:** install Tailwind's Vite plugin and configure the `@` alias; initialize shadcn/ui with the Radix base and add button, card, dialog, input, label and badge; rebuild task cards with status text and color; make the board responsive; connect class-based dark mode to ThemeProvider; add a loading skeleton; remove old CSS, verify phone/desktop and dark mode, then commit.
2. **Lab 8.2 — Task Form with React Hook Form and Zod.** **Outcome:** one accessible validated form supports creating and editing tasks, and API data is validated too. **Steps:** install React Hook Form, Zod and the resolver; define form and API schemas; build fields for title, status, points and assignee; associate accessible field errors with inputs; submit through the query mutation and close on success; reuse the form with defaults for editing; validate fetched API responses; test invalid input and keyboard operation, then commit.
3. **Lab 8.3 — Quick Add with Actions and Optimistic Updates.** **Outcome:** new tasks appear immediately while saving and failures are reported cleanly. **Steps:** build QuickAddForm with `useActionState` and validate the title in its action; create a SubmitButton using `useFormStatus`; render the task list with `useOptimistic`; add the temporary task before the network request; await query invalidation and catch request failures; visually distinguish pending tasks; test with Slow 4G and with json-server stopped; commit and push.

## Day 9: Full-Stack React with Next.js

**Day outcome:** Migrate TaskBoard to Next.js App Router, store tasks in Supabase Postgres, and add real per-user authentication and row-level security.

1. **Lab 9.1 — Migrate TaskBoard to the Next.js App Router.** **Outcome:** a multi-page Next.js app uses Server Components for display and Client Components only where interaction requires them. **Steps:** scaffold `taskboard-next` with create-next-app and initialize shadcn/ui; move types, schemas and components into the Next.js structure; create the root layout and client providers; add dashboard, project, settings and login pages; keep display components server-rendered and mark interactive leaves as client components; add loading, error and not-found UI; use temporary in-memory data; test routes and boundary states, then commit and push.
2. **Lab 9.2 — Connect TaskBoard to Supabase.** **Outcome:** tasks are stored in Postgres and changed with validated Server Actions. **Steps:** create a Supabase project and tasks table with grants and RLS; temporarily disable email confirmation for class; install Supabase packages and configure ignored `.env.local`; add browser/server clients and session refresh proxy; replace in-memory reads with a Supabase query; implement validated add, move and delete actions with path revalidation; connect forms and status controls; verify database rows and that secrets are not committed. Writes may correctly be blocked by RLS until authentication is added in Lab 9.3.
3. **Lab 9.3 — Sign Up, Log In and Per-User Tasks.** **Outcome:** authenticated users can manage only their own tasks. **Steps:** build the login page with email/password and `useActionState`; implement signup, login and logout Server Actions; protect dashboard and project routes with server-side claims checks and redirects; check the user inside every task action; show signed-in identity and logout in Header; test with two accounts to verify task isolation and logout; commit and push. Re-enable email confirmation before sharing publicly.

## Day 10: Performance, Testing and Deployment

**Day outcome:** Protect TaskBoard behavior with tests and CI, deploy it publicly, measure it, and demonstrate the result with peer review.

1. **Lab 10.1 — Unit and Component Tests for TaskBoard.** **Outcome:** independent accessible tests cover reducer behavior, schemas and key UI flows. **Steps:** install Vitest, Testing Library and jsdom; configure scripts and setup; test reducer add/move/delete/immutability; test valid and invalid schemas; build and test accessible PointsStepper; test AddTaskForm with its Server Action mocked; turn a key “never break” behavior into a test; run the complete suite, then commit and push.
2. **Lab 10.2 — CI Pipeline and Production Deployment.** **Outcome:** every push is checked and TaskBoard is available at a public URL. **Steps:** add lint, formatting, typecheck and test scripts and fix reported issues; enable the React Compiler and verify the app; create the GitHub Actions workflow and required repository secrets; push and confirm CI is green; import the project into Vercel and deploy with environment variables; update Supabase production URLs and restore email confirmation; run Lighthouse and fix an issue; add a README with live URL, screenshot and stack.
3. **Lab 10.3 — Capstone Demonstrations and Peer Code Review.** **Outcome:** delegates can explain and demonstrate their deployed app, exchange useful feedback and identify next improvements. **Steps:** prepare a three-minute demo covering sign-up, task actions, dark mode and mobile view; explain one technical decision and one improvement; present from the live URL; exchange repository links with a partner; open a PR or issue containing two suggestions and one specific positive observation; respond to received feedback; record next steps in the README. This lab has no new code checkpoint.

## Source Material

The day folders contain starter files and solution checkpoints. Full instructions are in the [delegate handbooks](../Markdown%20Handbooks/):

- [Day 1 handbook](../Markdown%20Handbooks/Day01_Delegate_Handbook_Web_and_JavaScript_Essentials.md)
- [Day 2 handbook](../Markdown%20Handbooks/Day02_Delegate_Handbook_Modern_JavaScript_and_Your_First_React_App.md)
- [Day 3 handbook](../Markdown%20Handbooks/Day03_Delegate_Handbook_React_Fundamentals.md)
- [Day 4 handbook](../Markdown%20Handbooks/Day04_Delegate_Handbook_State_and_Interactivity.md)
- [Day 5 handbook](../Markdown%20Handbooks/Day05_Delegate_Handbook_Effects_Refs_and_Custom_Hooks.md)
- [Day 6 handbook](../Markdown%20Handbooks/Day06_Delegate_Handbook_TypeScript_and_Routing.md)
- [Day 7 handbook](../Markdown%20Handbooks/Day07_Delegate_Handbook_State_Management_and_Server_State.md)
- [Day 8 handbook](../Markdown%20Handbooks/Day08_Delegate_Handbook_Styling_Forms_and_React_19_Features.md)
- [Day 9 handbook](../Markdown%20Handbooks/Day09_Delegate_Handbook_Full_Stack_React_with_Next_js.md)
- [Day 10 handbook](../Markdown%20Handbooks/Day10_Delegate_Handbook_Performance_Testing_and_Deployment.md)