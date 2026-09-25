import ItemRow from "./ItemRow.jsx";

function PackingList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return <p>Nothing to show.</p>;
  }

  return (
    <ul className="packing-list">
      {items.map((item) => (
        <li key={item.id}>
          <ItemRow item={item} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default PackingList;
