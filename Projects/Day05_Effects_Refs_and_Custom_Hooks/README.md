# Day 5 projects: Effects, Refs and Custom Hooks

Every Day 5 lab is built inside your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable TaskBoard project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own TaskBoard from Day 4). It is an exact copy of the Day 4 Lab 4.3 solution, with `TODO` comments where today's labs change the code.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 5.1 Search-as-You-Type with Debouncing | `solution/lab-5.1-search-debounce/` | `starter/taskboard/` |
| 5.2 Weather Dashboard from a Public API | `solution/lab-5.2-weather-dashboard/` | `solution/lab-5.1-search-debounce/` |
| 5.3 TaskBoard: Persistence and Seed Data | `solution/lab-5.3-taskboard/` | `solution/lab-5.2-weather-dashboard/` |

## The labs

- **Lab 5.1:** `ProductSearch` searches DummyJSON with a 400 ms debounce, cancels stale requests with `AbortController`, and renders loading, error, empty and results states. Rendered below the board while you work on the lab.
- **Lab 5.2:** a reusable `useFetch` Hook in `src/hooks` and a `WeatherDashboard` with a city selector, using Open-Meteo. Rendered below the board while you work on the lab.
- **Lab 5.3:** persistence. `useLocalStorage` replaces `useState` for tasks, the board is seeded from JSONPlaceholder on first run, the add-task input is focused with a ref, the tab title shows the open count, and a **Reset board** button seeds it again.

## How to run any project here

```bash
cd solution/lab-5.3-taskboard   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` makes a production build. The labs call public APIs (DummyJSON, Open-Meteo and JSONPlaceholder), so you need an internet connection.

## What comes next

On Day 6 you convert `solution/lab-5.3-taskboard` to TypeScript in a new `taskboard-ts` project and add routing.

Requirements: Node.js 24 LTS and npm.
