# TaskBoard: Lab 5.3 solution (Persistence and Seed Data)

Built on: `../lab-5.2-weather-dashboard`.

This final Day 5 checkpoint carries forward the interactive board, product search and weather dashboard. Tasks persist locally and seed from JSONPlaceholder on first use.

## How to run

```bash
npm install
npm run dev
```

The seed, search and weather features need an internet connection. Run `npm run lint` and `npm run build` to check the project.

## What changed

- Added `useLocalStorage` and replaced in-memory task state with persisted state.
- Fetches five starter todos only when no saved task list exists, replacing placeholder API titles with clear English task names; failed seed requests show a retry action.
- Converts the five known placeholder titles in previously saved task lists while preserving user-edited titles.
- Added Reset board to seed the task list again.
- Focuses the task title input on mount.
- Updates the browser tab title with the number of open tasks.