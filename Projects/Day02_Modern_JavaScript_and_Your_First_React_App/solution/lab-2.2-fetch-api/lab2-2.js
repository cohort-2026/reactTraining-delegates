// Lab 2.2: Fetch and Display Data from a Public API
// Run with: node lab2-2.js
// Node has fetch built in, so nothing needs installing.

const API = "https://jsonplaceholder.typicode.com";

// Steps 2 to 7
async function loadTodos(limit) {
  try {
    const res = await fetch(`${API}/todos?_limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const todos = await res.json();

    // Step 6: numbered list with a done or open marker
    const lines = todos.map(
      (t, i) => `${i + 1}. [${t.completed ? "done" : "open"}] ${t.title}`
    );
    console.log(lines.join("\n"));

    // Step 7: count the completed to-dos with filter
    const completed = todos.filter((t) => t.completed).length;
    console.log(`Completed: ${completed} of ${todos.length}`);
  } catch (err) {
    console.error("Could not load todos:", err.message);
  } finally {
    console.log("Done loading");
  }
}

loadTodos(10);
