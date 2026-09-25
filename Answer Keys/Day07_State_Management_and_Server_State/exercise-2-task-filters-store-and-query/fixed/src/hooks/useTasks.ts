import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

export function useTasks() {
  const status = useFilterStore((s) => s.status);
  return useQuery({
    queryKey: ["tasks", { status }],
    queryFn: () => fetchTasks(status),
  });
}
