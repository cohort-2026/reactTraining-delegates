import { formatPrice } from "./formatPrice.js";

// TODO (Lab 4.2 steps 2 and 8): add an "Add to cart" button that calls onAddToCart(id); disable it when out of stock.
function ProductCard({ name, price, rating, inStock }) {
  return (
    <article className="card product-card">
      <h3>{name}</h3>
      <p>{formatPrice(price)}</p>
      {rating > 0 && <p>{"★".repeat(rating)}</p>}
      {!inStock && <span className="badge">Out of stock</span>}
    </article>
  );
}
export default ProductCard;
