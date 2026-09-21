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

const newArray = products.map(p => p.name);
//console.log("Names: ", productNames);
//consol.log('Names: ${newArray.join(", ")}');

// TODO (step 3): use filter to create an array of in-stock products, then log it
const inStock = products.filter(p => p.inStock && p.price < 500);
const underFive = inStock.map(p => p.name);
//console.log(`In-stock products under $500: ${underFive.join(", ")}`);

//TODO (step 4): use find to get the product with id 4; and log its name
const uniqueProduct = products.find(p => p.id === 4);
//console.log(`Product 4: ${uniqueProduct.name}`);

// TODO (step 5): use reduce to total the prices of all in-stock iteams.
// Remember the starting value
// stores:[58, 41, 76, 33, 99]
// stores.reduce((total, store) => total + store.price, 0);

const inStockItemsPrice = products.filter(p => p.inStock);
const allAvailablePrice = inStockItemsPrice.map(p => p.price);

total = allAvailablePrice.reduce((total, allAvailablePrice) => total + allAvailablePrice, 0);
// console.log(`Total price of all in-stock items: ${total}`);


// TODO (step 6): immutably mark products 2 as out of stock, using map and spread.
// store the result in a new variabe; do not change products.
const update = productd.map(p => {
  if (p.id === 2) {
    return { ...p, inStock: false }
}
return p;
})
console.log
console.log(`After marking product 2 out of stock:\n${update.join("\n")}`);

// TODO (step 6) immutaby mark product 2 as out of stock, using nap and spread.

// TODO (step 8): log every result with a label, using template literals.
// Tip: `${someArray}` prints [object Object] for objects, so map each product
// to a readable string first// TODO: prove immutability. Log the original products array here and check that
// product 2 is still in stock and product 5 is still there.

