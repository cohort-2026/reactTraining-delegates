// TODO (Lab 7.2 step 6): select the tasks with useTaskStore((s) => s.tasks) and filter them here, outside the selector.
// TODO (Lab 7.3 step 5): read the tasks with useQuery({ queryKey: ["tasks"], queryFn: fetchTasks }).
import { useSearchParams } from "react-router";
import TaskCard from "./TaskCard";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";
import { useQuery } from "@tanstack/react-query";

type ColumnProps = {
  status: Status;
  heading: string;
  projectId?: string;
};

function Column({ heading, status, projectId }: ColumnProps) {
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
              <TaskCard
                task={task}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
