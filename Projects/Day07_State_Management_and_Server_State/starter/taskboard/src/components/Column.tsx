import TaskCard from "./TaskCard";
import type { Task } from "../types";

type ColumnProps = {
  heading: string;
  tasks: Task[];
};

function Column({ heading, tasks }: ColumnProps) {
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
