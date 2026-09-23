// Stock report for a small online shop
// Uses array methods, destructuring and spread. No for loops.

const products = [
  {
    id: 1,
    name: "Wireless mouse",
    price: 250,
    category: "electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "USB-C cable",
    price: 120,
    category: "electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Noise-cancelling headphones",
    price: 1800,
    category: "electronics",
    inStock: false,
  },
  {
    id: 4,
    name: "JavaScript notebook",
    price: 90,
    category: "books",
    inStock: true,
  },
  { id: 5, name: "Desk lamp", price: 450, category: "home", inStock: true },
  {
    id: 6,
    name: "Mechanical keyboard",
    price: 1200,
    category: "electronics",
    inStock: false,
  },
];

// 1. All product names
const names = products.map((p) => p.name);
console.log(`Names: ${names.join(", ")}`);

// 2. In-stock products under R500
const bargains = products
  .filter((p) => p.inStock && p.price < 500)
  .map((p) => `${p.name} (R${p.price})`);
console.log(`In stock under R500: ${bargains.join(", ")}`);

// 3. One product, destructured
const { name, price } = products.find((p) => p.id === 4);
console.log(`Product 4: ${name} costs R${price}`);

// 4. Value of everything in stock
const stockValue = products
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log(`Value of stock on hand: R${stockValue}`);

// 5. Mark product 2 as out of stock, without changing the original
const updated = products.map((p) =>
  p.id === 2 ? { ...p, inStock: false } : p,
);
const outOfStock = updated.filter((p) => !p.inStock).map((p) => p.id);
console.log(`Out of stock after update: ${outOfStock.join(", ")}`);

// 6. Remove product 5, without changing the original
const remaining = products.filter((p) => p.id !== 5);
console.log(`Products left after removing 5: ${remaining.length}`);

// 7. Cheapest and most expensive
const byPrice = [...products].sort((a, b) => a.price - b.price);
console.log(`Cheapest: ${byPrice[0].name}`);
console.log(`Most expensive: ${byPrice[byPrice.length - 1].name}`);

// 8. Prove the original array has not changed
console.log(`Original ids in order: ${products.map((p) => p.id).join(", ")}`);
console.log(
  `Original product 2 in stock: ${products.find((p) => p.id === 2).inStock}`,
);
console.log(`Original product count: ${products.length}`);
