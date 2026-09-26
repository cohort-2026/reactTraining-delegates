# Lab 9.3 solution: sign up, log in and per-user tasks

TaskBoard is now a genuine multi-user application. Each account sees only its own tasks, enforced by the database itself, not just by hiding pages in the browser.

## Before you run this

You need your own Supabase project — see `Projects/Day09.../solution/lab-9.2-taskboard-supabase/README.md` for the setup steps (create the project, run `supabase/tasks.sql`, copy `.env.example` to `.env.local`). For class, turn off email confirmation (**Authentication, Sign In / Providers, Email**) so signing up signs you in immediately, and turn it back on before sharing the app.

```bash
npm install
npm run dev
```

## What changed since Lab 9.2

- **`src/app/login/actions.ts`** (new) — `login`, `signup` and `logout` Server Actions. `login` and `signup` call `redirect("/")` on success and return `{ error }` on failure; `redirect` is called outside any `try`/`catch`, because it works by throwing.
- **`src/app/login/page.tsx`** (new) — a real sign-up and log-in form. One `<form>`, two buttons: **Log in** and **Sign up** each have their own `formAction`, bound to their own `useActionState(login, ...)` / `useActionState(signup, ...)`. A raw Server Action cannot go straight on `formAction` here, because it would be called with `FormData` only, not `(prev, formData)`.
- **`src/components/Header.tsx`** — now shows the signed-in user's email and a **Log out** button (a form bound to the `logout` action), when there is a session.
- **`src/app/page.tsx`, `src/app/actions.ts`** — unchanged from Lab 9.2. They already called `getClaims()` before reading or writing anything; now that `/login` exists, that check actually succeeds once you sign up.

## Try it

1. `npm run dev`, then sign up with a test email and a 6+ character password.
2. You land on the dashboard, signed in. Add a few tasks, move them between columns, delete one.
3. Log out, then sign up again with a **different** email.
4. Confirm the second account's board starts empty — the first account's tasks are invisible to it. That is Row Level Security, not client-side filtering: the same is true even if you inspect the network requests or edit the URL directly.

## Verified

- `npm run lint` — clean.
- `npm run build` — with placeholder values in `.env.local`, compiles and type-checks.
- `npm run dev`, checked with `curl` against the placeholder project: `/` still redirects to `/login` while logged out, and `/login` renders the email field, the password field, and both the **Log in** and **Sign up** buttons.
- Signing up, adding tasks, and confirming two accounts cannot see each other's rows needs a real Supabase project, so it was not run here — this solution was never pointed at a live project. Do this check yourself once you have created one; the SQL policy is the same one covered (and its logic checked against the Supabase docs) in Lab 9.2's `supabase/tasks.sql`.
