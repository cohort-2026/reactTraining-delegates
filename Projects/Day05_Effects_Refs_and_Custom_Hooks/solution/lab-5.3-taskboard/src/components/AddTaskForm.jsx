import { useEffect, useRef, useState } from "react";

const emptyForm = { title: "", assignee: "", points: 1 };

function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      <label htmlFor="title">Title</label>
      <input id="title" name="title" ref={inputRef} value={form.title}
        aria-invalid={Boolean(error)} onChange={handleChange} />

      <label htmlFor="assignee">Assignee</label>
      <input id="assignee" name="assignee" value={form.assignee}
        onChange={handleChange} />

      <label htmlFor="points">Points</label>
      <input id="points" name="points" type="number" min="1"
        value={form.points} onChange={handleChange} />

      {error && <p role="alert">{error}</p>}
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTaskForm;
