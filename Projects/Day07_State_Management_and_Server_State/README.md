# Day 7 projects: State Management and Server State

Every Day 7 lab changes your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own `taskboard-ts` from Day 6). It is an exact copy of the Day 6 Lab 6.3 solution, with `TODO` comments where today's labs change the code.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 7.1 Theme Switcher and Shared Auth with Context | `solution/lab-7.1-theme-auth-context/` | `starter/taskboard/` |
| 7.2 TaskBoard State Refactor | `solution/lab-7.2-taskboard-state/` | `solution/lab-7.1-theme-auth-context/` |
| 7.3 TaskBoard Data Layer with TanStack Query | `solution/lab-7.3-taskboard-tanstack-query/` | `solution/lab-7.2-taskboard-state/` |

## The labs

- **Lab 7.1:** a `ThemeContext` with a persisted light and dark theme (CSS variables and a `data-theme` attribute on `<html>`), and an `AuthContext`, so logging in updates the header straight away.
- **Lab 7.2:** a typed `tasksReducer` and a Zustand `useTaskStore` (persisted under the `taskboard` key) replace Outlet context and handler props. A small filter store holds the assignee filter; the search stays in the URL.
- **Lab 7.3:** tasks live on a json-server REST API. TanStack Query fetches and caches them, and `useAddTask`, `useMoveTask`, `useRenameTask` and `useDeleteTask` change them and invalidate `["tasks"]`.

## How to run any project here

```bash
cd solution/lab-7.2-taskboard-state   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

**Lab 7.3 also needs the mock API.** Run it in a second terminal and keep it running:

```bash
cd solution/lab-7.3-taskboard-tanstack-query
npm run api        # json-server on http://localhost:3001
```

## What comes next

Day 8 starts from `solution/lab-7.3-taskboard-tanstack-query`: `Projects/Day08_Styling_Forms_and_React_19_Features/starter/taskboard` is an exact copy of it. You need json-server running again tomorrow.

Requirements: Node.js 24 LTS and npm (json-server 1 needs Node 22.12 or newer).
