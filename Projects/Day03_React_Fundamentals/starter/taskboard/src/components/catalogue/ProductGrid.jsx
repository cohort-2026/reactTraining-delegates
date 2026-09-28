import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p>No products</p>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  )
}

export default ProductGrid