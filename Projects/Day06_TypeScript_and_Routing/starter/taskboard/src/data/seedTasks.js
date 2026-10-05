/**
 * Fetches seed tasks from JSONPlaceholder and maps them into our task shape.
 *
 * JSONPlaceholder gives us objects with { userId, id, title, completed }.
 * We convert those into { id, title, description, status, priority, assignee }.
 *
 * @param {number} limit how many tasks to fetch (default: 12)
 * @returns {Promise<Array>} array of task objects
 */
async function seedTasks(limit = 12) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  );

  if (!res.ok) {
    throw new Error(`Failed to seed tasks: ${res.status}`);
  }

  const raw = await res.json();

  const priorities = ["low", "medium", "high"];
  const assignees = ["You", "Alex", "Sam", "Jordan"];

  return raw.map((item, i) => ({
    id: String(item.id),
    title: item.title,
    description: item.completed
      ? "Imported from JSONPlaceholder"
      : "Imported from JSONPlaceholder",
    status: item.completed ? "done" : i % 3 === 0 ? "doing" : "todo",
    priority: priorities[i % priorities.length],
    assignee: assignees[i % assignees.length],
  }));
}

export default seedTasks;