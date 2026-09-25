# Answers: Day 6, Exercise 1 (warm-up): Sprint Task List in TypeScript

Exercise folder: `Exercises/Day06_TypeScript_and_Routing/exercise-1-typed-task-list/`
Corrected project: `fixed/` (run `npm install`, then `npm run typecheck`, `npm test -- --run`, `npm run build`, `npm run lint`).

The exercise has **3 bugs**: two in `src/App.tsx` and one in `src/components/TaskItem.tsx`. Line numbers refer to the broken files. The project uses the unmodified `react-ts` template `tsconfig` files.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/App.tsx`, line 4 | `npm run typecheck`: `error TS1484: 'Status' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled` (and the same for `'Task'`). **Browser: blank page**, Console: `SyntaxError: The requested module '/src/types.ts' does not provide an export named 'Status'`. `npx vite build` on its own: `[MISSING_EXPORT] "Status" is not exported by "src/types.ts"`. The Vitest tests do **not** catch this one | With `verbatimModuleSyntax`, an import without `type` is kept in the JavaScript output. `types.ts` contains only types, which are erased, so at runtime the module has no `Status` or `Task` export | Type-only imports with `import type`. Module 6.2 "Moving TaskBoard to TypeScript" (Troubleshooting callout); Lab 6.1 Troubleshooting |
| 2 | `src/App.tsx`, line 7 | `npm run typecheck`: `TS2345: Argument of type '(prev: never[]) => Task[]' is not assignable to parameter of type 'SetStateAction<never[]>'` (line 17) and the same for `handleStatusChange` (line 21), plus knock-on errors `Property 'id' does not exist on type 'never'` (lines 22, 42), `Property 'status' does not exist on type 'never'` (line 26) and `Spread types may only be created from object types` (line 22). The app itself behaves correctly at runtime, so no test fails | `useState([])` with no generic infers the state as `never[]`, "an array that can never hold anything", so adding a `Task` is a type error and every item read from it is `never` | Generics: empty arrays need a type argument, `useState<Task[]>([])`. Module 6.1 "Generics: types with parameters" (Troubleshooting callout); Module 6.2 "Typing state, events and refs"; Lab 6.1 Troubleshooting |
| 3 | `src/components/TaskItem.tsx`, line 10 | `npm run typecheck`: `error TS18048: 'task.assignee' is possibly 'undefined'`. Browser (once bug 1 is fixed): adding a task with an empty Assignee box crashes the app, Console `TypeError: Cannot read properties of undefined (reading 'split')`. Test "adds a task without an assignee" fails with the same error | `assignee` is optional (`assignee?: string`), so its type is `string \| undefined`. Calling `.split` on it without handling `undefined` crashes for unassigned tasks | Optional properties must be handled, for example with `?.` and `??`. Module 6.1 "Object types, unions and optional fields" |

The three bugs are independent: fixing one removes exactly its own errors. Before any fix `tsc` reports 9 errors; after bug 1 it reports 7, after bugs 1 and 2 it reports 1.

## Fixes

**Bug 1: missing `import type`**

```tsx
// Before
import { Status, Task } from "./types";

// After
import type { Status, Task } from "./types";
```

**Bug 2: `useState([])` without a generic**

```tsx
// Before
const [tasks, setTasks] = useState([]);

// After
const [tasks, setTasks] = useState<Task[]>([]);
```

**Bug 3: optional property used as if always present**

```tsx
// Before
const owner = task.assignee.split(" ")[0];

// After
const owner = task.assignee?.split(" ")[0] ?? "Unassigned";
```

An `if` check or a ternary (`task.assignee ? task.assignee.split(" ")[0] : "Unassigned"`) is equally correct. Reject `task.assignee!.split(...)`: the non-null assertion silences the error but keeps the crash. Also reject changing the type to `assignee: string`, which moves the problem into `App.tsx` and misdescribes the data.

## Debrief suggestion (5 to 10 minutes)

- Ask who looked at the browser first and who ran `npm run typecheck` first. Bug 1 is the only one that breaks the page, and its browser message does not mention types at all. The type checker explains it precisely.
- Show that the tests passed for bugs 1 and 2. Types and tests catch different things: a green test run is not a green `tsc` run, which is why `npm run build` runs `tsc -b` first.
- For bug 2, point out how one missing generic produced six error messages on five lines. Fix the first error, re-run, repeat.
- For bug 3, stress that TypeScript found a real runtime crash before anyone typed an empty assignee. Discuss why `!` is the wrong fix.
