import type { Status, Task } from "../types";

export type TaskAction =
  | { type: "loaded"; tasks: Task[] }
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "renamed"; id: string; title: string }
  | { type: "deleted"; id: string };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "loaded":
      return action.tasks;
    case "added":
      return [...tasks, action.task];
    case "moved":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, status: action.status } : task,
      );
    case "renamed":
      return tasks.map((task) =>
        task.id === action.id ? { ...task, title: action.title } : task,
      );
    case "deleted":
      return tasks.filter((task) => task.id !== action.id);
  }
}
