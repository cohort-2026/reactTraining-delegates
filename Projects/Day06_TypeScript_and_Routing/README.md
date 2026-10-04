# Day 6 projects: TypeScript and Routing

Day 6 builds TaskBoard in three complete checkpoints. Start with the JavaScript project in `starter/taskboard/`, or continue with your own TaskBoard from Day 5.

| Lab | Finished checkpoint | Built on |
| --- | --- | --- |
| 6.1 Convert TaskBoard to TypeScript | `solution/lab-6.1-taskboard-typescript/` | `starter/taskboard/` |
| 6.2 Multi-Page TaskBoard | `solution/lab-6.2-taskboard-routing/` | Lab 6.1 |
| 6.3 Protected Routes with a Mock Login | `solution/lab-6.3-taskboard-protected-routes/` | Lab 6.2 |

Each checkpoint is an independent, runnable project. To run one:

```bash
cd solution/lab-6.3-taskboard-protected-routes
npm install
npm run dev
```

Use the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint; `npm run build` type-checks and creates a production build. The first run loads starter tasks from JSONPlaceholder, so it needs an internet connection.

## The labs

- **Lab 6.1:** Convert the TaskBoard to TypeScript. `src/types.ts` defines `Status` and `Task`; components have Props types, `useLocalStorage` and `useFetch` are generic, and events and refs are typed. `npx tsc --noEmit -p tsconfig.app.json` should report no errors.
- **Lab 6.2:** Add React Router pages for the Dashboard, projects, Settings and Not Found. Tasks gain a `projectId`, and Dashboard search is stored in the URL (`/?q=...`).
- **Lab 6.3:** Add a mock login. `useAuth` stores a user in localStorage, `RequireAuth` redirects logged-out visitors from Settings to Login, and a successful login returns to the page they requested.

## What comes next

Day 7 starts from the Lab 6.3 checkpoint. `Projects/Day07_State_Management_and_Server_State/starter/taskboard` is its Day 7 working copy.

Requirements: Node.js 24 LTS and npm. React Router 8 requires Node 22.22 or newer.
