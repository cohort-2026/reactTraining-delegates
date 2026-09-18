# Day 2: Modern JavaScript and Your First React App

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Write the modern JavaScript that React relies on and create your first React project.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 2 at a glance](#day-2-at-a-glance)
- [Morning recap: Day 1 knowledge check](#morning-recap-day-1-knowledge-check)
- [Module 2.1: Modern JavaScript (ES6+)](#module-21-modern-javascript-es6)
- [Module 2.2: Working with Data](#module-22-working-with-data)
- [Module 2.3: Asynchronous JavaScript](#module-23-asynchronous-javascript)
- [Module 2.4: Hello React](#module-24-hello-react)
- [Hands-on labs](#hands-on-labs)
  - [Lab 2.1: Data Transformation Drills](#lab-21-data-transformation-drills)
  - [Lab 2.2: Fetch and Display Data from a Public API](#lab-22-fetch-and-display-data-from-a-public-api)
  - [Lab 2.3: Scaffold the TaskBoard Capstone](#lab-23-scaffold-the-taskboard-capstone)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are the same on Windows (PowerShell) and macOS (Terminal) today, so one block is shown.
- **Callouts** marked Tip, Try it, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 2 at a glance

| Part | Topic |
|---|---|
| 2.1 | Modern JavaScript (ES6+) syntax |
| 2.2 | Working with data: array methods, immutability, modules |
| 2.3 | Asynchronous JavaScript and fetch |
| 2.4 | Hello React: your first Vite project |
| Labs | Array drills, API fetch, scaffold TaskBoard |

### By the end of today you will be able to

- Read and write arrow functions, template literals, destructuring, spread and rest, optional chaining and nullish coalescing
- Transform arrays of objects with `map`, `filter`, `find` and `reduce`, and chain them together
- Update arrays and objects immutably, and explain why React needs new copies rather than changes in place
- Split code across files with `import` and `export`
- Explain, at a conceptual level, how the event loop lets JavaScript wait without freezing the page
- Load data with `fetch` and `async`/`await`, and handle errors with `res.ok` and `try`/`catch`/`finally`
- Create a React project with Vite, find your way around its files, and explain how React renders

### Labs today

| Lab | Title | Time |
|---|---|---|
| 2.1 | Data Transformation Drills | 40 min |
| 2.2 | Fetch and Display Data from a Public API | 40 min |
| 2.3 | Scaffold the TaskBoard Capstone | 35 min |

---

## Morning recap: Day 1 knowledge check

Answer these five questions on yesterday before the session starts. The answers are in the [answer key](#answer-key).

1. What does npm do?
2. Name the four Git steps to get code onto GitHub.
3. Which CSS layout tool handles rows and columns together?
4. Which keyword should you use by default: `const` or `let`?
5. What is wrong with: `if (age == "18")`?

> **Take-home check:** if you wrote `summariseTasks` last night, keep it open. It uses a `for` loop, and by lunchtime you will be able to write it in two lines.

---

## Module 2.1: Modern JavaScript (ES6+)

*The syntax you will read in every React file.*

ES6 is the 2015 update to JavaScript. It and the yearly updates since then added syntax that makes code shorter and clearer. React code uses these features constantly, so if a React file ever looks strange, it is usually one of the features in this module.

Create a folder called `day2` inside `react-course` and open it in VS Code. Save each example below as its own file in `day2` and run it with `node <file name>`.

### Arrow functions and template literals

**modern.js**

```js
// Classic function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => {
  return a + b;
};

// Implicit return: one expression, no braces
const double = (n) => n * 2;

// Template literal: backticks and ${}
const name = "Lerato";
const msg = `Hello ${name}, 2 x 4 = ${double(4)}`;
console.log(msg); // Hello Lerato, 2 x 4 = 8
```

- **Arrow functions** are a shorter way to write functions. You drop the word `function` and put an arrow `=>` after the parameters. They are common for callbacks — a callback is just a function you hand to another piece of code, which runs it for you at the right moment. You'll see the term properly explained in Module 2.2.
- **Implicit return:** if the body is a single expression, you can drop the braces and the `return` keyword. `double` takes `n` and returns `n * 2`. You will see this everywhere in React, especially inside `map`.
- **Watch for the trap.** If you keep the braces, you must write `return`. An arrow function with braces and no `return` gives `undefined`. This causes many beginner bugs in React lists.
- **Template literals** use backticks instead of quotes. Inside them, `${expression}` inserts any JavaScript expression. No more `"Hello " + name + "!"` concatenation.

> **Tip: finding the backtick key**
> On a standard US or UK PC layout the backtick is to the left of the 1 key; on a UK Mac keyboard it is next to the left Shift key. On macOS international layouts you may need to press it followed by Space.

> **Try it:** run `node modern.js`. Then add the lines below, run the file again, and see `undefined` printed.
> ```js
> const bad = (n) => { n * 2 };
> console.log(bad(3)); // undefined: braces but no return
> ```

### Destructuring

**destructure.js**

```js
const task = { id: 7, title: "Deploy", done: false };

// Pull properties out into variables
const { title, done } = task;
console.log(title, done);   // Deploy false

// Rename and give a default
const { title: label, priority = "low" } = task;

// Arrays: position matters
const [first, second] = ["Plan", "Build", "Ship"];
console.log(first);         // Plan

// In function parameters (this is how props work)
function TaskRow({ title, done }) {
  return `${title}: ${done ? "done" : "open"}`;
}
```

Destructuring lets you unpack values from objects and arrays into variables in one line.

- **Objects: unpack by property name.** Put the property names in curly braces on the left, and JavaScript finds the matching properties. Rename with a colon (`title: label`), and set a default with equals (`priority = "low"`), which is used when the property is missing.
- **Arrays: unpack by position.** Use square brackets. Position matters rather than names: the first variable gets the first item.
- **Parameter destructuring is exactly how React components receive props.** A component is a reusable piece of a screen (you'll start building them tomorrow); props are just the data passed into it. `TaskRow` receives one object and immediately unpacks `title` and `done`. Tomorrow, every component you write will look like this, because React passes all the props as one object.
- **`useState` returns an array you destructure.** On Day 4 you will write `const [count, setCount] = useState(0)`. That is array destructuring, and now you know what it means.

> **Try it:** add `console.log(TaskRow(task));` at the end of the file and run it. It prints `Deploy: open`.

> **Check your understanding**
> In the example above, what value does `priority` get?
>
> <details><summary>Answer</summary>
>
> `"low"`, because `task` has no `priority` property.
>
> </details>

### Spread and rest

**spread.js**

```js
const tags = ["react", "js"];
const moreTags = [...tags, "vite"];   // copy + add

const task = { id: 1, title: "Learn", done: false };
const updated = { ...task, done: true }; // copy + override
console.log(task.done);     // false (original untouched)
console.log(updated.done);  // true

// Rest: collect the remaining items
const { id, ...details } = task;
console.log(details);   // { title: 'Learn', done: false }

const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3));  // 6
```

The three dots `...` do two jobs depending on where they appear.

- **Spread unpacks and copies.** `[...tags, "vite"]` creates a brand new array containing everything from `tags` plus `"vite"`. `{ ...task, done: true }` creates a brand new object with all of `task`'s properties, then overrides `done`.
- **Later properties win**, so the override must come after the spread.
- **The original is unchanged.** This is the key point. In React you never change state directly; you create a new copy with the change. Spread is how you do that, and you will write `{ ...task, done: true }` many times on Day 4.
- **Rest gathers leftovers.** In `const { id, ...details } = task`, `id` is pulled out and `details` gets everything else. In a function parameter, `...nums` gathers all the arguments into an array.

> **Try it:** change the override to `{ done: true, ...task }` and run the file again. `updated.done` is now `false`, which proves that later properties win.

> **Good to know: is the copy deep?**
> No. Spread makes a shallow copy: nested objects are still shared between the original and the copy. You will handle nested updates on Day 4.

### Optional chaining and nullish coalescing

**safe.js**

```js
const user = { name: "Kagiso", address: null };

// Without optional chaining this crashes:
// user.address.city  TypeError

console.log(user.address?.city);   // undefined, no crash
console.log(user.getAge?.());      // undefined

// ?? uses the fallback only for null or undefined
const city = user.address?.city ?? "Unknown";
console.log(city);   // Unknown

const stock = 0;
console.log(stock || 10);  // 10  (0 treated as false)
console.log(stock ?? 10);  // 0   (0 is kept)
```

Real data is messy. A user may not have an address yet. If you write `user.address.city` and `address` is `null`, your whole app crashes with `Cannot read properties of null`. API data is often incomplete, so these two operators are essential.

- **Optional chaining `?.`** says: if the thing on the left is `null` or `undefined`, stop and return `undefined` instead of crashing. It works on method calls too: `user.getAge?.()`.
- **Nullish coalescing `??`** gives a fallback value, but only when the left side is `null` or `undefined`.
- **`||` versus `??`:** `||` treats `0`, an empty string and `false` as "missing", which is often wrong. If `stock` is `0`, `stock || 10` wrongly shows 10, while `stock ?? 10` correctly keeps 0.

> **Try it:** uncomment the line `// user.address.city`, run the file and read the `TypeError`. Then fix it with `?.` and run it again.

> **Check your understanding**
> A product's discount is `0`. Which operator should provide the default: `||` or `??`?
>
> <details><summary>Answer</summary>
>
> `??`, because `||` would also replace the `0`.
>
> </details>

---

## Module 2.2: Working with Data

*Array methods, immutability and modules.*

This module is where JavaScript starts to feel powerful. The array methods you learn now are the exact tools React uses to turn data into screens.

### map, filter and find

**arrays.js**

```js
const tasks = [
  { id: 1, title: "Plan", done: true, points: 3 },
  { id: 2, title: "Build", done: false, points: 8 },
  { id: 3, title: "Test", done: false, points: 5 },
];

// map: transform every item, same length
const titles = tasks.map((t) => t.title);
// ["Plan", "Build", "Test"]

// filter: keep items that pass a test
const open = tasks.filter((t) => !t.done);
// Build, Test

// find: first match, or undefined
const task = tasks.find((t) => t.id === 2);
// { id: 2, title: "Build", ... }
```

These three methods replace most `for` loops. Each one takes a **callback**, a function that runs once per item.

- **`map` turns data into something else** and returns a new array of the same length. Here we turn task objects into title strings. In React you will use `map` to turn task objects into task components (the reusable pieces a screen is built from — you'll meet these properly tomorrow). That is how every list on every website you use is rendered.
- **`filter` removes items.** It keeps only the items where the callback returns `true`, so it can return a shorter array. In React you delete an item by filtering it out, and build search by filtering on text.
- **`find` gets one item.** It returns the first matching item, or `undefined` if none match. You use it to look up one task by its id.
- **None of them change the original array.** They all return new values, which fits perfectly with how React wants data handled.

> **Try it:** add `console.log` lines for `titles`, `open` and `task`, and run the file. Then write a `filter` that keeps only tasks worth more than 4 points.
>
> <details><summary>Answer</summary>
>
> ```js
> const big = tasks.filter((t) => t.points > 4); // Build and Test
> ```
>
> </details>

> **Check your understanding**
> What does `find` return if nothing matches?
>
> <details><summary>Answer</summary>
>
> `undefined`, so pair it with `?.` when you use the result.
>
> </details>

### reduce and chaining

**arrays.js (continued)** — add this below the code you already have in the same file. It reuses the `tasks` array from above, so if you saved it as a new file instead, add that array back in first.

```js
// (tasks is the same array from map, filter and find, above)

// reduce: boil an array down to one value
const totalPoints = tasks.reduce(
  (sum, t) => sum + t.points,
  0 // starting value
);
// 16

// Chaining: filter, then map, then join
const openList = tasks
  .filter((t) => !t.done)
  .map((t) => `${t.title} (${t.points})`)
  .join(", ");
// "Build (8), Test (5)"

// Day 1 homework in two lines
const doneCount = tasks.filter((t) => t.done).length;
console.log(`${doneCount} of ${tasks.length} done`);
```

- **`reduce` carries an accumulator through the array.** The callback receives the running total (the *accumulator*) and the current item, and returns the new running total. The second argument, `0`, is where the total starts.
- **Always pass a starting value.** Without it, `reduce` uses the first item as the start, which is rarely what you want with objects.
- **Chaining reads top to bottom like a recipe.** Because `map` and `filter` return arrays, you can chain them: take the tasks, keep the open ones, turn each into a label, join them with commas.
- **Yesterday's `summariseTasks` homework is now two lines.**
- **Other useful methods:** `some` returns `true` if any item passes a test; `every` returns `true` if all pass; `includes` checks whether an array contains a value. Be careful with `sort`: it changes the original array. Use `toSorted`, or sort a copy made with spread.

> **Try it:** write a `reduce` that adds up the points of the **open** tasks only.
>
> <details><summary>Answer</summary>
>
> ```js
> const openPoints = tasks
>   .filter((t) => !t.done)
>   .reduce((sum, t) => sum + t.points, 0);
> console.log(openPoints); // 13
> ```
>
> </details>

> **Good to know: is reduce hard?**
> It is the hardest of the four. It is fine to use `filter` plus `length`, or a simple loop, until `reduce` feels natural.

### Immutability: copy, do not change

| Mutating (avoid in React) | Immutable (React way) |
|---|---|
| `tasks.push(newTask);` | `[...tasks, newTask]` |
| `task.done = true;` | `{ ...task, done: true }` |
| `tasks.splice(index, 1);` | `tasks.filter(t => t.id !== id)` |
| `tasks.sort(byPoints);` | `[...tasks].sort(byPoints)` |

*Mutating* means changing something in place. *Immutable* means leaving the original alone and creating a new version. The left column shows mutating operations: `push`, direct property assignment, `splice` and `sort`. The right column shows the immutable equivalents, which return new values. Learn the four patterns on the right: **add, update, remove and sort**. You will use them all on Day 4.

Why does React care? React decides whether to redraw the screen by checking whether your data is a new object. If you change the old array in place, it is still the same array, so React may think nothing happened and the screen does not update. This is the number one "why isn't my screen updating?" bug in React.

> **Analogy**
> If you edit a document someone has already printed, their printout does not change. You need to hand them a new printout. React needs a new printout.

> **Check your understanding**
> How would you immutably remove the task with id 2?
>
> <details><summary>Answer</summary>
>
> `tasks.filter(t => t.id !== 2)`
>
> </details>

### ES modules: import and export

Real apps are split into many files. Modules let one file share code with another.

**utils.js (exporting)**

```js
export const formatPoints = (p) =>
  `${p} pts`;

export function isOverdue(date) {
  return new Date(date) < new Date();
}

export default function Logo() {
  return "TaskBoard";
}
```

**app.js (importing)**

```js
import Logo, {
  formatPoints,
  isOverdue,
} from "./utils.js";
import { useState } from "react";

console.log(formatPoints(5));
```

- **Named exports:** put `export` in front of a function or variable. Import them inside curly braces, using exactly the same name.
- **Default export:** each file can have one default. Import it without curly braces, and call it whatever you like. In React, each component file usually default-exports its component.
- **Where imports come from:** paths starting with `./` or `../` are your own files. A bare name such as `"react"` comes from a package in `node_modules`, installed with npm.
- **In a Vite React project** everything is already set up for modules, so the notes below apply only to today's plain JavaScript exercises.

> **Running these files in plain Node**
> Leave out the `import { useState } from "react";` line when you run `node app.js` in your `day2` folder. React is not installed there, so Node stops with `ERR_MODULE_NOT_FOUND` (`Cannot find package 'react'`). That line works inside a React project such as TaskBoard. Current Node, including Node 24, recognises `import` and `export` automatically when the folder has no `package.json`, so `node app.js` prints `5 pts`.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `SyntaxError: Cannot use import statement outside a module` | The nearest `package.json` says `"type": "commonjs"`, which `npm init -y` now writes by default. Change it to `"type": "module"`. |
> | Warning that the module type "is not specified" | Your `package.json` has no `type` field. The file still runs; add `"type": "module"` to remove the warning. |
> | `ERR_MODULE_NOT_FOUND: Cannot find package 'react'` | You are importing a package that is not installed in this folder. Remove the import for today's exercises. |

> **Check your understanding**
> Is `useState` a named or a default export of `react`?
>
> <details><summary>Answer</summary>
>
> Named, because it is imported inside curly braces.
>
> </details>

---

## Module 2.3: Asynchronous JavaScript

*Waiting for servers without freezing the page.*

Apps constantly wait: for data from a server, for a file, for a timer. JavaScript has a special way of waiting without freezing the whole page. This module explains it.

### Why async matters

1. **JavaScript does one thing at a time.** It has a single thread. A slow task that blocks would freeze clicks, scrolling and animation. If JavaScript had to sit and wait three seconds for a server, the entire page would freeze for three seconds.
2. **Slow work is handed off.** Network requests and timers run outside your code, in the browser or in Node.
3. **A promise is returned.** A promise is an IOU: the value is not ready yet, but it will be, or it will fail. JavaScript gets the promise immediately and carries on with other work.
4. **Your code continues.** When the result arrives, the promise is fulfilled, and the **event loop** schedules your follow-up code to run as soon as JavaScript is free.

A promise is always in one of three states: **pending**, **fulfilled** or **rejected**.

> **Analogy: the restaurant buzzer**
> You order at the counter and get a buzzer (the promise), then sit down. You are not stuck at the counter. When the food is ready, the buzzer goes off and you collect it (fulfilled). Sometimes the kitchen runs out, and the promise is rejected.

> **Try it:** predict the order of the output, then run it.
> ```js
> console.log("A");
> setTimeout(() => console.log("B"), 0);
> console.log("C");
> ```
> <details><summary>Answer</summary>
>
> `A`, `C`, `B`. Even with a delay of 0, the timer callback waits until the current code has finished, and then the event loop runs it.
>
> </details>

### Promises and async/await with fetch

**fetch-demo.js**

```js
const API = "https://jsonplaceholder.typicode.com";

// Promise chain style
fetch(`${API}/todos?_limit=3`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// async/await style (preferred)
async function loadTodos() {
  const res = await fetch(`${API}/todos?_limit=3`);
  const data = await res.json();
  return data;
}

loadTodos().then((todos) => {
  console.log(todos.map((t) => t.title));
});
```

`fetch` makes an HTTP request and returns a promise. The examples use JSONPlaceholder, a free fake API that returns sample to-do items.

- **`fetch` returns a promise of a Response.**
- **The promise chain style** chains `.then` calls. Each `.then` receives the result of the previous step, and `.catch` handles any failure.
- **The async/await style** does the same thing but reads like normal top-to-bottom code. `async` marks a function that can use `await`. Put `await` before any promise.
- **`await` pauses that function, not the app.** The function waits until the promise settles; the rest of the app keeps running.
- **`res.json()` is also async.** There are two awaits: one for the response headers to arrive, and one to read and parse the body as JSON. JSON is the text format APIs use to send data; `res.json()` turns it back into ordinary JavaScript arrays and objects, the same array-of-objects shape as the tasks in Module 2.2.
- **An async function always returns a promise**, even if you return a plain value. That is why we call `.then` on `loadTodos()`.

> **Try it:** run `node fetch-demo.js`. Node has `fetch` built in, so nothing needs installing. The two requests run at the same time, so their output can appear in either order.

> **Troubleshooting**
> On networks with a proxy or firewall, `fetch` may fail with `fetch failed` and a cause such as `ENOTFOUND` or `ECONNRESET`. Open the URL in your browser first. If it is blocked, tell the trainer so venue IT can help, or run the code in the browser console instead.

### Handling errors properly

**fetch-demo.js (continued)** — add this below the code you already have in the same file. It reuses the `API` constant from above, so if you saved it as a new file instead, add `const API = "https://jsonplaceholder.typicode.com";` back in first.

```js
// (API is the same constant from the top of this file)

async function getTodo(id) {
  try {
    const res = await fetch(`${API}/todos/${id}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const todo = await res.json();
    console.log(todo.title);
  } catch (err) {
    console.error("Could not load:", err.message);
  } finally {
    console.log("Done loading");
  }
}

getTodo(1);     // works
getTodo(9999);  // 404 handled
```

Networks fail, and your code must handle that.

- **`try` / `catch` handles rejected promises.** Wrap awaited code in `try`. If anything inside it throws, JavaScript jumps straight to `catch`.
- **`fetch` does not reject on 404 or 500.** This surprises everyone. `fetch` only rejects when the request itself fails, for example when there is no internet. A 404 Not Found or 500 Server Error still counts as a successful fetch.
- **Check `res.ok` and throw yourself.** `res.ok` is `true` only for status codes 200 to 299.
- **`finally` always runs**, whether the request succeeded or failed. In React, this is where you will turn off the loading spinner.

Every data request has three states: **loading, success and error**. Keep that in mind; on Day 5 your components will show all three.

> **Try it:** run the file. `getTodo(1)` prints a title, and `getTodo(9999)` prints `Could not load: Request failed: 404` instead of crashing. `Done loading` prints for both. Because both requests run at the same time, the lines may appear in a different order each run.

> **Check your understanding**
> Why would the app break silently without the `res.ok` check?
>
> <details><summary>Answer</summary>
>
> The body of the 404 response would be parsed and treated as real data. With JSONPlaceholder, `todo.title` would simply print `undefined`, with no error to tell you something went wrong.
>
> </details>

---

## Module 2.4: Hello React

*Creating and understanding your first React project.*

This is the moment. You have learned the JavaScript that React is built on. Now you create a React project.

### Thinking in components

A component is simply a JavaScript function that returns a description of what should appear on screen.

- **Components nest** inside each other like boxes inside boxes: `App` contains `Header` and `Board`, `Board` contains `TaskList`, and `TaskList` contains `TaskCard`.
- **Reusable:** design `TaskCard` once and render it a hundred times with different data. If you change `TaskCard`, every card updates.
- **Isolated:** each component owns its own markup, logic and styling.
- **Named with a capital letter:** `TaskCard`, not `taskCard`. React uses the capital letter to tell your components apart from built-in HTML tags such as `div` and `button`.

> **Try it**
> Open an app you use daily, such as a news feed, an email inbox or an online shop. Draw boxes around the header, the sidebar, the list, each item in the list and the buttons inside each item, and give each box a component name. Every repeated shape on screen, like a message, a product or a post, is a component rendered many times from a list of data.

> **Check your understanding**
> Think of an email inbox. What data would an `EmailRow` component need?
>
> <details><summary>Answer</summary>
>
> Sender, subject, preview, date, and whether it is read or unread. That list of data is what you will call *props* tomorrow.
>
> </details>

### Create a React project with Vite

Vite is a build tool that creates and runs React projects quickly. It is the modern standard for plain React apps.

**Windows and macOS: same commands**

```bash
cd react-course
npm create vite@latest taskboard -- --template react --eslint
cd taskboard
npm install
npm run dev
```

- `npm create vite@latest` downloads the latest Vite starter, and `taskboard` is the project name.
- The double dash `--` passes the options that follow it through npm to the Vite starter.
- `--template react` chooses the React template in plain JavaScript. You convert to TypeScript on Day 6 so you can see the difference.
- `--eslint` picks ESLint as the linter. Current create-vite defaults to a different linter, Oxlint, but this course uses ESLint: it matches the VS Code extension from Day 1 and gives you the React Hooks lint rules used from Day 5.
- Then move into the folder, install the dependencies and start the development server.

Open the **Local** URL it prints, usually `http://localhost:5173`, and click the counter button to see that it works. Stop the server with **Ctrl+C**.

> **Tip**
> The dev server must stay running while you work. Open a second terminal tab for Git commands.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `Need to install the following packages: create-vite ... Ok to proceed?` | Type `y` and press Enter. |
> | It asks **Which linter to use?** | You left out `--eslint`. Choose **ESLint**, not the default Oxlint. |
> | It asks **Install with npm and start now?** | **Yes** is fine: it runs `npm install` and `npm run dev` for you. Your terminal stays in `react-course`, so run `cd taskboard` after you stop the server. |
> | Port 5173 is already in use | Vite picks the next free port automatically. Use whichever URL it prints. |

### What Vite created

Open the project in VS Code by running `code .` from inside the `taskboard` folder.

```text
taskboard/
  node_modules/      installed packages (never edit, never commit)
  public/            static files served as-is
  src/
    assets/          images imported by components
    App.jsx          the root component
    App.css          styles for App
    main.jsx         entry point: mounts React into the page
    index.css        global styles
  index.html         the single HTML page, contains <div id="root">
  package.json       project name, scripts and dependencies
  vite.config.js     Vite configuration
  eslint.config.js   ESLint configuration
  .gitignore         tells Git to skip node_modules and dist
```

- **`node_modules`** holds every installed package. It can be huge. Never edit it and never commit it: `.gitignore` already excludes it, and anyone can recreate it by running `npm install`.
- **`index.html`** is the only HTML page in the whole app. Open it and find `<div id="root"></div>`. That empty div is where React draws everything, which is why React apps are called *single-page applications*.
- **`src`** is where you will spend all your time. `main.jsx` is the entry point and `App.jsx` is the top component.
- **`package.json`** lists your dependencies, `react` and `react-dom`, and your scripts: `dev` runs the dev server, `build` creates the production version, `lint` checks your code with ESLint, and `preview` tests that production build.
- **The `.jsx` extension** means "JavaScript with JSX", the HTML-like syntax you learn tomorrow.

> **Check your understanding**
> If a teammate clones your repository, what must they run before `npm run dev`?
>
> <details><summary>Answer</summary>
>
> `npm install`.
>
> </details>

### The entry point: main.jsx

**src/main.jsx**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`main.jsx` does one job, and you rarely edit it:

- It finds the `#root` div in `index.html`.
- It creates a React root there.
- It renders `App` inside it.

**`StrictMode`** adds development-only checks. It deliberately renders components twice in development to catch mistakes, and does nothing in production. If you ever see a `console.log` print twice, this is why. Do not remove it.

Notice the CSS import. In Vite you can import CSS files directly into JavaScript, and Vite adds them to the page for you.

> **Good to know: quotes and semicolons**
> The file Vite generates uses single quotes and fewer semicolons than the slide. Both styles are valid JavaScript; Prettier will tidy your files to one style when you save.

> **Check your understanding**
> Which HTML file contains the root div?
>
> <details><summary>Answer</summary>
>
> `index.html`, in the project root.
>
> </details>

### Your first component: App.jsx

**src/App.jsx (replace the contents)**

```jsx
function App() {
  return (
    <main>
      <h1>TaskBoard</h1>
      <p>My first React app.</p>
    </main>
  );
}

export default App;
```

- **A function that returns JSX.** `App.jsx` is your root component. Replace everything in the file with this code. The starter imports `App.css` and some images; removing those imports is fine.
- **Capital letter name.**
- **Default export**, so `main.jsx` can import it.
- **Save and the browser updates instantly**, with no manual refresh. This is Hot Module Replacement (HMR), one of Vite's best features.

Congratulations: that function is a React component, and you just wrote it.

> **Try it:** change the `h1` text and save again. Watch the browser update live.

> **Troubleshooting**
> **Blank white page after editing?** Open the DevTools **Console**. The most common cause is a missing `export default App;` line, or a typo in a tag.

### How React renders

The DOM is the browser's live model of the page. Changing it is relatively slow, so React avoids unnecessary changes. React works in three phases:

1. **Render:** React calls your component functions to find out what the UI should look like.
2. **Compare:** it compares the new result with the previous one.
3. **Commit:** it updates only the parts of the real page that changed.

- **Triggers:** a render happens on the first load and every time state changes. You will see this on Day 4, when a button click updates a counter and only the number on screen changes.
- **The in-memory description** of the UI is often called the *virtual DOM*. You never interact with it directly: you return JSX, and React handles the rest.
- **Your component functions will run many times.** That is normal, and it is why they should be simple and predictable: same inputs, same output.

> **Remember**
> You describe the destination. React plans the route and makes the smallest possible changes to the page.

> **Check your understanding**
> If a list of 100 tasks changes by one item, does React rebuild all 100 on the real page?
>
> <details><summary>Answer</summary>
>
> No. It updates only what changed.
>
> </details>

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 2.1: Data Transformation Drills

| | |
|---|---|
| **Goal** | Fluency with `map`, `filter`, `find`, `reduce`, spread and destructuring. |
| **Suggested time** | 40 min |

This lab builds muscle memory for the patterns you will use in React every day. **No `for` loops allowed.**

#### Steps

1. In `day2`, create `lab2-1.js` with an array of 6 product objects, each with `id`, `name`, `price`, `category` and `inStock`. You can use your own products, or paste this in to get straight to the array methods:
   ```js
   const products = [
     { id: 1, name: "Wireless Mouse", price: 349, category: "electronics", inStock: true },
     { id: 2, name: "USB-C Charger", price: 299, category: "electronics", inStock: true },
     { id: 3, name: "Noise-Cancelling Headphones", price: 2499, category: "electronics", inStock: true },
     { id: 4, name: "Learning React", price: 520, category: "books", inStock: true },
     { id: 5, name: "A5 Notebook", price: 85, category: "stationery", inStock: false },
     { id: 6, name: "Clean Code", price: 480, category: "books", inStock: true },
   ];
   ```
2. Use `map` to create an array of names.
3. Use `filter` to get the in-stock products under R500.
4. Use `find` to get the product with id 4.
5. Use `reduce` to total the price of all in-stock items.
6. Immutably mark product 2 as out of stock, using `map` and spread.
7. Immutably remove product 5, using `filter`.
8. Log everything with template literals, run `node lab2-1.js`, then commit.

#### Done when

- [ ] No `for` loops are used
- [ ] The original array is unchanged at the end
- [ ] The output is readable, with labels

To prove immutability, `console.log` the original `products` array at the end and check that product 2 is still in stock and product 5 is still there.

<details><summary><strong>Hint: expected output</strong> (try on your own first)</summary>

Using the sample products from step 1, your output should have roughly this shape (your own labels and wording can differ):

```text
Names: Wireless Mouse, USB-C Charger, Noise-Cancelling Headphones, Learning React, A5 Notebook, Clean Code
In stock under R500 (3):
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (in stock)
  #6 Clean Code: R480 (in stock)
Product 4: Learning React
Total price of in-stock items: R4147
After marking product 2 out of stock:
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (out of stock)
  ...
After removing product 5 (5 products):
  ...
Original products (6 products, unchanged):
  #1 Wireless Mouse: R349 (in stock)
  #2 USB-C Charger: R299 (in stock)
  ...
  #5 A5 Notebook: R85 (out of stock)
  ...
```

The last block is the immutability proof: the original `products` array still has 6 items, product 2 is still `in stock`, and product 5 is still there.

</details>

<details><summary><strong>Hint for step 6</strong> (try on your own first)</summary>

```js
const updated = products.map((p) => p.id === 2 ? { ...p, inStock: false } : p);
```

For each product, if the id is 2, return a new copy with `inStock` set to `false`; otherwise return the product unchanged. That pattern, `map` with a ternary and spread, is exactly how you will update one task in TaskBoard. Make sure you understand it before moving on.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `map` returns `undefined` items | The arrow function has braces but no `return`. |
| `reduce` returns text starting `"[object Object]"` | The starting value `0` is missing, so the first product object became the running total. |
| `reduce` returns `NaN` | A property name is misspelled, such as `p.prce`, so `undefined` was added to the total. |
| `filter` removes the wrong items | The condition is inverted. `filter` keeps the items where the test is `true`. |

> **Stretch challenge**
> Group the products by category using `reduce`, into an object like `{ electronics: [...], books: [...] }`.

### Lab 2.2: Fetch and Display Data from a Public API

| | |
|---|---|
| **Goal** | Load real data asynchronously and handle errors. |
| **Suggested time** | 40 min |

Now you fetch real data from the internet and process it with the array methods from Lab 2.1.

#### Steps

1. Create `lab2-2.js` in `day2`.
2. Write `async function loadTodos(limit)` using `fetch` and `await`.
3. Use `https://jsonplaceholder.typicode.com/todos?_limit=10`, with `limit` in place of the 10.
4. Check `res.ok` and throw an error on failure.
5. Wrap the code in `try` / `catch` / `finally`.
6. Log a numbered list of titles with a done or open marker. Each to-do from JSONPlaceholder has a `completed` property (`true` or `false`) and a `title`.
7. Log how many are completed, using `filter`.
8. Test the error path with a wrong URL (for example, change `todos` to `todoz`), then commit.

#### Done when

- [ ] Ten titles print with status markers
- [ ] A wrong URL prints a friendly error, not a crash
- [ ] The `finally` message always prints

<details><summary><strong>Hints: expected output and the numbered list</strong> (try on your own first)</summary>

Your output should have this shape:

```text
1. [open] delectus aut autem
2. [open] quis ut nam facilis et officia qui
...
Completed: 3 of 10
```

For the numbered list, remember that `map` gives you the index as the second callback argument: `todos.map((t, i) => ...)`. The index starts at 0, so add 1 for the number you display.

The structure of `loadTodos` is the same as `getTodo` in [Handling errors properly](#handling-errors-properly): `fetch`, check `res.ok`, parse the JSON, then log, with `catch` and `finally` around it.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `Promise { <pending> }` printed | You logged the result of an async function without awaiting it. Use `.then`, or call it from another async function. |
| `SyntaxError: await is only valid in async functions...` | `await` is used outside an `async` function. |
| Network blocked | Open the URL in your browser. If it is blocked there too, pair up with a neighbour or run the code in the browser console. |

> **Stretch challenge**
> - Accept a `userId` and fetch `https://jsonplaceholder.typicode.com/todos?userId=2` instead.
> - Log a simple loading message before the request.
> - Measure how long the request takes using `Date.now()` before and after.

### Lab 2.3: Scaffold the TaskBoard Capstone

| | |
|---|---|
| **Goal** | Create the TaskBoard React project, customise it, and push it to its own GitHub repository. |
| **Suggested time** | 35 min |

This is the project you will build for the rest of the course, so set it up carefully. Create it directly inside `react-course`, **not** inside the `day2` folder, and make it its own Git repository so it can become a clean portfolio piece.

#### Steps

1. Inside `react-course`, create the project with the Vite command from earlier:
   ```bash
   npm create vite@latest taskboard -- --template react --eslint
   ```
2. Run `cd taskboard`, `npm install` and `npm run dev`.
3. Replace `src/App.jsx` with a TaskBoard heading and a short tagline (see [Your first component: App.jsx](#your-first-component-appjsx)).
4. Clear `src/index.css` and `src/App.css` to a simple starting point.
5. Change the page title in `index.html` to TaskBoard: `<title>TaskBoard</title>`.
6. On GitHub, create a new **empty** repository called `taskboard`.
7. In a second terminal inside `taskboard`, run:
   ```bash
   git init
   git add .
   git commit -m "Scaffold TaskBoard with Vite"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
8. Open DevTools and confirm there are no errors in the Console.

#### Done when

- [ ] `localhost` shows your TaskBoard heading
- [ ] The browser tab says TaskBoard
- [ ] The repository is on GitHub without `node_modules`

#### Troubleshooting

| Problem | Fix |
|---|---|
| `taskboard` is inside another repository | In Lab 1.1 you ran `git init` in `react-course`, so `taskboard` sits inside that repository. It works but is messy. The cleanest fixes: move `taskboard` outside `react-course`, or add `taskboard/` to `react-course`'s `.gitignore` and commit that change in `react-course`. The trainer will tell you which approach to use. |
| `node_modules` pushed to GitHub | `.gitignore` was deleted, or `git init` was run in the wrong folder. Make sure `.gitignore` exists and lists `node_modules` (recreate it if it was deleted), then run `git rm -r --cached node_modules`, commit and push. |
| Blank page | Check the Console for errors. It is usually a missing `export default`. |
| Heading does not update | The dev server was stopped. Run `npm run dev` again. |

> **Stretch challenge**
> - Add a simple CSS reset and a system font stack in `index.css`.
> - Add a `README.md` describing TaskBoard and its tech stack.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key). These are the questions you will be asked at the start of Day 3.

1. What does `const double = (n) => n * 2` return for `double(5)`?
2. Write the immutable way to set `done` to `true` on a task object.
3. Which array method keeps only items that pass a test?
4. Why must you check `res.ok` after `fetch`?
5. Which file mounts the React app into the page?

---

## Key takeaways

### What you learned

- Arrow functions, template literals and destructuring appear in almost every React file.
- Spread creates copies; React relies on copies, not changes.
- `map`, `filter`, `find` and `reduce` turn data into new data.
- `async`/`await` handles server calls; always check `res.ok`.
- Vite creates a React project; `main.jsx` mounts `App` into `#root`.
- TaskBoard is scaffolded and on GitHub.

### Take-home practice

> 1. Rewrite your Day 1 `summariseTasks` using `filter` and a template literal.
> 2. In TaskBoard's `src/App.jsx`, create a `const` array of three task objects **above** the `App` function. Each task needs an `id`, a `title` and `done`, for example:
>    ```jsx
>    const tasks = [
>      { id: 1, title: "Set up project", done: true },
>      { id: 2, title: "Build task list", done: false },
>      { id: 3, title: "Style the board", done: false },
>    ];
>    ```
>    Tomorrow you turn that array into a real list on screen.

### Looking ahead

Tomorrow is **React Fundamentals**: JSX, components and props. It is the day most people say React finally makes sense.

---

## Further reading

These official resources cover today's topics in more depth. From tomorrow, the React documentation at react.dev is your primary reference.

| Resource | Link |
|---|---|
| MDN: Arrow functions | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions |
| MDN: Destructuring | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring |
| MDN: Array methods | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array |
| MDN: Using promises | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises |
| MDN: Using fetch | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch |
| Vite: Getting started | https://vite.dev/guide/ |
| React: Quick start | https://react.dev/learn |
| JSONPlaceholder | https://jsonplaceholder.typicode.com/ |

> **Good to know: older tutorials**
> Be careful with older tutorials that use class components or Create React App. Those approaches are outdated; the course uses function components and Vite.

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap: Day 1 knowledge check

1. It installs and manages JavaScript packages (libraries) for your project, and runs project scripts.
2. `git init`, `git add`, `git commit`, `git push` (plus `git remote add` the first time).
3. CSS Grid.
4. `const`.
5. It uses `==`, which converts types. Use `===` and compare to the number `18`.

### Knowledge check

1. `10`.
2. `{ ...task, done: true }`
3. `filter`.
4. `fetch` does not reject on HTTP errors such as 404 or 500; `res.ok` tells you whether the status was 200 to 299.
5. `src/main.jsx`, using `createRoot` on the `#root` element.

---

## My notes

&nbsp;
