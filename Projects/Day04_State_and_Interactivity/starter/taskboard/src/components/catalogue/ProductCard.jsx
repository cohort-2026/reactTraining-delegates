export default function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px' }}>
      <h3>{product.name}</h3>
      <p>R {product.price}</p>
      <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
      
      <button 
        disabled={!product.inStock}
        onClick={() => onAddToCart(product.id)}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  )
}