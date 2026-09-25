# TaskBoard: Lab 5.1 solution (Search-as-You-Type with Debouncing)

TaskBoard after **Lab 5.1: Search-as-You-Type with Debouncing**. A `ProductSearch` component searches DummyJSON as you type, but only sends a request once you pause.

Built on: `Projects/Day04_State_and_Interactivity/solution/lab-4.3-taskboard`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). You need an internet connection for the search. `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/components/ProductSearch.jsx`:
  - a controlled input with `query` state, and a `debouncedQuery` that an effect sets 400 ms after `query` changes (the cleanup clears the timeout);
  - a fetch effect for `https://dummyjson.com/products/search?q=...` (with `encodeURIComponent`) that is skipped when the query is shorter than 2 characters, and cancels stale requests with `AbortController`;
  - loading is derived (the stored result's query differs from `debouncedQuery`) rather than set at the top of the effect, which keeps the React Hooks ESLint rules happy;
  - separate too-short, loading, error, empty and results states.
- `src/App.jsx` renders `ProductSearch` in a temporary section below the board.
- `src/App.css` adds a few input and label styles for the practice section.

## Done when

- Typing quickly sends one request (check the Network tab)
- No stale results appear
- All four states render
