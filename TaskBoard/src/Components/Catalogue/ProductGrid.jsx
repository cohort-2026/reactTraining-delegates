
import products from './Products'
import ProductCard from './ProductCard'

function ProductGrid() {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  )
}

export default ProductGrid
