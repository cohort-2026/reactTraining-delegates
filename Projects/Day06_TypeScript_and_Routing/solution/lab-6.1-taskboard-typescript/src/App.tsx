import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import Board from "./components/Board";
import Header from "./components/Header";
import SeedTasks from "./components/SeedTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { NewTask, Status, Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[] | null>("tasks", null);

  function handleAdd(newTask: NewTask) {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      status: "todo",
    };
    setTasks((previous) => [...(previous ?? []), task]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((previous) =>
      (previous ?? []).map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    );
  }

  function handleRename(id: string, title: string) {
    setTasks((previous) =>
      (previous ?? []).map((task) =>
        task.id === id ? { ...task, title } : task,
      ),
    );
  }

  function handleDelete(id: string) {
    setTasks((previous) => (previous ?? []).filter((task) => task.id !== id));
  }
  if (tasks === null) {
    return <SeedTasks onSeed={setTasks} />;
  }

  return (
    <>
      <Header tasks={tasks} />
      <button className="reset-button" onClick={() => setTasks(null)}>
        Reset board
      </button>
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
