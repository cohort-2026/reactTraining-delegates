# TaskBoard: Lab 6.2 solution (Multi-Page TaskBoard)

TaskBoard after **Lab 6.2: Multi-Page TaskBoard**. It now has a shared layout with navigation, a Dashboard with every task, a page per project, a Settings page and a friendly not found page.

Built on: `../lab-6.1-taskboard-typescript`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). Try `/`, `/projects/website`, `/projects/mobile`, `/settings`, `/projects/nope` and `/banana`. `npm run lint` runs ESLint and `npm run build` type-checks and builds.

## What changed in this lab

- Installed `react-router` (version 8).
- `src/main.tsx` defines the routes with `createBrowserRouter` (imported from `"react-router"`) and renders `<RouterProvider>` from `"react-router/dom"` inside `<StrictMode>`. `NotFound` is the root `errorElement`.
- New `src/pages` folder; `App.tsx` is gone:
  - `Layout.tsx` owns the tasks state (`useLocalStorage<Task[] | null>`) and the seeding effect, renders `Header`, the `NavLink` navigation (one link per project, `end` on Dashboard) and `<Outlet context={{ tasks, setTasks } satisfies BoardContext} />`. While the starter tasks load it shows **Loading starter tasks...** instead of the page.
  - `BoardContext` is exported from `Layout.tsx`: `tasks` is `Task[]` (the pages only render once tasks are loaded) and `setTasks` is `Dispatch<SetStateAction<Task[] | null>>`, so Settings can still reset the board to `null`.
  - `Dashboard.tsx` shows all tasks and keeps the search text in the URL with `useSearchParams` (`/?q=login`).
  - `Project.tsx` reads `projectId` with `useParams`, shows **Project not found** for unknown ids, and renders only that project's tasks.
  - `Settings.tsx` holds the **Reset board** button.
  - `NotFound.tsx` uses `useRouteError` and `isRouteErrorResponse`, so `/banana` shows **404 Not Found**.
- `Task` has a new `projectId: string` field. The seeded tasks are split between the `website` and `mobile` projects.
- New `src/data/projects.ts` holds the projects list, so `Layout` (navigation) and `Project` share it.
- New `src/components/ProjectBoard.tsx` renders the add-task form and the board, with the add, move, rename and delete handlers that update the shared tasks through Outlet context. Dashboard and Project both use it. New tasks get the page's `projectId`; on the Dashboard they go into the first project (Website).
- `Header` shows the app name as text rather than an `h1`, because each page now has its own `h1`.
- `nav a.active { font-weight: bold; }` in `src/index.css` highlights the current page.

If you still have tasks in localStorage from Day 5, they have no `projectId` and appear only on the Dashboard. Click **Reset board** on Settings to load fresh starter tasks.

## Done when

- Each page has its own URL
- Refreshing any page works
- Unknown projects and unknown paths show friendly pages
