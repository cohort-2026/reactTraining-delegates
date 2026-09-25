# TaskBoard: Lab 3.2 solution (Product Catalogue)

TaskBoard after **Lab 3.2: Render a Product Catalogue from Static Data**. The catalogue is built inside TaskBoard in a temporary `src/components/catalogue` folder, and Lab 4.2 reuses it.

Built on: `../lab-3.1-component-set`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/components/catalogue/products.js`: a named export `products` with 8 products (`id`, `name`, `price`, `category`, `inStock`, `rating`). Two are out of stock, and one has a rating of `0` so you can see the `0 &&` trap handled.
- New `src/components/catalogue/formatPrice.js`: formats a price as South African rand with `Intl.NumberFormat("en-ZA", ...)` (the handbook hint), kept in one place so Lab 4.2's cart can reuse it.
- New `src/components/catalogue/ProductCard.jsx`: shows the name, price and a star rating (`"★".repeat(rating)`, only when `rating > 0`), plus an **Out of stock** badge only when `inStock` is `false`.
- New `src/components/catalogue/ProductGrid.jsx`: maps products to `ProductCard`s with `key={product.id}`, and shows **No products** when the array is empty (try `products={[]}` in `App.jsx`).
- `src/App.jsx` renders `ProductGrid` below the Lab 3.1 cards, for now. You remove it from `App` in Lab 3.3.
- `src/App.css` styles the grid with CSS Grid, and the badge.

## Done when

- 8 cards render in a grid
- Out of stock badges appear on the right products
- An empty array shows the message
