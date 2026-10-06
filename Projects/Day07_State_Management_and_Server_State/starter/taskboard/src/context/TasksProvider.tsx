import { useReducer } from "react";
import type { ReactNode } from "react";
import { TasksContext } from "./TasksContext";
import { tasksReducer } from "../state/tasksReducer";

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext value={{ tasks, dispatch }}>
      {children}
    </TasksContext>
  );
}
