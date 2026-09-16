// A pretend API that lives in memory, so this exercise needs no server.
// It waits a moment before answering, like a real network request.
import type { NewTask, Task } from "../types";

export const initialTasks: Task[] = [
  { id: "1", title: "Plan sprint", status: "todo", points: 3 },
  { id: "2", title: "Write report", status: "todo", points: 5 },
];

let offline = false;
let nextId = 100;

export function setOffline(value: boolean) {
  offline = value;
}

export async function createTask(task: NewTask): Promise<Task> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (offline) throw new Error("Network request failed");
  return { ...task, id: String(nextId++) };
}
