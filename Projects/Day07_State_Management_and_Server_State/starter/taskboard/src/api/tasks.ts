import type { Task } from "../types";

export const API = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export type NewTask = Omit<Task, "id">;

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API}/tasks`);
  if (!response.ok) throw new Error(`Could not load tasks (HTTP ${response.status})`);
  return response.json();
}

export async function createTask(task: NewTask): Promise<Task> {
  const response = await fetch(`${API}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error(`Could not add task (HTTP ${response.status})`);
  return response.json();
}

export async function updateTask(
  id: string,
  changes: Partial<NewTask>,
): Promise<Task> {
  const response = await fetch(`${API}/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error(`Could not update task (HTTP ${response.status})`);
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API}/tasks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Could not delete task (HTTP ${response.status})`);
}
