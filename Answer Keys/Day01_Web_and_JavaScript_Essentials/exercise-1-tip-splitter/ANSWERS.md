# Answers: Day 1, Exercise 1 (warm-up): Tip Splitter

Exercise folder: `Exercises/Day01_Web_and_JavaScript_Essentials/exercise-1-tip-splitter/`
Corrected code: `fixed/tip-splitter.js` (run `node fixed/tip-splitter.js`).

The exercise has **3 bugs**. Line numbers refer to the broken `tip-splitter.js`.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `tip-splitter.js`, lines 4–6 (`calculateTip`) | Every total prints `RNaN` | The function calculates `tip` but has no `return`, so it returns `undefined`; `bill + undefined` is `NaN` | Functions and `return`; Module 1.4 "Functions and scope" (Try it: remove the `return`), Lab 1.3 Troubleshooting |
| 2 | `tip-splitter.js`, line 15 (`describeLunch`) | Every lunch says `(no need to split)`, even the lunches for 3, 4 and 5 people; after bug 3 is fixed the final count is `0` | `=` assigns 1 to `lunch.people` (which is truthy), instead of comparing. It also overwrites the data, so the counting loop sees 1 person everywhere | Comparison with `===`; Module 1.4 "Decisions and repetition" |
| 3 | `tip-splitter.js`, line 34 (the `for` loop) | After the four lunches: `TypeError: Cannot read properties of undefined (reading 'bill')`, and the count line never prints | `i <= lunches.length` runs once more than there are items; `lunches[4]` is `undefined` | Arrays counted from 0 and loop conditions; Module 1.4 "Decisions and repetition", "Arrays and objects", "Debugging"; Lab 1.3 Troubleshooting |

## Fixes

**Bug 1: missing `return`**

```js
// Before
function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
}

// After
function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
  return tip;
}
```

**Bug 2: assignment instead of comparison**

```js
// Before
if (lunch.people = 1) {

// After
if (lunch.people === 1) {
```

**Bug 3: off-by-one loop condition**

```js
// Before
for (let i = 0; i <= lunches.length; i++) {

// After
for (let i = 0; i < lunches.length; i++) {
```

## Expected output once fixed

```text
Team lunch tip splitter
-----------------------
Corner Café: total R495, each pays R165
Pizza Palace: total R690, each pays R172.5
Sushi Bar: total R144 (no need to split)
Braai Spot: total R1100, each pays R220
Lunches split between more than one person: 3
```

## Debrief suggestion (5 minutes)

- Ask who started with the red error at the bottom. It is the only bug that names a line, which makes it the natural first fix; reinforce "read the whole error".
- Bug 2 is worth a minute: `=` inside `if` does not crash, it silently changes data. Point out the knock-on effect on the final count, and how `console.log(lunch)` after the `if` would have revealed it.
- Link bug 1 to Day 3: a component with braces and no `return` renders nothing, for exactly the same reason.
