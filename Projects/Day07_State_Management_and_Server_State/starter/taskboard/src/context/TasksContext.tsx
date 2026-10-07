import {createContext, useContext, useReducer} from "react";
import type {Dispatch, ReactNode} from "react";
import type {Task} from "../types";
import {tasksReducer, type TaskAction} from "../state/tasksReducer";


type TasksValue = { tasks: Task[]; dispatch: Dispatch<TaskAction> };

const initialTasks: Task[] = [];
const TasksContext = createContext<TasksValue | null>(null);

export function TasksProvider({ children }: {children: ReactNode}) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    return (
      <TasksContext value={{ tasks, dispatch }}>
        {children}
      </TasksContext>
    );
  }

  export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error("useTasks must be inside TasksProvider");
    return ctx;
  }