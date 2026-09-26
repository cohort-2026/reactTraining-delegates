# Answers: Exercise 9.2, TaskBoard accounts

Exercise folder: `Exercises/Day09_Full_Stack_React_with_Next_js/exercise-2-taskboard-auth/`
Corrected project: `fixed/` (identical to the exercise apart from the five fixes below).

Next.js 16.3.5, React 19.2, Zod 4, Vitest 5. The project never contacts Supabase. `lib/fake-supabase/` is an offline stand-in with the same call shapes as `@supabase/ssr`:

- `getClaims()` verifies the cookie's signature. `getSession()` only decodes it, and it logs the same "could be insecure" warning as the real library.
- `from("tasks")` applies the handbook's RLS policy using the **verified** token, as the real Data API does.

Checked with `npm run typecheck`, `npm run lint`, `npm test -- --run`, `npm run build`, `npm run check:bundle`, and a scripted browser run (log in, add a task, reload, log out).

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Fix | Concept and handbook section |
|---|---|---|---|---|---|
| 1 | `app/actions.ts`, lines 8–9 | `npm run typecheck` and `npm run build`: *No overload matches this call* at `useActionState(addTask, …)` in `components/AddTaskForm.tsx` line 7, and *Expected 1 arguments, but got 2* in the test. Tests: *TypeError: object is not iterable* at `Object.fromEntries(formData)`. | The action is written as `addTask(formData)`. `useActionState` always calls its action as `(previousState, formData)`, so `formData` actually receives `{ error: null }`. | Before: `addTask(formData: FormData)`. After: `addTask(prev: State, formData: FormData)`. | Server Action signature for `useActionState`. Module 9.3, *Defining Server Actions* ("Same signature as yesterday"). |
| 2 | `app/actions.ts`, after line 18 (and the missing import) | In the browser, **Add** seems to do nothing: the new task only appears after a manual refresh. No test fails; the README checklist item "straight away" catches it. | After the insert, nothing tells Next.js to re-render `/`, so the page keeps showing the old list. | Add `import { revalidatePath } from "next/cache";` and call `revalidatePath("/");` after a successful insert, before `return { error: null };`. | Refreshing data after a mutation. Module 9.3, *Defining Server Actions*; Module 9.2, *Caching and revalidation*; Lab 9.2 *Troubleshooting* ("Changes do not appear"). |
| 3 | `lib/auth.ts`, lines 9–12 | Test *refuses a session cookie that has been edited by hand* fails: it expected `Not signed in` but got `new row violates row-level security policy for table "tasks"`. The test and terminal output show *Using the user object as returned from supabase.auth.getSession() could be insecure!*. In the browser, a hand-edited cookie gets past the dashboard redirect and shows another user's email. | `getSession()` reads the session straight from the cookie **without verifying** its signature, so the server trusts a forged identity. The database still refuses the write because it checks the real token, which is defence in depth, but the app's own check is broken. | Before: `const { data } = await supabase.auth.getSession(); const user = data.session?.user; …`. After: `const { data } = await supabase.auth.getClaims(); if (!data?.claims) return null; return { id: data.claims.sub, email: data.claims.email };` | Server-side auth checks with `getClaims()`. Module 9.5, *Protecting pages on the server* (Note: avoid `getSession()` for authorisation). |
| 4 | `lib/supabase/client.ts`, line 7, and `.env.example`, line 5 | After `npm run build`, `npm run check:bundle` fails: *A Supabase secret key (sb_secret_...) is in files sent to the browser* and names a file in `.next/static/chunks/`. | The browser client is created with `NEXT_PUBLIC_SUPABASE_SECRET_KEY`. Any `NEXT_PUBLIC_` variable used in client code is copied into the JavaScript bundle, and the secret key bypasses RLS. | `client.ts`: use `process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!`. `.env.example`: delete the `NEXT_PUBLIC_SUPABASE_SECRET_KEY` line. TaskBoard does not need the secret key; if a server task ever does, name it `SUPABASE_SECRET_KEY`, with no prefix, and use it only in server code. | Environment variables and keys. Module 9.3, *Server Actions are public endpoints*; Module 9.5, *Setting up a Supabase project* and *Connecting Next.js to Supabase*. |
| 5 | `supabase/tasks.sql`, line 18 | Reported by the tester on the real project: signed-in users get `permission denied for table tasks`. The stand-in does not run SQL, so the delegate finds this by reading the file against the handbook. | The table privileges were granted to `anon` (logged-out requests) instead of `authenticated`. New tables are not exposed to the Data API without explicit grants, so the `authenticated` role has no privileges, and Postgres refuses before RLS is even checked. The grant to `anon` also gives logged-out requests table privileges they should not have. RLS still returns no rows to them, because the policy is `to authenticated`. | Before: `grant select, insert, update, delete on public.tasks to anon;`. After: `grant select, insert, update, delete on public.tasks to authenticated;` | Grants decide whether a role can use the table; RLS decides which rows. Module 9.5, *The tasks table and Row Level Security* (Troubleshooting: `permission denied for table tasks` means check the grant). |

