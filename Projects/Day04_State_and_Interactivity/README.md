# Day 4 projects: State and Interactivity

Every Day 4 lab is built inside your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable TaskBoard project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own TaskBoard from Day 3). It is an exact copy of the Day 3 Lab 3.3 solution, with `TODO` comments where today's labs change the code.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 4.1 Counter, Toggle and Accordion Exercises | `solution/lab-4.1-counter-toggle-accordion/` | `starter/taskboard/` |
| 4.2 Shopping Cart | `solution/lab-4.2-shopping-cart/` | `solution/lab-4.1-counter-toggle-accordion/` |
| 4.3 TaskBoard: Add, Complete, Edit and Delete | `solution/lab-4.3-taskboard/` | `solution/lab-4.2-shopping-cart/` |

## The labs

- **Lab 4.1:** `Counter`, `ThemeToggle` and `Accordion` in `src/components`, practising `useState`, events, updater functions and lifting state up. Rendered below the board while you work on the lab.
- **Lab 4.2:** a shopping cart for the Lab 3.2 catalogue: `Shop` owns the cart state, `Cart` shows lines with derived totals, and `ProductCard` gets an **Add to cart** button. Rendered below the board while you work on the lab.
- **Lab 4.3:** the interactive TaskBoard. `tasks` becomes state in `App`; you add tasks with `AddTaskForm`, move them with a status dropdown, rename them inline and delete them, and `Header` shows "x of y done".

## How to run any project here

```bash
cd solution/lab-4.3-taskboard   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` makes a production build.

## What comes next

Day 5 starts from `solution/lab-4.3-taskboard`: `Projects/Day05_Effects_Refs_and_Custom_Hooks/starter/taskboard` is an exact copy of it.

Requirements: Node.js 24 LTS and npm.
