# TaskBoard: Lab 2.3 starter

Lab 2.3 starts from nothing but a command, so there is no starter code. You create the TaskBoard project yourself.

Create it directly inside your `react-course` folder, **not** inside `day2`.

## 1. Create and run the project

```bash
cd react-course
npm create vite@latest taskboard -- --template react --eslint
cd taskboard
npm install
npm run dev
```

- If npm asks `Need to install the following packages: create-vite ... Ok to proceed?`, type `y` and press Enter.
- If it asks **Which linter to use?**, you left out `--eslint`. Choose **ESLint**.
- Open the **Local** URL Vite prints (usually `http://localhost:5173`).

## 2. Customise it

Follow steps 3 to 5 of Lab 2.3 in the Day 2 handbook: replace `src/App.jsx`, clear `src/index.css` and `src/App.css`, and set `<title>TaskBoard</title>` in `index.html`.

## 3. Push it to GitHub

Create a new **empty** repository called `taskboard` on GitHub, then in a second terminal inside `taskboard`:

```bash
git init
git add .
git commit -m "Scaffold TaskBoard with Vite"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

If you get stuck, compare your project with `../../solution/lab-2.3-taskboard`.
