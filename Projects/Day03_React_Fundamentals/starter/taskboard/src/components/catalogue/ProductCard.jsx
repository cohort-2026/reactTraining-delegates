/**
 * ProductCard
 * Renders a single product: image, name, price, and an "Out of stock"
 * badge when the product is not available.
 *
 * Props:
 *   product — { id, name, price, image, category, inStock }
 */
function ProductCard({ product }) {
  const { name, price, image, category, inStock } = product;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image + badge wrapper */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {!inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
            Out of stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          {category}
        </p>

        <h3 className="mt-1 line-clamp-2 text-lg font-bold text-gray-900">
          {name}
        </h3>

        <p className="mt-2 text-lg font-semibold text-gray-900">
          R{price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;