import ProductCard from "./ProductCard";
function ProductGrid() {
  const products = [
    { id: 1, name: "Product 1", price: 19.99, rating: 4, inStock: true },
    { id: 2, name: "Product 2", price: 29.99, rating: 5, inStock: false },
    { id: 3, name: "Product 3", price: 9.99, rating: 3, inStock: true },
    { id: 4, name: "Product 4", price: 14.99, rating: 0, inStock: false },
    { id: 5, name: "Product 5", price: 24.99, rating: 4, inStock: true },
  ];
  if (products.length === 0) return <p>No products</p>;
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
}
export default ProductGrid;
