# TaskBoard: Lab 7.2 solution (TaskBoard State Refactor)

TaskBoard after **Lab 7.2: TaskBoard State Refactor**. Tasks live in a Zustand store that saves to localStorage, and every component reads what it needs with a selector. No component passes task handlers as props any more.

Built on: `../lab-7.1-theme-auth-context`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). The board starts empty: add a few tasks, refresh, and they are still there. In DevTools, **Application**, **Local Storage**, the store is saved under the `taskboard` key. `npm run lint` runs ESLint and `npm run build` type-checks and builds.

## What changed in this lab

- Installed `zustand` (version 5).
- New `src/state/tasksReducer.ts`: a pure reducer with a `TaskAction` discriminated union (`added`, `moved`, `renamed`, `deleted`) and no `default` case. It is kept for the Day 10 tests. The quick console check from the hints (`node src/state/tasksReducer.check.ts`) was run and then deleted, as the handbook says.
- New `src/state/useTaskStore.ts`: `create<TaskStore>()(persist(...))` with `addTask`, `moveTask`, `renameTask` and `deleteTask`, each reusing `tasksReducer`, saved under the `taskboard` key.
- New `src/state/useFilterStore.ts`: the assignee filter. The search text stays in the URL with `useSearchParams`, as on Day 6, so the store does not hold it.
- New `src/components/FilterBar.tsx`: the search box (URL) and the assignee dropdown (filter store), used on the Dashboard and project pages.
- `Layout` no longer owns tasks: the tasks state, the JSONPlaceholder seeding, `BoardContext` and the Outlet context are gone. `ProjectBoard.tsx` and `src/data/seed.ts` were removed.
- `Board` takes only an optional `projectId`. `Column` selects the raw `tasks` array and filters it by status, project, assignee and search outside the selector. `Header` and `Project` select `tasks` too.
- `AddTaskForm` takes the page's `projectId`, generates the id with `crypto.randomUUID()` in its submit handler and calls `addTask`. `TaskCard` selects `moveTask`, `renameTask` and `deleteTask` itself.
- `Settings` no longer has **Reset board** (it depended on Layout's state). It shows your name, the theme button and **Log out**.

## Done when

- No component passes task handlers as props
- Tasks persist through a refresh
- React DevTools shows fewer props
