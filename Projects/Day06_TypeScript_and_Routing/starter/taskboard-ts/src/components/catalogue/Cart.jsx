// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
import { formatPrice } from "./formatPrice.js";

function Cart({ cart, products, onChangeQuantity, onRemove }) {
  // Derived values: calculated on every render, never stored
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.reduce(
    (sum, i) => sum + products.find((p) => p.id === i.productId).price * i.quantity,
    0
  );

  if (cart.length === 0) {
    return <aside className="cart"><p>Your cart is empty</p></aside>;
  }

  return (
    <aside className="cart">
      <h2>Cart ({itemCount} items)</h2>
      <ul>
        {cart.map((i) => {
          const product = products.find((p) => p.id === i.productId);
          return (
            <li key={i.productId}>
              {product.name} x {i.quantity}
              <button onClick={() => onChangeQuantity(i.productId, -1)}>-</button>
              <button onClick={() => onChangeQuantity(i.productId, 1)}>+</button>
              <button onClick={() => onRemove(i.productId)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <p>Total: {formatPrice(total)}</p>
    </aside>
  );
}

export default Cart;
