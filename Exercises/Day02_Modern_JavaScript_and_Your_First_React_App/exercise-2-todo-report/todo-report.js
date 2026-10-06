// To-do report
// Loads data from an API with fetch and async/await, and handles errors.
// fake-api.js stands in for the internet, so no connection is needed.
import { fetch } from "./fake-api.js";

const API = "https://jsonplaceholder.typicode.com";

async function fetchJson(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

async function loadTodos(limit) {
  try {
    const todos = await fetchJson(`/todos?_limit=${limit}`);
    const lines = todos.map(({ title, completed }, i) =>
      `${i + 1}. [${completed ? "done" : "open"}] ${title}`
    );
    console.log(lines.join("\n"));
  } catch (err) {
    console.error("Could not load to-dos:", err.message);
  } finally {
    console.log("Finished loading to-dos");
  }
}

async function getTodo(id) {
  try {
    const todo = await fetchJson(`/todos/${id}`);
    const points = todo.points ?? "not estimated";
    console.log(`To-do ${id}: ${todo.title} (points: ${points})`);
  } catch (err) {
    console.error(`Could not load to-do ${id}:`, err.message);
  }
}

async function loadUser(id) {
  try {
    const user = await fetchJson(`/users/${id}`);
    const city = user.address?.city ?? "Unknown";
    console.log(`${user.name} lives in ${city}`);
  } catch (err) {
    console.error(`Could not load user ${id}:`, err.message);
  }
}

async function getProgress(limit) {
  const todos = await fetchJson(`/todos?_limit=${limit}`);
  const completed = todos.filter((t) => t.completed).length;
  return { completed, total: todos.length };
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
  try {
    const { completed, total } = await getProgress(6);
    console.log(`Completed: ${completed} of ${total}`);
  } catch (err) {
    console.error("Could not load progress:", err.message);
  }
}

main().catch((err) => console.error("Unexpected error:", err));