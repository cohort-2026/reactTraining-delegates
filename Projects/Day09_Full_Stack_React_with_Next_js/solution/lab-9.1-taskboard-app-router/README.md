# Lab 9.1 solution: TaskBoard on the Next.js App Router

TaskBoard migrated from the Vite SPA (Day 8) to a Next.js 16 App Router project. Today's board is **read-only**: tasks come from temporary in-memory data in `src/lib/data.ts`. Lab 9.2 replaces that file with real Supabase queries; Lab 9.3 adds sign-up, log-in and interactive task changes.

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. `npm run lint` runs ESLint, and `npm run build` type-checks and builds for production.

## Where things are

| Route | File | What it shows |
|---|---|---|
| `/` | `src/app/page.tsx` | All tasks across every project, with search and assignee filters in the URL |
| `/projects/[projectId]` | `src/app/projects/[projectId]/page.tsx` | One project's tasks; an unknown id renders `not-found.tsx` |
| `/settings` | `src/app/settings/page.tsx` | Placeholder for Lab 9.3 |
| `/login` | `src/app/login/page.tsx` | Placeholder for Lab 9.3 |

`src/app/loading.tsx` shows skeleton cards while a page's data is loading. `src/app/error.tsx` catches unexpected errors and offers a **Try again** button (it uses the `retry` prop, not the older `reset`).

## Server and Client Components

Only the files that truly need the browser have `"use client"` at the top:

- **`src/context/ThemeProvider.tsx`** and **`src/components/ThemeToggle.tsx`** — the theme uses state and reads/writes `localStorage`.
- **`src/components/FilterBar.tsx`** — the search box and assignee `<select>` need `onChange` handlers.
- **`src/app/error.tsx`** — Next.js requires error boundaries to be Client Components.
- **`src/app/providers.tsx`** — it renders `ThemeProvider`, so it needs the directive too (a Server Component cannot render one directly, but it can import a Client Component that wraps children, which is exactly this file's job).
- shadcn's `select.tsx`, `dialog.tsx` and `label.tsx` come from the CLI already marked as Client Components.

Everything else — `layout.tsx`, every page, `Header`, `Board`, `TaskCard` — is a plain Server Component. `Header` and every page are `async function`s that call `src/lib/data.ts` directly; there is no `useEffect`, no loading state to manage by hand, and no client-side data-fetching library.

## Notable choices

- **Filters live in the URL** (`?q=...&assignee=...`), not in a client store. This drops the Zustand filter store from Day 7–8: a Server Component page can read `searchParams` directly, so there is nothing left for a client state library to do. A filtered view can still be bookmarked or shared.
- **`useLocalStorage` was rewritten with `useSyncExternalStore`.** The Day 8 version reads `localStorage` inside a `useState` initialiser, which throws on the server (there is no `localStorage` in Node). Reading it inside an effect and calling `setState` works, but the project's ESLint rules (`react-hooks/set-state-in-effect`) reject that pattern. `useSyncExternalStore` is the API React provides for exactly this: an external store or piece of native access, with an explicit server snapshot (`null`, matching the SSR render), so there is no state-in-effect and no hydration mismatch.
- **`agentRules: false`** in `next.config.ts` stops `next dev` from writing `AGENTS.md`/`CLAUDE.md` into the project.
- Tasks have no `clientId`/`pending` fields today; those were part of Day 8's optimistic quick-add over TanStack Query, which this board does not use yet.

## Verified

- `npm run lint` — clean.
- `npm run build` — compiles, type-checks and prerenders successfully.
- `npm run dev`, then checked with `curl`: `/`, `/projects/website`, `/settings` and `/login` all return 200; `/projects/nope` renders "Project not found"; the dashboard lists the seeded tasks.
