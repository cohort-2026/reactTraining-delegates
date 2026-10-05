import { useState } from "react"
import { products } from "./catalogue/products.ts"

function ProductSearch() {
  const [query, setQuery] = useState("")

  const filtered = query.trim() === "" ? [] : products.filter(p =>
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

      {query.trim() !== "" && (
       filtered.length === 0 ? (
        <p>No products found for "{query}"</p>
      ) : (
        <ul>
          {filtered.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      )
      )}
    </div>
  )
}

export default ProductSearch