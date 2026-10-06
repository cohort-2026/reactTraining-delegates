import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

export function useTasks() {
  const status = useFilterStore((s) => s.status);
  return useQuery({
    // Bug 2: the key must include status so a new filter refetches.
    queryKey: ["tasks", { status }],
    queryFn: () => fetchTasks(status),
  });
}
