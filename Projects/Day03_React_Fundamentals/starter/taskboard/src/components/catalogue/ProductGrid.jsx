import ProductCard from "./ProductCard.jsx";

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
