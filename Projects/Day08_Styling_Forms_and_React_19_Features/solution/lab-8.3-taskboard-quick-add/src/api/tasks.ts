import { z } from "zod";
import { apiTaskSchema } from "../schemas/task";
import type { Task } from "../types";

export const API = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export type NewTask = Omit<Task, "id">;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return z.array(apiTaskSchema).parse(await res.json());
}

export async function createTask(task: NewTask): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST", headers, body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateTask(id: string, changes: Partial<NewTask>): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH", headers, body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
