import { formatPrice } from "./formatPrice.js";

type Props = {
  id: string
  name: string
  price: number
  rating: number
  inStock: boolean
  onAddToCart: (id: string) => void
}

function ProductCard({ id, name, price, rating, inStock, onAddToCart }: Props) {
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
