# Day 7 · Exercise 2 (harder): Task filters with Zustand and TanStack Query

## Scenario

TaskBoard's task list now comes from a REST API through TanStack Query, and a small Zustand store holds the status filter. A new add-task form saves through a `useMutation` Hook. The pull request was merged on a Friday afternoon, and on Monday the testers raised a stack of issues. Find and fix every mistake.

## What the app should do

- [ ] The list shows every task from the API, with a **Loading tasks...** message first.
- [ ] Choosing a status in **Show** (for example **Done**) shows only the tasks with that status, fetched from `/tasks?status=done`. Choosing **All tasks** shows them all again.
- [ ] Typing a title in **New task** and clicking **Add** saves the task, and it appears in the list without a page refresh.
- [ ] The **Add** button is disabled while the task is saving.
- [ ] If the server answers with an error status (for example `500`), a message starting **Could not save the task** appears.
- [ ] `npm run typecheck` and `npm run lint` report no errors.

## How to run it

```bash
npm install
npm test -- --run
```

The tests use a fake API (built with MSW, Mock Service Worker, in `src/test/server.ts`), so you do not need json-server running. They describe the behaviour above; they fail now and should all pass once the code is fixed. Do not change the test files.

To try the real app in the browser, use two terminals:

```bash
npm run api    # terminal 1: json-server on port 3001, serving db.json
npm run dev    # terminal 2: the Vite dev server
```

Also useful: `npm run typecheck`.

**This exercise contains 5 bugs.**

## Revise these handbook sections

Day 7 handbook (`Markdown Handbooks/Day07_Delegate_Handbook_State_Management_and_Server_State.md`):

- Module 7.3: *Using the store with selectors* and its Troubleshooting table
- Module 7.4: *Reading data with useQuery* (what a query key must contain) and *Changing data with useMutation*
- Lab 7.3: *Troubleshooting*

<details><summary><strong>Hint 1</strong></summary>

The first error, `Maximum update depth exceeded`, comes from a component that reads the store. Ask what a selector returns each time Zustand calls it, and whether that value is ever "the same" as last time.

</details>

<details><summary><strong>Hint 2</strong></summary>

TanStack Query caches data by its query key. If two different requests share one key, how would the cache know they are different? And when you invalidate, does the key you pass match the start of the key you cached?

</details>

<details><summary><strong>Hint 3</strong></summary>

`fetch` only rejects when the network fails, not when the server replies with `404` or `500`. Also check the TanStack Query v5 names for the pending flag, and let `npm run typecheck` help you.

</details>
