import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, patchTask, removeTask } from "../api/tasksApi";
import { DEFAULT_PROJECT_ID } from "../data/projects";
import type { NewTask, Status } from "../types";

function useInvalidateTasks() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["tasks"] });
}

export function useAddTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({
      task,
      projectId = DEFAULT_PROJECT_ID,
    }: {
      task: NewTask;
      projectId?: string;
    }) =>
      createTask({
        ...task,
        id: crypto.randomUUID(),
        status: "todo",
        projectId,
      }),
    onSuccess: invalidate,
  });
}

export function useMoveTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      patchTask(id, { status }),
    onSuccess: invalidate,
  });
}

export function useRenameTask() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      patchTask(id, { title }),
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