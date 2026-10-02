export type Status = "todo" | "doing" | "done";

export type Task = {
  id: string | number;
  title: string;
  assignee: string;
  points: number;
  status: Status;
};
