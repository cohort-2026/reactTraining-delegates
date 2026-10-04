import type { Status, Task } from "../types";
import Column from "./Column";

const columns: { status: Status; heading: string }[] = [
  { status: "todo", heading: "To do" },
  { status: "doing", heading: "In progress" },
  { status: "done", heading: "Done" },
];

type BoardProps = {
  tasks: Task[];
  onStatusChange: (id: string, status: Status) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function Board(props: BoardProps) {
  return (
    <div className="board">
      {columns.map(({ status, heading }) => (
        <Column
          key={status}
          heading={heading}
          tasks={props.tasks.filter((task) => task.status === status)}
          onStatusChange={props.onStatusChange}
          onRename={props.onRename}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}
