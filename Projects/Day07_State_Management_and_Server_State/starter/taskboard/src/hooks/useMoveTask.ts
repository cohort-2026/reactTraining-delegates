import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Status, Task } from "../types";

type MoveTaskInput = {
  taskId: Task["id"];
  status: Status;
};

export function useMoveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: MoveTaskInput) =>
      updateTask(taskId, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}
