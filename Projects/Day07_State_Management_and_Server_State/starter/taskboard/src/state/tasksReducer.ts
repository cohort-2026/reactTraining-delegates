import type { Task, Status } from "../types";

export type TaskAction =
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "renamed"; id: string; title: string }
  | { type: "deleted"; id: string };

export function tasksReducer(
  tasks: Task[], action: TaskAction
): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "moved":
      return tasks.map((t) => t.id === action.id
        ? { ...t, status: action.status } : t);
    case "renamed":
      return tasks.map((t) => t.id === action.id
        ? { ...t, title: action.title } : t);
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
  }
}
