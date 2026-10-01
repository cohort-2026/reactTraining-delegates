# Day 2, Exercise 1 (warm-up): Stock Report

## The scenario

A small online shop keeps its products in an array of objects. A developer rewrote the old `for` loop report using today's array methods, spread and destructuring. The script runs without crashing, but some of its answers are wrong. Find and fix the mistakes.

**This exercise contains 3 bugs.**

## What the code should do

`stock-report.js` should:

1. List every product name.
2. List the in-stock products under R500.
3. Destructure the name and price of product 4.
4. Add up the price of every in-stock product.
5. Mark product 2 as out of stock **without changing the original array**.
6. Remove product 5 **without changing the original array**.
7. Show the cheapest and most expensive products.
8. Prove that the original `products` array is exactly as it was at the start.

When the code is fixed, the output is exactly:

```text
Names: Wireless mouse, USB-C cable, Noise-cancelling headphones, JavaScript notebook, Desk lamp, Mechanical keyboard
In stock under R500: Wireless mouse (R250), USB-C cable (R120), JavaScript notebook (R90), Desk lamp (R450)
Product 4: JavaScript notebook costs R90
Value of stock on hand: R910
Out of stock after update: 2, 3, 6
Products left after removing 5: 5
Cheapest: JavaScript notebook
Most expensive: Noise-cancelling headphones
Original ids in order: 1, 2, 3, 4, 5, 6
Original product 2 in stock: true
Original product count: 6
```

## How to run it

Open a terminal in this folder and run:

```bash
node stock-report.js
```

There is no error message to guide you this time, so compare your output with the expected output line by line.

## Revise these handbook sections

Day 2 handbook:

- Module 2.1: Arrow functions and template literals (implicit return)
- Module 2.2: map, filter and find; reduce and chaining; Immutability: copy, do not change
- Lab 2.1 Troubleshooting table

## Hints

<details><summary>Hint 1</summary>

An empty-looking list usually means the array is full of `undefined`. Add `console.log(names)` and look at what `map` really produced.

</details>

<details><summary>Hint 2</summary>

`[object Object]` in a total means an object was used where a number was expected. Where does the running total start?

</details>

<details><summary>Hint 3</summary>

Only the last three lines check the original array. Find the one method in the file that changes the array it is called on.

</details>
