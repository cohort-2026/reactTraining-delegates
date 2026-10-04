# TaskBoard: Day 6 starter

This is the Day 5 Lab 5.3 TaskBoard in JavaScript. Use it as the source for Lab 6.1, or continue with your own TaskBoard from Day 5. Lab 6.1 creates a separate TypeScript project; it does not convert this folder in place.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). The first run loads five starter tasks from JSONPlaceholder, so it needs an internet connection.

## Lab 6.1: create the TypeScript project

From the directory containing `taskboard`, create a new Vite project:

```bash
npm create vite@latest taskboard-ts -- --template react-ts --eslint
cd taskboard-ts
npm install
```

Bring the TaskBoard source files across, rename `.jsx` files to `.tsx` and `.js` files to `.ts`, define the task types, and type the components, Hooks, events and refs. The completed result is in `../../solution/lab-6.1-taskboard-typescript/`.
