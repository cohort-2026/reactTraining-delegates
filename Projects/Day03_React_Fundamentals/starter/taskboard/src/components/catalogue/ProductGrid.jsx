import products from "./products";
import ProductCard from "./ProductCard";

function ProductGrid() {
  if (products.length === 0) {
    return <p>No products</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
