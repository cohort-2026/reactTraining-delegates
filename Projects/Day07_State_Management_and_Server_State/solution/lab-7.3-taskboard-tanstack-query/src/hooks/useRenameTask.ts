import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";

export function useRenameTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTask(id, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
