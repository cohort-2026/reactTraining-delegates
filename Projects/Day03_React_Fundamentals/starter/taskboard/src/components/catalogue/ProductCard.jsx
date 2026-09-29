function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>

      <p>R{product.price}</p>

      {!product.inStock && (
        <span className="out-of-stock">
          Out of stock
        </span>
      )}
    </div>
  );
}

export default ProductCard;