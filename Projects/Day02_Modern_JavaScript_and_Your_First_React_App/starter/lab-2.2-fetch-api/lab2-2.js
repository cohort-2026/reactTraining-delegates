// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// TODO (step 2): make this an async function so you can use await inside it.
function loadTodos(limit) {
  // TODO (step 5): wrap the code below in try / catch / finally.
  //   catch:   log a friendly message with err.message (no crash)
  //   finally: log "Done loading"
  
const API = "https://jsonplaceholder.typicode.com";

// Step 2: Make the function async
async function loadTodos(limit) {
  try {
    // Step 3: Fetch todos using the limit
    const res = await fetch(`${API}/todos?_limit=${limit}`);

    // Step 4: Check if the request was successful
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    // Step 5: Convert the response into JavaScript data
    const todos = await res.json();

    // Step 6: Display a numbered list of todos
    const titles = todos.map((todo, index) => {
      const status = todo.completed ? "[done]" : "[open]";
      return `${index + 1}. ${status} ${todo.title}`;
    });

    titles.forEach(title => console.log(title));

    // Step 7: Count completed todos
    const completedTodos = todos.filter(todo => todo.completed);

    console.log(`Completed: ${completedTodos.length} of ${todos.length}`);

  } catch (err) {
    // Handle errors without crashing
    console.log(`Something went wrong: ${err.message}`);

  } finally {
    // Always runs at the end
    console.log("Done loading");
  }
}

// Call the function
loadTodos(10);

  // TODO (step 3): fetch `${API}/todos?_limit=10`, using limit in place of the 10.
  const res = await fetch(`${API}/todos?_limit=${limit}`);

  // TODO (step 4): if res.ok is false, throw a new Error that includes res.status.

  // TODO: parse the body with res.json() (it needs its own await).

  // TODO (step 6): log a numbered list of titles with a [done] or [open] marker,
  // using each to-do's completed and title properties, for example:
  //   1. [open] delectus aut autem
  // Hint: map gives you the index as the second callback argument.

  // TODO (step 7): use filter to count the completed to-dos and log
  const completedTodos = todos.filter(todo => todo.completed);
  //   Completed: 3 of 10
}

loadTodos(10);

// TODO (step 8): test the error path by changing todos to todoz in the URL.
// You should see your friendly error and "Done loading", not a crash.
// Change it back before you commit.
