export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;
  tags: string[];
  projectId: string;
}

export type Project = {
  id: string;
  name: string;
};
