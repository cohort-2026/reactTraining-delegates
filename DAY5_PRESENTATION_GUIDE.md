# Day 5: Effects, Refs and Custom Hooks — Presentation Guide

Use the finished checkpoints in order. Labs 5.2 and 5.3 carry forward the earlier Day 5 features and the interactive Day 4 TaskBoard.

## Run a Checkpoint

From the repository root, enter the checkpoint folder, then install and start it:

```bash
cd Projects/Day05_Effects_Refs_and_Custom_Hooks/solution/lab-5.1-search-debounce
npm install
npm run dev
```

For the other labs, use their folders instead:

- [Lab 5.1 checkpoint](Projects/Day05_Effects_Refs_and_Custom_Hooks/solution/lab-5.1-search-debounce)
- [Lab 5.2 checkpoint](Projects/Day05_Effects_Refs_and_Custom_Hooks/solution/lab-5.2-weather-dashboard)
- [Lab 5.3 checkpoint](Projects/Day05_Effects_Refs_and_Custom_Hooks/solution/lab-5.3-taskboard)

Open the Local URL printed by Vite. Use Node.js 24 LTS and npm. All three labs call public APIs, so have an internet connection. Stop the dev server with Ctrl+C.

## Lab 5.1 — Search-as-You-Type with Debouncing

**What I built:** a DummyJSON product search that waits for typing to pause, cancels stale requests and presents the request states.

**How I built it:** a controlled input stores the immediate query; an effect updates a debounced query after 400 ms and cleans up its timer; another effect fetches results for queries of at least two characters and aborts the request on cleanup. Loading is derived by comparing the query for the current result to the debounced query.

**Demo and checks:**

- Type one character and pause. Confirm the app asks for at least two characters and no search request is sent.
- Type a product term and wait a little over 400 ms. Confirm results appear and the Network tab shows the DummyJSON search request.
- Type several characters quickly. Confirm the request waits until typing pauses instead of firing on every keystroke.
- Search for an unlikely term, such as `zzzz-no-match`, and confirm the empty-results message appears.
- In DevTools, switch the Network condition to Offline, search for a new term, and confirm a friendly error appears. Switch back Online afterwards.
- Optional: type one query, quickly replace it with another, and confirm the old response does not replace the newer results.

## Lab 5.2 — Weather Dashboard from a Public API

**What I built:** a city selector and weather display powered by a reusable `useFetch` Hook.

**How I built it:** the selected city determines a URL with its coordinates; `useFetch` handles data, loading and errors, and aborts a previous request when the URL changes.

**Demo and checks:**

- Open the Lab 5.2 checkpoint and confirm the default city eventually shows temperature, wind speed and the API's local update time.
- Select another city. Confirm the heading changes and the weather values refresh.
- Change cities quickly or enable Slow 4G briefly. Confirm the dashboard shows a loading state during a request and settles on the selected city's result.
- In DevTools, switch Network to Offline and select another city. Confirm a friendly error appears; restore Online afterwards.
- Show that `useFetch` lives in `src/hooks/useFetch.js` and is called by the dashboard rather than duplicating fetch logic there.

## Lab 5.3 — TaskBoard: Persistence and Seed Data

**What I built:** a TaskBoard that seeds five tasks from JSONPlaceholder only when there is no saved task list, displays clear English task names, and keeps task changes in local storage.

**How I built it:** `useLocalStorage` initializes state from browser storage and writes state changes back; `App` fetches seed data only when the stored task value is `null`; a ref focuses the task title input; an effect updates the document title from the derived open-task count.

**Demo and checks:**

- To demonstrate first-run seeding, open DevTools Application/Storage, clear local storage for the app's origin, then reload. Confirm a loading message appears followed by five tasks.
- Confirm the task title field receives focus after the board loads.
- Add a task, change its status, and refresh. Confirm the changes remain.
- Mark a task Done. Confirm the header count and browser tab title update to reflect the open count.
- Click Reset board. Confirm loading appears, then the board is seeded with five clearly named English tasks again.
- If the browser already had the old placeholder titles saved, reload and confirm those five known titles are migrated while any titles you renamed yourself stay unchanged.
- In DevTools Application/Storage, inspect the `tasks` key to show the persisted task list.

## Before Presenting

- Verify internet access and avoid clearing storage until you are ready to demonstrate first-run seeding.
- Keep DevTools Network open for the search/weather requests and Application/Storage open for persistence.
- Explain the distinction: effects synchronize with timers, requests, storage or the document; custom Hooks package reusable effect logic.
