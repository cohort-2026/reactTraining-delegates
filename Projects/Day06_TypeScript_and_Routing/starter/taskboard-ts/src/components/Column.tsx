import type { Task, Status } from "../types";
import TaskCard from "./TaskCard";

type ColumnProps = {
  heading: string;
  tasks: Task[];
  onStatusChange: (id: Task["id"], status: Status) => void;
  onRename: (id: Task["id"], title: string) => void;
  onDelete: (id: Task["id"]) => void;
};

function Column({
  heading,
  tasks,
  onStatusChange,
  onRename,
  onDelete,
}: ColumnProps) {
  return (
    <section className="column">
      <h2>{heading}</h2>

      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}

export default Column;
