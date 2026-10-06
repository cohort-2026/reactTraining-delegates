function Cart({ cart, products, onChangeQuantity, onRemove }) {
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.reduce(
    (sum, i) =>
      sum + products.find((p) => p.id === i.productId).price * i.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h3>Cart</h3>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h3>Cart: {itemCount} items</h3>
        <ul>
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <li key={item.productId}>
                <span>{product.name}</span>
                <span>${(product.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => onChangeQuantity(item.productId, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onChangeQuantity(item.productId, 1)}>+</button>
                <button onClick={() => onRemove(item.productId)}>Remove</button>
              </li>
            );
          })}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    );
}
export default Cart;
