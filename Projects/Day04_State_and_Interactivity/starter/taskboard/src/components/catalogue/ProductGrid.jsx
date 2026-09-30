// Lab 4.2: Product grid passes the cart action to each product card.
import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) return <p>No products</p>;
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
export default ProductGrid;
