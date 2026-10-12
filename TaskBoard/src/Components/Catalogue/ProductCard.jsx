
import Card from '../ui/Card'

function ProductCard({ product }) {
  return (
    <Card title={product.name}>
      <p>Category: {product.category}</p>
      <p>Price: R{product.price.toFixed(2)}</p>
    </Card>
  )
}

export default ProductCard
