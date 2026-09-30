// Lab 4.2: Cart displays lines and derives the item count and total.
import { formatPrice } from "./formatPrice.js";

function Cart({ cart, products, onChangeQuantity, onRemove }) {
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <aside className="cart" aria-label="Shopping cart">
      <h3>Cart ({itemCount} items)</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => {
            const product = products.find(
              (entry) => entry.id === item.productId
            );
            if (!product) return null;

            return (
              <li className="cart-item" key={item.productId}>
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {formatPrice(product.price)} x {item.quantity}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => onChangeQuantity(item.productId, -1)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => onChangeQuantity(item.productId, 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-total">Total: {formatPrice(total)}</p>
    </aside>
  );
}

export default Cart;