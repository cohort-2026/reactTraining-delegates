import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Status, Task } from "../types";
import { tasksReducer } from "./tasksReducer";

type TaskStore = {
  tasks: Task[];
  loadTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  moveTask: (id: string, status: Status) => void;
  renameTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      loadTasks: (tasks) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, { type: "loaded", tasks }),
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, { type: "added", task }),
        })),
      moveTask: (id, status) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, { type: "moved", id, status }),
        })),
      renameTask: (id, title) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, { type: "renamed", id, title }),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: tasksReducer(state.tasks, { type: "deleted", id }),
        })),
    }),
    {
      name: "taskboard-tasks",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
