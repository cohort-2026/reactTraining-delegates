import { useOutletContext, useSearchParams } from "react-router";
import Board from "../components/Board";
import AddTaskForm from "../components/AddTaskForm";
import Header from "../components/Header";
import type { Task, Status } from "../types";

type Ctx = {
  tasks: Task[];
  handleAdd: (t: any) => void;
  handleStatusChange: (id: string, s: Status) => void;
  handleRename: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
};

export default function Dashboard() {
  const { tasks, handleAdd, handleStatusChange, handleRename, handleDelete } = useOutletContext<Ctx>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <Header tasks={tasks} />
      <input placeholder="Search tasks... ?q=" value={q} onChange={e => setSearchParams(e.target.value ? { q: e.target.value } : {})} style={{ padding: "8px", margin: "10px 0" }} />
      <AddTaskForm onAdd={handleAdd} />
      <Board tasks={filtered} onStatusChange={handleStatusChange} onRename={handleRename} onDelete={handleDelete} />
    </div>
  );
}