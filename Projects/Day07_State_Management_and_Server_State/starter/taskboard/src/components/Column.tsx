import TaskCard from "./TaskCard";
import type { Status, Task } from "../types";

type ColumnProps = {
  heading: string;
  status: Status;
  tasks: Task[];
};

function Column({ heading, status, tasks }: ColumnProps) {
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="column">
      <h2>
        {heading} ({columnTasks.length})
      </h2>

      {columnTasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {columnTasks.map((task) => (
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
