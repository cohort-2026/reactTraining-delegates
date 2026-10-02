import { formatPrice } from "./formatPrice.js";

function Cart({ cart, products, onChangeQuantity, onRemove }) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return <aside className="cart"><p>Your cart is empty</p></aside>;
  }

  return (
    <aside className="cart">
      <h2>Cart ({itemCount} items)</h2>
      <ul>
        {cart.map((item) => {
          const product = products.find((candidate) => candidate.id === item.productId);
          if (!product) return null;
          return (
            <li key={item.productId}>
              {product.name} x {item.quantity}
              <button type="button" aria-label={`Decrease ${product.name} quantity`}
                onClick={() => onChangeQuantity(item.productId, -1)}>-</button>
              <button type="button" aria-label={`Increase ${product.name} quantity`}
                onClick={() => onChangeQuantity(item.productId, 1)}>+</button>
              <button type="button" onClick={() => onRemove(item.productId)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <p>Total: {formatPrice(total)}</p>
    </aside>
  );
}

export default Cart;