# TaskBoard: Lab 3.1 solution (Reusable Component Set)

TaskBoard after **Lab 3.1: Build a Reusable Component Set**. It adds two generic UI components, `Button` and `Card`, that use props, default values and `children`.

Built on: `Projects/Day02_Modern_JavaScript_and_Your_First_React_App/solution/lab-2.3-taskboard`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` checks the code; `npm run build` makes a production build.

## What changed in this lab

- New `src/components/ui/Button.jsx`: props `variant` (default `"primary"`), `size` (default `"md"`) and `children`; the class name is built with a template literal (`btn btn-primary btn-md`).
- New `src/components/ui/Card.jsx`: props `title`, `variant` (default `"default"`) and `children`; the heading only renders when a `title` is passed.
- `src/App.jsx` imports `./App.css` again and renders a `Card` with two `Button`s, plus a `Card` with no title.
- `src/App.css` has the page layout and the `.btn`, `.btn-primary`, `.btn-secondary`, size and `.card` styles.

## Done when

- `Button` renders both variants
- `Card` shows a title only when one is passed
- There are no console warnings
