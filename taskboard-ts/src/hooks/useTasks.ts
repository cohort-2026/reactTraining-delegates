import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasksApi";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}