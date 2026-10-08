# TaskBoard: Day 7

This project combines the Day 7 labs:

- Light/dark theme and shared mock-auth state use React Context and persist in local storage.
- Search stays in the URL; the assignee filter uses a small Zustand store.
- Tasks are stored by json-server and loaded/cached with TanStack Query. Add, move, rename, delete, and reset actions update the API and invalidate the task query.

## Requirements

Node.js 24 LTS and npm. json-server 1 requires Node.js 22.12 or newer.

## Run the app

Install dependencies once:

```bash
npm install
```

Start the mock API in one terminal and leave it running:

```bash
npm run api
```

Start the Vite app in a second terminal:

```bash
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). The API is available at `http://localhost:3001`; set `VITE_TASKS_API_URL` if it runs at a different base URL.

`npm run lint` runs ESLint and `npm run build` type-checks and builds the app.
