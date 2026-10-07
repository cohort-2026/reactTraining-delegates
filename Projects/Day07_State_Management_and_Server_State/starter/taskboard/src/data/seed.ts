// Lab 7.3 uses db.json as the task source; these helpers remain for the earlier seed-data exercise.
import type { Task } from "../types";

export const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export type Todo = { id: number; title: string; completed: boolean };

export function toTasks(todos: Todo[]): Task[] {
  return todos.map((t) => ({
    id: String(t.id),
    title: t.title,
    status: t.completed ? "done" : "todo",
    points: 1,
    projectId: t.id % 2 === 1 ? "website" : "mobile",
  }));
}
