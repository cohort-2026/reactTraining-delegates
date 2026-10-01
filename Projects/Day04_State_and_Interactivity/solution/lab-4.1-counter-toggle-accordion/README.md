# TaskBoard: Lab 4.1 solution (Counter, Toggle and Accordion)

TaskBoard after **Lab 4.1: Counter, Toggle and Accordion Exercises**. Three small practice components are added inside TaskBoard and rendered below the static board while you work on the lab.

Built on: `Projects/Day03_React_Fundamentals/solution/lab-3.3-taskboard`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/components/Counter.jsx`: **Minus**, **Plus**, **Plus 5** and **Reset** buttons. Minus uses `Math.max(0, c - 1)` so the count never goes below zero, and Plus 5 calls the updater form `setCount((c) => c + 1)` in a loop.
- New `src/components/ThemeToggle.jsx`: switches a `light` or `dark` class on its wrapper.
- New `src/components/Accordion.jsx`: an `AccordionItem` that receives `isOpen` and `onToggle`, and an `Accordion` parent that lifts the open state up as an array of open ids, with a derived **Show all / Hide all** button.
- `src/App.jsx` renders the three components in a temporary "Lab 4.1 practice" section below the board.
- `src/App.css` adds styles for the practice section, the themes and the accordion.

## Done when

- The counter never shows a negative number
- Accordion items open and close independently
- Show all / Hide all controls every item
