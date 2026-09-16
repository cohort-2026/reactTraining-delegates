# Day 6: TypeScript and Routing

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Add type safety to React code and turn TaskBoard into a multi-page application.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 6 at a glance](#day-6-at-a-glance)
- [Morning recap](#morning-recap)
- [Module 6.1: TypeScript Essentials](#module-61-typescript-essentials)
- [Module 6.2: TypeScript with React](#module-62-typescript-with-react)
- [Module 6.3: React Router](#module-63-react-router)
- [Module 6.4: Navigation Patterns](#module-64-navigation-patterns)
- [Hands-on labs](#hands-on-labs)
  - [Lab 6.1: Convert TaskBoard to TypeScript](#lab-61-convert-taskboard-to-typescript)
  - [Lab 6.2: Multi-Page TaskBoard](#lab-62-multi-page-taskboard)
  - [Lab 6.3: Protected Routes with a Mock Login](#lab-63-protected-routes-with-a-mock-login)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)
- [My notes](#my-notes)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are shown for Windows (PowerShell) and macOS (Terminal). Where both are identical, one block is shown.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 6 at a glance

| Part | Topic |
|---|---|
| 6.1 | TypeScript essentials |
| 6.2 | TypeScript with React |
| 6.3 | React Router: pages, layouts and URL parameters |
| 6.4 | Navigation patterns and protected routes |
| Labs | Convert TaskBoard to TypeScript, add pages, protect routes |

The morning is TypeScript: first the language, then how it applies to components, props, state and Hooks. The afternoon is routing. The labs convert TaskBoard step by step.

By the end of today TaskBoard will be fully typed and will have a dashboard, project pages and a settings page, with a protected area that needs a login. You will be renaming lots of files, so make sure yesterday's work is committed and pushed before you start: a clean Git state makes mistakes easy to undo.

### By the end of today you will be able to

- Explain what TypeScript adds to JavaScript, and what it does not check
- Use basic types, interfaces, type aliases, union types, optional properties and simple generics
- Type React props, children, state, events, refs and custom Hooks
- Convert a JavaScript Vite project to TypeScript and fix the errors `tsc` reports
- Add React Router to a Vite app with `createBrowserRouter`, nested layouts, `Outlet`, links and URL parameters
- Handle unknown URLs and unknown ids with friendly pages
- Navigate from code with `useNavigate`, keep filters in the URL with `useSearchParams`, and describe what loaders and actions do
- Build a protected route that redirects to a login page and back, and explain why it is not real security

### Labs today

| Lab | Title | Time |
|---|---|---|
| 6.1 | Convert TaskBoard to TypeScript | 60 min |
| 6.2 | Multi-Page TaskBoard | 50 min |
| 6.3 | Protected Routes with a Mock Login | 35 min |

---

## Morning recap

Answer these questions on Day 5 before the session starts. The answers are in the [answer key](#answer-key).

1. What does an empty dependency array mean?
2. Why do effects run twice in development?
3. What is a race condition in data fetching?
4. Give one example of an effect you do not need.
5. What does `useRef` return?

If you did last night's take-home practice, test your `useOnlineStatus` Hook now: in DevTools open the **Network** tab, switch the throttling menu to **Offline**, and check that TaskBoard shows its Offline banner.

---

## Module 6.1: TypeScript Essentials

*JavaScript with a safety net.*

TypeScript is JavaScript plus type annotations. Your editor checks them as you type, and the build checks them again. Then the types are removed, so the browser still runs plain JavaScript. Most React job adverts now list TypeScript as a requirement.

### Why TypeScript?

Think back over the last five days. How many bugs were typos in property names, props that were not passed, or numbers that were actually strings? TypeScript catches most of those before the code runs. Many "Cannot read properties of undefined" errors disappear too.

You also get far better autocomplete. Type `task.` and VS Code lists every field.

TypeScript does add some typing work. The good news is that it infers most types automatically. You mainly annotate function parameters, props and data shapes.

- **Catches bugs as you type:** misspelled properties, wrong argument types, missing values
- **Better autocomplete:** VS Code knows every property of your objects
- **Self-documenting:** a component's props are listed in its type
- **Safer refactoring:** rename a field and see every place that breaks
- **Industry standard** for React projects
- **Types disappear at build time:** zero runtime cost

> **Example**
> `task.titel` is a silent `undefined` in JavaScript. In TypeScript it is a red underline before you save.

> **Important**
> TypeScript only checks your code during development and at build time. It does not check data that arrives from an API while the app is running. For that, we use Zod on Day 8.

### Basic types and inference

**types-demo.ts**

```ts
let title: string = "Write tests";
let points: number = 5;
let done: boolean = false;
let tags: string[] = ["qa", "urgent"];

// Inference: TypeScript works it out
let count = 0;          // number
// count = "many";      // Error: string is not number

function addPoints(a: number, b: number): number {
  return a + b;
}
addPoints(2, 3);        // OK
// addPoints("2", 3);   // Error

const log = (msg: string): void => console.log(msg);
```

- **Annotations:** you write a type after a colon, as in `name: type`. The basic types are `string`, `number` and `boolean`.
- **Arrays:** add square brackets after the item type. `string[]` and `Array<string>` mean the same thing.
- **Inference:** you rarely need to annotate variables, because TypeScript infers the type from the starting value. `count` is a `number` because it starts as `0`, so assigning a string is an error.
- **Always type function parameters.** TypeScript cannot guess what callers will pass. The return type after the brackets is optional because it can be inferred, but writing it documents intent.
- **`void`** means the function returns nothing.
- **Two special types to know.** `any` turns type checking off completely, which defeats the purpose, so avoid it. `unknown` is the safe alternative when you genuinely do not know a type: TypeScript makes you check the value before you use it.

> **Try it:** you can experiment without a project at the [TypeScript Playground](https://www.typescriptlang.org/play). Paste the example, uncomment each error line one at a time, and read the message the editor shows.

### Object types, unions and optional fields

**src/types.ts**

```ts
export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;         // optional
  tags?: string[];
}

const t: Task = {
  id: "1", title: "Plan", status: "todo",
  points: 3, tags: [],
};
// t.status = "finished";  // Error: not a Status
const name = t.assignee ?? "Unassigned";
```

Our Task data now has a formal definition: `interface Task` lists every field and its type.

- **Union types.** `Status` is a union of string literals, so a status can only be exactly `"todo"`, `"doing"` or `"done"`. Type `"finshed"` and you get an error, and autocomplete suggests the three valid values. Literal unions like this replace "magic strings", and they get rid of a whole class of Day 3 bugs where a task landed in no column.
- **Optional fields.** The question mark makes `assignee` optional, and TypeScript then forces you to handle the `undefined` case, for example with the `??` operator. `tags` is optional too, because the TaskBoard tasks you built on Days 3 to 5 have no tags.
- **`interface` or `type`?** Both describe object shapes and are mostly interchangeable, but unions can only be written with `type`. A simple team rule: use `type` for unions, `interface` or `type` for objects, and be consistent.
- **Where types live:** put shared types in `src/types.ts`.

> **Good to know: what goes in src/types.ts**
> In the lab, only the two exported types (`Status` and `Task`) go into `src/types.ts`. The `t` and `name` lines are usage examples. If you leave them in the file, `tsc` reports `'name' is declared but its value is never read`, because the Vite template turns on `noUnusedLocals`.

> **Check your understanding**
> How would you type a list of tasks?
>
> <details><summary>Answer</summary>
>
> `Task[]`.
>
> </details>

### Generics: types with parameters

**generics-demo.ts**

```ts
// A function that works for any item type
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
const n = firstItem([1, 2, 3]);         // number | undefined
const s = firstItem(["a", "b"]);       // string | undefined

// A generic API response wrapper
interface ApiResult<T> {
  data: T;
  error: string | null;
}
const res: ApiResult<Task[]> = { data: [], error: null };

// You already use generics in React:
const [tasks, setTasks] = useState<Task[]>([]);
```

Generics let you write code that works with many types while keeping each one precise. `T` is a placeholder, like a function parameter but for a type.

- **`firstItem<T>`** works on arrays of anything. Call it with numbers and TypeScript knows the result is a number. Call it with strings and the result is a string.
- **`ApiResult<T>`** describes a response whose `data` can be any shape. `ApiResult<Task[]>` is a response containing tasks.
- **`T` is filled in by the caller or inferred,** so type information keeps flowing through your code.
- **`useState<Task[]>([])` is a generic call.** It tells TypeScript the state is an array of tasks. Without it, an empty array is inferred as `never[]` ("an array that can never hold anything"), and adding tasks is an error.

You will not write many generics as a beginner, but you will use them constantly.

> **Troubleshooting**
> **Error:** `Type 'Task' is not assignable to type 'never'`, or `Property 'title' does not exist on type 'never'`.
> **Cause:** `useState([])` without a generic.
> **Fix:** `useState<Task[]>([])`.

---

## Module 6.2: TypeScript with React

*Typed props, state, events and Hooks.*

Now we apply TypeScript to React. Files that contain JSX use the `.tsx` extension. Plain TypeScript files use `.ts`.

### Moving TaskBoard to TypeScript

The cleanest way to convert a beginner project is to generate a fresh TypeScript project with Vite's `react-ts` template, which has all the configuration done correctly, and then bring your source files across.

**Windows and macOS: same commands**

```bash
cd react-course
npm create vite@latest taskboard-ts -- --template react-ts --eslint
cd taskboard-ts
npm install
# copy src files from taskboard
# rename .jsx to .tsx and .js to .ts
npx tsc --noEmit -p tsconfig.app.json
npm run dev
```

- **`--eslint`** keeps ESLint as the linter, as in the rest of the course. Without it, create-vite now sets up Oxlint instead.
- **Rename files.** Component files go from `.jsx` to `.tsx`, and other files (such as hooks and data) from `.js` to `.ts`. Update import paths that include the `.jsx` extension, or remove the extensions from imports entirely.
- **Check types.** `npx tsc --noEmit -p tsconfig.app.json` runs the TypeScript compiler in check-only mode: it lists every type error without building anything. Expect many errors at first. Most are missing prop types, which we fix next.
- **Keep the template's `index.html`.** It loads `/src/main.tsx`.

The template's TypeScript files:

| File | What it is for |
|---|---|
| `tsconfig.json` | Only points at the two files below. It checks nothing itself. |
| `tsconfig.app.json` | Settings for your `src` code: strict checking, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`, and `"types": ["vite/client"]`. |
| `tsconfig.node.json` | Settings for `vite.config.ts`. |

> **Note**
> Because `tsconfig.json` only references the other two files, a plain `npx tsc --noEmit` checks nothing and prints nothing, which looks like success. Always pass `-p tsconfig.app.json`, or run `npx tsc -b` as `npm run build` does. You may see a `src/vite-env.d.ts` file in older tutorials. The current template does not have one: `"types": ["vite/client"]` in `tsconfig.app.json` does the same job.

> **Try it:** in VS Code open the **Problems** panel (Ctrl+Shift+M on Windows, Cmd+Shift+M on macOS). It lists every type error in the project.

<details><summary><strong>Keeping your Git history</strong></summary>

Choose one of these:

- **Copy the hidden `.git` folder** from `taskboard` into `taskboard-ts`. On Windows, turn on **Hidden items** in File Explorer's **View** menu. On macOS, press **Cmd+Shift+.** in Finder.
- **Push the new project to the same GitHub repository on a new branch.**

The trainer will tell you which approach the room is using.

</details>

> **Troubleshooting**
> **Error:** `'Task' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled`.
> **Fix:** `import type { Task } from "./types";`

> **Good to know: no enums**
> The template also enables `erasableSyntaxOnly`, which makes `enum` an error. Use a union type such as `Status` instead, which is what this course does anyway.

### Typing props

**src/components/TaskCard.tsx**

```tsx
import type { ReactNode } from "react";
import type { Task, Status } from "../types";

type TaskCardProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete?: (id: string) => void;
  footer?: ReactNode;
};

export default function TaskCard({
  task, onStatusChange, onDelete, footer,
}: TaskCardProps) {
  return (
    <article>
      <h3>{task.title}</h3>
      {footer}
    </article>
  );
}
```

- **One Props type per component.** It describes exactly what the component accepts, and you annotate the destructured parameter with it.
- **Function props** are typed as arrow signatures. `onStatusChange` takes an id and a status and returns nothing, which is `void`.
- **Optional props** use `?`.
- **`ReactNode`** is the type for anything React can render: elements, strings, numbers, arrays, `null`. Use it for `children` and for any slot-style props such as `footer`.
- **Missing required props become errors.** Render `<TaskCard />` without `task` and TypeScript underlines it immediately: `Property 'task' is missing`. Inside TaskCard, typing `task.` shows every field.

The example is trimmed to fit a slide. Your real TaskCard also renders the status dropdown and Delete button, which use `onStatusChange` and `onDelete`. If you copy only this snippet, `tsc` reports both as declared but never read, because `noUnusedParameters` is on.

> **Try it:** in a parent component, pass a handler and call it with `"finished"` as the status. The union type catches the mistake.

> **Tip**
> Hover over any variable in VS Code to see its inferred type. Ctrl+click (Windows) or Cmd+click (macOS) jumps to the type definition.

> **Good to know: React.FC**
> `React.FC` is an older style that some codebases use. Typing the props parameter directly, as shown here, is simpler and is the current recommendation.

### Typing state, events and refs

**src/components/AddTaskForm.tsx** (excerpt)

```tsx
import { useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

const [title, setTitle] = useState("");      // inferred
const [tasks, setTasks] = useState<Task[]>([]);
const [selected, setSelected] =
  useState<Task | null>(null);
const inputRef = useRef<HTMLInputElement>(null);

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  setTitle(e.target.value);
}

function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
  inputRef.current?.focus();
}
```

- **Simple state is inferred.** When the initial value tells the full story, as an empty string does, let inference work.
- **Empty arrays and `null` need a generic.** `Task | null` means "a task, or nothing selected". TypeScript then insists you check for `null` before reading `selected.title`. That is exactly the safety we want.
- **DOM refs** take the element type, such as `HTMLInputElement`, `HTMLDivElement` or `HTMLButtonElement`, and start as `null`. Because the ref can be `null`, use optional chaining: `inputRef.current?.focus()`.
- **Event types come from `react`.** Handlers written as separate functions need them:
  - `ChangeEvent` for inputs and selects
  - `SubmitEvent` for form submits
  - `MouseEvent` for clicks

  Each takes the element type, for example `ChangeEvent<HTMLInputElement>`.
- **Inline handlers infer event types automatically.** If you write the handler inline in JSX, you do not need to type `e` yourself.

> **Tip**
> Not sure of an event type? Write the handler inline first, hover over `e`, and copy the type VS Code shows.

> **Troubleshooting**
> Older tutorials type submit handlers with `FormEvent`. Current React types (`@types/react` 19) mark `FormEvent` as deprecated, so VS Code shows it with a ~~strikethrough~~. Use `SubmitEvent<HTMLFormElement>` for `onSubmit` and `ChangeEvent` for inputs and selects. Code that still uses `FormEvent` compiles.

### Typing custom Hooks

**src/hooks/useFetch.ts**

```ts
type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // ...effect unchanged from Day 5
  return { data, error, loading };
}

// Usage: the caller chooses T
type User = { id: number; name: string };
const { data } = useFetch<User[]>(`${API}/users`);
// data is User[] | null
```

`useFetch` becomes generic. The caller says what shape of data it expects, and every component that uses the Hook gets full autocomplete on the result. The return type `FetchState<T>` documents exactly what the Hook provides. Remember to keep the `import { useEffect, useState } from "react";` line at the top of the file.

`useLocalStorage` follows the same pattern:

**src/hooks/useLocalStorage.ts**

```ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

`as const` makes the return value a fixed pair rather than an array of mixed types, so destructuring `const [tasks, setTasks] = ...` gives each variable the right type.

If TaskBoard seeds its data with `null`, as in Lab 5.3, pass the type explicitly: `useLocalStorage<Task[] | null>("tasks", null)`. Otherwise `T` is inferred as `null`, and `setTasks` rejects an array of tasks.

> **Remember: types do not validate API data**
> `useFetch<User[]>` is a promise you make to TypeScript, not something it checks. If the API returns something different, TypeScript will not know. On Day 8 we use Zod to validate data at runtime, which closes this gap.

---

## Module 6.3: React Router

*Multiple pages in a single-page application.*

Real apps have many screens, each with its own URL that can be bookmarked, shared and reached with the back button. React Router provides that in single-page applications.

### Client-side routing

In a traditional website, every link loads a new HTML page from the server. In a single-page app, the page loads once. When you click a link, JavaScript changes the URL and swaps the components on screen. That is much faster, and state such as a half-typed form in a sidebar can be kept.

The router watches the URL and decides which components to show. `/projects/42` might render the Layout with the Project page inside it, with `42` as a parameter. Nested routes let pages share a layout: the navigation bar is rendered once in the layout, and only the inner content changes.

- One HTML page, many views chosen by the URL
- Links update the URL without a full page reload
- The router matches the URL to a component tree
- Back and forward buttons and bookmarks keep working
- Nested routes share layouts such as a navbar and sidebar
- React Router is the most widely used routing library for React

React Router has several modes. We use its **data mode** with `createBrowserRouter`, which suits Vite apps well. Its framework mode is closer to what Next.js does, and you will learn that style with Next.js on Day 9.

> **Looking ahead**
> Next.js on Day 9 uses file-based routing instead. The concepts (layouts, params and links) carry straight over.

### Defining routes

Install the router first. Stop the dev server (Ctrl+C), install, then start it again.

**Windows and macOS: same commands**

```bash
npm install react-router
npm run dev
```

**src/main.tsx**

```tsx
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "projects/:projectId", element: <Project /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
```

`createBrowserRouter` takes an array of route objects. Each route has a `path` and an `element` to render.

- **Nested routes:** the root route at `"/"` renders `Layout`, and its `children` render inside Layout.
- **Index route:** the default child, which is what you see at exactly `"/"`.
- **URL parameters:** `projects/:projectId` matches any value in that position, such as `/projects/42`, and the value becomes a parameter.
- **`errorElement`** renders when no route matches, or when a component or loader in this route or any of its child routes throws an error. It renders in place of Layout, so the error page has no nav.
- **`!` after `getElementById`** is TypeScript's non-null assertion: we promise the root element exists. The Vite TypeScript template already includes it. If you copied your JavaScript `main.jsx` over it, add the `!` back.

The example leaves out the rest of the imports: `createRoot` from `"react-dom/client"`, your CSS file and each page component. Keep the `<StrictMode>` wrapper from the template around `<RouterProvider>`.

Create simple placeholder components for `Dashboard`, `Project`, `Settings` and `NotFound` in a new `src/pages` folder, and move your existing board into `Dashboard`.

> **Troubleshooting: react-router-dom**
> Older tutorials import from `"react-router-dom"`. In current React Router, everything is imported from `"react-router"`, except `RouterProvider` for the browser, which comes from `"react-router/dom"`. If you see `react-router-dom` in a codebase, it is the older package name. React Router 8 removed it, so `npm install react-router-dom` gives you the old version 7. Install `react-router` and change the imports.

### Layouts, links and Outlet

**src/pages/Layout.tsx**

```tsx
import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/projects/website">Website</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

**src/index.css** (add)

```css
nav a.active { font-weight: bold; }
```

Layout renders the parts shared by all pages: the navigation and the main wrapper.

- **`Outlet`** is a placeholder where the matched child route appears.
- **`Link` and `NavLink`** render anchor elements, but they intercept the click and change the URL without reloading the page.
- **`NavLink`** also knows whether it matches the current URL and adds an `active` class automatically, which is perfect for highlighting the current page.
- **The `end` prop** on the Dashboard link matters. Without it, `"/"` counts as active on every page, because every URL starts with `/`.
- **Never use a plain `<a>` for internal links.** A plain anchor with `href` makes the browser do a full reload, which wipes all state. Always use `Link` or `NavLink` inside your app, and keep plain anchors for external sites.

> **Try it:** click between pages with the DevTools **Network** tab open. No new document request appears, and any state elsewhere on the page (a counter, say) keeps its value.

> **Check your understanding**
> Where does the Dashboard component appear on screen?
>
> <details><summary>Answer</summary>
>
> Wherever `<Outlet />` is placed inside Layout.
>
> </details>

### URL parameters and not found pages

**src/pages/Project.tsx**

```tsx
import { useParams, Link } from "react-router";

export default function Project() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  return <h1>{project.name}</h1>;
}
```

- **`useParams`** returns an object of the URL parameters. For `/projects/website`, `projectId` is `"website"`.
- **Params are always strings,** and TypeScript types them as `string | undefined`. If your ids are numbers, convert with `Number(projectId)`.
- **Handle unknown ids gracefully.** Users edit URLs, bookmarks go stale, and items get deleted.
- **Unmatched URLs show `errorElement`.** For completely unknown paths such as `/banana`, the `errorElement` from the route definition renders. Inside it, `useRouteError()` gives details about what went wrong (see the Lab 6.2 hints).

(`projects` here is a small array of `{ id, name }` objects; you create it in Lab 6.2.)

> **Try it:** visit `/projects/website`, `/projects/nope` and `/banana` to see all three cases.

> **Check your understanding**
> How would the Project page show only the tasks for that project?
>
> <details><summary>Answer</summary>
>
> Give each task a `projectId` field and filter the tasks by the URL parameter. This is derived state again.
>
> </details>

---

## Module 6.4: Navigation Patterns

*Programmatic navigation, search params and protected routes.*

Links cover most navigation. Sometimes, though, your code needs to navigate: after saving a form, after logging in, or when filters change the URL.

### useNavigate and useSearchParams

**src/pages/Dashboard.tsx** (excerpt)

```tsx
import { useNavigate, useSearchParams } from "react-router";

const navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();
const q = searchParams.get("q") ?? "";

const visible = tasks.filter((t) =>
  t.title.toLowerCase().includes(q.toLowerCase())
);

function handleSearch(value: string) {
  setSearchParams(value ? { q: value } : {});
}

function handleCreated(id: string) {
  navigate(`/tasks/${id}`);       // go somewhere
}
// navigate(-1) goes back
```

- **`useNavigate`** returns a function you call to change the URL from code. Use it after a successful save, a login or a delete.
  - `navigate(-1)` behaves like the browser back button.
  - Add `{ replace: true }` to replace the current history entry instead of adding a new one. This is useful after login, so Back does not return to the login page.
- **`useSearchParams`** works like `useState`, but the value lives in the URL query string, after the `?`, as in `/?q=login`. A filtered view can therefore be bookmarked, shared in a chat, and it survives a refresh.
- **The URL becomes your state.** The search text is read from the URL, and the visible list is derived from it. No extra state is needed.

The `/tasks/:taskId` route used by `handleCreated` does not exist yet. You add it in the Lab 6.2 stretch challenge.

> **Try it:** move the TaskBoard search box to use search params. Type a search, copy the URL, open it in a new tab, and you see the same filtered view.

> **Check your understanding**
> What is the advantage of keeping filters in the URL rather than in `useState`?
>
> <details><summary>Answer</summary>
>
> The view is shareable and bookmarkable, survives a refresh, and Back undoes a filter change.
>
> </details>

### Loaders and actions: a preview

React Router's data mode lets routes load their own data.

- **`loader`:** a function on a route that fetches data before the page renders.
- **`useLoaderData()`:** reads that data inside the component.
- **`action`:** a function on a route that handles form submissions for that route.
- **Benefits:** no loading flicker, fewer effects, and data and route defined together.
- **Same idea as Next.js** Server Components and Server Actions on Day 9.

An example route:

```tsx
{
  path: "projects/:projectId",
  loader: async ({ params }) => fetchProject(params.projectId),
  element: <Project />,
}
```

Here `fetchProject` stands for your own data function. As with `useParams`, `params.projectId` is `string | undefined`, so a real `fetchProject` must accept `undefined` or you must check for it first.

Loaders remove the Day 5 pattern of tracking loading state in an effect, at least for page-level data. We will not build loaders in TaskBoard, because on Day 9 we move to Next.js, which solves the same problem with Server Components. The key idea to take away is that page data is best loaded by the route or the server, not by effects scattered through components.

> **The trend**
> React is moving data fetching out of effects and closer to the route or server. You will see this pattern again tomorrow and on Day 9.

> **Good to know: should I use loaders in my own Vite apps?**
> Yes, they are a good pattern. Alternatively use TanStack Query, which we cover tomorrow. Many teams combine both.

### Protected routes

**src/components/RequireAuth.tsx**

```tsx
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth(
  { children }: { children: ReactNode }
) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace
      state={{ from: location.pathname }} />;
  }
  return children;
}

// Route: { path: "settings",
//   element: <RequireAuth><Settings /></RequireAuth> }
```

Some pages should only be visible to logged-in users.

- **A wrapper component checks for a user.** If there is none, it renders `Navigate`, which redirects to the login page as soon as it renders. Otherwise it renders its children.
- **`state.from` lets login send users back.** We pass the current path in navigation state, so after logging in the login page can return the user to where they were: `navigate(from ?? "/", { replace: true })`.
- **`useAuth` is a mock for today:** a custom Hook backed by `useLocalStorage` that stores a fake user object, with `login` and `logout` functions. On Day 7 we move it into Context so every component can reach it, and on Day 9 we replace it with real Supabase authentication.

> **Critical: front-end checks are UX only**
> Hiding a page in the browser is not security. Anyone can open DevTools and change JavaScript. Real protection happens on the server, which must check the user on every request. Front-end route protection is about user experience.

> **Try it:** once RequireAuth and a Login page are built (Lab 6.3), visit `/settings` while logged out. You are redirected to Login. Log in, and you land back on Settings.

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 6.1: Convert TaskBoard to TypeScript

| | |
|---|---|
| **Goal** | TaskBoard compiles with zero type errors. |
| **Suggested time** | 60 min |

Work through the errors one file at a time: start with `types.ts`, then the smallest components, then `App`. Fixing the leaf components first means fewer errors cascade into the files that use them.

#### Steps

1. Create `taskboard-ts` with the react-ts template (`npm create vite@latest taskboard-ts -- --template react-ts --eslint`) and bring your Git history across (see [Moving TaskBoard to TypeScript](#moving-taskboard-to-typescript)).
2. Copy your `src` folder into the new project, replacing the template's files, then rename files to `.tsx` (components) and `.ts` (everything else).
3. Create `src/types.ts` with `Status` and `Task`.
4. Add a Props type to every component.
5. Add generics to `useState`, `useLocalStorage` and `useFetch`.
6. Type your event handlers and refs.
7. Run `npx tsc --noEmit -p tsconfig.app.json` until it reports nothing.
8. Run the app with `npm run dev`, test every feature, then commit and push.

#### Done when

- [ ] `npx tsc --noEmit -p tsconfig.app.json` reports zero errors
- [ ] There are no `any` types in your code
- [ ] All Day 5 features still work

<details><summary><strong>Hints</strong> (try on your own first)</summary>

**Typing the Day 5 seed data.** A return type on the mapping function lets TypeScript check each field:

```ts
import type { Task } from "../types";

type Todo = { id: number; title: string; completed: boolean };

export function toTasks(todos: Todo[]): Task[] {
  return todos.map((t) => ({
    id: String(t.id),
    title: t.title,
    status: t.completed ? "done" : "todo",
    points: 1,
  }));
}
```

**A status dropdown with a typed change handler:**

```tsx
import type { ChangeEvent } from "react";
import type { Status, Task } from "../types";

type StatusSelectProps = {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
};

export default function StatusSelect({ task, onStatusChange }: StatusSelectProps) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, e.target.value as Status);
  }

  return (
    <select value={task.status} onChange={handleChange}>
      <option value="todo">To do</option>
      <option value="doing">In progress</option>
      <option value="done">Done</option>
    </select>
  );
}
```

**Stuck on one error?** A temporary `any` with a `// TODO` comment is acceptable while you move on, but remove it before the lab ends.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `Parameter 'x' implicitly has an 'any' type` | Add a type to the function parameter. |
| `Property 'title' does not exist on type 'never'` | `useState([])` needs a generic: `useState<Task[]>([])`. |
| `'inputRef.current' is possibly 'null'` (older TypeScript: `Object is possibly 'null'`) | Use optional chaining (`?.`) or an `if` check. |
| `Type 'string' is not assignable to type 'Status'` | The value came from a select's `e.target.value`. Cast it: `e.target.value as Status`. A cast is a promise to TypeScript, not a check, so use casts rarely. |
| `... must be imported using a type-only import ...` | Use `import type`. |
| `JSON.parse` returns `any` in `useLocalStorage` | Annotate the result as `T` (`useState<T>(...)` or `JSON.parse(stored) as T`). |
| `Property 'tags' is missing in type ...` | Your `Task` type does not match your data. Make fields your tasks do not always have optional (`tags?: string[]`). |
| `setTasks` rejects an array after seeding with `null` | Pass the type: `useLocalStorage<Task[] \| null>("tasks", null)`. |
| `Argument of type 'HTMLElement \| null' is not assignable ...` in `main.tsx` | Add `!` after `document.getElementById("root")`. |
| `tsc` prints nothing but VS Code shows errors | You ran `npx tsc --noEmit` without `-p tsconfig.app.json`, which checks nothing. |

> **Stretch challenge**
> Add `"noUncheckedIndexedAccess": true` to the `compilerOptions` in `tsconfig.app.json` and fix the new errors. Why can `array[0]` be `undefined`?

### Lab 6.2: Multi-Page TaskBoard

| | |
|---|---|
| **Goal** | Add routing with a shared layout, dashboard, project pages and settings. |
| **Suggested time** | 50 min |

Keep your tasks state in one place. The simplest approach today is to keep `useLocalStorage` for tasks inside `Layout`, and to pass tasks and handlers to the child pages through **Outlet context**. Tomorrow we replace this with a proper store.

#### Steps

1. Run `npm install react-router`.
2. Create `src/pages` with `Layout`, `Dashboard`, `Project`, `Settings` and `NotFound`.
3. Define the routes with `createBrowserRouter` in `main.tsx`.
4. Add `projectId` to the `Task` type and to your sample data.
5. Make Dashboard show all tasks, and Project show only that project's tasks.
6. Add a `NavLink` for each project and highlight the active page.
7. Move search into the URL with `useSearchParams`.
8. Test Back, refresh and unknown URLs, then commit.

#### Done when

- [ ] Each page has its own URL
- [ ] Refreshing any page works
- [ ] Unknown projects and unknown paths show friendly pages

<details><summary><strong>Hints</strong> (try on your own first)</summary>

**Outlet context.** In Layout, render `<Outlet context={{ tasks, setTasks }} />`, and in a page read it with `const { tasks } = useOutletContext<BoardContext>();`. `BoardContext` is a type you export from Layout.

**src/pages/Layout.tsx**

```tsx
import { NavLink, Outlet } from "react-router";
import type { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Task } from "../types";

export type BoardContext = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function Layout() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <div className="app">
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/projects/website">Website</NavLink>
        <NavLink to="/projects/mobile">Mobile app</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet context={{ tasks, setTasks } satisfies BoardContext} />
      </main>
    </div>
  );
}
```

Typing `setTasks` as `Dispatch<SetStateAction<Task[]>>` keeps your Day 4 updater functions, such as `setTasks((prev) => prev.filter(...))`, working in every page. `satisfies BoardContext` makes TypeScript check the object you pass. If you seed with `null` as in Lab 5.3, use `Task[] | null` in both places and show a loading message while `tasks` is `null`.

**src/pages/Project.tsx**

```tsx
import { Link, useOutletContext, useParams } from "react-router";
import type { BoardContext } from "./Layout";

const projects = [
  { id: "website", name: "Website" },
  { id: "mobile", name: "Mobile app" },
];

export default function Project() {
  const { projectId } = useParams();
  const { tasks } = useOutletContext<BoardContext>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <Link to="/">Back to dashboard</Link>
      </section>
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  return (
    <section>
      <h1>{project.name}</h1>
      <p>{projectTasks.length} tasks</p>
    </section>
  );
}
```

Render your board with `projectTasks` instead of the task count.

**src/pages/NotFound.tsx**

```tsx
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function NotFound() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong";

  return (
    <section>
      <h1>{title}</h1>
      <Link to="/">Back to dashboard</Link>
    </section>
  );
}
```

For `/banana` this shows "404 Not Found".

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Blank page after refreshing a deep URL in production | The host must serve `index.html` for all paths. The Vite dev server handles this automatically. Hosting is covered on Day 10. |
| Links cause full page reloads | A plain `<a>` tag was used. Use `Link` or `NavLink`. |
| Every nav link is highlighted | The `"/"` link is missing `end`. |
| `useParams` returns `undefined` | The route path is missing the colon (`:projectId`), or the component is rendered outside that route. |
| `npm install react-router` warns about an unsupported engine | React Router 8 needs Node 22.22 or newer. Install the current Node LTS (24). |

> **Stretch challenge**
> Add a Task detail page at `/tasks/:taskId` that shows and edits one task, then navigates back after saving.

### Lab 6.3: Protected Routes with a Mock Login

| | |
|---|---|
| **Goal** | Only logged-in users can reach Settings, and logging in returns them to where they were. |
| **Suggested time** | 35 min |

This is a mock, not real security: the purpose is to learn the routing pattern. On Day 9 we replace `useAuth` with Supabase Auth and add server-side checks.

#### Steps

1. Create `src/hooks/useAuth.ts` that returns `user`, `login(name)` and `logout()`.
2. Store the user with `useLocalStorage`.
3. Create a Login page with a name input, and add a `login` route for it.
4. Create `RequireAuth` and wrap the Settings route in it.
5. After login, redirect back to `state.from` with `replace`.
6. Show the user's name and a **Log out** button in the Layout.
7. Test: logged out, a direct URL, login, logout. Then commit and push.

#### Done when

- [ ] Settings redirects to Login when you are logged out
- [ ] Logging in returns you to the page you came from
- [ ] The Back button does not return to Login

<details><summary><strong>Hints</strong> (try on your own first)</summary>

**Reading `state.from` in Login.** `location.state` is typed `any`, so describe the shape you expect with a cast:

```tsx
const location = useLocation();
const from = (location.state as { from?: string } | null)?.from ?? "/";
```

**src/hooks/useAuth.ts**

```ts
import { useLocalStorage } from "./useLocalStorage";

export type User = { name: string };

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  function login(name: string) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
```

**src/pages/Login.tsx**

```tsx
import { useState } from "react";
import type { SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    login(name.trim() || "Demo user");
    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button type="submit">Log in</button>
    </form>
  );
}
```

**Routes in main.tsx** (inside `children`)

```tsx
{ path: "settings", element: <RequireAuth><Settings /></RequireAuth> },
{ path: "login", element: <Login /> },
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| After logging in, the Layout still does not show your name until you refresh | Expected today. Two components calling `useAuth` each have their own state, so Login's update does not reach Layout. Note it and refresh for now. Tomorrow's Context lesson fixes exactly this. |
| Back returns to the Login page | Add `{ replace: true }` to `navigate`, and `replace` to `<Navigate>`. |
| Always sent to `/` after login instead of the original page | `state={{ from: location.pathname }}` is missing on `<Navigate>`, or Login reads the state with a different property name. |

> **Stretch challenge**
> Hide the Settings nav link when you are logged out. Then add a `role` field to the user and a `RequireRole` wrapper for an Admin page.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key). These are also tomorrow morning's recap questions.

1. What does the `?` in `assignee?: string` mean?
2. Why does `useState([])` need a generic in TypeScript?
3. What does `Outlet` do?
4. Why use `NavLink` instead of an `a` tag for internal links?
5. Is hiding a route in React enough to secure it?

---

## Key takeaways

### What you learned

- TypeScript catches errors in the editor, before the code runs.
- Unions and optional fields model real data precisely.
- Type props, empty state, events and refs; let inference do the rest.
- React Router maps URLs to nested components with shared layouts.
- Links and `navigate` change pages without reloading.
- Route protection in the browser is UX; the server enforces security.

### Take-home practice

> Add a Task detail page at `/tasks/:taskId` with typed props and an edit form. Then add a typed breadcrumb component that shows **Dashboard > Project > Task** based on the current URL. Push your work when you are done.

### Looking ahead

TaskBoard is now a typed, multi-page app, which is a significant step toward a professional codebase. You probably noticed some pain today: passing tasks through Outlet context, and a `useAuth` Hook that does not share its state between components. Tomorrow we fix exactly that with Context, `useReducer`, Zustand and TanStack Query.

---

## Further reading

These official resources cover today's topics in more depth. The React TypeScript Cheatsheet is a community resource that answers almost every "how do I type this?" question: keep it bookmarked.

| Resource | Link |
|---|---|
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook/intro.html |
| TypeScript Playground | https://www.typescriptlang.org/play |
| React: Using TypeScript | https://react.dev/learn/typescript |
| React TypeScript Cheatsheet | https://react-typescript-cheatsheet.netlify.app/ |
| React Router docs | https://reactrouter.com/home |
| React Router: Data mode routing | https://reactrouter.com/start/data/routing |
| Vite: TypeScript | https://vite.dev/guide/features#typescript |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap: Day 5

1. The effect runs once, after the component first mounts.
2. In development, StrictMode deliberately mounts, unmounts and remounts components to reveal missing cleanup.
3. An older, slower response arrives after a newer one and overwrites it.
4. Calculating derived values such as a full name or a filtered list; resetting state after a click (do that in the event handler).
5. An object with a `current` property that persists across renders.

### Knowledge check

1. The property is optional; its type is `string | undefined`.
2. An empty array is inferred as `never[]`, so nothing can be added to it. `useState<Task[]>([])` fixes it.
3. It marks where the matched child route renders inside a layout.
4. It navigates without a full reload (keeping state) and adds an `active` class to the current link.
5. No. The server must check permissions on every request.

---

## My notes

&nbsp;
