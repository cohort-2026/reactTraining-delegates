# Answers: Day 4, Exercise 2 (harder): Holiday Packing List

Exercise folder: `Exercises/Day04_State_and_Interactivity/exercise-2-packing-list/`
Corrected project: `fixed/` (run `npm install`, then `npm run dev`, `npm test -- --run`, `npm run lint`).

The exercise has **4 bugs**: three in `src/App.jsx` and one in `src/components/Summary.jsx`. Line numbers refer to the broken files. Nothing crashes and ESLint reports nothing, so delegates must reason from behaviour, React DevTools and the tests.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `App.jsx`, lines 13–14 (`handleAdd`) | Clicking **Add** clears the input but the item does not appear. It appears later, as soon as something else re-renders `App` (for example ticking a checkbox). Test "adds new items to the list straight away…" fails (`Unable to find an element with the text: Swimming costume`) | `items.push(...)` mutates the existing state array, then `setItems(items)` passes the **same** array. React compares the old and new values with `Object.is`, sees no change and skips the re-render | Never `push` into state; add with spread. Module 4.4 "Updating arrays of objects immutably" ("Why not `tasks.push(newTask)` then `setTasks(tasks)`?") |
| 2 | `App.jsx`, lines 19–24 (`handleToggle`) | Ticking or unticking any item appears to do nothing: the checkbox never changes and the summary stays the same. Tests "ticks an item…" and "unticks a packed item" fail (`expect(element).toBeChecked()`) | `item.packed = !item.packed` changes the existing object in place. `map` returns a new array, but it holds the same, mutated objects. In development `<StrictMode>` calls updater functions twice, so the property is flipped twice and ends where it started. (In a production build it would appear to work, which is exactly why StrictMode surfaces it) | Update with `map` **and** copy the matching item with spread. Module 4.4 "Updating arrays of objects immutably" and "Updating nested objects"; Module 4.1 "State is a snapshot: use updater functions" |
| 3 | `Summary.jsx`, line 4 | The total in the summary never changes: after deleting Sun cream it still says `1 of 3 packed`; after adding (once bug 1 is fixed) it still says `of 3`. The packed count does change. Tests "deletes an item and updates the totals" and "adds new items…" fail | `useState(items.length)` copies a prop into state. The initial value is only read on the first render, so later changes from the parent are ignored. The total is derived data and should be calculated during render | Derived state: calculate, do not store; do not copy props into state. Module 4.4 "Derived state: calculate, do not store"; Lab 4.2 Troubleshooting ("Totals wrong after an update") |
| 4 | `App.jsx`, line 46 (Hide packed items checkbox) | Ticking **Hide packed items** works, but it can never be unticked, so packed items stay hidden. Test "hides packed items and shows them again" fails on the second click | `e.target.value` for a checkbox is the string `"on"`, whether it is ticked or not. `hidePacked` becomes `"on"` (truthy) and stays `"on"` | Checkboxes use `checked`, not `value`. Module 4.3 "Selects, checkboxes and one state object" |

**How the bugs interact.** Fixing bug 1 alone does not make the "adds new items" test pass: it then fails on `1 of 4 packed` because of bug 3. Each other test fails for exactly one bug. With all four fixed, all 7 tests pass.

## Fixes

**Bug 1: mutating the array with `push`**

```jsx
// Before
function handleAdd(name) {
  const id = crypto.randomUUID();
  items.push({ id, name, packed: false });
  setItems(items);
}

// After
function handleAdd(name) {
  const id = crypto.randomUUID();
  setItems((prev) => [...prev, { id, name, packed: false }]);
}
```

**Bug 2: mutating an object inside `map`**

```jsx
// Before
setItems((prev) =>
  prev.map((item) => {
    if (item.id === id) {
      item.packed = !item.packed;
    }
    return item;
  })
);

// After
setItems((prev) =>
  prev.map((item) =>
    item.id === id ? { ...item, packed: !item.packed } : item
  )
);
```

**Bug 3: a prop copied into state**

```jsx
// Before
import { useState } from "react";

function Summary({ items }) {
  const [total] = useState(items.length);
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <p className="summary">
      {packedCount} of {total} packed
    </p>
  );
}

// After
function Summary({ items }) {
  const packedCount = items.filter((item) => item.packed).length;

  return (
    <p className="summary">
      {packedCount} of {items.length} packed
    </p>
  );
}
```

**Bug 4: reading `value` from a checkbox**

```jsx
// Before
onChange={(e) => setHidePacked(e.target.value)}

// After
onChange={(e) => setHidePacked(e.target.checked)}
```

## Debrief suggestion (10 minutes)

- Ask who used React DevTools. For bug 1, the `items` state *does* contain the new item in DevTools, yet the screen does not show it. That is the clearest possible demonstration of "same array, no re-render".
- Bug 2 is the one most people get stuck on. Temporarily remove `<StrictMode>` from `main.jsx`: the checkbox now "works". Put it back and ask why StrictMode is doing us a favour. Then show that the mutated object is still shared with the original `items` data, which is how mutation leaks into other components.
- For bug 3, ask the room which values in this app are really state (`items`, `hidePacked`) and which are derived (the packed count, the total, `visibleItems`). Link to the Day 4 knowledge check: "TaskBoard shows 3 of 8 done. Which values are state?"
- Bug 4: `console.log(e.target.value)` inside the checkbox handler makes it obvious in seconds. Remind delegates that radio buttons *do* use `value`, which is why the two are easy to confuse.
- Close with the rule of thumb from Module 4.4: add with spread, update with `map` plus spread, delete with `filter`, and never `push`, `splice` or assign in place.
