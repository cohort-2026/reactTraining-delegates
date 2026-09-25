import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import TaskCard from "./TaskCard";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";

type ColumnProps = {
  status: Status;
  heading: string;
  projectId?: string;
};

function Column({ status, heading, projectId }: ColumnProps) {
  // Same query key as Board and Header: one request, shared from the cache
  const { data: allTasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").toLowerCase();

  const tasks = allTasks.filter((t) =>
    t.status === status &&
    (!projectId || t.projectId === projectId) &&
    (!assignee || t.assignee === assignee) &&
    t.title.toLowerCase().includes(q)
  );

  return (
    <section className="column">
      <h2>{heading} ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
