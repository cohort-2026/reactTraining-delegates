import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import type { Task } from "../types";

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
