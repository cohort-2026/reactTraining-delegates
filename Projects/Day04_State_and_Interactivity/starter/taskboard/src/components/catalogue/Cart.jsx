export default function Cart({ lines, onChangeQty, onRemove }) {
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

  return (
    <aside className="cart">
      <h3>Cart ({itemCount})</h3>
      {lines.length === 0 && <p>Your cart is empty.</p>}
      <ul>
        {lines.map(l => (
          <li key={l.id}>
            {l.name}: ${(l.price * l.qty).toFixed(2)}
            <button onClick={() => onChangeQty(l.id, -1)}>-</button>
            {l.qty}
            <button onClick={() => onChangeQty(l.id, +1)}>+</button>
            <button onClick={() => onRemove(l.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total: ${total.toFixed(2)}</strong>
      </p>
    </aside>
  );
}