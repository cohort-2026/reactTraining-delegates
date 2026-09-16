# TaskBoard: Day 4 starter

Your TaskBoard project as it stands at the end of Day 3. It is an exact copy of `Projects/Day03_React_Fundamentals/solution/lab-3.3-taskboard`, with `TODO` comments where today's labs change the code.

All three Day 4 labs are built inside this project:

| Lab | Where the `TODO` comments are |
|---|---|
| 4.1 Counter, Toggle and Accordion Exercises | `src/App.jsx` (you create `src/components/Counter.jsx`, `ThemeToggle.jsx` and `Accordion.jsx`) |
| 4.2 Shopping Cart | `src/App.jsx`, `src/components/catalogue/ProductCard.jsx` and `ProductGrid.jsx` (you create `Shop.jsx` and `Cart.jsx` in the same folder) |
| 4.3 TaskBoard: Add, Complete, Edit and Delete | `src/App.jsx`, `src/components/Header.jsx`, `Board.jsx`, `Column.jsx` and `TaskCard.jsx` (you create `AddTaskForm.jsx`) |

The static board is working: tasks have `id` (a string), `title`, `assignee` (optional), `points` and `status` (`"todo"`, `"doing"` or `"done"`).

If you already have your own TaskBoard from Day 3, keep using it. Use this folder only if you need a clean starting point.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). Run `npm run lint` to check your code with ESLint.
