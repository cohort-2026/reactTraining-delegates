// Lab 2.1: Data Transformation Drills
// Run with: node lab2-1.js
// No for loops: only map, filter, find, reduce, spread and destructuring.

// Step 1: an array of 6 products
const products = [
  { id: 1, name: "Wireless Mouse", price: 349, category: "electronics", inStock: true },
  { id: 2, name: "USB-C Charger", price: 299, category: "electronics", inStock: true },
  { id: 3, name: "Noise-Cancelling Headphones", price: 2499, category: "electronics", inStock: true },
  { id: 4, name: "Learning React", price: 520, category: "books", inStock: true },
  { id: 5, name: "A5 Notebook", price: 85, category: "stationery", inStock: false },
  { id: 6, name: "Clean Code", price: 480, category: "books", inStock: true },
];

// A small helper that turns one product into a readable line, using destructuring
const describe = ({ id, name, price, inStock }) =>
  `  #${id} ${name}: R${price} (${inStock ? "in stock" : "out of stock"})`;

// Step 2: map to an array of names
const names = products.map((p) => p.name);
console.log(`Names: ${names.join(", ")}`);

// Step 3: filter to in-stock products under R500
const affordable = products.filter((p) => p.inStock && p.price < 500);
console.log(`In stock under R500 (${affordable.length}):`);
console.log(affordable.map(describe).join("\n"));

// Step 4: find the product with id 4
const product4 = products.find((p) => p.id === 4);
console.log(`Product 4: ${product4?.name ?? "not found"}`);

// Step 5: reduce to the total price of all in-stock items
const stockValue = products
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log(`Total price of in-stock items: R${stockValue}`);

// Step 6: immutably mark product 2 as out of stock (map + spread)
const updated = products.map((p) =>
  p.id === 2 ? { ...p, inStock: false } : p
);
console.log("After marking product 2 out of stock:");
console.log(updated.map(describe).join("\n"));

// Step 7: immutably remove product 5 (filter)
const withoutProduct5 = products.filter((p) => p.id !== 5);
console.log(`After removing product 5 (${withoutProduct5.length} products):`);
console.log(withoutProduct5.map(describe).join("\n"));

// Prove immutability: the original array is unchanged
console.log(`Original products (${products.length} products, unchanged):`);
console.log(products.map(describe).join("\n"));