## The fixes in full

### Bugs 1 and 2: `app/actions.ts`

```ts
// Before
"use server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { taskSchema } from "@/lib/schemas";

type State = { error: string | null };

export async function addTask(
  formData: FormData): Promise<State> {
  // ...
  const { error } = await supabase.from("tasks").insert(parsed.data);
  if (error) return { error: error.message };
  return { error: null };
}

// After
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { taskSchema } from "@/lib/schemas";

type State = { error: string | null };

export async function addTask(
  prev: State, formData: FormData): Promise<State> {
  // ...
  const { error } = await supabase.from("tasks").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { error: null };
}
```

### Bug 3: `lib/auth.ts`

```ts
// Before
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  return { id: user.id, email: user.email };

// After
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return null;
  return { id: data.claims.sub, email: data.claims.email };
```

### Bug 4: `lib/supabase/client.ts` and `.env.example`

```ts
// Before
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!

// After
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
```

```bash
# .env.example: delete this line
NEXT_PUBLIC_SUPABASE_SECRET_KEY=sb_secret_placeholder
```

Delegates who already copied the file keep the old line in `.env.local`. That is harmless once no code reads it, because Next.js only inlines `NEXT_PUBLIC_` variables that client code actually references. They must run `npm run build` again before `npm run check:bundle`.

### Bug 5: `supabase/tasks.sql`

```sql
-- Before
grant select, insert, update, delete
  on public.tasks to anon;

-- After
grant select, insert, update, delete
  on public.tasks to authenticated;
```

Checked against Supabase's docs: *Securing your API* and the 2026 Data API grants change (new tables need explicit `grant … to authenticated`), and *Row Level Security* (policy `to authenticated using ((select auth.uid()) = user_id) with check (…)`). If a delegate has already run the broken script on a real project, the fix script can also run `revoke all on public.tasks from anon;`. This is optional for the exercise.

## Order the delegate meets the bugs

1. `npm run typecheck` / `npm run build`: bug 1 only. Three of the four tests also fail with "object is not iterable". The "nobody is signed in" test passes, because it returns before reading the form.
2. With bug 1 fixed: one failing test, the edited cookie (bug 3).
3. With all tests green: `npm run check:bundle` fails (bug 4), and the browser shows the stale list after **Add** (bug 2).
4. Reading the SQL against the handbook: bug 5.

## Debrief suggestions (15 minutes)

- **Defence in depth.** With bug 3 present, the forged cookie got past the app's check, but the database still refused the insert, because RLS checked the real token. Ask: "Which layer saved us, and why should we not rely on it alone?"
- **Green tests are not the whole story.** Bug 2 passed every test. Ask the room how they would test it: an end-to-end test on Day 10 (Playwright adds a task and expects to see it).
- **What is public?** Walk through the three kinds of value: the `NEXT_PUBLIC_` URL and publishable key (fine in the browser, protected by RLS); the secret key (server only, never prefixed); and Server Actions (public endpoints, so check the user inside them).
- **Grants versus policies.** Draw two gates: the grant (can this role touch the table at all?) and the policy (which rows?). `permission denied` means the first gate. An empty list with no error means the second.
