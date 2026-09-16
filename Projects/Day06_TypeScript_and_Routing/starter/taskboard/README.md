# TaskBoard: Day 6 starter

Your TaskBoard project as it stands at the end of Day 5, still in JavaScript. It is an exact copy of `Projects/Day05_Effects_Refs_and_Custom_Hooks/solution/lab-5.3-taskboard`, with `TODO` comments where today's labs change the code.

If you already have your own TaskBoard from Day 5, keep using it. Use this folder only if you need a clean starting point.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). The first run loads five starter tasks from JSONPlaceholder, so you need an internet connection.

## Lab 6.1: where to begin

Lab 6.1 converts this project into a **new** TypeScript project next to it. From the folder that contains `taskboard`:

```bash
npm create vite@latest taskboard-ts -- --template react-ts --eslint
cd taskboard-ts
npm install
```

Then copy this project's `src` folder into `taskboard-ts`, replacing the template's files, rename `.jsx` files to `.tsx` and `.js` files to `.ts`, create `src/types.ts`, and run `npx tsc --noEmit -p tsconfig.app.json` until it reports nothing.

Some files in `src` are practice code from earlier labs that `App` no longer renders (`Accordion`, `Counter`, `ThemeToggle`, `ProductSearch`, `WeatherDashboard`, `components/catalogue` and `data/tasks.js`). Their `TODO` comments say you can leave them out of `taskboard-ts`. Keep `components/ui/Button` and `Card`: you replace them with shadcn/ui on Day 8.

| Lab | Where the `TODO` comments are |
|---|---|
| 6.1 Convert TaskBoard to TypeScript | `src/App.jsx`, `src/main.jsx`, every component in `src/components` and both Hooks in `src/hooks` (you create `src/types.ts`) |
| 6.2 Multi-Page TaskBoard | `src/App.jsx`, `src/main.jsx` and `src/components/Header.jsx` (you create `src/pages`) |
| 6.3 Protected Routes with a Mock Login | `src/App.jsx`, `src/main.jsx` and `src/hooks/useLocalStorage.js` (you create `src/hooks/useAuth.ts`, `src/components/RequireAuth.tsx` and `src/pages/Login.tsx`) |
