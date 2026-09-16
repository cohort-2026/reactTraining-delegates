import { useEffect, useState } from "react";
import { API_URL } from "../api";
import type { Task } from "../types";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Task[] = await res.json();
        if (!ignore) setTasks(data);
      } catch {
        if (!ignore) setError("Could not load tasks");
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (error) return <p role="alert">{error}</p>;
  if (!tasks) return <p>Loading tasks...</p>;
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} ({task.status})
        </li>
      ))}
    </ul>
  );
}
