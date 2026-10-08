import { INITIAL_TASKS } from "../data/seed";
import type { Status, Task } from "../types";

export type NewTask = Omit<Task, "id">;
export type TaskUpdates = Partial<Pick<Task, "title" | "status">>;

const API_URL = import.meta.env.VITE_TASKS_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Task API request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function fetchTasks(): Promise<Task[]> {
  return request<Task[]>("/tasks");
}

export function createTask(task: NewTask): Promise<Task> {
  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function moveTask(id: string, status: Status): Promise<Task> {
  return request<Task>(`/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function updateTask(id: string, updates: TaskUpdates): Promise<Task> {
  return request<Task>(`/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function removeTask(id: string): Promise<void> {
  return request<void>(`/tasks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function resetTasks(): Promise<void> {
  const tasks = await fetchTasks();
  for (const task of tasks) {
    await removeTask(task.id);
  }
  for (const task of INITIAL_TASKS) {
    await createTask(task);
  }
}
