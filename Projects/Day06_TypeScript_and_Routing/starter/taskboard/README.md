# TaskBoard: Day 5 starter

Your TaskBoard project as it stands at the end of Day 4. It is an exact copy of `Projects/Day04_State_and_Interactivity/solution/lab-4.3-taskboard`, with `TODO` comments where today's labs change the code.

All three Day 5 labs are built inside this project:

| Lab | Where the `TODO` comments are |
|---|---|
| 5.1 Search-as-You-Type with Debouncing | `src/App.jsx` (you create `src/components/ProductSearch.jsx`) |
| 5.2 Weather Dashboard from a Public API | `src/App.jsx` (you create `src/hooks/useFetch.js` and `src/components/WeatherDashboard.jsx`) |
| 5.3 TaskBoard: Persistence and Seed Data | `src/App.jsx`, `src/components/Header.jsx` and `src/components/AddTaskForm.jsx` (you create `src/hooks/useLocalStorage.js`) |

TaskBoard is fully interactive: you can add, move, rename and delete tasks. Refresh the page, though, and your changes disappear. Today you fix that.

If you already have your own TaskBoard from Day 4, keep using it. Use this folder only if you need a clean starting point.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). Run `npm run lint` to check your code with ESLint. Today's labs call public APIs (DummyJSON, Open-Meteo and JSONPlaceholder), so you need an internet connection.
