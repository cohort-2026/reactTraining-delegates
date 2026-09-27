# Lab 10.1 solution: unit and component tests for TaskBoard

12 tests across 3 files: the reducer, the schema, `PointsStepper`, and `AddTaskForm`.

## How to run

```bash
npm install
npm test               # watch mode
npx vitest run          # or: npm test -- --run
```

`npm run build` and `npm run lint` still work as before; `npm run typecheck` needs `next typegen` first (see Lab 10.2, which adds that script).

## What's here

| File | Layer | What it protects |
|---|---|---|
| `src/lib/tasksReducer.ts` + `.test.ts` | Unit | Every reducer action returns a new array without mutating the one it was given |
| `src/lib/schemas.ts` (from Day 9) tested in the same file | Unit | Invalid titles, statuses and non-numeric points are rejected; a numeric string still coerces |
| `src/components/PointsStepper.tsx` + `.test.tsx` | Component | The two buttons call `onChange` with the right value |
| `src/components/AddTaskForm.test.tsx` | Component | Submitting the form calls the (mocked) `addTask` Server Action with the typed title |

## A fix to the handbook's install commands

The handbook's second install line is:

```bash
npm install -D @vitejs/plugin-react vite-tsconfig-paths
```

In a real `create-next-app` + `shadcn init` project, this fails with an npm `ERESOLVE` error: `@vitejs/plugin-react@6` pulls in `@rolldown/plugin-babel`, which wants `@babel/core@^8`, while `shadcn`'s own dependencies pull in `@babel/core@^7`. **The fix is to skip `@vitejs/plugin-react` entirely** — install only `vite-tsconfig-paths`, and drop `react()` from the `plugins` array in `vitest.config.mts`. Vite's built-in esbuild transform already compiles JSX in `.tsx` files (the project's `tsconfig.json` sets `"jsx": "react-jsx"`); the plugin mainly adds Fast Refresh and React Compiler integration, neither of which matters for running tests. All 12 tests pass without it. See `vitest.config.mts` for the working version, and pass this fix on to the course owner.

## Verified

- `npm run lint` — clean.
- `npx vitest run` — 3 files, 12 tests, all passing.
- `npx tsc --noEmit` (after `next typegen`) — no errors, including the test files (Next.js's default `tsconfig.json` `include` covers them).
- `npm run build` — with placeholder `.env.local` values, compiles and type-checks; the build output does not include the `.test.ts`/`.test.tsx` files, since nothing under `app/` imports them.
