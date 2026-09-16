# Day 9 starter: begin a new Next.js project

Unlike Days 3–8, TaskBoard does not carry forward as a folder today — Lab 9.1 begins a brand-new Next.js project. There is nothing to copy; instead, follow these commands.

## 1. Scaffold the project

```bash
npx create-next-app@latest taskboard-next
```

Accept the recommended defaults (TypeScript, ESLint, Tailwind CSS, App Router). Then:

```bash
cd taskboard-next
npx shadcn@latest init -b radix
npx shadcn@latest add button input label card badge dialog select
```

`-b radix` matches the shadcn/ui setup from Day 8 (the CLI defaults to a different base, Base UI, since mid-2026).

## 2. Stop `next dev` writing agent files into your project

Add this to `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  agentRules: false,
};
```

Without it, `next dev` writes `AGENTS.md`/`CLAUDE.md` files into the project on every run.

## 3. Bring your code across

Copy from your Day 8 Lab 8.3 TaskBoard (`Projects/Day08.../solution/lab-8.3-taskboard-quick-add/src/`):

- `types.ts` → `src/lib/types.ts`
- `schemas/task.ts` → `src/lib/schemas.ts`
- Display components → `src/components/`

See the [Lab 9.1 solution](../solution/lab-9.1-taskboard-app-router/) for the finished layout, pages and component boundaries, and its README for what moved where and why.

## What today's labs build, in order

| Lab | Goal |
|---|---|
| 9.1 Migrate TaskBoard to the Next.js App Router | Pages, layouts and Server/Client Components, backed by temporary in-memory data |
| 9.2 Connect TaskBoard to Supabase | Real Postgres storage, Server Actions, Row Level Security |
| 9.3 Sign Up, Log In and Per-User Tasks | A real login, so each account sees only its own tasks |

Each lab has its own complete, verified checkpoint under `solution/`.

Requirements: Node.js 24 LTS and npm. Lab 9.2 onward needs a free [Supabase](https://supabase.com) project — see the Lab 9.2 solution's README for setup.
