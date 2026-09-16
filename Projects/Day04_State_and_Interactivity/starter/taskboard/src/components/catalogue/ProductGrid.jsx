import ProductCard from "./ProductCard.jsx";

// TODO (Lab 4.2): receive onAddToCart and pass it to each ProductCard.
function ProductGrid({ products }) {
  if (products.length === 0) return <p>No products</p>;
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
export default ProductGrid;
