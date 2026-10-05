import type { Task, Status } from "../types";

export type TaskAction =
  | {
      type: "added";
      task: Task;
    }
  | {
      type: "moved";
      taskId: Task["id"];
      status: Status;
    }
  | {
      type: "renamed";
      taskId: Task["id"];
      title: string;
    }
  | {
      type: "deleted";
      taskId: Task["id"];
    };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];

    case "moved":
      return tasks.map((task) =>
        task.id === action.taskId ? { ...task, status: action.status } : task,
      );

    case "renamed":
      return tasks.map((task) =>
        task.id === action.taskId ? { ...task, title: action.title } : task,
      );

    case "deleted":
      return tasks.filter((task) => task.id !== action.taskId);

    default:
      return tasks;
  }
}
