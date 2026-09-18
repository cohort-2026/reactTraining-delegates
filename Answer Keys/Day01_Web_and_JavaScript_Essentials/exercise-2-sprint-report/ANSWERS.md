# Answers: Day 1, Exercise 2 (harder): Sprint Report

Exercise folder: `Exercises/Day01_Web_and_JavaScript_Essentials/exercise-2-sprint-report/`
Corrected code: `fixed/sprint-report.js` (run `node fixed/sprint-report.js`).

The exercise has **5 bugs**. Line numbers refer to the broken `sprint-report.js`. Each bug has its own visible symptom in the first run; only bug 5 stops the script, and it is the last thing the script does.

Output of the broken script:

```text
Sprint report
=============
Sprint 11: 4 of 5 tasks done (80%) - On track
Sprint 12: 1 of 4 tasks done (25%) - Behind
Task 3: not found
Task 6: Fix typo in footer (undefined)
TypeError: Assignment to constant variable.
```

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `sprint-report.js`, line 28 (`countDone`) | `Sprint 12: 1 of 4 tasks done (25%) - Behind` instead of 2 of 4 (50%), On track | The loop starts at `i = 1`, so the first task of each sprint is skipped. Sprint 11's first task is not done, so its count happens to look right | Arrays are counted from 0; Module 1.4 "Arrays and objects", "Decisions and repetition" |
| 2 | `sprint-report.js`, lines 37–41 (`getStatus`) | `Sprint 11: ... (80%) - On track` instead of `Ahead`; `Ahead` can never appear | Conditions are checked top to bottom and the first true one wins. `percent >= 50` is also true for 80, so the `>= 80` branch is unreachable | `if / else if / else` order; Module 1.4 "Decisions and repetition" |
| 3 | `sprint-report.js`, lines 50–52 (`findTask`) | `Task 3: not found`, although task 3 is in Sprint 11 (task 6 is found only because it is first in its sprint) | The `else { return null; }` inside the loop ends the function on the first task that does not match, so only the first item is ever checked | What `return` does inside a loop; Module 1.4 "Functions and scope" |
| 4 | `sprint-report.js`, line 58 (`describeTask`) | `Task 6: Fix typo in footer (undefined)` | Misspelled property `task.assigne`; reading a property that does not exist gives `undefined` (no error) | Objects and dot notation; Module 1.4 "Arrays and objects", Lab 1.3 Troubleshooting (misspelled property) |
| 5 | `sprint-report.js`, line 71 (`totalPoints`), error reported on line 73 | `TypeError: Assignment to constant variable.` pointing at line 73; the total line never prints | `total` is declared with `const` but is reassigned on every loop | `const` versus `let`; Module 1.4 "Variables and data types" (Try it: `days = 11`), "Debugging" |

## Fixes

**Bug 1: loop starts at 1**

```js
// Before
for (let i = 1; i < tasks.length; i++) {

// After
for (let i = 0; i < tasks.length; i++) {
```

**Bug 2: conditions in the wrong order**

```js
// Before
if (percent >= 50) {
  return "On track";
} else if (percent >= 80) {
  return "Ahead";
} else {
  return "Behind";
}

// After
if (percent >= 80) {
  return "Ahead";
} else if (percent >= 50) {
  return "On track";
} else {
  return "Behind";
}
```

**Bug 3: returning too early from the loop**

```js
// Before
for (let i = 0; i < tasks.length; i++) {
  if (tasks[i].id === id) {
    return tasks[i];
  } else {
    return null;
  }
}
return null;

// After
for (let i = 0; i < tasks.length; i++) {
  if (tasks[i].id === id) {
    return tasks[i];
  }
}
return null;
```

**Bug 4: misspelled property**

```js
// Before
return task.title + " (" + task.assigne + ")";

// After
return task.title + " (" + task.assignee + ")";
```

**Bug 5: `const` reassigned**

```js
// Before
const total = 0;

// After
let total = 0;
```

## Expected output once fixed

```text
Sprint report
=============
Sprint 11: 4 of 5 tasks done (80%) - Ahead
Sprint 12: 2 of 4 tasks done (50%) - On track
Task 3: Design login page (Naledi)
Task 6: Fix typo in footer (Naledi)
Total points across all sprints: 36
```

## Debrief suggestion (10 minutes)

- Only one bug throws an error. The other four produce plausible but wrong output. Ask: "How did you know Sprint 12 was wrong?" The answer should be "I checked the data myself", which is the habit to reward.
- Bugs 1 and 3 each hide depending on the data: Sprint 11's count is right by luck, and task 6 is found by luck. Discuss choosing test data that would expose a bug (for example looking up the last task, not the first).
- Bug 4 connects to Day 2: optional chaining and defaults do not help with a typo; `undefined` in output is a signal to compare property names against the data.
- Tomorrow's array methods (`filter(...).length`, `find`, `reduce`) remove bugs 1, 3 and 5 entirely; mention it as a teaser.
