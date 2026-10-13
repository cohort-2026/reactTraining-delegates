export type Status = "todo" | "doing" | "done";

export interface Task {
    id: string;
    title: string;
    status: string;
    points: number;
    assignee?: string;
    tags?: string[]
}