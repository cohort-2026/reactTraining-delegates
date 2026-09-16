import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";
import { Status, Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAdd(title: string, assignee: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
      points: 1,
      assignee: assignee || undefined,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <main>
      <h1>Sprint Task List</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>

      <AddTaskForm onAdd={handleAdd} />

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} onStatusChange={handleStatusChange} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
