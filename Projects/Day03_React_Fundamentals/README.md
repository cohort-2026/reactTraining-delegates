# Day 3 projects: React Fundamentals

Every Day 3 lab is built inside your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable TaskBoard project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own TaskBoard from Day 2). It is an exact copy of the Day 2 Lab 2.3 solution, with `TODO` comments where today's labs change the code.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 3.1 Build a Reusable Component Set | `solution/lab-3.1-component-set/` | `starter/taskboard/` |
| 3.2 Render a Product Catalogue from Static Data | `solution/lab-3.2-product-catalogue/` | `solution/lab-3.1-component-set/` |
| 3.3 TaskBoard: Static Task List UI | `solution/lab-3.3-taskboard/` | `solution/lab-3.2-product-catalogue/` |

## The labs

- **Lab 3.1:** generic `Button` and `Card` components in `src/components/ui`, using props, default values and `children`.
- **Lab 3.2:** a product catalogue in a temporary `src/components/catalogue` folder: `products.js`, `ProductCard` with an **Out of stock** badge, and `ProductGrid` with keys and a **No products** message. Rendered in `App` for now.
- **Lab 3.3:** the static board. Tasks move to `src/data/tasks.js` with a `status` field and string ids; `Header`, `Board`, `Column` and `TaskCard` render three columns. `App.jsx` renders only `Header` and `Board`.

## How to run any project here

```bash
cd solution/lab-3.3-taskboard   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` makes a production build.

## What comes next

Day 4 starts from `solution/lab-3.3-taskboard`: `Projects/Day04_State_and_Interactivity/starter/taskboard` is an exact copy of it.

Requirements: Node.js 24 LTS and npm.
