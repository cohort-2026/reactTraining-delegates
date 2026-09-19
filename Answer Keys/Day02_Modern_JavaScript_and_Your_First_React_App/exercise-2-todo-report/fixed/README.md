# Day 2, Exercise 2 (harder): To-do Report

## The scenario

Your team is building a dashboard that loads to-dos and team members from a web API. Before any React is written, a colleague prototyped the data loading in plain JavaScript with `fetch` and `async`/`await`. The script runs to the end, but most sections print the wrong thing. Fix it.

So that you do not need an internet connection, the script imports `fetch` from `fake-api.js`, a stand-in for JSONPlaceholder. It returns real `Response` objects, so `res.ok`, `res.status` and `res.json()` work exactly as they do with the real `fetch`. **There are no bugs in `fake-api.js`; only change `todo-report.js`.**

**This exercise contains 5 bugs.**

## What the code should do

The API has six to-dos (ids 1 to 6) and two users (ids 1 and 2). Some to-dos have `points: 0` (a tiny job) and one has `points: null` (not estimated yet). One user has `address: null`. There is no to-do with id 99, so the API answers that request with **404 Not Found**.

The script should:

- **To-do list:** print a numbered list with a `[done]` or `[open]` marker, and always print `Finished loading to-dos`.
- **Single to-dos:** print each to-do with its points. Show `0` when the points are 0, and `not estimated` only when there are no points. A to-do that does not exist must print a friendly error message, not `undefined`.
- **Team:** print where each user lives, or `Unknown` when a user has no address, without crashing.
- **Progress:** print how many of the to-dos are completed.

When the code is fixed, the output is exactly:

```text
=== To-do list ===
1. [done] Set up project
2. [open] Fix typo in README
3. [open] Build task list
4. [done] Design login page
5. [open] Add search box
6. [open] Write tests
Finished loading to-dos
=== Single to-dos ===
To-do 2: Fix typo in README (points: 0)
To-do 5: Add search box (points: not estimated)
Could not load to-do 99: Request failed: 404
=== Team ===
Lerato lives in Johannesburg
Kagiso lives in Unknown
=== Progress ===
Completed: 2 of 6
```

## How to run it

Open a terminal in this folder and run either of these:

```bash
node todo-report.js
```

```bash
npm start
```

There is nothing to install. The `package.json` only sets `"type": "module"` so that `import` works, and adds the `start` shortcut.

## Revise these handbook sections

Day 2 handbook:

- Module 2.1: Destructuring; Optional chaining and nullish coalescing
- Module 2.3: Promises and async/await with fetch; Handling errors properly
- Lab 2.2 and its Troubleshooting table

## Hints

<details><summary>Hint 1</summary>

Something "is not a function", or a value prints as `undefined`, right after an async call? Ask yourself whether you have the value yet, or only the promise of one. Every promise needs an `await`.

</details>

<details><summary>Hint 2</summary>

`fetch` is happy with a 404. It is your job to check the response before you read the body.

</details>

<details><summary>Hint 3</summary>

Two sections print the wrong thing for "missing" data. Remember the difference between `||` and `??`, and that `??` on its own cannot stop a crash when something earlier in the chain is `null`.

</details>
