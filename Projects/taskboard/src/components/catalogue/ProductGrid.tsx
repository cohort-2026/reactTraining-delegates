import ProductCard from "./ProductCard.js";

type Product = {
  id: string
  name: string
  price: number
  rating: number
  inStock: boolean
}

type Props = {
  products: Product[]
  onAddToCart: (id: string) => void
}

function ProductGrid({ products, onAddToCart }: Props) {
  if (products.length === 0) return <p>No products</p>;
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
export default ProductGrid;
