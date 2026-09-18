# Lab 1.3 solution: Tip Calculator and Grade Checker

## How to run

Needs Node.js LTS (Node 24). From this folder:

```bash
node lab1-3.js
```

## Expected output

```text
Tip: R67.5
Total with tip: R517.5
Ayanda: Distinction
Sipho: Pass
Lerato: Try again
Kagiso: Pass
Passed: 3 of 4
```

Your student names and scores will be different, so your grades and pass count will be too. Check them by hand: 80 or more is a Distinction, 50 or more is a Pass. Kagiso's score of exactly 50 is there to prove the `>=` boundary works.

## What changed in this lab

- `calculateTip(bill, percent)` returns `bill * (percent / 100)`.
- `totalWithTip(bill, percent)` reuses `calculateTip` instead of repeating the maths.
- `getGrade(score)` uses `if / else if / else`, checking the highest grade first, and **returns** each grade.
- `students` is an array of 4 objects, each with a `name` and a `score`.
- A `for` loop runs from `i = 0` while `i < students.length` (not `<=`), logs each name with its grade, and counts every grade that `!==` `"Try again"`.

## Stretch challenge ideas (not part of the solution file)

- Average score: add up `students[i].score` in the loop, then divide by `students.length` (the average here is 60.75).
- Top student: keep track of the student with the highest score as you loop.
- Money to two decimal places: `calculateTip(450, 15).toFixed(2)` gives `"67.50"`.

Keep this file: on Day 2 you rewrite this loop with an array method.
