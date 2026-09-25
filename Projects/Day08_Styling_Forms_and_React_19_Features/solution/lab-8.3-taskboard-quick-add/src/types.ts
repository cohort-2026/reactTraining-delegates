export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;         // optional
  tags?: string[];
  projectId: string;
  clientId?: string;         // temporary id sent with a quick-add
  pending?: boolean;         // true while an optimistic task is saving
}
