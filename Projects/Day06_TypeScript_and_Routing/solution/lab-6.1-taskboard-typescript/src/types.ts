export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;         // optional
  tags?: string[];
}
