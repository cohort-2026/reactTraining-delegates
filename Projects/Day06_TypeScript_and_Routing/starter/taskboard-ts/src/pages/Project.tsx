import { useParams, useOutletContext } from "react-router";
import Board from "../components/Board";
import type { Task, Status } from "../types";

type Ctx = {
  tasks: Task[];
  handleStatusChange: (id: string, status: Status) => void;
  handleRename: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
};

export default function Project() {
  const { projectId } = useParams();
  const { tasks, handleStatusChange, handleRename, handleDelete } = useOutletContext<Ctx>();
  const filtered = tasks.filter((t: Task) => t.projectId === projectId);

  return (
    <div>
      <h1>Project: {projectId}</h1>
      <Board tasks={filtered} onStatusChange={handleStatusChange} onRename={handleRename} onDelete={handleDelete} />
    </div>
  );
}