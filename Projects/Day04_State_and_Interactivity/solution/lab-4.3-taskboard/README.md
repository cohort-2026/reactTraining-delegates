# TaskBoard: Lab 4.3 solution (Add, Complete, Edit and Delete)

TaskBoard after **Lab 4.3: TaskBoard: Add, Complete, Edit and Delete**, the last lab of Day 4. TaskBoard is now a working app: the task list is state in `App`, and handlers flow down through `Board` and `Column` to each `TaskCard`.

Built on: `../lab-4.2-shopping-cart`. This is the Day 5 starting point: `Projects/Day05_Effects_Refs_and_Custom_Hooks/starter/taskboard` is a copy of this folder.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- `src/App.jsx` keeps `tasks` in `useState`, initialised with `import { tasks as initialTasks } from "./data/tasks.js"`. It has `handleAdd` (new tasks get a `crypto.randomUUID()` id and `status: "todo"`), `handleStatusChange`, `handleRename` and `handleDelete`, all immutable. `App` renders `Header`, `AddTaskForm` and `Board`; `Shop` is no longer rendered.
- New `src/components/AddTaskForm.jsx`: controlled `title`, `assignee` and `points` fields in one state object, with validation (the title needs 3+ characters) and `Number()` for points.
- `src/components/Header.jsx` shows a derived count, for example "2 of 8 done".
- `src/components/Board.jsx` and `Column.jsx` pass `onStatusChange`, `onRename` and `onDelete` down. `Column` now passes `task={task}` instead of spreading `{...task}`.
- `src/components/TaskCard.jsx` receives `task` and the handlers. It has a status dropdown to move the task between columns, **Delete** with `window.confirm()`, and inline **Edit** with local `isEditing` and `draft` state.
- `src/App.css` adds styles for the form and the card controls.

## Done when

- Tasks can be added, moved, edited and deleted
- Counts update instantly
- There is no mutation anywhere

Refreshing the page resets the board to the sample data. You fix that on Day 5.
