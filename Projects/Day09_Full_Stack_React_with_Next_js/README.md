# Day 9 projects: Full-Stack React with Next.js

Today TaskBoard moves off Vite entirely and becomes a Next.js App Router project with a real Postgres database. Unlike Days 3–8, there is no starter folder to copy: Lab 9.1 begins with `npx create-next-app`. See `starter/README.md` for the exact commands and what to bring across from Day 8.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 9.1 Migrate TaskBoard to the Next.js App Router | `solution/lab-9.1-taskboard-app-router/` | A fresh `create-next-app` + `shadcn init -b radix` scaffold, with code ported from Day 8 |
| 9.2 Connect TaskBoard to Supabase | `solution/lab-9.2-taskboard-supabase/` | `solution/lab-9.1-taskboard-app-router/` |
| 9.3 Sign Up, Log In and Per-User Tasks | `solution/lab-9.3-taskboard-auth/` | `solution/lab-9.2-taskboard-supabase/` |

## The labs

- **Lab 9.1:** the dashboard, project pages, settings and login placeholder run as Server Components, fetching from temporary in-memory data (`src/lib/data.ts`). Only genuinely interactive pieces — the theme toggle, the search box, the error boundary — are Client Components.
- **Lab 9.2:** `src/lib/data.ts` is replaced by real Supabase queries. `src/app/actions.ts` holds the `addTask`, `moveTask` and `deleteTask` Server Actions, and `supabase/tasks.sql` creates the table with Row Level Security. **You cannot add a task successfully yet** — nobody can sign in until Lab 9.3, and that is the point: it proves RLS is doing its job.
- **Lab 9.3:** `/login` gets a real sign-up and log-in form, `Header` shows who is signed in with a **Log out** button, and every page and Server Action checks `getClaims()` before doing anything. Two different accounts never see each other's tasks.

## How to run any project here

```bash
cd solution/lab-9.1-taskboard-app-router   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Next.js prints (usually `http://localhost:3000`). `npm run lint` runs ESLint, and `npm run build` type-checks and builds.

**Labs 9.2 and 9.3 need a Supabase project.** Copy `.env.example` to `.env.local` and fill in your own project's URL and publishable key — see each lab's README for the setup steps, starting with `solution/lab-9.2-taskboard-supabase/README.md`. `.env.local` is already in `.gitignore`; never commit it.

## A note on TaskBoard's shape

The multi-project board from Days 7–8 (`projectId`, an `assignee` per task) does not carry into Lab 9.2 onward: Module 9.5's `tasks.sql` is a single flat per-user list (`id`, `title`, `status`, `points`), so `src/lib/types.ts` was simplified to match it, and Lab 9.1's `/projects/[projectId]` route and the assignee filter were dropped from Lab 9.2 onward. Each lab's README explains exactly what changed and why.

## What comes next

Day 10 tests and deploys the TaskBoard you built in Lab 9.3, starting from `solution/lab-9.3-taskboard-auth`.

Requirements: Node.js 24 LTS, npm, and a free [Supabase](https://supabase.com) account for Labs 9.2–9.3.
