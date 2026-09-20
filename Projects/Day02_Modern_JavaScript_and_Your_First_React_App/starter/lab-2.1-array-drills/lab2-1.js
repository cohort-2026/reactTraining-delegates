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

productNames = products.map((product) => product.name);
console.log(`Names: ${productNames.join(", ")}`);

console.log('');
console.log('----------------------------------------------------');
console.log('');

// TODO (step 3): use filter to get the products that are in stock AND cost less than R500.

const inStockUnder500 = products.filter((product) => product.inStock && product.price < 500);
console.log(`In stock under R500: ${inStockUnder500.map((product) => `${product.name} (R${product.price})`).join(", ")}`);

console.log('');
console.log('----------------------------------------------------');
console.log('');

// TODO (step 4): use find to get the product with id 4, and log its name.

const product4 = products.find((product) => product.id === 4);
console.log(`Product 4: ${product4.name} costs R${product4.price}`);

console.log('');
console.log('----------------------------------------------------');
console.log('');

// TODO (step 5): use reduce to total the price of all in-stock items.
// Remember the starting value.

const productsInStock = products.filter((product) => product.inStock);
const totalProductPrices = productsInStock.reduce((product, n) => product + n.price , 0);
console.log("The total price of all in stock items is : " + totalProductPrices);

console.log('');
console.log('----------------------------------------------------');
console.log('');

// TODO (step 6): immutably mark product 2 as out of stock, using map and spread.
// Store the result in a new variable; do not change products.

const changeStockID2 = products.map(product => 
    product.id == 2
    ? { ...product, inStock: false}
    : product
);



console.log(changeStockID2[1]);

console.log('');
console.log('----------------------------------------------------');

console.log('');
// TODO (step 7): immutably remove product 5, using filter.

const removeProd5 = products
    .filter(p => p.id != 5)

console.log(removeProd5);

console.log('');
console.log('----------------------------------------------------');
console.log('');

// TODO (step 8): log every result with a label, using template literals.
// Tip: `${someArray}` prints [object Object] for objects, so map each product
// to a readable string first.

const formatProduct = ({ id, name, price, category, inStock }) =>
  id + '. ' + name + ' - R' + price + ' [' + category + '] ' + (inStock ? 'in stock' : 'OUT OF STOCK');

const formatList = (list) => list.map(formatProduct).join('\n');

console.log('Names: ' + productNames.join(', '));

console.log('');
console.log('----------------------------------------------------');
console.log('');

console.log('In stock under R500:\n' + formatList(inStockUnder500));

console.log('');
console.log('----------------------------------------------------');
console.log('');

console.log('Product 4: ' + product4.name + ' costs R' + product4.price);

console.log('');
console.log('----------------------------------------------------');
console.log('');

console.log('Total of in-stock items: R' + totalProductPrices);

console.log('');
console.log('----------------------------------------------------');
console.log('');

console.log('After marking id 2 out of stock:\n' + formatList(changeStockID2));

console.log('');
console.log('----------------------------------------------------');
console.log('');

console.log('After removing id 5:\n' + formatList(removeProd5));

console.log('');
console.log('----------------------------------------------------');
console.log('');


// TODO: prove immutability. Log the original products array here and check that
// product 2 is still in stock and product 5 is still there.

const originalProduct2 = products.find((p) => p.id === 2);
const originalProduct5 = products.find((p) => p.id === 5);

console.log('Original products array:\n' + formatList(products));
console.log('Product 2 still in stock? ' + originalProduct2.inStock);
console.log('Product 5 still present? ' + Boolean(originalProduct5) + ' (' + originalProduct5.name + ')');