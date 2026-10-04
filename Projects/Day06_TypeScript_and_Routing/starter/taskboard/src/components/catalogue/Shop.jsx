import { useState } from "react";
import { products } from "./products.js";
import ProductGrid from "./ProductGrid.jsx";
import Cart from "./Cart.jsx";

function Shop() {
  const [cart, setCart] = useState([]); // [{ productId, quantity }]

  function handleAddToCart(id) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === id);
      if (existing) {
        return prev.map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: id, quantity: 1 }];
    });
  }

  function handleChangeQuantity(id, amount) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity + amount } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((i) => i.productId !== id));
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
