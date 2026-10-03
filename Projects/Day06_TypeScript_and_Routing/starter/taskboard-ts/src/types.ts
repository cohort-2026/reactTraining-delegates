export type Status = "To do" | "In progress" | "Done";

export type Task = {
  id: string;
  title: string;
  assignee?: string;
  points: number;
  status: Status;
  projectId: string;
};