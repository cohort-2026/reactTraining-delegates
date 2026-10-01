// TODO (Lab 4.2): receive onAddToCart and pass it to each ProductCard.
import ProductCard from "./ProductCard.jsx"

export default function ProductGrid({ products, onAddToCart }) {
  if (!products || products.length === 0) return <p>No products found</p>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}