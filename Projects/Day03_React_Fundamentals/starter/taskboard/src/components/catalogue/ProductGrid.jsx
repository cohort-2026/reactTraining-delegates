import ProductCard from "./ProductCard";

/**
 * ProductGrid
 * Renders a responsive grid of ProductCards.
 * Shows a "No products" message when the list is empty.
 *
 * Props:
 *   products — array of product objects
 */
function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <p className="text-sm font-medium text-gray-600">No products</p>
        <p className="mt-1 text-xs text-gray-500">
          There are no products to display yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;