import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types";
import { tasksReducer } from "./tasksReducer";

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Build login page",
    assignee: "Alice",
    points: 3,
    status: "todo",
    projectId: "website",
  },
  {
    id: "2",
    title: "Create API endpoint",
    assignee: "Bob",
    points: 5,
    status: "doing",
    projectId: "website",
  },
  {
    id: "3",
    title: "Design mobile screen",
    assignee: "Charlie",
    points: 2,
    status: "done",
    projectId: "mobile-app",
  },
  {
    id: "4",
    title: "Write tests",
    assignee: "Alice",
    points: 3,
    status: "todo",
    projectId: "mobile-app",
  },
];

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (taskId: Task["id"], status: Status) => void;
  renameTask: (taskId: Task["id"], title: string) => void;
  deleteTask: (taskId: Task["id"]) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: sampleTasks,

      addTask: (task) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, {
            type: "added",
            task,
          }),
        })),

      moveTask: (taskId, status) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, {
            type: "moved",
            taskId,
            status,
          }),
        })),

      renameTask: (taskId, title) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, {
            type: "renamed",
            taskId,
            title,
          }),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, {
            type: "deleted",
            taskId,
          }),
        })),
    }),
    {
      name: "taskboard-tasks",
    },
  ),
);
