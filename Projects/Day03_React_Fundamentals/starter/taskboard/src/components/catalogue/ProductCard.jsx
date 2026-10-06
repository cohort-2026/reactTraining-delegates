
function ProductCard({ name, price, rating, inStock }) {
  return (
    <div className="card product-card">
      <h3>{name}</h3>
      <p>R{price}</p>
      {rating > 0 && <p>{"★".repeat(rating)}</p>}
      {!inStock && <span className="badge">Out of stock</span>}
    </div>
  );
}
export default ProductCard;