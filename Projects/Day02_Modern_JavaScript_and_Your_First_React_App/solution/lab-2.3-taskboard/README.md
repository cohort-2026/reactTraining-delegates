# TaskBoard: Lab 2.3 solution

The TaskBoard capstone project, freshly scaffolded with Vite (React template, JavaScript, ESLint) and customised as described in **Lab 2.3: Scaffold the TaskBoard Capstone** in the Day 2 handbook.

This is also the starting point for Day 3: `Projects/Day03_React_Fundamentals/starter/taskboard` is a copy of this folder.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). Stop the server with **Ctrl+C**.

Other scripts:

| Command | What it does |
|---|---|
| `npm run lint` | Checks the code with ESLint |
| `npm run build` | Creates the production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## What changed in this lab

- Created with `npm create vite@latest taskboard -- --template react --eslint`.
- `src/App.jsx` replaced with a TaskBoard heading and a short tagline (the `App.css` and image imports were removed).
- `src/index.css` cleared to a simple starting point (system font, page colours).
- `src/App.css` cleared; it is no longer imported. You import it again in Lab 3.1.
- The page title in `index.html` is now `<title>TaskBoard</title>`.
- The project name in `package.json` is `taskboard`.

Pushing to GitHub (steps 6 and 7) happens in your own copy, so it is not part of this folder.
