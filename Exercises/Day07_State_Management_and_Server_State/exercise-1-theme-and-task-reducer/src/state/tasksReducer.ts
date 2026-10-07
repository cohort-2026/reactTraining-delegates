import type { Task, Status } from "../types";

export type TaskAction =
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "deleted"; id: string };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "moved":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, status: action.status } : task,
      );
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
  }
}
