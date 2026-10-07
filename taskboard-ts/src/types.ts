export type Status = "todo" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;
  projectId: string;
};

export type NewTask = Omit<Task, "id" | "status" | "projectId">;

export type Project = {
  id: string;
  name: string;
};

export type TasksContext = {
  tasks: Task[];
  onAdd: (newTask: NewTask, projectId?: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
};