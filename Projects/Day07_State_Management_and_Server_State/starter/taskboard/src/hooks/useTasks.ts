import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  fetchTasks,
  moveTask,
  removeTask,
  resetTasks,
  updateTask,
} from "../api/tasks";
import type { NewTask } from "../api/tasks";
import type { Status } from "../types";

const TASKS_KEY = ["tasks"] as const;

export function useTasks() {
  return useQuery({ queryKey: TASKS_KEY, queryFn: fetchTasks });
}

// Each mutation invalidates ["tasks"] on success, so every useTasks() consumer refetches.
function useInvalidateTasks() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: TASKS_KEY });
}

export function useAddTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (task: NewTask) => createTask(task),
    onSuccess: invalidate,
  });
}

export function useMoveTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) => moveTask(id, status),
    onSuccess: invalidate,
  });
}

export function useRenameTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => updateTask(id, { title }),
    onSuccess: invalidate,
  });
}

export function useDeleteTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (id: string) => removeTask(id),
    onSuccess: invalidate,
  });
}

export function useResetTasks() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: resetTasks,
    onSuccess: invalidate,
  });
}