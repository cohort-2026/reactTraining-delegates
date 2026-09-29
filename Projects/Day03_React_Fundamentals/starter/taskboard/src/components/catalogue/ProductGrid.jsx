   import ProductCard from "./ProductCard";

   function ProductGrid({ products }) {
     if (products.length === 0) {
       return <p>No products</p>;
     }
     return (
       <div className="product-grid">
         {products.map((p) => (
           <ProductCard key={p.id} product={p} />
         ))}
       </div>
     );
   }

   export default ProductGrid;