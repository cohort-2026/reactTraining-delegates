import { useState } from "react";
import { products } from "./products.js";
import ProductGrid from "./ProductGrid.jsx";
import Cart from "./Cart.jsx";

function Shop() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(productId) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  }

  function handleChangeQuantity(productId, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemove(productId) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  return (
    <div className="shop">
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <Cart
        cart={cart}
        products={products}
        onChangeQuantity={handleChangeQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default Shop;