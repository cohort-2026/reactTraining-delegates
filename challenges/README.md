# Challenges

Five open-ended build challenges that follow one storyline: **authentication**, from a single login form up to a real-time app where every message is checked on the server. They go further than the daily bug-fix exercises: instead of fixing broken code, you build a feature from a starter project until it meets a list of acceptance criteria.

Each challenge stands on its own. You can start any of them without finishing the one before, although working through them in order is the smoothest path.

## The ladder

| # | Level | Challenge | You'll practise | Builds on |
|---|---|---|---|---|
| 01 | 🟢 Easy | [Login form with validation](01-easy-login-form/) | Controlled inputs, derived state, accessible errors, pending UI | Days 3, 4, 8 |
| 02 | 🟡 Medium | [Auth context and protected routes](02-medium-auth-context-routes/) | Context, custom Hooks, React Router guards, safe redirects, restoring a session | Days 5, 6, 7 |
| 03 | 🟠 Hard | [Token auth with silent refresh](03-hard-token-refresh/) | A fetch wrapper, single-flight refresh, race conditions, TanStack Query, MSW, logout across tabs | Days 2, 5, 7, 10 |
| 04 | 🔴 Very hard | [Role-based access in Next.js](04-very-hard-rbac-nextjs/) | Signed HttpOnly cookie sessions, `proxy.ts`, Server Actions, a single permission policy, Zod | Days 6, 8, 9 |
| 05 | ⚫ Very, very hard | [Real-time collaborative TaskBoard](05-very-very-hard-realtime-board/) | Authenticated WebSockets, optimistic updates with rollback, version conflicts, presence, reconnecting | All ten days |

## How each challenge is laid out

```text
challenges/
  NN-<level>-<name>/
    README.md       the brief, acceptance criteria, hints and stretch goals
    CHECKLIST.md    manual checks (challenges 04 and 05 only)
    starter/        where you begin
```

1. Read the `README.md` all the way through before you write any code.
2. `cd starter`, run `npm install`, then run `npm test`. The tests **fail** at first. That is expected: they describe the finished feature.
3. Work through the acceptance criteria one at a time. You're finished when every test passes and every checklist item is ticked.
4. Do not change the test files. If a test looks wrong, reread the brief first.
5. Stuck for more than fifteen minutes? Open **one** hint, then keep going.

## Solutions

A reference solution and a write-up (`SOLUTION.md`) for every challenge unlock at **09:00 on Saturday 26 September**, in `Challenge Solutions/`. Run `git pull` to get them. Try the challenge first: you learn much more from comparing your own working version with the reference than from reading the answer.
