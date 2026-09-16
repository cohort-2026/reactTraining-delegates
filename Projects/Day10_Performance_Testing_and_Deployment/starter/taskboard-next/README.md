# Day 10 starter: taskboard-next

This is your Day 9 Lab 9.3 TaskBoard (App Router, Supabase, auth), copied over unchanged as today's starting point. Today you add tests, a CI pipeline, and deploy it to a public URL.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project's values
npm run dev
```

## Today's work, in order

1. **Lab 10.1 — Testing.** Install Vitest and React Testing Library, write reducer, schema and component tests, and test `AddTaskForm` with a mocked Server Action. See `TODO (Lab 10.1)` comments and the [Lab 10.1 solution](../../solution/lab-10.1-taskboard-tests/) for the finished result.
2. **Lab 10.2 — CI and deployment.** Add lint/format/typecheck/test scripts, enable the React Compiler, add `.github/workflows/ci.yml`, deploy to Vercel, and update Supabase's URL configuration. See the [Lab 10.2 solution](../../solution/lab-10.2-taskboard-ci-cd/).
3. **Lab 10.3 — Capstone demo and peer review.** No code changes; see the top-level Day 10 README.

Requirements: Node.js 24 LTS, npm, and your own Supabase project (see Day 9's README for setup).
