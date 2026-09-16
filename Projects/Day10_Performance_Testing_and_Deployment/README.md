# Day 10 projects: Performance, Testing and Deployment

Today TaskBoard from Day 9 Lab 9.3 gets tested, cleaned up, and shipped to a public URL. There is no capstone folder for Lab 10.3 — it is a demo and peer-review exercise, not a code change.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 10.1 Unit and Component Tests for TaskBoard | `solution/lab-10.1-taskboard-tests/` | `starter/taskboard-next/` |
| 10.2 CI Pipeline and Production Deployment | `solution/lab-10.2-taskboard-ci-cd/` | `solution/lab-10.1-taskboard-tests/` |
| 10.3 Capstone Demonstrations and Peer Code Review | *(no code — see below)* | `solution/lab-10.2-taskboard-ci-cd/` |

## The labs

- **Lab 10.1:** Vitest and React Testing Library. `src/lib/tasksReducer.ts` (ported from Day 7) and `src/lib/schemas.ts` (from Day 9) get unit tests; `PointsStepper` (new) and `AddTaskForm` get component tests, the latter with the `addTask` Server Action mocked. 12 tests, all passing.
- **Lab 10.2:** `lint`, `format`, `format:check`, `typecheck` and `test` scripts; the React Compiler; and `.github/workflows/ci.yml`, which runs the whole check suite on every push and pull request. Its README covers connecting a real repository to Vercel and Supabase.
- **Lab 10.3:** no new code. Each delegate presents a 3-minute demo from their own deployed TaskBoard, then reviews a partner's repository using the [code review checklist](../../Markdown%20Handbooks/Day10_Delegate_Handbook_Performance_Testing_and_Deployment.md#code-review-checklist) in Module 10.4.

## How to run any project here

```bash
cd solution/lab-10.1-taskboard-tests   # or any other folder
npm install
cp .env.example .env.local             # fill in your Supabase project's values
npm run dev
```

`npm run lint`, `npm run build` and (from Lab 10.1 onward) `npm test` all work as usual. Lab 10.2 adds `npm run typecheck` and `npm run format:check`.

## A fix worth knowing before you start

The handbook's Vitest install command (`npm install -D @vitejs/plugin-react vite-tsconfig-paths`) fails with an npm `ERESOLVE` error in a real `create-next-app` + `shadcn` project — `@vitejs/plugin-react`'s dependency chain wants `@babel/core@8`, which conflicts with `@babel/core@7` from `shadcn`'s own dependencies. Install `vite-tsconfig-paths` on its own and leave `@vitejs/plugin-react` out of `vitest.config.mts`'s `plugins` array; Vite's built-in esbuild JSX transform handles `.tsx` test files without it. See `solution/lab-10.1-taskboard-tests/README.md` for the full explanation.

## Requirements

Node.js 24 LTS, npm, and your own Supabase project (see the Day 9 README for setup). Lab 10.2's deployment steps also need free Vercel and GitHub accounts.
