# Day 7 · Exercise 1 (warm-up): Theme context and task reducer

## Scenario

A teammate started moving a small TaskBoard to today's patterns: a `ThemeContext` with a `useTheme` Hook for the light/dark theme, and a `tasksReducer` used with `useReducer` for the tasks. It compiles in their head, but not on screen: the page is blank, and they are sure it "nearly worked". Your job is to find and fix the mistakes.

## What the app should do

- [ ] The header shows **TaskBoard** and a **Theme: light** button. Clicking it switches to **Theme: dark**, and the `data-theme` attribute on `<html>` changes to `dark` (the page turns dark).
- [ ] Typing a title in **New task** and clicking **Add** puts the task in the **To do** column.
- [ ] Clicking **Done** on a task moves it to the **Done** column straight away.
- [ ] Clicking **Delete** on a task removes it.
- [ ] `npm run typecheck` and `npm run lint` report no errors.

## How to run it

```bash
npm install
npm test -- --run
```

Also useful:

```bash
npm run typecheck   # TypeScript errors
npm run dev         # open the app in the browser (Ctrl+C to stop)
```

The tests describe the behaviour above. They fail now and should all pass once you have fixed the code. Do not change the test file.

**This exercise contains 3 bugs.**

## Revise these handbook sections

Day 7 handbook (`Markdown Handbooks/Day07_Delegate_Handbook_State_Management_and_Server_State.md`):

- Module 7.1: *Creating and providing context* and *Consuming context with a custom Hook*
- Lab 7.1: *Troubleshooting*
- Module 7.2: *A reducer function* and *Using useReducer*
- Day 4: updating arrays in state without mutating them

<details><summary><strong>Hint 1</strong></summary>

Read the first error message carefully. It was written by someone on your team, and it tells you exactly which rule was broken. Then look at where each component sits in the tree in `App.tsx`.

</details>

<details><summary><strong>Hint 2</strong></summary>

In the browser, click **Done**, then type one letter in the **New task** box. If the card suddenly jumps column only when something *else* re-renders, ask yourself how React decides whether the reducer returned new state.

</details>

<details><summary><strong>Hint 3</strong></summary>

Run `npm run typecheck`. A discriminated union lets TypeScript catch a mistake the browser would only show as a crash.

</details>
