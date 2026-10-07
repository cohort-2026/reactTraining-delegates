import type { NewTask, Status, Task } from "../types";

export type TasksAction =
  | { type: "seed"; tasks: Task[] }
  | { type: "add"; task: NewTask; id: string; projectId: string }
  | { type: "move"; id: string; status: Status }
  | { type: "rename"; id: string; title: string }
  | { type: "delete"; id: string }
  | { type: "reset" };

export function tasksReducer(
  state: Task[] | null,
  action: TasksAction
): Task[] | null {
  switch (action.type) {
    case "seed":
      return action.tasks;
    case "add":
      return [
        ...(state ?? []),
        {
          ...action.task,
          id: action.id,
          status: "todo",
          projectId: action.projectId,
        },
      ];
    case "move":
      return (state ?? []).map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t
      );
    case "rename":
      return (state ?? []).map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t
      );
    case "delete":
      return (state ?? []).filter((t) => t.id !== action.id);
    case "reset":
      return null;
  }
}