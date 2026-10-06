import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Bug 3: invalidate ["tasks"] so it matches the query-key prefix.
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
