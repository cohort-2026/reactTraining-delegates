import { useState } from "react";
import AddItemForm from "./components/AddItemForm.jsx";
import PackingList from "./components/PackingList.jsx";
import Summary from "./components/Summary.jsx";
import { items as initialItems } from "./data/items.js";

function App() {
  const [items, setItems] = useState(initialItems);
  const [hidePacked, setHidePacked] = useState(false);

  function handleAdd(name) {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { id, name, packed: false }]);
  }

  function handleToggle(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const visibleItems = hidePacked
    ? items.filter((item) => !item.packed)
    : items;

  return (
    <main>
      <h1>Holiday Packing List</h1>
      <Summary items={items} />
      <AddItemForm onAdd={handleAdd} />

      <label>
        <input
          type="checkbox"
          checked={hidePacked}
          onChange={(e) => setHidePacked(e.target.checked)}
        />
        Hide packed items
      </label>

      <PackingList
        items={visibleItems}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
