// Lab 2.1: Data Transformation Drills
// Run with: node lab2-1.js
// No for loops allowed: use map, filter, find, reduce, spread and destructuring.

// Step 1: Products
const products = [
  { id: 1, name: "Wireless Mouse", price: 349, category: "electronics", inStock: true },
  { id: 2, name: "USB-C Charger", price: 299, category: "electronics", inStock: true },
  { id: 3, name: "Noise-Cancelling Headphones", price: 2499, category: "electronics", inStock: true },
  { id: 4, name: "Learning React", price: 520, category: "books", inStock: true },
  { id: 5, name: "A5 Notebook", price: 85, category: "stationery", inStock: false },
  { id: 6, name: "Clean Code", price: 480, category: "books", inStock: true },
];

// Step 2: Use map to create an array of product names
const names = products.map(product => product.name);

console.log(`Names: ${names}`);

// Step 3: Get products that are in stock AND cost less than R500
const affordableInStock = products.filter(
  product => product.inStock && product.price < 500
);

// Step 4: Find the product with id 4
const product4 = products.find(product => product.id === 4);

console.log(`Product 4: ${product4.name}`);

// Step 5: Use reduce to total the price of all in-stock items
const inStockTotal = products.reduce(
  (total, product) => product.inStock ? total + product.price : total,
  0
);

console.log(`In-stock total: R${inStockTotal}`);

// Step 6: Immutably mark product 2 as out of stock
const product2OutOfStock = products.map(product =>
  product.id === 2
    ? { ...product, inStock: false }
    : product
);

// Step 7: Immutably remove product 5
const withoutProduct5 = products.filter(product => product.id !== 5);

// Step 8: Log every result with a label

const affordableNames = affordableInStock.map(
  product => `${product.name} (R${product.price})`
);

const product2Names = product2OutOfStock.map(
  product => `${product.name}: ${product.inStock ? "In stock" : "Out of stock"}`
);

const remainingNames = withoutProduct5.map(
  product => `${product.id}: ${product.name}`
);

console.log(`Affordable in-stock: ${affordableNames}`);
console.log(`Product 2 updated: ${product2Names}`);
console.log(`Without product 5: ${remainingNames}`);

// Prove immutability
console.log("Original products:", products);
console.log(`Original product 2 in stock: ${products.find(p => p.id === 2).inStock}`);
console.log(`Original product 5 exists: ${products.some(p => p.id === 5)}`)