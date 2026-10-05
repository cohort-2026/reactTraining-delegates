export type Status = "todo" | "doing" | "done";

export type Task = {
  id: number;
  title: string;
  assignee: string;
  points: number;
  status: Status;
  projectId: number;
};