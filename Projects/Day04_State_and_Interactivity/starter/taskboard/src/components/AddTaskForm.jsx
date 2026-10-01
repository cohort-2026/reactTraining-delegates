import { useState } from "react";

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [points, setPoints] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    onAdd({
      title: title.trim(),
      assignee: assignee.trim(),
      points: Number(points),
    });

    setTitle("");
    setAssignee("");
    setPoints(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Assignee"
        value={assignee}
        onChange={(event) => setAssignee(event.target.value)}
      />

      <input
        type="number"
        value={points}
        onChange={(event) => setPoints(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
