import { useState } from "react";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart";

export default function Shop({ products }) {
  const [cart, setCart] = useState([]); // [{ id, name, price, qty }]

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(line => line.id === product.id);
      if (existing) {
        return prev.map(line =>
          line.id === product.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: 1 },
      ];
    });
  }

  function changeQty(id, delta) {
    setCart(prev =>
      prev
        .map(line => (line.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter(line => line.qty > 0)
    );
  }

  function removeLine(id) {
    setCart(prev => prev.filter(line => line.id !== id));
  }

  return (
    <div className="shop">
      <ProductGrid products={products} onAdd={addToCart} />
      <Cart lines={cart} onChangeQty={changeQty} onRemove={removeLine} />
    </div>
  );
}