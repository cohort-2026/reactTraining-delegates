# TaskBoard: Day 7 solution

TaskBoard after Day 7.3. Tasks are fetched from json-server and cached by TanStack Query; Zustand holds the assignee filter, while search stays in the URL.

## How to run

```bash
npm install
npm run api
```

In a second terminal, start the Vite app:

```bash
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). The API runs on `http://localhost:3001`. `npm run lint` runs ESLint and `npm run build` type-checks and builds.

Tasks are persisted in `db.json`. TanStack Query caches the task collection for 30 seconds and invalidates it after create, update, and delete mutations.
