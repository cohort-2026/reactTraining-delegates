# TaskBoard: Lab 4.2 solution (Shopping Cart)

TaskBoard after **Lab 4.2: Shopping Cart**. The Lab 3.2 product catalogue in `src/components/catalogue` gains a cart, with the cart state lifted into a new `Shop` component.

Built on: `../lab-4.1-counter-toggle-accordion`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/components/catalogue/Shop.jsx`: owns `cart` state, an array of `{ productId, quantity }`. Adding a product already in the cart increases its quantity; changing a quantity to zero removes the line; **Remove** deletes a line. Every update is immutable.
- New `src/components/catalogue/Cart.jsx`: plus, minus and **Remove** buttons per line. The item count and total price are derived with `reduce` on every render, never stored.
- `ProductGrid.jsx` receives `onAddToCart` and passes it to each card.
- `ProductCard.jsx` has an **Add to cart** button, disabled for out-of-stock products.
- `src/App.jsx` renders `<Shop />` in a temporary section below the board (the Lab 4.1 components are no longer rendered, but their files stay).
- `src/App.css` adds the shop and cart layout.

## Done when

- There are no duplicate lines in the cart
- Totals are always correct
- No cart totals are stored in state
