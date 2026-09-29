// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// TODO (step 2): make this an async function so you can use await inside it.
function loadTodos(limit) {
  const API = "https://jsonplaceholder.typicode.com";

// Step 2: async so we can use await inside
async function loadTodos(limit) {
  // Step 5: try / catch / finally
  try {
    // Step 3: fetch with limit in place of the 10
    const res = await fetch(`${API}/todos?_limit=${limit}`);

    // Step 4: fetch only rejects on network failure, so check res.ok ourselves
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    // Parse the body (needs its own await)
    const todos = await res.json();

    // Step 6: numbered list with [done] / [open] markers
    todos.forEach((todo, index) => {
      const marker = todo.completed ? "[done]" : "[open]";
      console.log(`${index + 1}. ${marker} ${todo.title}`);
    });

    // Step 7: count completed with filter
    const completedCount = todos.filter((todo) => todo.completed).length;
    console.log(`Completed: ${completedCount} of ${todos.length}`);
  } catch (err) {
    console.log(`Sorry, could not load your to-dos: ${err.message}`);
  } finally {
    console.log("Done loading");
  }
}

loadTodos(10);

// Step 8: to test the error path, change the URL to `${API}/todoz?_limit=${limit}`.
// You should see "Sorry, could not load your to-dos: Request failed with status 404"
// followed by "Done loading". Change it back before you commit.
  // TODO (step 5): wrap the code below in try / catch / finally.
  //   catch:   log a friendly message with err.message (no crash)
  //   finally: log "Done loading"

  // TODO (step 3): fetch `${API}/todos?_limit=10`, using limit in place of the 10.

  // TODO (step 4): if res.ok is false, throw a new Error that includes res.status.

  // TODO: parse the body with res.json() (it needs its own await).

  // TODO (step 6): log a numbered list of titles with a [done] or [open] marker,
  // using each to-do's completed and title properties, for example:
  //   1. [open] delectus aut autem
  // Hint: map gives you the index as the second callback argument.

  // TODO (step 7): use filter to count the completed to-dos and log
  //   Completed: 3 of 10
}

loadTodos(10);

// TODO (step 8): test the error path by changing todos to todoz in the URL.
// You should see your friendly error and "Done loading", not a crash.
// Change it back before you commit.
