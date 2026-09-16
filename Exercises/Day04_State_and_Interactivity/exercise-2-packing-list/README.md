# Day 4, Exercise 2 (harder): Holiday Packing List

## The scenario

A friend is building a packing list app for their holiday. They followed the Day 4 patterns (state lifted into `App`, a controlled form, handlers passed down as props, derived totals), but the app behaves strangely: items do not appear when added, ticks do not stick, and the totals drift out of step. Nothing crashes, which makes these bugs harder to spot. Your job is to find and fix them.

**This exercise contains 4 bugs.**

## What the app should do

The app starts with three items: **Passport** (packed), **Phone charger** and **Sun cream**.

- [ ] The summary line shows how many items are packed out of the total, starting with `1 of 3 packed`.
- [ ] Typing a name and clicking **Add** (or pressing Enter) adds the item to the bottom of the list **straight away**, clears the input and updates the summary (`1 of 4 packed`).
- [ ] Submitting a blank name shows the message "Type the name of an item first." and adds nothing.
- [ ] Ticking an item's checkbox marks it packed (crossed out) and updates the summary. Unticking it marks it unpacked again.
- [ ] **Delete** removes that item and updates the summary (for example `1 of 2 packed`).
- [ ] Ticking **Hide packed items** hides every packed item. Unticking it shows them again.
- [ ] There are no errors or warnings in the browser Console.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173). |
| `npm test` | Runs the automated checks. They re-run every time you save; press `q` to quit. All 7 tests pass when the app is fixed. |
| `npm run lint` | Runs ESLint. It reports no problems when the app is fixed. |

Try every item in the checklist above in the browser before you read the code. Write down what actually happens for each one. Then use React DevTools (**Components** tab) to watch `App`'s `items` state while you click.

## Revise these handbook sections

Day 4 handbook:

- Module 4.1: "State is a snapshot: use updater functions"
- Module 4.3: "Selects, checkboxes and one state object" (checkboxes)
- Module 4.4: "Updating arrays of objects immutably", "Updating nested objects" and "Derived state: calculate, do not store"
- Lab 4.2 and Lab 4.3 Troubleshooting tables

## Hints

<details><summary>Hint 1</summary>

When you add an item, the input clears but the item does not appear. Then tick any checkbox, and the "missing" item suddenly shows up. React only re-renders when you give a setter a *different* value. Did `App` get a new array, or the same array with something pushed into it?

</details>

<details><summary>Hint 2</summary>

Clicking a checkbox seems to do nothing at all. `main.jsx` wraps the app in `<StrictMode>`, which calls updater functions **twice** in development to expose code that changes existing objects. What happens if you flip the same `packed` property twice?

</details>

<details><summary>Hint 3</summary>

Watch the second number in the summary as you add and delete: where does it come from, and is it calculated on every render? Also add a `console.log` to the **Hide packed items** handler and look at exactly what it stores when you tick and untick.

</details>
