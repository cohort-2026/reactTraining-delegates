import { useState } from "react";

const emptyForm = { title: "", assignee: "", points: "1" };

function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }

    setError("");
    onAdd({
      title,
      assignee: form.assignee.trim(),
      points: Number(form.points),
    });
    setForm(emptyForm);
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task-title">Title</label>
      <input
        id="new-task-title"
        name="title"
        value={form.title}
        aria-invalid={Boolean(error)}
        onChange={handleChange}
      />
      <label htmlFor="new-task-assignee">Assignee</label>
      <input
        id="new-task-assignee"
        name="assignee"
        value={form.assignee}
        onChange={handleChange}
      />
      <label htmlFor="new-task-points">Points</label>
      <input
        id="new-task-points"
        name="points"
        type="number"
        min="1"
        value={form.points}
        onChange={handleChange}
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTaskForm;