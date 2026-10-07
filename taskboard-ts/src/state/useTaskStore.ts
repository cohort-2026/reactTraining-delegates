import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewTask, Task } from "../types";
import { DEFAULT_PROJECT_ID } from "../data/projects";
import { tasksReducer } from "./tasksReducer";
import type { TasksAction } from "./tasksReducer";

type TaskStore = {
  tasks: Task[] | null;
  dispatch: (action: TasksAction) => void;
  addTask: (task: NewTask, projectId?: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: null,
      dispatch: (action) =>
        set({ tasks: tasksReducer(get().tasks, action) }),
      addTask: (task, projectId = DEFAULT_PROJECT_ID) =>
        get().dispatch({
          type: "add",
          task,
          id: crypto.randomUUID(),
          projectId,
        }),
    }),
    {
      name: "taskboard",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);