function Cart({ cart, products, onIncrease, onDecrease, onRemove }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId);

    return total + product.price * item.quantity;
  }, 0);

  return (
    <section>
      <h2>Shopping Cart ({itemCount} items)</h2>

      <p>Total: {totalPrice.toFixed(2)}</p>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => {
          const product = products.find(
            (product) => product.id === item.productId,
          );

          return (
            <div key={item.productId}>
              <h3>{product.name}</h3>

              <button onClick={() => onDecrease(item.productId)}>-</button>

              <span>{item.quantity}</span>

              <button onClick={() => onIncrease(item.productId)}>+</button>

              <button onClick={() => onRemove(item.productId)}>Remove</button>
            </div>
          );
        })
      )}
    </section>
  );
}

export default Cart;
