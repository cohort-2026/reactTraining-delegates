# Lab 2.2 starter: Fetch and Display Data from a Public API

**Goal:** load real data asynchronously and handle errors. **Suggested time:** 40 min.

## What is here

`lab2-2.js` with the API base URL, an empty `loadTodos(limit)` function and the call to it, plus TODO comments numbered to match the steps in your Day 2 handbook (**Lab 2.2**).

## How to use it

1. Copy `lab2-2.js` into your `react-course/day2` folder (this is step 1).
2. Run it to check Node is working. It prints nothing yet:

   ```bash
   node lab2-2.js
   ```

3. Work through the TODOs, running the file after each one. You need an internet connection; if the request is blocked, open `https://jsonplaceholder.typicode.com/todos?_limit=10` in your browser to check.
4. Test the error path (step 8), change the URL back, then commit:

   ```bash
   git add .
   git commit -m "Fetch and list todos from JSONPlaceholder"
   ```

No `package.json` is needed: Node has `fetch` built in, and this file does not use `import` or `export`.

## Done when

- [ ] Ten titles print with status markers
- [ ] A wrong URL prints a friendly error, not a crash
- [ ] The `finally` message always prints

The expected output shape is in the handbook hints. The finished example is in `../../solution/lab-2.2-fetch-api/`.
