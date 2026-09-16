import type { Task, Status } from "../types";

export type TaskAction =
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "deleted"; id: string };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "moved": {
      const task = tasks.find((t) => t.id === action.id);
      if (task) task.status = action.status;
      return tasks;
    }
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
  }
}
