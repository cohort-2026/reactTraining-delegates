# Lab 2.1 solution: Data Transformation Drills

## How to run

Needs Node.js LTS (Node 24). From this folder:

```bash
node lab2-1.js
```

## Expected output

```text
Names: Wireless Mouse, USB-C Charger, Noise-Cancelling Headphones, Learning React, A5 Notebook, Clean Code
In stock under R500 (3):
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (in stock)
  #6 Clean Code: R480 (in stock)
Product 4: Learning React
Total price of in-stock items: R4147
After marking product 2 out of stock:
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (out of stock)
  #3 Noise-Cancelling Headphones: R2499 (in stock)
  #4 Learning React: R520 (in stock)
  #5 A5 Notebook: R85 (out of stock)
  #6 Clean Code: R480 (in stock)
After removing product 5 (5 products):
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (in stock)
  #3 Noise-Cancelling Headphones: R2499 (in stock)
  #4 Learning React: R520 (in stock)
  #6 Clean Code: R480 (in stock)
Original products (6 products, unchanged):
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (in stock)
  #3 Noise-Cancelling Headphones: R2499 (in stock)
  #4 Learning React: R520 (in stock)
  #5 A5 Notebook: R85 (out of stock)
  #6 Clean Code: R480 (in stock)
```

The last block is the proof of immutability: after steps 6 and 7, product 2 is still in stock and product 5 is still there in the original `products` array.

## What changed in this lab

- **Step 2:** `products.map((p) => p.name)` gives an array of names, joined with `", "` for logging.
- **Step 3:** `filter` with two conditions, `p.inStock && p.price < 500`.
- **Step 4:** `find((p) => p.id === 4)`, read with `?.` and `??` in case nothing matches.
- **Step 5:** a chain: `filter` the in-stock items, then `reduce((sum, p) => sum + p.price, 0)` with a starting value of `0`.
- **Step 6:** `map` with a ternary and spread: `p.id === 2 ? { ...p, inStock: false } : p`. This is exactly how you will update one task in TaskBoard.
- **Step 7:** `filter((p) => p.id !== 5)` removes a product without touching the original.
- **Step 8:** every result is logged with a template literal. A small `describe` arrow function uses parameter destructuring (`({ id, name, price, inStock }) => ...`) to turn each product into a readable line.

## Stretch challenge (not part of the solution file)

Group the products by category with `reduce`:

```js
const byCategory = products.reduce((groups, p) => {
  const list = groups[p.category] ?? [];
  return { ...groups, [p.category]: [...list, p] };
}, {});
console.log(Object.keys(byCategory)); // [ 'electronics', 'books', 'stationery' ]
```
