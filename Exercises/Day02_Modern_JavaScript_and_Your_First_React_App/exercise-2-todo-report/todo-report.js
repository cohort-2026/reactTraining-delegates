// To-do report
// Loads data from an API with fetch and async/await, and handles errors.
// fake-api.js stands in for the internet, so no connection is needed.
import { fetch } from "./fake-api.js";

const API = "https://jsonplaceholder.typicode.com";

async function loadTodos(limit) {
  try {
    const res = await fetch(`${API}/todos?_limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const todos = await res.json();
    const lines = todos.map((todo, i) => {
      const { title, completed } = todo;
      return `${i + 1}. [${completed ? "done" : "open"}] ${title}`;
    });
    console.log(lines.join("\n"));
  } catch (err) {
    console.error("Could not load to-dos:", err.message);
  } finally {
    console.log("Finished loading to-dos");
  }
}

async function getTodo(id) {
  try {
    const res = await fetch(`${API}/todos/${id}`);
    const todo = await res.json();
    if(!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const points = todo.points !== null ? todo.points : "not estimated";
    console.log(`To-do ${id}: ${todo.title} (points: ${points})`);
  } catch (err) {
    console.error(`Could not load to-do ${id}:`, err.message);
  }
}

async function loadUser(id) {
  try {
    const res = await fetch(`${API}/users/${id}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const user = await res.json();
    const city = user.address === null ? "Unknown": user.address.city;
    console.log(`${user.name} lives in ${city}`);
  } catch (err) {
    console.error(`Could not load user ${id}:`, err.message);
  }
}

async function getProgress(limit) {
  const res = await fetch(`${API}/todos?_limit=${limit}`);
  const todos = await res.json();
  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  return { completed, total };
}

async function main() {
  console.log("=== To-do list ===");
  await loadTodos(6);

  console.log("=== Single to-dos ===");
  await getTodo(2);
  await getTodo(5);
  await getTodo(99);

  console.log("=== Team ===");
  await loadUser(1);
  await loadUser(2);

  console.log("=== Progress ===");
  const { completed, total } = await getProgress(6);
  console.log(`Completed: ${completed} of ${total}`);
}

main();
