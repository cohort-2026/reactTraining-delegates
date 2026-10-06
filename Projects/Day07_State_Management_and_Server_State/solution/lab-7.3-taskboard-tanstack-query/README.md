# TaskBoard: Day 7 starter

Your TaskBoard project as it stands at the end of Day 6. It is an exact copy of `Projects/Day06_TypeScript_and_Routing/solution/lab-6.3-taskboard-protected-routes`, with `TODO` comments where today's labs change the code.

If you already have your own `taskboard-ts` from Day 6, keep using it. Use this folder only if you need a clean starting point.

Try this before the first module: log in on the Login page and watch the header. It does not show your name until you refresh, because `Login` and `Layout` each have their own copy of the `useAuth` state. Lab 7.1 fixes it.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

| Lab | Where the `TODO` comments are |
|---|---|
| 7.1 Theme Switcher and Shared Auth with Context | `src/main.tsx`, `src/hooks/useAuth.ts`, `src/hooks/useLocalStorage.ts`, `src/pages/Layout.tsx`, `src/index.css` and `src/App.css` (you create `src/context`) |
| 7.2 TaskBoard State Refactor | `src/pages/*`, `src/components/*` and `src/data/seed.ts` (you create `src/state/tasksReducer.ts`, `useTaskStore.ts` and a filter store) |
| 7.3 TaskBoard Data Layer with TanStack Query | `src/main.tsx`, `src/pages/Project.tsx` and `src/components/*` (you create `db.json`, `src/api/tasks.ts` and the mutation Hooks) |
