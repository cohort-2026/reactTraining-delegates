// TODO: load the task list with TanStack Query.
//
// GET `${API_URL}/tasks` through authFetch (NOT plain fetch), throw an Error if the
// response is not ok, and return the JSON as Task[].
import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<Task[]> => {
      // TODO
      throw new Error("Not implemented yet: see src/hooks/useTasks.ts");
    },
  });
}
