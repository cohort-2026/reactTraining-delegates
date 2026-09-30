// Lab 4.3: Controlled form for creating tasks.
import { useState } from "react";

const emptyForm = { title: "", assignee: "", points: "1" };

function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    if (name === "title" && value.trim().length >= 3) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }

    onAdd({
      title,
      assignee: form.assignee.trim(),
      points: Math.max(1, Number(form.points) || 1),
    });
    setForm({ ...emptyForm });
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add a task</h2>
      <div className="task-form-fields">
        <div>
          <label htmlFor="new-task-title">Title</label>
          <input
            id="new-task-title"
            name="title"
            value={form.title}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "new-task-error" : undefined}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="new-task-assignee">Assignee</label>
          <input
            id="new-task-assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="new-task-points">Points</label>
          <input
            id="new-task-points"
            name="points"
            type="number"
            min="1"
            value={form.points}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add task</button>
      </div>
      {error && <p id="new-task-error" role="alert">{error}</p>}
    </form>
  );
}

export default AddTaskForm;