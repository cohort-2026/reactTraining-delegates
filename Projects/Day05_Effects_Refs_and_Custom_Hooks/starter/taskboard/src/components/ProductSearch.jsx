import { useState } from "react"

const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 599 },
  { id: 3, name: "Headphones", price: 199 },
  { id: 4, name: "Keyboard", price: 99 },
  { id: 5, name: "Mouse", price: 49 },
]

function ProductSearch() {
  const [query, setQuery] = useState("")

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h2>Product Search</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No products found for "{query}"</p>
      ) : (
        <ul>
          {filtered.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductSearch