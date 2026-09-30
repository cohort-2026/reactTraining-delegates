// Lab 4.2: Shop owns cart state and immutable cart actions.
import { useState } from "react";
import Cart from "./Cart.jsx";
import ProductGrid from "./ProductGrid.jsx";
import { products } from "./products.js";

function Shop() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(id) {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.productId === id);
      if (existingItem) {
        return previousCart.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...previousCart, { productId: id, quantity: 1 }];
    });
  }

  function handleChangeQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.productId !== id)
    );
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