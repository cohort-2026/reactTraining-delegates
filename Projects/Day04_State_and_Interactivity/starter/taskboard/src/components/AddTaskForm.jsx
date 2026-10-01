import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [points, setPoints] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      assignee: assignee.trim() || undefined,
      points: Number(points),
    });
    setTitle("");
    setAssignee("");
    setPoints(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <input
        value={assignee}
        onChange={e => setAssignee(e.target.value)}
        placeholder="Assignee (optional)"
      />
      <input
        type="number"
        min="1"
        value={points}
        onChange={e => setPoints(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}