// Lab 2.1: Data Transformation Drills
// Run with: node lab2-1.js
// No for loops allowed: use map, filter, find, reduce, spread and destructuring.
// Run the file after every step.

// Step 1: an array of 6 products, each with id, name, price, category and inStock.
// The data is provided so you can get straight to the drills. Feel free to change
// the names and prices, but keep product 2 in stock and keep a product with id 5.
const products = [
  { id: 1, name: "Wireless Mouse", price: 349, category: "electronics", inStock: true },
  { id: 2, name: "USB-C Charger", price: 299, category: "electronics", inStock: true },
  { id: 3, name: "Noise-Cancelling Headphones", price: 2499, category: "electronics", inStock: true },
  { id: 4, name: "Learning React", price: 520, category: "books", inStock: true },
  { id: 5, name: "A5 Notebook", price: 85, category: "stationery", inStock: false },
  { id: 6, name: "Clean Code", price: 480, category: "books", inStock: true },
];

// TODO (step 2): use map to create an array of product names, then log it
// with a template literal, for example: Names: Wireless Mouse, USB-C Charger, ...
const productNames = products.map(product => product.name);
console.log(`Names: ${productNames.join(", ")}`);

// TODO (step 3): use filter to get the products that are in stock AND cost less than R500.
const affordableInStockProducts = products.filter(product => product.inStock && product.price < 500);


// TODO (step 4): use find to get the product with id 4, and log its name.
const productWithId4 = products.find(product => product.id === 4);
console.log(`Product with ID 4: ${productWithId4.name}`);

// TODO (step 5): use reduce to total the price of all in-stock items.
// Remember the starting value.
const totalInStockPrice = products.reduce((total, product) => {
  if (product.inStock) {
    return total + product.price;
  }
  return total;
}, 0);               // <-- need to close the callback AND pass the starting value

// TODO (step 6): immutably mark product 2 as out of stock, using map and spread.
// Store the result in a new variable; do not change products.
const updatedProducts = products.map(product => {
  if (product.id === 2) {
    return { ...product, inStock: false };
  }
  return product;
});                 // <-- need to close the callback AND the map() call      
                 

// TODO (step 7): immutably remove product 5, using filter.
const productsWithoutId5 = products.filter(product => product.id !== 5);
  

// TODO (step 8): log every result with a label, using template literals.
// Tip: `${someArray}` prints [object Object] for objects, so map each product
// to a readable string first.
console.log("Affordable in-stock products:");
console.log(affordableInStockProducts.map(p => p.name).join(", "));

console.log(`Total price of in-stock items: R${totalInStockPrice}`);


// TODO: prove immutability. Log the original products array here and check that
// product 2 is still in stock and product 5 is still there.
console.log("Original products array:");
console.log(products);
