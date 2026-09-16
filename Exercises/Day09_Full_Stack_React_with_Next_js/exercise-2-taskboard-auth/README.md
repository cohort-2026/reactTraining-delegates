# Exercise 9.2: TaskBoard accounts

## The scenario

This is a small version of TaskBoard after Labs 9.2 and 9.3: users log in, see only their own tasks, and add tasks through a Server Action. A teammate built it and opened a pull request. Before it is merged, the reviewers found problems:

- The type check and some tests fail.
- Adding a task seems to do nothing until you refresh the page.
- A security reviewer is worried about how the app decides who is signed in, and about what reaches the browser.
- A tester ran `supabase/tasks.sql` on the team's real Supabase project. Now signed-in users see `permission denied for table tasks`.

Find and fix the mistakes.

### About the offline Supabase stand-in

So that you can work without a Supabase account or the internet, this project uses a small stand-in for Supabase in `lib/fake-supabase/`. It has the same function names as the real `@supabase/ssr` package (`createServerClient`, `createBrowserClient`, `auth.getClaims()`, `auth.getSession()`, `from("tasks")`, and so on), and it behaves like a Supabase project with the handbook's Row Level Security policy. Tasks are kept in memory, so they reset when you restart the server. In a real project, `lib/supabase/server.ts` and `lib/supabase/client.ts` would import from `@supabase/ssr` instead. Do not change anything in `lib/fake-supabase/`.

Demo accounts: `alice@example.com` and `bob@example.com`, both with the password `password123`.

## What the app should do

When everything is fixed:

- [ ] `npm run typecheck`, `npm run lint` and `npm test -- --run` all pass.
- [ ] `npm run build` succeeds, and then `npm run check:bundle` prints a ✓.
- [ ] Visiting `/` while signed out sends you to `/login`.
- [ ] After logging in as Alice, the page says **Signed in as alice@example.com** and lists only Alice's task (Plan the sprint). Bob sees only his own task (Fix the login page).
- [ ] Adding a task with a title of at least 3 characters shows it in the list **straight away**, without refreshing the page.
- [ ] A title shorter than 3 characters is rejected with an error message.
- [ ] A session cookie that someone has edited by hand (for example in DevTools, **Application**, **Cookies**) is not accepted as a signed-in user.
- [ ] No secret key ever reaches the browser.
- [ ] **Log out** takes you back to `/login`.
- [ ] `supabase/tasks.sql` gives signed-in users access to the `tasks` table, and its policy limits them to their own rows. The stand-in does not run this file, so check it by reading it against the handbook.

The tests do not cover every item, so work through the whole checklist.

## How to run it

Use a terminal in this folder.

1. Install the packages:

   ```bash
   npm install
   ```

2. Create `.env.local` from the example file. The values are placeholders; nothing contacts Supabase.

   | Windows (PowerShell) | macOS (Terminal) |
   |---|---|
   | `Copy-Item .env.example .env.local` | `cp .env.example .env.local` |

3. Run the checks:

   ```bash
   npm run typecheck
   npm test -- --run
   npm run lint
   npm run build
   npm run check:bundle
   ```

4. Start the app and open http://localhost:3000:

   ```bash
   npm run dev
   ```

If you change `.env.example`, copy it to `.env.local` again, then restart the dev server or build again. Next.js reads environment variables when it starts or builds.

## Your task

**This exercise contains 5 bugs.** Four are in the TypeScript code and environment file, and one is in `supabase/tasks.sql`. Do not change `lib/fake-supabase/`, `scripts/` or the tests.

Revise these handbook sections (Day 9):

- Module 9.3: *Defining Server Actions* and *Using a Server Action in a form*
- Module 9.5: *The tasks table and Row Level Security*, *Connecting Next.js to Supabase* and *Protecting pages on the server*
- Lab 9.2: *Troubleshooting*

<details><summary><strong>Hint 1</strong></summary>

Start with `npm run typecheck` and read the first error in full. Think about exactly which arguments `useActionState` passes to its action.

</details>

<details><summary><strong>Hint 2</strong></summary>

For "shows it straight away": a Server Action changed the data, but something has to tell Next.js to render the page again with fresh data.

</details>

<details><summary><strong>Hint 3</strong></summary>

Two checklist items are about trust: what the server should believe about the user, and what the browser should never be given. Re-read the Note at the end of *Protecting pages on the server*, and the bullets about `NEXT_PUBLIC_` in *Connecting Next.js to Supabase*. For the SQL, remember which role a logged-in user has.

</details>
