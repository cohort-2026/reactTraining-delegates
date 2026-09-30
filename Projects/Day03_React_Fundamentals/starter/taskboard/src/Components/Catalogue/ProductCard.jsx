
function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h2>{product.name}</h2>

      <p>Price: R{product.price.toLocaleString("en-ZA")}</p>

      <p>Rating: ⭐ {product.rating} / 5</p>

      {!product.inStock && (
        <span className="out-of-stock">
          Out of stock
        </span>
      )}
    </article>
  );
}

export default ProductCard;