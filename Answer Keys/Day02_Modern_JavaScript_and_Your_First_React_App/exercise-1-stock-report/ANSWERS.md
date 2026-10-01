# Answers: Day 2, Exercise 1 (warm-up): Stock Report

Exercise folder: `Exercises/Day02_Modern_JavaScript_and_Your_First_React_App/exercise-1-stock-report/`
Corrected code: `fixed/stock-report.js` (run `node fixed/stock-report.js`).

The exercise has **3 bugs**. Line numbers refer to the broken `stock-report.js`. The script never throws, so delegates must compare output.

Output of the broken script:

```text
Names: , , , , , 
In stock under R500: Wireless mouse (R250), USB-C cable (R120), JavaScript notebook (R90), Desk lamp (R450)
Product 4: JavaScript notebook costs R90
Value of stock on hand: R[object Object]12090450
Out of stock after update: 2, 3, 6
Products left after removing 5: 5
Cheapest: JavaScript notebook
Most expensive: Noise-cancelling headphones
Original ids in order: 4, 2, 1, 5, 6, 3
Original product 2 in stock: true
Original product count: 6
```

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `stock-report.js`, lines 14–16 | `Names: , , , , , ` (only commas) | The arrow function has braces but no `return`, so `map` produces six `undefined`s, which `join` turns into empty strings | Implicit return; Module 2.1 "Arrow functions and template literals" (Watch for the trap), Lab 2.1 Troubleshooting |
| 2 | `stock-report.js`, line 32 | `Value of stock on hand: R[object Object]12090450` instead of `R910` | `reduce` has no starting value, so the first product object becomes the accumulator; object + number becomes string concatenation | `reduce` starting value; Module 2.2 "reduce and chaining" (Always pass a starting value), Lab 2.1 Troubleshooting |
| 3 | `stock-report.js`, line 45 | `Original ids in order: 4, 2, 1, 5, 6, 3` instead of `1, 2, 3, 4, 5, 6` | `sort` sorts the array in place, so `products` itself is reordered; `byPrice` is the same array, not a copy | Immutability; Module 2.2 "reduce and chaining" (Be careful with `sort`) and "Immutability: copy, do not change" |

## Fixes

**Bug 1: braces without `return`**

```js
// Before
const names = products.map((p) => {
  p.name;
});

// After
const names = products.map((p) => p.name);
```

(Keeping the braces and adding `return p.name;` is equally correct.)

**Bug 2: missing starting value**

```js
// Before
  .reduce((sum, p) => sum + p.price);

// After
  .reduce((sum, p) => sum + p.price, 0);
```

**Bug 3: sorting the original**

```js
// Before
const byPrice = products.sort((a, b) => a.price - b.price);

// After
const byPrice = [...products].sort((a, b) => a.price - b.price);
```

(`products.toSorted((a, b) => a.price - b.price)` is also correct.)

## Expected output once fixed

```text
Names: Wireless mouse, USB-C cable, Noise-cancelling headphones, JavaScript notebook, Desk lamp, Mechanical keyboard
In stock under R500: Wireless mouse (R250), USB-C cable (R120), JavaScript notebook (R90), Desk lamp (R450)
Product 4: JavaScript notebook costs R90
Value of stock on hand: R910
Out of stock after update: 2, 3, 6
Products left after removing 5: 5
Cheapest: JavaScript notebook
Most expensive: Noise-cancelling headphones
Original ids in order: 1, 2, 3, 4, 5, 6
Original product 2 in stock: true
Original product count: 6
```

## Debrief suggestion (5 minutes)

- Bug 3 is the important one for React. Ask why the cheapest and most expensive lines were still correct: the sort "worked", it just also changed the data everyone else was using. Connect it to "React needs a new printout" and Day 4 state updates.
- Point out that steps 5 and 6 (map with spread, filter) were already immutable, and that is why the "product 2 in stock" and "product count" checks passed.
- Bug 1 returns in Day 3 as "my list renders nothing".
