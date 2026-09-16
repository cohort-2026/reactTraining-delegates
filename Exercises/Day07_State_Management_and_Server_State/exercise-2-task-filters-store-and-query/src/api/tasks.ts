import type { Status, Task } from "../types";

export const API = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export type NewTask = Omit<Task, "id">;
export type StatusFilter = Status | "all";

export async function fetchTasks(status: StatusFilter): Promise<Task[]> {
  const url = status === "all" ? `${API}/tasks` : `${API}/tasks?status=${status}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createTask(task: NewTask): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });
  return res.json();
}
