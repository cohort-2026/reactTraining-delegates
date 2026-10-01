import { useState } from "react"
import { products } from "./products.js"
import ProductGrid from "./ProductGrid.jsx"
import Cart from "./Cart.jsx"

export default function Shop() {
  const [cart, setCart] = useState([])

  function handleAddToCart(id) {
    setCart(prev => {
      const found = prev.find(item => item.id === id)
      if (found) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { id, qty: 1 }]
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lab 4.2 Shop</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
        <Cart cart={cart} />
      </div>
    </div>
  )
}