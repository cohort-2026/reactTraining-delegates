function ItemRow({ item, onToggle, onDelete }) {
  return (
    <div className={item.packed ? "item packed" : "item"}>
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggle(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => onDelete(item.id)}>Delete {item.name}</button>
    </div>
  );
}

export default ItemRow;
