import type { Task } from "../types";

export type Project = {
  id: string;
  name: string;
  description: string;
};

export const tasks: Task[] = [
  {
    id: "t1",
    projectId: "p1",
    title: "Set up project",
    assignee: "You",
    points: 3,
    status: "done",
  },
  {
    id: "t2",
    projectId: "p1",
    title: "Build the board",
    assignee: "You",
    points: 5,
    status: "doing",
  },
  {
    id: "t3",
    projectId: "p1",
    title: "Write documentation",
    assignee: "Alex",
    points: 2,
    status: "todo",
  },
];