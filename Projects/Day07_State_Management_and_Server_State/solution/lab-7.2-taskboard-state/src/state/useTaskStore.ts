import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types";
import { tasksReducer } from "./tasksReducer";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, status: Status) => void;
  renameTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "added", task }) })),
      moveTask: (id, status) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "moved", id, status }) })),
      renameTask: (id, title) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "renamed", id, title }) })),
      deleteTask: (id) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "deleted", id }) })),
    }),
    { name: "taskboard" },
  ),
);
