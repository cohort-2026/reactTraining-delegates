# Exercise 10.1 (warm-up): Board performance

## The scenario

A teammate read Module 10.1 and "optimised" the TaskBoard `Board` with `memo`, `useMemo` and `useCallback`. Since then, users report odd behaviour: the filter buttons do nothing, and tasks jump back to their old status. React DevTools also shows that every task card still re-renders on each keystroke, so the optimisation is not even working. Your job is to find and fix the mistakes.

The teammate also wrote tests describing how the board must behave. The tests are correct; the component code is not.

## What the board should do

When everything is fixed:

- [ ] Clicking a filter button (**All**, **To do**, **In progress**, **Done**) shows only the matching tasks.
- [ ] Changing the status of one task, then another, keeps **both** changes.
- [ ] Adding a task with a title of at least 3 characters adds a card.
- [ ] Typing in the **New task title** box does not re-render the existing task cards. You can see this in React DevTools with **Highlight updates when components render** turned on, or in the **Profiler**.
- [ ] `npm test -- --run` shows 3 passing tests.
- [ ] `npm run lint` reports no problems, and `npm run typecheck` passes.

## How to run it

Use a terminal in this folder. The commands are the same on Windows and macOS.

```bash
npm install
npm test
```

Vitest keeps watching and re-runs the tests when you save. Press `q` to quit. Also run:

```bash
npm run lint
npm run typecheck
```

To try the board in the browser, run `npm run dev` and open http://localhost:5173.

## Your task

**This exercise contains 3 bugs**, all in `src/components/`. Do not change the tests or `src/format.ts`.

Revise these handbook sections:

- Day 10, Module 10.1: *memo, useMemo and useCallback* (including the *Check your understanding* question) and *Measure with the React Profiler*
- Day 5, Module 5.1: *The dependency array controls when effects run* (the same idea applies to `useMemo` and `useCallback`)
- Day 4, Module 4.1: *State is a snapshot: use updater functions*

<details><summary><strong>Hint 1</strong></summary>

The test "does not re-render the task cards while you type" counts calls to `formatPoints`. Each task card calls it once every time the card renders.

</details>

<details><summary><strong>Hint 2</strong></summary>

A memoised value or function is only recalculated when something in its dependency array changes. For each `useMemo` and `useCallback`, list every variable from the component that it reads.

</details>

<details><summary><strong>Hint 3</strong></summary>

`memo` compares each prop with the previous one by reference. Look at every prop passed to `TaskCard` and ask: is this a brand-new value on every render of `Board`?

</details>
