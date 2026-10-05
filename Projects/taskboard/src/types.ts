export type Status = "todo" | "inProgress" | "done"
export const STATUSES: Status[] = ["todo", "inProgress", "done"]
  

export type Task = {
  id: string
  title: string
  status: Status
  projectId: string
}