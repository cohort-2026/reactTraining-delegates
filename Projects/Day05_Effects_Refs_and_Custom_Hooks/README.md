# Day 5 projects: Effects, Refs and Custom Hooks

The Day 5 labs build on your TaskBoard project. This checkout currently contains the starter project; the finished checkpoints described in the course are not included here.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own TaskBoard from Day 4). It is an exact copy of the Day 4 Lab 4.3 solution, with `TODO` comments where today's labs change the code.

| Lab | What you build | Starts from |
|---|---|---|
| 5.1 Search-as-You-Type with Debouncing | Debounced product search | `starter/taskboard/` |
| 5.2 Weather Dashboard from a Public API | Reusable fetch Hook and weather dashboard | Your completed Lab 5.1 project |
| 5.3 TaskBoard: Persistence and Seed Data | Persisted tasks seeded from an API | Your completed Lab 5.2 project |

## The labs

- **Lab 5.1:** `ProductSearch` searches DummyJSON with a 400 ms debounce, cancels stale requests with `AbortController`, and renders loading, error, empty and results states. Rendered below the board while you work on the lab.
- **Lab 5.2:** a reusable `useFetch` Hook in `src/hooks` and a `WeatherDashboard` with a city selector, using Open-Meteo. Rendered below the board while you work on the lab.
- **Lab 5.3:** persistence. `useLocalStorage` replaces `useState` for tasks, the board is seeded from JSONPlaceholder on first run, the add-task input is focused with a ref, the tab title shows the open count, and a **Reset board** button seeds it again.

## How to run any project here

```bash
cd starter/taskboard
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` makes a production build. Labs that use DummyJSON, Open-Meteo, or JSONPlaceholder need an internet connection.

## What comes next

After completing Lab 5.3, use that TaskBoard as the starting point for Day 6's TypeScript conversion and routing work.

Requirements: Node.js 24 LTS and npm.
