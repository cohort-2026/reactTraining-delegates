# TaskBoard: Lab 3.3 solution (Static Task List UI)

TaskBoard after **Lab 3.3: TaskBoard: Static Task List UI**, the last lab of Day 3. The board renders three columns of tasks from mock data using a clean component tree: `App`, `Header`, `Board`, three `Column`s and the `TaskCard`s inside them.

Built on: `../lab-3.2-product-catalogue`. This is the Day 4 starting point: `Projects/Day04_State_and_Interactivity/starter/taskboard` is a copy of this folder.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/data/tasks.js`: a named export `tasks` with 8 tasks. `done` is replaced by **`status`** (`"todo"`, `"doing"` or `"done"`), ids are strings such as `"1"`, and task `"3"` has no `assignee`.
- New `src/components/Header.jsx`: the app name and the total task count.
- New `src/components/Board.jsx`: describes the columns once as data and renders a `Column` per status, each with a `key`, filtering the tasks by `status`.
- New `src/components/Column.jsx`: the heading with its count, **Nothing here yet** when empty, otherwise a list of `TaskCard`s keyed by `task.id` (it spreads `{...task}`).
- New `src/components/TaskCard.jsx`: the title, the assignee line (hidden when missing) and the points (only when `points > 0`).
- `src/App.jsx` renders only `Header` and `Board`. `ProductGrid` and the Lab 3.1 demo cards were removed from `App`; their files stay for later labs.
- `src/App.css` styles `.board` as three columns with CSS Grid.

## Done when

- Three columns show the correct tasks
- The counts in the column headings are correct
- `App.jsx` renders only `Header` and `Board`
