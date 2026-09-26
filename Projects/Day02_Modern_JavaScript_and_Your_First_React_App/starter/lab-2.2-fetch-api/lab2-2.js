// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// TODO (step 2): make this an async function so you can use await inside it.
async function loadTodos(limit) {
  // TODO (step 5): wrap the code below in try / catch / finally.
  //   catch:   log a friendly message with err.message (no crash)
  //   finally: log "Done loading"

  // TODO (step 3): fetch `${API}/todos?_limit=10`, using limit in place of the 10.
const res = await fetch(`${API}/todos?_limit=${limit}`);
  // TODO (step 4): if res.ok is false, throw a new Error that includes res.status.
if (!res.ok) {
  throw new Error(`Failed: ${res.status}`)
}
  // TODO: parse the body with res.json() (it needs its own await).
const data = await res.json();
data.forEach((todo, i) => {
  console.log(`${i+1}. [${todo.completed ?
    'done' : 'open'}] ${todo.title}`);
});
  // TODO (step 6): log a numbered list of titles with a [done] or [open] marker,
  // using each to-do's completed and title properties, for example:
  //   1. [open] delectus aut autem
  // Hint: map gives you the index as the second callback argument.

  const done = data.filter(todo =>
    todo.completed).length;
    console.log(`Completed: ${done} of ${data.length}`);
    // TODO (step 7): use filter to count the completed to-dos and log
  //   Completed: 3 of 10
}

loadTodos(10);

// TODO (step 8): test the error path by changing todos to todoz in the URL.
// You should see your friendly error and "Done loading", not a crash.
// Change it back before you commit.
