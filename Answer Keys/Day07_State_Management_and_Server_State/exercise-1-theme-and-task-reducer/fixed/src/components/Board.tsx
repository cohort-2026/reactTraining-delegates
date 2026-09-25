import { useReducer, useState } from "react";
import type { FormEvent } from "react";
import type { Status, Task } from "../types";
import { tasksReducer } from "../state/tasksReducer";
import { TaskCard } from "./TaskCard";

const columns: { status: Status; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "In progress" },
  { status: "done", label: "Done" },
];

const initialTasks: Task[] = [
  { id: "1", title: "Plan sprint", status: "todo", points: 3 },
  { id: "2", title: "Write report", status: "doing", points: 5 },
  { id: "3", title: "Book room", status: "done", points: 1 },
];

export function Board() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [title, setTitle] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({
      type: "added",
      task: { id: crypto.randomUUID(), title: title.trim(), status: "todo", points: 1 },
    });
    setTitle("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="add-form">
        <label htmlFor="new-title">New task</label>
        <input
          id="new-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="board">
        {columns.map((c) => (
          <section key={c.status} aria-labelledby={`col-${c.status}`}>
            <h2 id={`col-${c.status}`}>{c.label}</h2>
            <ul>
              {tasks
                .filter((t) => t.status === c.status)
                .map((t) => (
                  <TaskCard key={t.id} task={t} dispatch={dispatch} />
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
