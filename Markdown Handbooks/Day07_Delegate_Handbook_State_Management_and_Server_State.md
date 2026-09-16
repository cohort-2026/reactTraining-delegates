# Day 7: State Management and Server State

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Choose the right tool for shared application state and for data that lives on a server.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 7 at a glance](#day-7-at-a-glance)
- [Morning recap](#morning-recap)
- [Module 7.1: The Context API](#module-71-the-context-api)
- [Module 7.2: useReducer](#module-72-usereducer)
- [Module 7.3: Global State Libraries](#module-73-global-state-libraries)
- [Module 7.4: Server State with TanStack Query](#module-74-server-state-with-tanstack-query)
- [Hands-on labs](#hands-on-labs)
  - [Lab 7.1: Theme Switcher and Shared Auth with Context](#lab-71-theme-switcher-and-shared-auth-with-context)
  - [Lab 7.2: TaskBoard State Refactor](#lab-72-taskboard-state-refactor)
  - [Lab 7.3: TaskBoard Data Layer with TanStack Query](#lab-73-taskboard-data-layer-with-tanstack-query)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are shown for Windows (PowerShell) and macOS (Terminal). Today every command is the same on both, so one block is shown.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 7 at a glance

| Part | Topic |
|---|---|
| 7.1 | Context: sharing values without prop drilling |
| 7.2 | useReducer: organised state updates |
| 7.3 | Global state with Zustand, and Redux Toolkit overview |
| 7.4 | Server state with TanStack Query |
| Labs | Theme context, store refactor, TanStack Query data layer |

Yesterday you felt two pains: passing tasks through Outlet context, and a `useAuth` Hook that did not share its state between components. Today you fix both properly. You will meet four tools: Context, useReducer, Zustand and TanStack Query. The most important skill today is not the syntax; it is knowing which tool fits which kind of state.

### By the end of today you will be able to

- Explain prop drilling and share values such as the theme and the current user with Context, a provider and a custom Hook
- Gather update logic into a typed reducer and send actions to it with `useReducer` and `dispatch`
- Build a Zustand store with selectors and persistence, and explain when Redux Toolkit is the better fit
- Tell client state from server state, and choose a tool for each
- Fetch, cache and update server data with TanStack Query queries, mutations and invalidation
- Run a mock REST API with json-server

### Labs today

| Lab | Title | Time |
|---|---|---|
| 7.1 | Theme Switcher and Shared Auth with Context | 35 min |
| 7.2 | TaskBoard State Refactor | 45 min |
| 7.3 | TaskBoard Data Layer with TanStack Query | 60 min |

---

## Morning recap

Answer these questions about Day 6 before the session starts. Answers are in the [answer key](#answer-key).

1. What does the `?` in `assignee?: string` mean?
2. Why does `useState([])` need a generic in TypeScript?
3. What does `Outlet` do?
4. Why use `NavLink` instead of an `a` tag for internal links?
5. Is hiding a route in React enough to secure it?

> **Try it:** in yesterday's TaskBoard, log in on the Login page and watch the Layout header. It does not show your name until you refresh, because each component that calls `useAuth` has its own copy of the state. By the end of Module 7.1 you will know how to fix this.

---

## Module 7.1: The Context API

*Sharing values deep in the tree.*

Context lets a parent make a value available to any component below it, no matter how deep, without passing props through every layer.

### The prop drilling problem

1. **App has the user.** The logged-in user lives at the top of the tree.
2. **Layout passes it on.** Layout does not use the user, but must forward it.
3. **Sidebar passes it on.** Sidebar does not use it either.
4. **Avatar finally uses it.** Only the deepest component needed the value.

**Prop drilling** is passing props through components that do not use them, just to reach a component deep down.

Prop drilling is fine for two or three levels. Beyond that it gets painful:
- every middle component must accept and forward the prop;
- renaming it becomes a big job;
- adding a new consumer means threading it through the whole path.

Some values are needed almost everywhere: the current user, the theme, the language. Context is designed for exactly those.

> **Check your understanding**
> Which TaskBoard values are needed all over the app?
>
> <details><summary>Answer</summary>
>
> The current user, the theme, and the tasks themselves.
>
> </details>

### Creating and providing context

**src/context/ThemeContext.tsx**

```tsx
import { createContext, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeValue = { theme: Theme; toggle: () => void };

export const ThemeContext =
  createContext<ThemeValue | null>(null);

export function ThemeProvider(
  { children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggle = () => setTheme((t) =>
    t === "light" ? "dark" : "light");
  return <ThemeContext value={{ theme, toggle }}>
    {children}
  </ThemeContext>;
}
```

There are three parts:

1. **`createContext`** creates the context object, with a default value. We use `null` and deal with it in a custom Hook in the next section.
2. **A provider component**, here `ThemeProvider`, owns the state and passes a value object into the context. Any component inside the provider can read that value.
3. **Wrapping the app.** Put the provider in `main.tsx`, around `RouterProvider`, so every page can reach it:

```tsx
<ThemeProvider><RouterProvider router={router} /></ThemeProvider>
```

**React 19 change:** you can render the context itself as the provider, `<ThemeContext value={...}>`. Older code and tutorials write `<ThemeContext.Provider value={...}>`. Both work in React 19; the new form is shorter.

Key points:

- `createContext` makes the context object
- A provider component owns the state
- React 19: render `<ThemeContext>` directly as the provider
- Older code uses `<ThemeContext.Provider>`
- Wrap the app in `main.tsx`

`import type { ReactNode }` is needed because the Vite TypeScript template turns on `verbatimModuleSyntax`: anything that is only a type must be imported with `import type`.

> **Try it:** create a new `src/context` folder and build `ThemeContext.tsx` in it.

> **Good to know: the warning "Fast refresh only works when a file only exports components"**
> ESLint shows this warning (it comes from the react-refresh rule in the Vite template's `eslint.config.js`) when one file exports both a context object and a provider component. It is harmless; it only means hot reloading falls back to a full reload for that file. If you want to remove it, move the context object and its Hook into a separate file.

### Consuming context with a custom Hook

**src/context/useTheme.ts**

```ts
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be inside ThemeProvider");
  }
  return ctx;
}
```

**Any component, any depth** (for example `src/components/ThemeButton.tsx`)

```tsx
import { useTheme } from "../context/useTheme";

export function ThemeButton() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Theme: {theme}</button>;
}
```

`useContext` reads the value from the nearest provider above the component. We wrap it in a custom Hook for three reasons:

- components do not need to import the context object;
- we can throw a clear error if someone forgets the provider;
- the check removes `null` from the type, so consumers get a `ThemeValue` with no null checks of their own.

Now `ThemeButton`, anywhere in the app, can read and toggle the theme. No props are involved.

To apply the theme, set a class or data attribute on the root element. For example, add this inside the provider:

```tsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;
}, [theme]);
```

CSS can then use `[data-theme="dark"]` selectors. Remember to add `useEffect` to the `react` import.

Key points:

- `useContext` reads the nearest provider's value
- The custom Hook hides the context and checks for the provider
- You get a clear error if a provider is missing
- Consumers re-render when the value changes

> **Try it:** put `ThemeButton` in the Layout nav and toggle it. In the browser's Elements panel, watch the `data-theme` attribute on `<html>` change.

Now fix yesterday's auth problem the same way. Create an `AuthProvider` that owns `user`, `login` and `logout`, and change `useAuth` so it reads from that context. Every component then shares one user. You will build this in [Lab 7.1](#lab-71-theme-switcher-and-shared-auth-with-context).

### When to use Context, and when not to

- **Good fit:** values that change rarely and are needed widely, such as the user, theme, locale and feature flags
- Every consumer re-renders when the provider's value changes
- Split contexts by concern rather than one giant AppContext
- Not a replacement for all state: keep local state local
- For frequently changing shared data, a store like Zustand is often better
- For server data, use TanStack Query

Context is a delivery mechanism, not a full state management system. It is excellent for values that many components need and that do not change often.

The trade-off: when the value changes, every component that reads that context re-renders. For a theme that changes once a session, that costs nothing. For a task list that changes on every keystroke, it can make large apps sluggish.

Practical rules:

- **Split contexts:** have an AuthContext and a ThemeContext, rather than one AppContext holding everything.
- **Keep form input and UI toggles as local state.**
- **Use Zustand** for frequently changing shared client state.
- **Use TanStack Query** for data that comes from a server.

> **Check your understanding**
> A modal's open or closed flag is used by one component. Should it go in context or local state?
>
> <details><summary>Answer</summary>
>
> Local state.
>
> </details>

---

## Module 7.2: useReducer

*All the update logic in one place.*

As state logic grows, handlers like `handleAdd`, `handleToggle`, `handleRename` and `handleDelete` end up scattered through a component. `useReducer` gathers all of them into one function.

### A reducer function

**src/state/tasksReducer.ts**

```ts
import type { Task, Status } from "../types";

export type TaskAction =
  | { type: "added"; task: Task }
  | { type: "moved"; id: string; status: Status }
  | { type: "deleted"; id: string };

export function tasksReducer(
  tasks: Task[], action: TaskAction
): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "moved":
      return tasks.map((t) => t.id === action.id
        ? { ...t, status: action.status } : t);
    case "deleted":
      return tasks.filter((t) => t.id !== action.id);
  }
}
```

A **reducer** is a plain function that takes the current state and an action, and returns the next state. The name comes from the array `reduce` method.

An **action** is an object describing what happened, with a `type` field. Name actions after events, in the past tense: `added`, `moved`, `deleted`.

The `switch` statement handles each action type using exactly the immutable patterns you learned on Day 4: spread to add, `map` to change, `filter` to remove.

TypeScript shines here. `TaskAction` is a **discriminated union**: TypeScript knows that when `type` is `"moved"`, the action has `id` and `status`. Inside each `case` you get correct autocomplete, and a typo in a type name is an error. Because the switch covers every action type, TypeScript also knows the function always returns a `Task[]`, so no `default` case is needed.

Reducers must be **pure**. That means no API calls, no `Math.random` and no `crypto.randomUUID` inside. Generate ids in the event handler and put them in the action.

Because a reducer is a plain function, it is very easy to test. On Day 10 you will write tests for exactly this function.

Key points:

- Reducer: `(state, action)` returns new state
- Actions describe what happened
- Pure function: no fetches, no randomness
- A discriminated union types each action
- Same immutable patterns as Day 4

### Using useReducer

The slide shows the core of this pattern. Here it is as a complete file:

**src/context/TasksContext.tsx**

```tsx
import { createContext, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import type { Task } from "../types";
import { tasksReducer } from "../state/tasksReducer";
import type { TaskAction } from "../state/tasksReducer";

type Props = { children: ReactNode };
type TasksValue = { tasks: Task[]; dispatch: Dispatch<TaskAction> };

const initialTasks: Task[] = [];
const TasksContext = createContext<TasksValue | null>(null);

export function TasksProvider({ children }: Props) {
  const [tasks, dispatch] =
    useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext value={{ tasks, dispatch }}>
      {children}
    </TasksContext>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be inside TasksProvider");
  return ctx;
}
```

**In any component**

```tsx
const { dispatch } = useTasks();
dispatch({ type: "moved", id: task.id, status: "done" });
dispatch({ type: "added",
  task: { id: crypto.randomUUID(), ...values } });
```

`useReducer` works like `useState`, but instead of a setter you get `dispatch`. You call `dispatch` with an action, React runs your reducer, and the component re-renders with the result.

Combining `useReducer` with Context is a classic pattern. The provider owns the reducer and shares both `tasks` and `dispatch`, so any component can dispatch actions. There is no more passing handlers through Board and Column, and no more Outlet context plumbing from yesterday.

Components also become simpler. TaskCard no longer needs `onMove` or `onDelete` props; it calls `useTasks` and dispatches.

This pattern is built into React and is perfectly valid for small and medium apps. Next you will see how a library makes it even simpler.

Key points:

- `useReducer(reducer, initial)` returns state and `dispatch`
- `dispatch(action)` sends an action to the reducer
- Pairs well with Context: share state and `dispatch`
- Components describe intent, not implementation

### useState or useReducer?

| useState | useReducer |
|---|---|
| Simple, independent values | Complex objects or lists |
| A few update paths | Many different updates |
| Toggles, inputs, counters | Next state depends on previous in several ways |
| Less code to write | Logic you want to test in isolation |
| | Easier to trace: every change is a named action |

Neither is better; they suit different situations. Start with `useState`. If you find yourself with many handlers updating the same state in different ways, move to `useReducer`.

A useful signal: if you can describe a change in a word like "added", "moved" or "archived", it is a good candidate for an action.

You can convert later without changing what the component renders. The switch is a refactor, not a rewrite.

---

## Module 7.3: Global State Libraries

*Zustand, and when to reach for Redux Toolkit.*

Libraries exist for two reasons: Context plus useReducer gets verbose, and Context re-renders every consumer. **Zustand** is small, fast and very popular. **Redux Toolkit** is the long-standing enterprise standard.

### A Zustand store

**Windows and macOS: same commands**

```bash
npm install zustand
```

**src/state/useTaskStore.ts**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, status: Status) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist((set) => ({
    tasks: [],
    addTask: (task) =>
      set((s) => ({ tasks: [...s.tasks, task] })),
    moveTask: (id, status) =>
      set((s) => ({ tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, status } : t) })),
  }), { name: "taskboard" })
);
```

- **`create`** builds a custom Hook that holds both the state and the functions that change it.
- **`set`** updates the store. You return only the fields that change, and Zustand merges them in. The same immutable array patterns apply.
- **`deleteTask`** follows the same pattern with `filter`. It is left out here for space, and you will add it in the lab.
- **`persist`** middleware saves the store to localStorage under the name `"taskboard"` and restores it on load. That replaces our `useLocalStorage` Hook for tasks.
- **No provider.** The store lives outside React, and any component can use the Hook.
- **`create<TaskStore>()(...)`** has an extra pair of brackets. That is how Zustand's TypeScript typing works: just follow the pattern.

Key points:

- Install with `npm install zustand`
- `create` builds a Hook containing state and actions
- `set` merges a partial update
- `persist` saves to localStorage
- No provider needed

> **Try it:** build the store, then remove the tasks state from Layout and delete the Outlet context plumbing. Refresh the page and open DevTools, **Application**, **Local Storage** to see the `taskboard` key.

> **Check your understanding**
> What happens to data in this store when the page refreshes?
>
> <details><summary>Answer</summary>
>
> `persist` reloads it from localStorage.
>
> </details>

### Using the store with selectors

**src/components/Column.tsx**

```tsx
import { useTaskStore } from "../state/useTaskStore";
import TaskCard from "./TaskCard";
import type { Status } from "../types";

function Column({ status }: { status: Status }) {
  // Select only what this component needs
  const allTasks = useTaskStore((s) => s.tasks);
  const moveTask = useTaskStore((s) => s.moveTask);
  const tasks = allTasks.filter((t) => t.status === status);
  return tasks.map((t) => (
    <TaskCard key={t.id} task={t}
      onMove={(next) => moveTask(t.id, next)} />
  ));
}

// Outside React (e.g. in a test):
useTaskStore.getState().addTask(sampleTask);
```

Call the Hook with a **selector** function that returns only what the component needs. Zustand re-renders the component only when that selected value changes. This is the performance advantage over Context.

Select stable values, such as the `tasks` array or an action function, then derive the filtered list in the component. A selector that returns a new filtered array every time, like `(s) => s.tasks.filter(...)`, creates a new reference on every check. In Zustand 5 that causes an infinite re-render error. If you really need a selector like that, wrap it with Zustand's `useShallow`.

`getState` lets you read or update the store outside React, which is handy in tests and utility functions.

To keep the example short, Column still passes one callback, `onMove`, to TaskCard (on Day 6 this prop was called `onStatusChange`). In the lab, let TaskCard read `moveTask` from the store itself, so that no component passes task handlers as props.

Key points:

- Selectors pick a slice of the store
- Components re-render only when their slice changes
- Filter after selecting, not inside the selector
- `getState()` works outside components

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `Maximum update depth exceeded` or `The result of getSnapshot should be cached to avoid an infinite loop` | A selector returns a new array or object each time. Select the raw array and filter outside the selector, or wrap the selector with `useShallow` from `zustand/react/shallow`: `useTaskStore(useShallow((s) => s.tasks.filter((t) => t.status === status)))`. |

### Choosing a state tool

| Tool | Use it for |
|---|---|
| **Local state** | `useState` or `useReducer` inside one component. Form inputs, open or closed flags, hover state. Always the first choice. |
| **Context** | Rarely changing values needed widely: current user, theme, locale. Built in, no library. |
| **Zustand** | Frequently changing client state shared across the app: board filters, selected items, drafts. Small and simple. |
| **Redux Toolkit** | Large teams and apps that want strict structure, powerful DevTools with time travel, and established conventions. |

Here is the decision guide:

1. **Always start local.** Most state belongs to one component.
2. **Context** for a small number of widely needed, slowly changing values.
3. **Zustand** for shared client state that changes often.
4. **Redux Toolkit** is the modern way to write Redux. It uses *slices* that combine a reducer and its actions, very similar to what you wrote with `useReducer`. It also has excellent DevTools that let you replay every action. It is common in large enterprises and older codebases, so you should recognise it, but for new small and medium projects many teams now choose Zustand.

One more category deserves its own tool: data from a server. That is next.

> **Good to know: which one will I see at work?**
> Probably a mix. Redux is very common in existing enterprise apps; Zustand and TanStack Query are very common in newer ones.

---

## Module 7.4: Server State with TanStack Query

*Caching, refetching and mutations done for you.*

Remember the Day 5 `useFetch` Hook and its limitations: no caching, a request on every mount, manual loading and error flags, and manual retries. TanStack Query solves all of that.

### Client state versus server state

| Client state | Server state |
|---|---|
| Owned by the browser | Owned by a server; you hold a copy |
| Always up to date | Can become stale at any time |
| Examples: theme, open modal, filter text | Needs caching, refetching, retries, deduplication |
| Tools: `useState`, Context, Zustand | Tools: TanStack Query (also SWR, RTK Query) |

This distinction changed how the React community thinks about state. Client state belongs to the browser. Server state belongs to a database somewhere; your app only holds a snapshot, which other users may already have changed.

Server state has special problems:
- when to refetch;
- how long to cache;
- how to avoid two components making the same request;
- what to do when the user returns to the tab.

Writing all of that yourself is a lot of work.

TanStack Query is the most widely used library for this. Once tasks move to a server, they stop being Zustand state and become TanStack Query data. Zustand keeps only true client state, such as filters.

> **Check your understanding**
> Is the list of tasks client or server state once we have an API?
>
> <details><summary>Answer</summary>
>
> Server state.
>
> </details>

### Setup: TanStack Query and a mock API

**Windows and macOS: same commands**

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
npm install -D json-server
```

**db.json** (in the project root, next to `package.json`)

```json
{
  "tasks": [
    { "id": "1", "title": "Plan", "status": "todo", "points": 3 }
  ]
}
```

The sample above is shortened. Give your tasks every field your `Task` type requires, such as `projectId` (added in Lab 6.2), so the data matches the type.

**Second terminal (keep Vite running in the first)**

```bash
npx json-server db.json --port 3001
```

json-server turns a JSON file into a full REST API in seconds, which makes it ideal for learning and prototyping. It serves these routes at `http://localhost:3001` and saves every change into `db.json`:

| Request | What it does |
|---|---|
| `GET /tasks` | All tasks |
| `GET /tasks/1` | One task |
| `POST /tasks` | Create a task |
| `PATCH /tasks/1` | Change some fields of a task |
| `DELETE /tasks/1` | Delete a task |

> **Try it:** open http://localhost:3001/tasks in the browser to see the JSON.

> **Tip**
> Add a script to `package.json` so you do not have to remember the command:
> ```json
> "scripts": {
>   "api": "json-server db.json --port 3001"
> }
> ```
> Add the `"api"` line alongside the existing `dev`, `build` and `lint` scripts, then run `npm run api`.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Ids look odd, or a numeric id does not match | npm installs json-server 1, which is still labelled beta and needs Node 22.12 or later. It stores every id as a string and generates a random string id for each `POST`, ignoring any id you send. Keep ids as strings in `db.json` and in your `Task` type, and let the server create ids for new tasks. It also watches `db.json` for hand edits, and adds a `"$schema"` line to the file the first time it saves; both are expected. |
> | Port already in use | Choose another port, such as 3002, and update the `API` constant in `src/api/tasks.ts`. |

### Providing the query client

**src/main.tsx**

```tsx
import {
  QueryClient, QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools }
  from "@tanstack/react-query-devtools";
// ...other imports and the router from Day 6 stay the same

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
```

The `QueryClient` is the cache. Create it once, outside any component, and provide it at the top of the app.

`staleTime` controls how long fetched data counts as fresh. With 30 seconds, going back to a page within 30 seconds uses the cache without refetching. The default is zero, which means data is always considered stale. Stale data is refetched in the background whenever a component using it mounts or the window regains focus.

The devtools panel appears as a small floating button, in development only. It shows every query, its data, and whether it is fresh, stale or fetching. It is excellent for learning.

Key points:

- One `QueryClient` holds the cache
- The provider makes it available everywhere
- `staleTime`: how long data counts as fresh
- The devtools show every query and its status

> **Try it:** add the provider, run the app and open the devtools with the floating button in the corner of the page.

### Reading data with useQuery

**src/api/tasks.ts**

```ts
import type { Task } from "../types";

export const API = "http://localhost:3001";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

**In a component**

```tsx
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/tasks";

const { data: tasks = [], isPending, isError, error } =
  useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

if (isPending) return <p>Loading tasks...</p>;
if (isError) return <p role="alert">{error.message}</p>;
```

Keep API functions in their own file. They are plain async functions that check `res.ok` and throw on errors, exactly as on Day 2.

`useQuery` takes a `queryKey` and a `queryFn`:

- **The key** is an array that uniquely identifies this data in the cache: `["tasks"]` for all tasks, `["tasks", id]` for one task, `["tasks", { status }]` for a filtered list. When the key changes, the query fetches the data for the new key. The key must include every value the query depends on.
- **The query function** returns a promise of the data.

You get `isPending`, `isError`, `error` and `data`. Compare that with the 20 lines of `useFetch`. You also get, for free:
- caching;
- deduplication if two components ask for the same key;
- retries with back-off;
- refetching of stale data when the window regains focus;
- cancellation.

The default value `tasks = []` in the destructuring means `data` is never `undefined` in the rest of the component.

Key points:

- `queryKey` identifies and caches the data
- `queryFn` returns a promise
- `isPending`, `isError` and `data` replace manual flags
- Same key, one request: automatic deduplication
- Failed requests are retried automatically

> **Try it**
> 1. Stop json-server (Ctrl+C in its terminal) and refresh the page. After the automatic retries (three, over several seconds) the error message appears. Start json-server again.
> 2. Change a task title directly in `db.json` and save.
> 3. Wait until 30 seconds have passed since the last fetch (the `staleTime`).
> 4. Switch to another browser tab and back. The UI updates by itself. Within those 30 seconds the data still counts as fresh, so nothing is refetched.

> **Check your understanding**
> Two components both call `useQuery` with `["tasks"]`. How many requests are made?
>
> <details><summary>Answer</summary>
>
> One.
>
> </details>

### Changing data with useMutation

**src/api/tasks.ts** (add below `fetchTasks`)

```ts
export type NewTask = Omit<Task, "id">;
```

**src/hooks/useAddTask.ts**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/tasks";
import type { NewTask } from "../api/tasks";

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: NewTask) => {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
```

**Usage in a form component**

```tsx
const addTask = useAddTask();
addTask.mutate({ title, status: "todo", points: 1, tags: [], projectId });
```

Queries read; mutations write. `useMutation` takes a `mutationFn` that performs the change. After it succeeds, we **invalidate** the `"tasks"` query, which tells TanStack Query that its copy is out of date. Any component showing tasks then refetches automatically.

Calling `addTask.mutate(values)` starts the mutation. `addTask.isPending` is true while it runs, so disable the submit button with `disabled={addTask.isPending}`. `addTask.isError` and `addTask.error` report failures, but only when `mutationFn` throws. `fetch` does not reject on a 404 or 500, which is why the code checks `res.ok` and throws, as on Day 2. (The slide shortens this to `.then((r) => r.json())`, which would hide HTTP errors.) In the lab you move this request into a `createTask` function in `src/api/tasks.ts`.

`NewTask` is the `Task` type without its `id`, because json-server creates the id. The slide's usage line is shortened to `{ title, status: "todo", points: 1 }`; pass every field your `Task` type requires, such as `projectId` (added in Lab 6.2).

Wrap each mutation in its own custom Hook: `useAddTask`, `useMoveTask`, `useDeleteTask`. Components stay clean, and the API details live in one place.

- **Move:** send a `PATCH` to `/tasks/:id` with a body of `{ status }`.
- **Delete:** use method `"DELETE"`.

An advanced option is **optimistic updates**, where the UI changes instantly, before the server confirms, and rolls back if the request fails. TanStack Query supports this with `onMutate`; you can try it in the Lab 7.3 stretch challenge. On Day 8 you will see React 19's built-in `useOptimistic`, which does the same thing more simply for forms.

Key points:

- `useMutation` runs create, update and delete
- `invalidateQueries` marks cached data stale and refetches it
- `mutate()` triggers the mutation; `isPending` drives the button
- Wrap each operation in its own custom Hook

> **Try it:** connect `useAddTask` to your add-task form and open the **Network** tab. Add a task: you see a `POST`, then an automatic `GET`.

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 7.1: Theme Switcher and Shared Auth with Context

| | |
|---|---|
| **Goal** | Share theme and user across TaskBoard with Context and fix yesterday's `useAuth` bug. |
| **Suggested time** | 35 min |

#### Steps

1. Create `ThemeContext`, `ThemeProvider` and `useTheme` in `src/context` (see [Creating and providing context](#creating-and-providing-context)).
2. Apply the theme with a `data-theme` attribute on the `html` element, using an effect in `ThemeProvider`.
3. Add dark theme CSS variables and a toggle button in the Layout.
4. Persist the theme choice.
5. Create `AuthContext` and `AuthProvider`, and move `user`, `login` and `logout` into it.
6. Change `useAuth` in `src/hooks/useAuth.ts` to read from `AuthContext`.
7. Wrap the app in both providers in `main.tsx`.
8. Test that logging in updates the Layout instantly, then commit.

#### Done when

- [ ] The theme toggles everywhere and survives a refresh
- [ ] Logging in updates the header without a refresh
- [ ] Using `useTheme` outside the provider throws a clear error

<details><summary><strong>Hints</strong> (try on your own first)</summary>

CSS variables make theming simple:

**src/index.css**

```css
:root { --bg: #ffffff; --text: #0f172a; }
[data-theme="dark"] { --bg: #0f172a; --text: #f1f5f9; }
body { background: var(--bg); color: var(--text); }
```

To persist the theme, use `useLocalStorage<Theme>("theme", "light")` inside `ThemeProvider` instead of `useState`:

**src/context/ThemeContext.tsx**

```tsx
import { createContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";
type ThemeValue = { theme: Theme; toggle: () => void };

export const ThemeContext =
  createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
}
```

The expected shape of the auth context. Keep whatever user shape your Day 6 `useAuth` stored:

**src/context/AuthContext.tsx**

```tsx
import { createContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type User = { name: string };
type AuthValue = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const login = (name: string) => setUser({ name });
  const logout = () => setUser(null);
  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
```

**src/hooks/useAuth.ts**

```ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return ctx;
}
```

Because `RequireAuth`, Login and Layout already call `useAuth()`, they keep working unchanged, but now they all share one user.

**src/main.tsx** (the render call)

```tsx
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
);
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `useTheme` throws | The component is rendered outside the provider, often because the provider wraps `App` but the router is rendered separately. Wrap `RouterProvider` itself with the providers in `main.tsx`. |
| The theme flashes on load | Acceptable for now. A small inline script in `index.html` can set the attribute before React loads. |
| Fast refresh ESLint warning | Harmless; see the Good to know in [Creating and providing context](#creating-and-providing-context). |

> **Stretch challenge**
> Respect the operating system preference on first visit. Use `window.matchMedia("(prefers-color-scheme: dark)").matches` to choose the initial value:
> ```tsx
> const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
> const [theme, setTheme] = useLocalStorage<Theme>("theme", prefersDark ? "dark" : "light");
> ```

### Lab 7.2: TaskBoard State Refactor

| | |
|---|---|
| **Goal** | Replace prop drilling and Outlet context with a reducer and a Zustand store. |
| **Suggested time** | 45 min |

You will write both approaches so you can compare them. The reducer is a pure function that you keep for tests on Day 10. The app itself will use the Zustand store.

#### Steps

1. Write `tasksReducer` in `src/state/tasksReducer.ts` with `added`, `moved`, `renamed` and `deleted` actions.
2. Write a quick console test: call the reducer and log the results.
3. Install Zustand: `npm install zustand`.
4. Create `useTaskStore` in `src/state/useTaskStore.ts` with the same actions and the `persist` middleware.
5. Remove the tasks props and Outlet context from Layout, Board and Column.
6. Make components read tasks and actions with selectors.
7. Add a filter store for search text and the assignee filter.
8. Confirm everything still works, then commit.

If you moved search into the URL with `useSearchParams` on Day 6, you can keep it there, because it stays shareable and bookmarkable. The filter store then only needs the assignee filter.

#### Done when

- [ ] No component passes task handlers as props
- [ ] Tasks persist through a refresh
- [ ] React DevTools shows fewer props

<details><summary><strong>Hints</strong> (try on your own first)</summary>

The `renamed` action needs an id and the new title:

**src/state/tasksReducer.ts** (the additions)

```ts
  | { type: "renamed"; id: string; title: string }

    case "renamed":
      return tasks.map((t) => t.id === action.id
        ? { ...t, title: action.title } : t);
```

A quick console test. Node 24 can run a TypeScript file directly (it strips the types), as long as relative imports of `.ts` files include the extension:

**src/state/tasksReducer.check.ts**

```ts
import { tasksReducer } from "./tasksReducer.ts";
import type { Task } from "../types";

const before: Task[] = [
  { id: "1", title: "Plan", status: "todo", points: 3, tags: [], projectId: "website" },
];
const after = tasksReducer(before, { type: "moved", id: "1", status: "done" });
console.log(after[0].status, before[0].status); // done todo
console.log(tasksReducer(after, { type: "renamed", id: "1", title: "Plan sprint" }));
console.log(tasksReducer(after, { type: "deleted", id: "1" })); // []
```

```bash
node src/state/tasksReducer.check.ts
```

Delete the check file when you are done; on Day 10 it becomes a real test.

The Zustand store can reuse the reducer, which keeps one source of logic:

**src/state/useTaskStore.ts**

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Status } from "../types";
import { tasksReducer } from "./tasksReducer";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, status: Status) => void;
  renameTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "added", task }) })),
      moveTask: (id, status) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "moved", id, status }) })),
      renameTask: (id, title) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "renamed", id, title }) })),
      deleteTask: (id) =>
        set((s) => ({ tasks: tasksReducer(s.tasks, { type: "deleted", id }) })),
    }),
    { name: "taskboard" },
  ),
);
```

So that no component passes handlers down, TaskCard selects its own actions:

**src/components/TaskCard.tsx** (inside the component)

```tsx
const moveTask = useTaskStore((s) => s.moveTask);
const deleteTask = useTaskStore((s) => s.deleteTask);
```

A filter store is just another small store, without `persist`:

**src/state/useFilterStore.ts**

```ts
import { create } from "zustand";

type FilterStore = {
  search: string;
  assignee: string;
  setSearch: (search: string) => void;
  setAssignee: (assignee: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  search: "",
  assignee: "",
  setSearch: (search) => set({ search }),
  setAssignee: (assignee) => set({ assignee }),
}));
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Infinite render loop | A selector returns a new filtered array. Select the raw tasks and filter in the component. |
| Old localStorage data breaks the store | The stored shape differs from the new one. Clear the key in DevTools (**Application**, **Local Storage**), or increase the `version` option in `persist`. Without a `migrate` function, Zustand then ignores the old stored data and logs a console error; add `migrate` to convert it instead. |
| TypeScript errors in `set` callbacks | Add the `TaskStore` type: `create<TaskStore>()(...)`. |

> **Stretch challenge**
> Add an undo button by keeping a history array of previous task lists in the store.

### Lab 7.3: TaskBoard Data Layer with TanStack Query

| | |
|---|---|
| **Goal** | Tasks live on a REST API; TanStack Query handles fetching, caching and updates. |
| **Suggested time** | 60 min |

This is how real apps are built: server data goes through TanStack Query, and UI state lives in Zustand or local state.

#### Steps

1. Install TanStack Query, its devtools and json-server, then create `db.json` in the project root (see [Setup: TanStack Query and a mock API](#setup-tanstack-query-and-a-mock-api)).
2. Start json-server on port 3001 in a second terminal: `npx json-server db.json --port 3001` (or `npm run api`).
3. Add `QueryClientProvider` and the devtools in `main.tsx`.
4. Write `fetchTasks`, `createTask`, `updateTask` and `deleteTask` in `src/api/tasks.ts`.
5. Replace the store's tasks with `useQuery`, and keep the filters in Zustand.
6. Create `useAddTask`, `useMoveTask` and `useDeleteTask` with invalidation.
7. Show loading and error states, and disable buttons while a mutation is pending.
8. Test with json-server stopped and with a slow network (DevTools, **Network**, throttling), then commit and push.

#### Done when

- [ ] Changes survive a refresh because they are saved in `db.json`
- [ ] The devtools show cached queries
- [ ] Buttons disable while saving

<details><summary><strong>Hints</strong> (try on your own first)</summary>

The API helpers. Every helper checks `res.ok` and throws, as `fetchTasks` does:

**src/api/tasks.ts**

```ts
import type { Task } from "../types";

export const API = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export type NewTask = Omit<Task, "id">;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createTask(task: NewTask): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST", headers, body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateTask(id: string, changes: Partial<NewTask>): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH", headers, body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
```

With `createTask` in place, `useAddTask` can simply use `mutationFn: createTask`. The other mutation Hooks follow the same shape:

**src/hooks/useMoveTask.ts**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Status } from "../types";

export function useMoveTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateTask(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
```

**src/hooks/useDeleteTask.ts**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/tasks";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
```

In TaskCard:

```tsx
const moveTask = useMoveTask();
// ...
<button
  disabled={moveTask.isPending}
  onClick={() => moveTask.mutate({ id: task.id, status: "done" })}
>
  Done
</button>
```

The providers in `main.tsx` now look like this:

```tsx
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| CORS errors | json-server allows cross-origin requests by default. If you see CORS errors, check the port and the URL in `API`. |
| The UI does not update after a mutation | The invalidation key does not match the query key. `invalidateQueries` matches by prefix, so `["tasks"]` also refreshes `["tasks", { projectId }]`, but a typo such as `["task"]` matches nothing. |
| Tasks from the old Zustand store still display | Remove `tasks` from the store and clear the `taskboard` key in DevTools, **Application**, **Local Storage**. |
| Numbers become strings | Form values are always strings. Convert points with `Number()` before sending. |
| A failed save does not show an error | The mutation function does not throw. Check `res.ok` and throw, as in `src/api/tasks.ts`. |
| Editing `db.json` by hand does not show up when you switch back to the tab | The data is still fresh. Wait until the 30-second `staleTime` has passed, then focus the window again. |

> **Stretch challenge**
> Add an optimistic update to `useMoveTask`, so the card moves instantly:
> - in `onMutate`, call `cancelQueries`, save a snapshot of the old data, and apply the change with `setQueryData`;
> - in `onError`, roll back to the snapshot;
> - in `onSettled`, call `invalidateQueries` so the cache resyncs with the server.
>
> See the TanStack Query "Optimistic Updates" guide. It also shows a simpler option: render the pending change from the mutation's `variables` while `isPending` is true.

<details><summary><strong>Stretch hint: optimistic <code>useMoveTask</code></strong> (try on your own first)</summary>

**src/hooks/useMoveTask.ts**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Status, Task } from "../types";

export function useMoveTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateTask(id, { status }),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previous = queryClient.getQueryData<Task[]>(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, status } : t)));
      return { previous };
    },
    onError: (_error, _variables, onMutateResult) => {
      queryClient.setQueryData(["tasks"], onMutateResult?.previous);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
```

Whatever `onMutate` returns is passed to `onError` and `onSettled`. Here that is the snapshot used for the rollback. Test it with **Slow 4G** throttling, then stop json-server and move a card to watch it jump back.

</details>

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. What problem does Context solve?
2. What does a reducer receive and return?
3. Why should a Zustand selector not return a newly filtered array?
4. What is the difference between client and server state?
5. What does `invalidateQueries` do?
6. Which tool would you use for the current user? And for the task list from an API?

---

## Key takeaways

### What you learned

- Context shares slow-changing values without prop drilling.
- React 19 renders `<Context>` directly as a provider.
- `useReducer` centralises update logic in a pure, testable function.
- Zustand stores are Hooks with selectors and optional persistence.
- TanStack Query caches, dedupes, retries and refetches server data.
- Pick the tool by the kind of state, not by habit.

TaskBoard now has a real data layer, with a clear separation between client state and server state. That architecture is what employers look for.

### Take-home practice

> Add a Project entity to `db.json` and create `useProjects` and `useProject(id)` queries. Show project names in the sidebar from the API, and filter tasks by `projectId` using a query key of `["tasks", { projectId }]`.
>
> json-server can filter for you: `GET /tasks?projectId=website` returns only that project's tasks. Remember that the query key must include every value the query depends on.

### Looking ahead

Tomorrow is about craft: making TaskBoard look great with Tailwind CSS and shadcn/ui, building robust forms with React Hook Form and Zod, using the new React 19 form features, and making everything accessible. You will need json-server running again, so check that `npm run api` (or the `npx json-server` command) and the Vite dev server both start before the session.

---

## Further reading

These official resources cover today's topics in more depth. They are the best place to look up details after the course.

| Resource | Link |
|---|---|
| React: Passing data deeply with context | https://react.dev/learn/passing-data-deeply-with-context |
| React: Extracting state logic into a reducer | https://react.dev/learn/extracting-state-logic-into-a-reducer |
| Zustand docs | https://zustand.docs.pmnd.rs/ |
| Redux Toolkit | https://redux-toolkit.js.org/ |
| TanStack Query: React overview | https://tanstack.com/query/latest/docs/framework/react/overview |
| TanStack Query: Important defaults | https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults |
| TanStack Query: Optimistic updates | https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates |
| json-server | https://github.com/typicode/json-server |

> **Tip**
> Read the TanStack Query "Important defaults" page. It explains `staleTime`, refetch on window focus and retries, which surprise many new users.

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap: Day 6

1. The property is optional; its type is `string | undefined`.
2. An empty array is inferred as `never[]`, so nothing can be added. `useState<Task[]>([])` fixes it.
3. It marks where the matched child route renders inside a layout.
4. It navigates without a full page reload (keeping state), and adds an `active` class to the link for the current page.
5. No. The server must check permissions on every request.

### Knowledge check

1. Prop drilling: passing values through components that do not use them.
2. The current state and an action; it returns the next state.
3. A new reference each time can trigger endless re-renders. Select stable values and derive afterwards, or use `useShallow`.
4. Client state is owned by the browser and always current. Server state is a cached copy of remote data that can go stale.
5. It marks matching cached queries as stale and refetches any that are on screen.
6. Context for the current user. TanStack Query for the task list.

---

## My notes

&nbsp;
