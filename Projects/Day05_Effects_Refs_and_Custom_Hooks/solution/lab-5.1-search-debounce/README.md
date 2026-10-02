# TaskBoard: Lab 5.1 solution (Debounced Product Search)

Built on: `Projects/Day05_Effects_Refs_and_Custom_Hooks/starter/taskboard` (the Day 4.3 TaskBoard).

This checkpoint adds a DummyJSON product search while keeping the interactive TaskBoard.

## How to run

```bash
npm install
npm run dev
```

Search needs an internet connection. Run `npm run lint` and `npm run build` to check the project.

## What changed

- Added a controlled search input and a 400 ms debounced query.
- Requests run only for queries of at least two characters.
- `AbortController` cancels stale requests.
- The component displays short-query, loading, error, empty and results states.

The next checkpoint builds on this one and adds the Open-Meteo weather dashboard.