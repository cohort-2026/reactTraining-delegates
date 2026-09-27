import type { Task, Status } from "./types";

// Ported from Day 7's src/state/tasksReducer.ts. Day 9's Supabase table
// has no projectId or assignee, so the "added" action here takes only
// what the table actually stores.
export type TaskAction =
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "renamed"; id: string; title: string }
  | { type: "deleted"; id: string };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "moved":
      return tasks.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t,
      );
    case "renamed":
      return tasks.map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t,
      );
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
  }
}
