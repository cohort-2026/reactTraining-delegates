import { useState } from "react";

function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Type the name of an item first.");
      return;
    }
    setError("");
    onAdd(name.trim());
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="item-name">New item</label>
      <input
        id="item-name"
        value={name}
        aria-invalid={Boolean(error)}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default AddItemForm;
