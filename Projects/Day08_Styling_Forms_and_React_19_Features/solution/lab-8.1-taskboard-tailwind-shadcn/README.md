# TaskBoard: Lab 7.3 solution (TaskBoard Data Layer with TanStack Query)

TaskBoard after **Lab 7.3: TaskBoard Data Layer with TanStack Query**, the last lab of Day 7. Tasks now live on a REST API run by json-server. TanStack Query fetches, caches and refreshes them; Zustand keeps only the assignee filter.

Built on: `../lab-7.2-taskboard-state`.

## How to run

You need two terminals.

```bash
# Terminal 1: the mock API on http://localhost:3001
npm install
npm run api
```

```bash
# Terminal 2: the app
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`), and http://localhost:3001/tasks to see the raw JSON. Every change is saved into `db.json`; json-server also adds a `"$schema"` line the first time it saves, which is expected. The React Query Devtools button appears in a corner of the page in development.

`npm run lint` runs ESLint and `npm run build` type-checks and builds.

## What changed in this lab

- Installed `@tanstack/react-query`, and `@tanstack/react-query-devtools` and `json-server` as dev dependencies. New `api` script: `json-server db.json --port 3001`.
- New `db.json` with six tasks. Every task has all the `Task` fields, including string ids, `tags` and `projectId`.
- `src/main.tsx` creates a `QueryClient` with `staleTime: 30_000` and wraps the app in `<QueryClientProvider>`, with `<ReactQueryDevtools />`.
- New `src/api/tasks.ts`: `API`, the `NewTask` type (`Omit<Task, "id">`), and `fetchTasks`, `createTask`, `updateTask` and `deleteTask`. Each checks `res.ok` and throws.
- New mutation Hooks in `src/hooks`: `useAddTask` (`mutationFn: createTask`), `useMoveTask`, `useRenameTask` and `useDeleteTask`. Each invalidates `["tasks"]` on success. `useRenameTask` keeps the inline rename from Day 4 working; it follows the same shape as `useMoveTask`.
- `src/state/useTaskStore.ts` was removed. `tasksReducer.ts` stays for the Day 10 tests, and `useFilterStore.ts` stays for the assignee filter.
- `Board`, `Column`, `Header`, `FilterBar` and `Project` read tasks with `useQuery({ queryKey: ["tasks"], queryFn: fetchTasks })`. All of them share one cached request.
- `Board` shows **Loading tasks...** and the error message. `AddTaskForm` and `TaskCard` disable their buttons and the status dropdown while a mutation is pending, and show an error if a save fails. New tasks have no id: json-server creates one.

Test it with json-server stopped (the error appears after three retries) and with **Slow 4G** throttling in DevTools.

## Done when

- Changes survive a refresh because they are saved in `db.json`
- The devtools show cached queries
- Buttons disable while saving
