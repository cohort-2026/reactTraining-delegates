import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import type { Status } from "../types";
import { useSearchParams } from "react-router";
import { fetchTasks } from "../api/tasks";
import { useFilterStore } from "../state/useFilterStore";

type ColumnProps = {
  heading: string;
  status: Status;
  projectId: string;
};

function Column({ heading, status, projectId }: ColumnProps) {
  const { data: allTasks = [] } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const assignee = useFilterStore((s) => s.assignee);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLocaleLowerCase();
  const tasks = allTasks.filter((task) =>
    task.projectId === projectId
    && task.status === status
    && task.title.toLocaleLowerCase().includes(query)
    && (!assignee || task.assignee?.trim() === assignee)
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
