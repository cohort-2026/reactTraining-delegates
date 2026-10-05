import type { Task, Status } from "../types.ts";

/**
 * Fetches seed tasks from JSONPlaceholder and maps them into our task shape.
 */
async function seedTasks(limit = 12): Promise<Task[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  );

  if (!res.ok) {
    throw new Error(`Failed to seed tasks: ${res.status}`);
  }

  const raw = (await res.json()) as Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;

  const assignees = ["You", "Alex", "Sam", "Jordan"];
  const projectIds = ["1", "2", "3"];

  return raw.map((item, i): Task => {
    const status: Status = item.completed
      ? "done"
      : i % 3 === 0
      ? "doing"
      : "todo";

    return {
      id: String(item.id),
      title: item.title,
      assignee: assignees[i % assignees.length],
      points: (i % 5) + 1,
      status,
      projectId: projectIds[i % projectIds.length],
    };
  });
}

export default seedTasks;