// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// Step 2: Make the function async
async function loadTodos(limit) {
  try {
    // Step 3: Fetch todos using the limit
    const res = await fetch(`${API}/todos?_limit=${limit}`);

    // Step 4: Check if the response was successful
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    // Parse the response body
    const todos = await res.json();

    // Step 6: Display numbered list with [done] or [open]
    const todoList = todos.map((todo, index) => {
      const status = todo.completed ? "[done]" : "[open]";
      return `${index + 1}. ${status} ${todo.title}`;
    });

    console.log(todoList.join("\n"));

    // Step 7: Count completed todos
    const completedCount = todos.filter(todo => todo.completed).length;

    console.log(`Completed: ${completedCount} of ${todos.length}`);

  } catch (err) {
    // Step 5: Friendly error message
    console.log(`Error loading todos: ${err.message}`);

  } finally {
    // Always runs
    console.log("Done loading");
  }
}

// Run the function
loadTodos(10);
