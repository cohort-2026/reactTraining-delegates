import { createContext } from "react";
import type { Dispatch } from "react";
import type { TaskAction } from "../state/tasksReducer";
import type { Task } from "../types";

export type TasksContextValue = {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
};

export const TasksContext = createContext<TasksContextValue | null>(null);
