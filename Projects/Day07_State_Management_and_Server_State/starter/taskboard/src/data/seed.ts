import type { Task } from "../types";

export const INITIAL_TASKS: Omit<Task, "id">[] = [
  {
    title: "Build the landing page",
    status: "todo",
    points: 3,
    assignee: "Alex",
    projectId: "website",
  },
  {
    title: "Add responsive navigation",
    status: "doing",
    points: 2,
    assignee: "Sam",
    projectId: "website",
  },
  {
    title: "Write the getting started guide",
    status: "done",
    points: 1,
    assignee: "Alex",
    projectId: "website",
  },
  {
    title: "Create the sign-in screen",
    status: "todo",
    points: 2,
    assignee: "Jordan",
    projectId: "mobile",
  },
  {
    title: "Test offline mode",
    status: "doing",
    points: 3,
    projectId: "mobile",
  },
];
