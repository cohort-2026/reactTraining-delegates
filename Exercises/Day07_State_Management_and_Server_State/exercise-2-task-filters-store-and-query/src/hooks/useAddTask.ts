import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
