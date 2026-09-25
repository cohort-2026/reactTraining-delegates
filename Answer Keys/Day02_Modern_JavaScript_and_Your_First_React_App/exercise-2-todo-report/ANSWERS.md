# Answers: Day 2, Exercise 2 (harder): To-do Report

Exercise folder: `Exercises/Day02_Modern_JavaScript_and_Your_First_React_App/exercise-2-todo-report/`
Corrected code: `fixed/` (run `node todo-report.js` or `npm start` inside it). `fake-api.js` and `package.json` are unchanged.

The exercise has **5 bugs**, all in `todo-report.js`. Line numbers refer to the broken file. Every bug is visible in the first run; none of them hides another.

Output of the broken script:

```text
=== To-do list ===
Could not load to-dos: todos.map is not a function
Finished loading to-dos
=== Single to-dos ===
To-do 2: Fix typo in README (points: not estimated)
To-do 5: Add search box (points: not estimated)
To-do 99: undefined (points: not estimated)
=== Team ===
Lerato lives in Johannesburg
Could not load user 2: Cannot read properties of null (reading 'city')
=== Progress ===
Completed: undefined of undefined
```

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `todo-report.js`, line 14 (`loadTodos`) | `Could not load to-dos: todos.map is not a function`; no list | `res.json()` is async; without `await`, `todos` is a Promise, which has no `map` | "`res.json()` is also async"; Module 2.3 "Promises and async/await with fetch" |
| 2 | `todo-report.js`, lines 29–30 (`getTodo`) | `To-do 99: undefined (points: not estimated)` instead of `Could not load to-do 99: Request failed: 404` | No `res.ok` check. `fetch` does not reject on 404, so the empty error body `{}` is treated as a real to-do | "`fetch` does not reject on 404 or 500"; Module 2.3 "Handling errors properly" (Check your understanding) |
| 3 | `todo-report.js`, line 31 (`getTodo`) | `To-do 2: ... (points: not estimated)` instead of `(points: 0)` | `\|\|` treats `0` as missing; only `null`/`undefined` should get the fallback | `\|\|` versus `??`; Module 2.1 "Optional chaining and nullish coalescing" |
| 4 | `todo-report.js`, line 45 (`loadUser`) | `Could not load user 2: Cannot read properties of null (reading 'city')` instead of `Kagiso lives in Unknown` | `user.address` is `null`; `??` only supplies a fallback after the whole chain has been evaluated, so reading `.city` of `null` throws first | Optional chaining `?.`; Module 2.1 "Optional chaining and nullish coalescing" (the `user.address?.city ?? "Unknown"` example) |
| 5 | `todo-report.js`, line 73 (`main`) | `Completed: undefined of undefined` instead of `Completed: 2 of 6` | `getProgress` is async and always returns a promise; destructuring a Promise without `await` gives `undefined` for both names | "An async function always returns a promise"; Module 2.3, Lab 2.2 Troubleshooting (`Promise { <pending> }`) |

## Fixes

**Bug 1: missing `await` on `res.json()`**

```js
// Before
const todos = res.json();

// After
const todos = await res.json();
```

**Bug 2: missing `res.ok` check**

```js
// Before
const res = await fetch(`${API}/todos/${id}`);
const todo = await res.json();

// After
const res = await fetch(`${API}/todos/${id}`);
if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`);
}
const todo = await res.json();
```

**Bug 3: `||` instead of `??`**

```js
// Before
const points = todo.points || "not estimated";

// After
const points = todo.points ?? "not estimated";
```

**Bug 4: missing optional chaining**

```js
// Before
const city = user.address.city ?? "Unknown";

// After
const city = user.address?.city ?? "Unknown";
```

**Bug 5: missing `await` on an async function call**

```js
// Before
const { completed, total } = getProgress(6);

// After
const { completed, total } = await getProgress(6);
```

## Expected output once fixed

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

## Notes for the trainer

- `fake-api.js` exports a function named `fetch` that shadows the global one inside `todo-report.js` only. It uses Node's built-in `Response`, so the behaviour (`ok`, `status`, async `json()`) is the real thing. Delegates who want to try the real API can delete the `import` line: the output is then different and several bugs no longer show, because JSONPlaceholder's to-dos have no `points`, to-do 99 exists there, and all its users have addresses.
- The folder's `package.json` sets `"type": "module"`, which avoids the "module type is not specified" warning and the CommonJS error described in the Module 2.2 troubleshooting table.

## Debrief suggestion (10 minutes)

- Group the bugs: two are "forgot `await`" (1 and 5), one is "trusted `fetch`" (2), two are "missing data" (3 and 4). Ask which group would have been hardest to spot in a real UI. Bug 2 is usually the answer, because nothing looks broken.
- Bug 5 has no error at all. Discuss how `console.log(getProgress(6))` would have shown `Promise { <pending> }` straight away.
- Connect to Day 5: loading, success and error states in a component depend on exactly these checks.
