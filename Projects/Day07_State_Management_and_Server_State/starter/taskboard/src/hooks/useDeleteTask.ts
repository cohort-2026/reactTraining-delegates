import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/tasks";
import type { Task } from "../types";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: Task["id"]) => deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
