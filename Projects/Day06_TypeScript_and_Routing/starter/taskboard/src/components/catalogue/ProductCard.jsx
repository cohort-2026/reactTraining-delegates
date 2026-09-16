// TODO (Lab 6.1): practice code from an earlier lab that App no longer renders. Leave it out of taskboard-ts.
import { formatPrice } from "./formatPrice.js";

function ProductCard({ id, name, price, rating, inStock, onAddToCart }) {
  return (
    <article className="card product-card">
      <h3>{name}</h3>
      <p>{formatPrice(price)}</p>
      {rating > 0 && <p>{"★".repeat(rating)}</p>}
      {!inStock && <span className="badge">Out of stock</span>}
      <button onClick={() => onAddToCart(id)} disabled={!inStock}>
        Add to cart
      </button>
    </article>
  );
}
export default ProductCard;
