# Day 7 projects: State Management and Server State

The TaskBoard in `starter/taskboard/` is the completed Day 7.3 project, built through the state-management and server-state labs.

## Which folder to start from

Use **`starter/taskboard/`** for the completed labs, or keep using your own `taskboard-ts` from Day 6.

## The labs

- **Lab 7.1:** a `ThemeContext` with a persisted light and dark theme (CSS variables and a `data-theme` attribute on `<html>`), and an `AuthContext`, so logging in updates the header straight away.
- **Lab 7.2:** a typed `tasksReducer` and a Zustand `useTaskStore` (persisted under the `taskboard` key) replace Outlet context and handler props. A small filter store holds the assignee filter; the search stays in the URL.
- **Lab 7.3:** tasks live on a json-server REST API. TanStack Query fetches and caches them, and `useAddTask`, `useMoveTask`, `useRenameTask` and `useDeleteTask` change them and invalidate `["tasks"]`.

## How to run the TaskBoard

```bash
cd starter/taskboard
npm install
npm run api
```

In a second terminal:

```bash
cd starter/taskboard
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

The API stores tasks in `starter/taskboard/db.json` on port 3001. The Vite app runs on the URL it prints (usually `http://localhost:5173`).

## What comes next

The Day 8 starter is at `Projects/Day08_Styling_Forms_and_React_19_Features/starter/taskboard/`. Keep your completed Lab 7.3 project available as a reference.

Requirements: Node.js 24 LTS and npm (json-server 1 needs Node 22.12 or newer).
