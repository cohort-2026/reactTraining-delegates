   function ProductCard({ product }) {
     return (
       <div className="product-card">
         <h3>{product.name}</h3>
         <p>${product.price}</p>
         {!product.inStock && <span className="badge">Out of stock</span>}
       </div>
     );
   }

   export default ProductCard;