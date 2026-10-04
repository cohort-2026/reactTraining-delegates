// TODO (Lab 7.2 step 6): select the tasks with useTaskStore((s) => s.tasks) and filter them here, outside the selector.
// TODO (Lab 7.3 step 5): read the tasks with useQuery({ queryKey: ["tasks"], queryFn: fetchTasks }).
import TaskCard from "./TaskCard";
import type { Status, Task } from "../types";

type ColumnProps = {
  heading: string;
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

function Column({ heading, tasks, onStatusChange, onRename, onDelete }: ColumnProps) {
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
                onStatusChange={onStatusChange}
                onRename={onRename}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
