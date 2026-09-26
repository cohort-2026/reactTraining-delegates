// Matches the columns in supabase/tasks.sql. Module 9.5's table has no
// project or assignee columns, so from this lab onward TaskBoard is a
// single per-user list rather than the multi-project board from Days 7-8.
export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
}
