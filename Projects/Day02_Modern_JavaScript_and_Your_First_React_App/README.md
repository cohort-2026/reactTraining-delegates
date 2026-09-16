# Day 2 projects: Modern JavaScript and Your First React App

This folder holds the starting points and finished solutions for the three Day 2 labs. Follow the lab steps in the Day 2 delegate handbook; use the solution folders to check your work or to catch up.

| Lab | Start from | Solution | How to run |
|---|---|---|---|
| 2.1 Data Transformation Drills | `starter/lab-2.1-array-drills/` | `solution/lab-2.1-array-drills/` | `node lab2-1.js` (see that folder's README) |
| 2.2 Fetch and Display Data from a Public API | `starter/lab-2.2-fetch-api/` | `solution/lab-2.2-fetch-api/` | `node lab2-2.js` (see that folder's README) |
| 2.3 Scaffold the TaskBoard Capstone | `starter/lab-2.3-taskboard/` (a README with the commands) | `solution/lab-2.3-taskboard/` | `npm install`, then `npm run dev` |

## Lab 2.1: Data Transformation Drills

Plain JavaScript run with Node. You transform an array of six products with `map`, `filter`, `find` and `reduce`, update and remove items immutably with spread and `filter`, and log everything with template literals. No `for` loops.

## Lab 2.2: Fetch and Display Data from a Public API

Plain JavaScript run with Node (it has `fetch` built in). You write `async function loadTodos(limit)` that loads to-dos from JSONPlaceholder, checks `res.ok`, handles errors with `try` / `catch` / `finally`, and logs a numbered list with done or open markers. You need an internet connection.

## Lab 2.3: Scaffold the TaskBoard Capstone

TaskBoard is the capstone project you build for the rest of the course. There is no starter code: the starter is a README with the exact Vite commands. The solution is the scaffolded Vite React app (JavaScript, ESLint) with the handbook's changes: a TaskBoard heading and tagline in `App.jsx`, simple CSS, and `<title>TaskBoard</title>`.

```bash
cd solution/lab-2.3-taskboard
npm install
npm run dev
```

## What comes next

Day 3 starts from this solution: `Projects/Day03_React_Fundamentals/starter/taskboard` is an exact copy of `solution/lab-2.3-taskboard`, with TODO comments where the Day 3 labs change the code. From Day 3 onwards every lab is built inside TaskBoard.

Requirements: Node.js 24 LTS and npm.
