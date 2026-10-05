import TaskCard from "./TaskCard";
import type { Task, Status } from "../types";

type ColumnProps = {
  status: Status;
  heading: string;
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Column({
  heading,
  tasks,
  onStatusChange,
  onRename,
  onDelete,
}: ColumnProps) {
  return (
    <section className="kanban-column">
      <h3 className="kanban-column__heading">
        {heading} ({tasks.length})
      </h3>

      <div className="kanban-column__tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default Column;