import { useOutletContext } from "react-router";
import AddTaskForm from "./AddTaskForm";
import type { NewTaskFields } from "./AddTaskForm";
import Board from "./Board";
import type { BoardContext } from "../pages/Layout";
import type { Status, Task } from "../types";

type ProjectBoardProps = {
  tasks: Task[];
  projectId: string;
};

// The add form and board, wired to the tasks state that Layout shares
// through Outlet context. Dashboard and Project both render it.
export default function ProjectBoard({ tasks, projectId }: ProjectBoardProps) {
  const { setTasks } = useOutletContext<BoardContext>();

  function handleAdd(newTask: NewTaskFields) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...(prev ?? []), { ...newTask, id, status: "todo", projectId }]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function handleRename(id: string, title: string) {
    setTasks((prev) =>
      (prev ?? []).map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => (prev ?? []).filter((t) => t.id !== id));
  }

  return (
    <>
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </>
  );
}
