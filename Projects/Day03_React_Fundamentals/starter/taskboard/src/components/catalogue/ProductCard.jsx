import Card from "../ui/Card";

function ProductCard({ product }) {
  const price = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(product.price);

  return (
    <Card title={product.name}>
      <p>Price: {price}</p>
      <p>Rating: {"★".repeat(product.rating)}</p>

      {!product.inStock && <span>Out of stock</span>}
    </Card>
  );
}

export default ProductCard;
