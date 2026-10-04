import { useRef, useState } from "react";
import type { FormEvent } from "react";

type AddTaskFormProps = {
  onAdd: (title: string, assignee?: string) => void;
};

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd(title.trim(), assignee.trim() || undefined);
    setTitle("");
    setAssignee("");
    titleRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="assignee">Assignee (optional)</label>
      <input
        id="assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <button type="submit">Add task</button>
    </form>
  );
}
