# TaskBoard: Lab 5.3 solution (Persistence and Seed Data)

TaskBoard after **Lab 5.3: TaskBoard: Persistence and Seed Data**, the last lab of Day 5. TaskBoard now remembers your tasks after a refresh, and loads five starter tasks from JSONPlaceholder the first time it runs.

Built on: `../lab-5.2-weather-dashboard`. This is the finished JavaScript TaskBoard that you convert to TypeScript on Day 6.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). You need an internet connection the first time, to load the starter tasks. `npm run lint` checks the code; `npm run build` makes a production build.

To see the first-run seeding again, click **Reset board**, or delete the `tasks` key in DevTools under **Application**, then **Local Storage**.

## What changed in this lab

- New `src/hooks/useLocalStorage.js`: the same API as `useState`, with lazy initial state read from `localStorage` and an effect that writes every change back as JSON.
- `src/App.jsx`:
  - `const [tasks, setTasks] = useLocalStorage("tasks", null)`. `null` means nothing has been stored yet.
  - `needsSeed` is derived from `tasks === null`. A seeding effect with `[needsSeed, setTasks]` dependencies fetches `https://jsonplaceholder.typicode.com/todos?_limit=5`, maps each to-do to `{ id: String(t.id), title, status: completed ? "done" : "todo", points: 1 }`, and cancels with `AbortController` in the cleanup.
  - While `tasks` is `null` it shows **Loading starter tasks...** (after every Hook call).
  - A **Reset board** button calls `setTasks(null)`, which seeds the board again.
  - The Day 4 handlers are unchanged. `WeatherDashboard` is no longer rendered, and the `src/data/tasks.js` import was removed because the board is now seeded from the API.
- `src/components/AddTaskForm.jsx` focuses the title input on first load with `useRef` and an effect.
- `src/components/Header.jsx` keeps the browser tab title in sync with the open count: `TaskBoard (4 open)`.

## Done when

- Tasks survive a page refresh
- Seed data loads only once
- The tab title shows the open count
