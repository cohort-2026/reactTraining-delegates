export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const TASK_STATUSES = ["todo", "doing", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  doing: "Doing",
  done: "Done",
};

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  /** The id of the user who created the task. Editors may only delete their own. */
  createdBy: string;
  createdAt: string;
};

/** A user as the rest of the app sees it: no password hash. */
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

/** What the signed session cookie tells the server about the current user. */
export type SessionUser = {
  id: string;
  name: string;
  role: Role;
};
