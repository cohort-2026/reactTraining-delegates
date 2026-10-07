# TaskBoard: Day 7 starter

This TaskBoard includes the Day 7 shared theme and auth contexts, persisted Zustand task state and filters, and a JSON Server API managed with TanStack Query.

If you already have your own `taskboard-ts` from Day 6, keep using it. Use this folder only if you need a clean starting point.

Try this before the first module: log in on the Login page and watch the header. It does not show your name until you refresh, because `Login` and `Layout` each have their own copy of the `useAuth` state. Lab 7.1 fixes it.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.
In a separate terminal, run `npm run api` and keep it running; it serves `db.json` at `http://localhost:3001`.

| Lab | Main implementation |
|---|---|
| 7.1 Theme Switcher and Shared Auth with Context | `src/context`, `src/hooks/useLocalStorage.ts`, `src/pages/Layout.tsx` and the CSS files |
| 7.2 TaskBoard State Refactor | `src/state/tasksReducer.ts`, `src/state/useTaskStore.ts`, `src/state/useFilterStore.ts` and the task-board components |
| 7.3 TaskBoard Data Layer with TanStack Query | `src/api/tasks.ts`, `src/hooks/use*Task.ts`, `src/pages/*` and `db.json` |
