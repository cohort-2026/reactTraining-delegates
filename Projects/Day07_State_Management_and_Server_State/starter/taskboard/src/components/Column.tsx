import TaskCard from "./TaskCard";
import { useTaskStore } from "../state/useTaskStore";
import { useFilterStore } from "../state/useFilterStore";
import type { Status } from "../types";

type ColumnProps = {
  heading: string;
  status: Status;
  projectId?: string;
  filtered?: boolean;
};

function Column({ heading, status, projectId, filtered = false }: ColumnProps) {
  const allTasks = useTaskStore((state) => state.tasks);
  const searchText = useFilterStore((state) => state.searchText);
  const assignee = useFilterStore((state) => state.assignee);
  const tasks = allTasks.filter((task) =>
    task.status === status &&
    (!projectId || task.projectId === projectId) &&
    (!filtered || task.title.toLowerCase().includes(searchText.toLowerCase())) &&
    (!filtered || !assignee || task.assignee === assignee),
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
