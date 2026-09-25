# Lab 2.2 solution: Fetch and Display Data from a Public API

Loads to-dos from JSONPlaceholder, a free fake API, and processes them with the array methods from Lab 2.1.

## How to run

Needs Node.js LTS (Node 24) and an internet connection. From this folder:

```bash
node lab2-2.js
```

No `package.json` or `npm install` is needed: Node has `fetch` built in, and the file does not use `import` or `export`.

## Expected output

```text
1. [open] delectus aut autem
2. [open] quis ut nam facilis et officia qui
3. [open] fugiat veniam minus
4. [done] et porro tempora
5. [open] laboriosam mollitia et enim quasi adipisci quia provident illum
6. [open] qui ullam ratione quibusdam voluptatem quia omnis
7. [open] illo expedita consequatur quia in
8. [done] quo adipisci enim quam ut ab
9. [open] molestiae perspiciatis ipsa
10. [done] illo est ratione doloremque quia maiores aut
Completed: 3 of 10
Done loading
```

## Testing the error path (step 8)

Change `todos` to `todoz` in the URL and run the file again. JSONPlaceholder answers with 404 Not Found, which `fetch` does **not** treat as a failure, so the `res.ok` check throws the error:

```text
Could not load todos: Request failed: 404
Done loading
```

If there is no network at all (or the host name is wrong), `fetch` itself rejects and you see:

```text
Could not load todos: fetch failed
Done loading
```

Either way there is no crash, and `Done loading` from `finally` always prints. Change `todoz` back to `todos` before you commit.

## What changed in this lab

- `async function loadTodos(limit)` uses `await fetch(...)`, with `limit` in the URL via a template literal: `` `${API}/todos?_limit=${limit}` ``.
- `if (!res.ok)` throws `new Error(`Request failed: ${res.status}`)`, because `fetch` only rejects when the request itself fails.
- `await res.json()` parses the body: the second `await`.
- `try` / `catch` / `finally` wraps everything: `catch` prints a friendly message using `err.message`, and `finally` prints `Done loading` whatever happens.
- `todos.map((t, i) => ...)` builds the numbered list, adding 1 to the zero-based index, with a ternary for the `[done]` / `[open]` marker.
- `todos.filter((t) => t.completed).length` counts the completed to-dos.

## Stretch challenge ideas (not part of the solution file)

- Fetch one user's to-dos: `` `${API}/todos?userId=${userId}` ``.
- Log `Loading todos...` before the `fetch`.
- Time the request: `const start = Date.now();` before the `fetch`, then log `` `Took ${Date.now() - start} ms` `` in `finally`.
