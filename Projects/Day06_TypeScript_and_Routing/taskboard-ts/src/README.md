# Day 6 projects: TypeScript and Routing

Every Day 6 lab changes your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own TaskBoard from Day 5). It is an exact copy of the Day 5 Lab 5.3 solution, still in JavaScript, with `TODO` comments where today's labs change the code.

Lab 6.1 does not edit that folder in place: you create a new `taskboard-ts` project from the Vite `react-ts` template and bring the source files across. The checkpoints from Lab 6.1 onwards are that TypeScript project.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 6.1 Convert TaskBoard to TypeScript | `solution/lab-6.1-taskboard-typescript/` | `starter/taskboard/` (copied into a new react-ts project) |
| 6.2 Multi-Page TaskBoard | `solution/lab-6.2-taskboard-routing/` | `solution/lab-6.1-taskboard-typescript/` |
| 6.3 Protected Routes with a Mock Login | `solution/lab-6.3-taskboard-protected-routes/` | `solution/lab-6.2-taskboard-routing/` |

## The labs

- **Lab 6.1:** TaskBoard as TypeScript. `src/types.ts` holds `Status` and `Task`, every component has a Props type, `useLocalStorage` and `useFetch` are generic, and events and refs are typed. `npx tsc --noEmit -p tsconfig.app.json` reports nothing.
- **Lab 6.2:** React Router. `Layout` (with the navigation and the tasks state), `Dashboard`, `Project`, `Settings` and `NotFound` pages; tasks gain a `projectId`; the Dashboard search lives in the URL (`/?q=...`).
- **Lab 6.3:** a mock login. `useAuth` stores a user in localStorage, `RequireAuth` sends logged-out visitors from Settings to Login, and logging in returns you to where you came from.

## How to run any project here

```bash
cd solution/lab-6.3-taskboard-protected-routes   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks (`tsc -b`) and makes a production build. The first run loads starter tasks from JSONPlaceholder, so you need an internet connection.

## What comes next

Day 7 starts from `solution/lab-6.3-taskboard-protected-routes`: `Projects/Day07_State_Management_and_Server_State/starter/taskboard` is an exact copy of it.

Requirements: Node.js 24 LTS and npm (React Router 8 needs Node 22.22 or newer).
