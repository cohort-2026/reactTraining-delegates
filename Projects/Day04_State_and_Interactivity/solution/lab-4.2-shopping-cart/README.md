# TaskBoard: Lab 4.2 solution (Shopping Cart)

Built on: `../lab-4.1-counter-toggle-accordion`.

This checkpoint carries forward the Day 4.1 exercises and adds a cart for the Day 3 product catalogue.

## How to run

```bash
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to check the project.

## What changed

- `Shop` owns cart state as `{ productId, quantity }` entries.
- Adding an existing product increments its quantity rather than making a duplicate line.
- `Cart` supports increment, decrement, explicit removal and removal when quantity reaches zero.
- Item count and total price are derived from the cart, not stored as state.
- Out-of-stock product buttons are disabled.

The next checkpoint builds on this project and makes TaskBoard tasks interactive.