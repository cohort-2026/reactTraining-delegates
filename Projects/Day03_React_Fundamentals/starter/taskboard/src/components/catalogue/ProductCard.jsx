export default function ProductCard({ product }) {
  return (
    <div>
        {!product.inStock && <span>Out of stock</span>}
        
      <h3>{product.name}</h3>
      <p>R {product.price}</p>
      <p>{product.rating} stars</p>
    </div>
  )
}