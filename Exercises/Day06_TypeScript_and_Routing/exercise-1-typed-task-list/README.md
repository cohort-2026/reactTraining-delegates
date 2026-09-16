# Day 6, Exercise 1 (warm-up): Sprint Task List in TypeScript

## The scenario

A teammate started converting a small sprint task list to TypeScript, using the Vite `react-ts` template (which switches on strict checking, `verbatimModuleSyntax` and `erasableSyntaxOnly`). They say "it mostly works", but the page is blank in the browser and `npm run build` refuses to finish. Your job is to get the project to **zero type errors** and working again, without using `any`.

**This exercise contains 3 bugs.**

## What the app should do

- [ ] The page opens with "No tasks yet." and `0 of 0 done`.
- [ ] Filling in **Title** (and optionally **Assignee**) and clicking **Add task** adds the task to the list.
- [ ] Each task shows its title and `Owner:` followed by the assignee's first name (`Owner: Thabo` for "Thabo Mokoena"), or `Owner: Unassigned` when no assignee was typed.
- [ ] After adding, both boxes are cleared and the cursor goes back to **Title**.
- [ ] Changing a task's status dropdown to **Done** updates the count, for example `1 of 2 done`.
- [ ] `npm run typecheck` reports no errors, and `npm run build` succeeds.
- [ ] There are no errors in the browser Console.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run typecheck` | Runs the TypeScript compiler in check-only mode (`tsc -b`) and lists every type error with its file, line and error code. **Start here.** It prints nothing when there are no errors. |
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173) with the DevTools Console open. |
| `npm test` | Runs the automated behaviour checks. They re-run every time you save; press `q` to quit. All 5 tests pass when the app is fixed. Note: the tests do not check types, so they can pass while the type checker still fails. |
| `npm run build` | Type-checks, then builds for production. It succeeds when the app is fixed. |
| `npm run lint` | Runs ESLint. It reports no problems. |

> **Tip:** VS Code shows the same errors as red underlines. Open the **Problems** panel (Ctrl+Shift+M on Windows, Cmd+Shift+M on macOS) and hover over each underline to read the full message.

## Revise these handbook sections

Day 6 handbook:

- Module 6.1: "Object types, unions and optional fields" and "Generics: types with parameters" (including its Troubleshooting callout)
- Module 6.2: "Moving TaskBoard to TypeScript" (the `verbatimModuleSyntax` Troubleshooting callout) and "Typing state, events and refs"
- Lab 6.1 Troubleshooting table

## Hints

<details><summary>Hint 1</summary>

Many of the errors are knock-on effects of one mistake. Fix the errors in the order `tsc` lists them, and run `npm run typecheck` again after each fix: the list gets much shorter.

</details>

<details><summary>Hint 2</summary>

Look for the word `never` in the messages. What type does TypeScript give an empty array when you do not tell it what will go in it?

</details>

<details><summary>Hint 3</summary>

`assignee?: string` means the property might not be there. What is its type when it is missing, and what happens when you call a string method on that?

</details>
