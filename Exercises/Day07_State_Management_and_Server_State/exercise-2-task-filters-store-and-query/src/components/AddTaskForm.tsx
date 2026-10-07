import { useState } from "react";
import type { FormEvent } from "react";
import { useAddTask } from "../hooks/useAddTask";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const addTask = useAddTask();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask.mutate(
      { title: title.trim(), status: "todo", points: 1 },
      { onSuccess: () => setTitle("") },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label htmlFor="new-title">New task</label>
      <input
        id="new-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={addTask.isPending}>
        Add
      </button>
      {addTask.isError && (
        <p role="alert">Could not save the task ({addTask.error.message})</p>
      )}
    </form>
  );
}
