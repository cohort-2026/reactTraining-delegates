# TaskBoard: Lab 6.1 solution (Convert TaskBoard to TypeScript)

TaskBoard after **Lab 6.1: Convert TaskBoard to TypeScript**. It is a new project created with `npm create vite@latest taskboard-ts -- --template react-ts --eslint`, with the Day 5 source files brought across and typed. It works exactly as the Lab 5.3 TaskBoard did.

Built on: `../../starter/taskboard` (the Lab 5.3 solution).

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). You need an internet connection the first time, to load the starter tasks.

- `npx tsc --noEmit -p tsconfig.app.json` checks the types and prints nothing when there are no errors.
- `npm run lint` runs ESLint; `npm run build` runs `tsc -b` and then makes a production build.

## What changed in this lab

- New project from the `react-ts` template (with `--eslint`). The template's `index.html`, `main.tsx` (with `!` after `getElementById("root")`), `tsconfig` files and `vite.config.ts` are kept; the page title is `TaskBoard`.
- Components renamed to `.tsx` and Hooks to `.ts`. Import paths no longer include file extensions.
- New `src/types.ts` with the `Status` union and the `Task` interface (`assignee?` and `tags?` are optional).
- Every component has a Props type: `HeaderProps`, `AddTaskFormProps`, `BoardProps`, `ColumnProps`, `TaskCardProps`, and `ButtonProps` and `CardProps` in `components/ui`.
- `useLocalStorage<T>` returns `[value, setValue] as const`; `App` calls `useLocalStorage<Task[] | null>("tasks", null)`, and its updaters use `prev ?? []` because the stored value can be `null`.
- `useFetch<T>(url): FetchState<T>` is generic. TaskBoard does not use it at the moment, but it is kept for later.
- The seed mapping moved to `src/data/seed.ts` as `toTasks(todos: Todo[]): Task[]`.
- Events and refs are typed: `useRef<HTMLInputElement>(null)`, `ChangeEvent<HTMLInputElement>`, `ChangeEvent<HTMLSelectElement>` with `e.target.value as Status`, and `SubmitEvent<HTMLFormElement>`.
- The practice components from earlier labs that `App` no longer rendered were left out (`Accordion`, `Counter`, `ThemeToggle`, `ProductSearch`, `WeatherDashboard`, `components/catalogue`), together with the unused `src/data/tasks.js` and their CSS. `components/ui/Button` and `Card` are kept.
- `.catch` handlers type the error as `unknown` and use `if` statements instead of `condition && call()`, which the TypeScript ESLint rules report as an unused expression.

## Done when

- `npx tsc --noEmit -p tsconfig.app.json` reports zero errors
- There are no `any` types in the code
- All Day 5 features still work
