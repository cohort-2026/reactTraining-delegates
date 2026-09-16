# Bug-fix exercises

Every day of the course has two small bug-fix exercises. Each one is a realistic piece of code, built only from that day's topics, with some deliberate mistakes in it. Your job is to find them, understand why they are wrong, and fix them.

## How the folder works

```text
Exercises/
  DayNN_<Title>/
    exercise-1-<name>/    warm-up: 3 bugs
    exercise-2-<name>/    harder: 4 or 5 bugs
```

Each exercise folder has its own `README.md`. Read it first. It tells you:

- the scenario and what the code **should** do (the expected output, or a checklist of behaviour);
- how to run it (one or two commands);
- how many bugs there are;
- which handbook sections to revise;
- a few hints, hidden in `<details>` blocks, for when you are stuck.

## How to work through an exercise

1. Run the code **before** you change anything, and compare what you see with the expected behaviour in the README.
2. Read every error message and warning in full. Start with the one that names a file and a line.
3. Fix **one** bug at a time, then run the code again.
4. Where the exercise has a self-check (`npm test`, `npm run lint`), you are finished when it passes and the output matches the README. Do not change the test files.
5. Stuck for more than ten minutes? Open one hint, then keep going. The bugs are never marked in the code.

Some bugs make the code crash; many just give the wrong answer quietly. Checking the output against the data yourself is part of the exercise.

## Exercises by day

| Day | Exercise 1 (warm-up) | Exercise 2 (harder) | How to run |
|---|---|---|---|
| [Day 1: Web and JavaScript Essentials](Day01_Web_and_JavaScript_Essentials/) | [Tip Splitter](Day01_Web_and_JavaScript_Essentials/exercise-1-tip-splitter/): functions, `===`, loops (3 bugs) | [Sprint Report](Day01_Web_and_JavaScript_Essentials/exercise-2-sprint-report/): arrays of objects, `if / else if`, `const` and `let` (5 bugs) | `node <file>.js` |
| [Day 2: Modern JavaScript and Your First React App](Day02_Modern_JavaScript_and_Your_First_React_App/) | [Stock Report](Day02_Modern_JavaScript_and_Your_First_React_App/exercise-1-stock-report/): `map`, `reduce`, immutability (3 bugs) | [To-do Report](Day02_Modern_JavaScript_and_Your_First_React_App/exercise-2-todo-report/): `fetch`, `async`/`await`, error handling, `?.` and `??` (5 bugs; works offline) | `node <file>.js` |
| [Day 3: React Fundamentals](Day03_React_Fundamentals/) | [Team Directory](Day03_React_Fundamentals/exercise-1-team-directory/): JSX rules, keys, conditional rendering (3 bugs) | [Conference Schedule](Day03_React_Fundamentals/exercise-2-conference-schedule/): props, `children`, lists, conditional rendering (5 bugs) | `npm install`, then `npm test` or `npm run dev` |
| [Day 4: State and Interactivity](Day04_State_and_Interactivity/) | [Scoreboard](Day04_State_and_Interactivity/exercise-1-scoreboard/): event handlers, `useState`, controlled inputs (3 bugs) | [Holiday Packing List](Day04_State_and_Interactivity/exercise-2-packing-list/): immutable updates, derived state, checkboxes (4 bugs) | `npm install`, then `npm test` or `npm run dev` |
| [Day 5: Effects, Refs and Custom Hooks](Day05_Effects_Refs_and_Custom_Hooks/) | [Focus Timer](Day05_Effects_Refs_and_Custom_Hooks/exercise-1-focus-timer/): `useEffect` cleanup and dependencies, `useRef` (3 bugs) | [Author Posts](Day05_Effects_Refs_and_Custom_Hooks/exercise-2-author-posts/): data fetching, custom Hooks, the Rules of Hooks, `localStorage` (5 bugs; works offline) | `npm install`, then `npm test` or `npm run dev` |
| [Day 6: TypeScript and Routing](Day06_TypeScript_and_Routing/) | [Sprint Task List](Day06_TypeScript_and_Routing/exercise-1-typed-task-list/): typing state, props and optional fields (3 bugs) | [Project Hub](Day06_TypeScript_and_Routing/exercise-2-project-hub-routing/): React Router routes, parameters, links and protected routes (5 bugs) | `npm install`, then `npm run typecheck`, `npm test` or `npm run dev` |
| [Day 7: State Management and Server State](Day07_State_Management_and_Server_State/) | [Theme and Task Reducer](Day07_State_Management_and_Server_State/exercise-1-theme-and-task-reducer/): Context providers, `useReducer`, typed actions (3 bugs) | [Task Filters, Store and Query](Day07_State_Management_and_Server_State/exercise-2-task-filters-store-and-query/): Zustand selectors, TanStack Query keys, mutations and invalidation (5 bugs) | `npm install`, then `npm test` or `npm run dev` |
| [Day 8: Styling, Forms and React 19 Features](Day08_Styling_Forms_and_React_19_Features/) | [Sign-up Form Validation](Day08_Styling_Forms_and_React_19_Features/exercise-1-signup-form-validation/): React Hook Form, Zod 4, accessible errors, Tailwind dark mode (3 bugs) | [Quick Add with Actions](Day08_Styling_Forms_and_React_19_Features/exercise-2-quick-add-actions/): `useActionState`, `useFormStatus`, `useOptimistic`, error handling (5 bugs) | `npm install`, then `npm test` or `npm run dev` |
| [Day 9: Full-Stack React with Next.js](Day09_Full_Stack_React_with_Next_js/) | [Project Pages](Day09_Full_Stack_React_with_Next_js/exercise-1-project-pages/): Server and Client Components, dynamic routes, error files (3 bugs) | [TaskBoard Auth](Day09_Full_Stack_React_with_Next_js/exercise-2-taskboard-auth/): Server Actions, revalidation, Supabase auth, keys and Row Level Security (5 bugs; works offline) | `npm install`, then `npm run build`, `npm test` or `npm run dev` |
| [Day 10: Performance, Testing and Deployment](Day10_Performance_Testing_and_Deployment/) | [Board Performance](Day10_Performance_Testing_and_Deployment/exercise-1-board-performance/): `memo`, `useMemo`, `useCallback` (3 bugs) | [Tests and CI](Day10_Performance_Testing_and_Deployment/exercise-2-tests-and-ci/): Vitest, Testing Library, MSW, GitHub Actions (5 bugs) | `npm install`, then `npm test` |
