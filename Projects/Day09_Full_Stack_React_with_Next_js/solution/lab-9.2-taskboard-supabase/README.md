# Lab 9.2 solution: TaskBoard connected to Supabase

Tasks now live in a real Postgres table, read and written through Server Actions. **You cannot add a task successfully yet** — that is expected, and Lab 9.3 explains why.

## Before you run this

You need your own Supabase project. This solution never contacts Supabase itself; it only shows the code that would, so it builds and its pages redirect correctly without a real project. To actually try it against Supabase:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run `supabase/tasks.sql`. It is safe to run more than once, and its last statement is a read-only check: each row should say `APPLIED`.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and publishable key (**Connect**, or **Settings, API Keys**).
4. `npm install`, then `npm run dev`.

`.env.local` is already in `.gitignore` — never commit it.

## Why you cannot add a task yet

Visit `/` or `/settings` while logged out and you land on `/login` — that is `proxy.ts` working. There is no sign-up or log-in form yet (Lab 9.3 adds it), so there is no way to become "logged in", and Row Level Security means an anonymous request cannot write a row: `addTask` calls `getClaims()` first and returns `{ error: "Not signed in" }` before it ever reaches the database. If you also skip that check, the database itself rejects the insert.

## What changed since Lab 9.1

- **`src/lib/data.ts` is gone.** `src/app/page.tsx` now queries Supabase directly: `supabase.from("tasks").select("*").order("created_at")`, after checking `getClaims()`.
- **`src/app/actions.ts`** (new) — `addTask`, `moveTask`, `deleteTask`, each validated with Zod and each checking `getClaims()` before touching the database, then calling `revalidatePath("/")` so the change shows up.
- **`src/components/StatusSelect.tsx`** (new) — the only genuinely interactive piece of a task card. It is a small Client Component that calls the `moveTask` Server Action inside `useTransition`.
- **`src/components/AddTaskForm.tsx`** (new) — a Client Component using `useActionState(addTask, ...)`, the same pattern as Day 8's `QuickAddForm`, except the action now runs on the server.
- **`src/lib/supabase/`** (new) — `server.ts` (a fresh client per request, for Server Components and Actions), `client.ts` (for the browser) and `proxy.ts` (session refresh logic), copied from Supabase's official Next.js guide.
- **`src/proxy.ts`** (new, project root inside `src/` because this project uses the `src/` layout) — redirects a logged-out visitor to `/login` on every route except `/login` and `/auth`.
- **The Supabase table has no `project_id` or `assignee` columns** ([Module 9.5](../../../../Markdown%20Handbooks/Day09_Delegate_Handbook_Full_Stack_React_with_Next_js.md#the-tasks-table-and-row-level-security)'s SQL is a single flat per-user list), so `/projects/[projectId]` and the assignee filter from Lab 9.1 are gone. `src/lib/types.ts` now matches the table's columns exactly: `id`, `title`, `status`, `points`.

## Verified

- `npm run lint` — clean.
- `npm run build` — with placeholder values in `.env.local`, compiles and type-checks. No page is statically prerendered any more (`getClaims()` needs a live request), and the build log lists `Proxy (Middleware)`, confirming `src/proxy.ts` was picked up.
- `npm run dev`, checked with `curl` against the placeholder project: `/` and `/settings` both return **307 to `/login`** while logged out; `/login` itself returns **200**. No request hangs: with no session cookie present, `getClaims()` has nothing to verify and does not need to reach Supabase at all.

## What comes next

Lab 9.3 adds `/login` (sign up and log in forms), `/auth/*` routes, and a logout action, so this Server Action layer finally has a signed-in user to work with.
