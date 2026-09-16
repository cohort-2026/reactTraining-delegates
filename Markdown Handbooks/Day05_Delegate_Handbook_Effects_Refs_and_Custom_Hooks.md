# Day 5: Effects, Refs and Custom Hooks

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Synchronise components with the outside world and package logic for reuse.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 5 at a glance](#day-5-at-a-glance)
- [Morning recap: Day 4 knowledge check](#morning-recap-day-4-knowledge-check)
- [Module 5.1: useEffect](#module-51-useeffect)
- [Module 5.2: Fetching Data](#module-52-fetching-data)
- [Module 5.3: useRef](#module-53-useref)
- [Module 5.4: Custom Hooks](#module-54-custom-hooks)
- [Hands-on labs](#hands-on-labs)
  - [Lab 5.1: Search-as-You-Type with Debouncing](#lab-51-search-as-you-type-with-debouncing)
  - [Lab 5.2: Weather Dashboard from a Public API](#lab-52-weather-dashboard-from-a-public-api)
  - [Lab 5.3: TaskBoard: Persistence and Seed Data](#lab-53-taskboard-persistence-and-seed-data)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Callouts** marked Tip, Good to know, Try it, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 5 at a glance

Today is the halfway point. You already know the React core: components, props and state. Today you connect React to the world outside it: servers, timers, browser storage and the page itself. By the end of the day TaskBoard remembers your tasks after a refresh and loads starter data from an API, and you will have written your first custom Hooks.

| Part | Topic |
|---|---|
| 5.1 | useEffect: synchronising with external systems |
| 5.2 | Fetching data: loading, error and empty states |
| 5.3 | useRef: DOM access and values that do not re-render |
| 5.4 | Custom Hooks: useFetch and useLocalStorage |
| Labs | Debounced search, weather dashboard, persistent TaskBoard |

### By the end of today you will be able to

- Explain what a side effect is, and decide whether code belongs in an effect, an event handler or the render itself
- Use `useEffect` with the right dependency array, and write cleanup functions for timers, listeners and requests
- Explain why effects run twice in development under StrictMode
- Fetch data in an effect, cancel stale requests with `AbortController`, and render loading, error, empty and success states
- Use `useRef` to focus DOM elements and to store values that should not trigger a re-render
- Follow the Rules of Hooks and build reusable `useFetch` and `useLocalStorage` custom Hooks
- Debounce user input so a search does not send a request on every keystroke

### Labs today

| Lab | Title | Time |
|---|---|---|
| 5.1 | Search-as-You-Type with Debouncing | 40 min |
| 5.2 | Weather Dashboard from a Public API | 45 min |
| 5.3 | TaskBoard: Persistence and Seed Data | 50 min |

---

## Morning recap: Day 4 knowledge check

Answer these questions on yesterday's content before the session starts. Answers are in the [answer key](#answer-key).

1. What does calling a state setter do?
2. Fix this: `onClick={handleDelete(task.id)}`
3. What makes an input controlled?
4. How do you update one task in an array immutably?
5. What is derived state, and why prefer it?

> **Today's problem:** open TaskBoard, add a task and refresh the page. The task disappears, because state lives only in memory. By the end of today that is fixed.

---

## Module 5.1: useEffect

*Synchronising with systems outside React.*

Rendering should be pure: take props and state, return JSX, nothing else. But apps need to do things like fetch data, set timers and save to storage. Those are side effects, and `useEffect` is where they go. It is powerful, and it is also the most misused Hook in React, so today you learn both when to use it and when not to.

### What is a side effect?

A side effect is anything your component does that reaches outside React: calling an API, starting a timer, writing to `localStorage`, changing `document.title`, or subscribing to a WebSocket.

Why not do this directly in the component body? Because the body runs on every render, possibly many times, and React may render without committing the result to the screen. Doing side effects there causes duplicate requests and unpredictable behaviour.

`useEffect` runs your code after React has updated the screen. The best mental model is **synchronisation**: "keep this outside system in sync with this state". For example, keep the browser tab title in sync with the number of open tasks.

One important distinction: if something happens because the user did something, like clicking **Save**, put it in the event handler. Effects are for things that must happen because the component is showing, or because some value changed.

- Side effects are anything outside React's rendering: network, timers, storage, subscriptions, the page title.
- Rendering must stay pure: same props and state, same JSX, no outside changes.
- `useEffect` runs after React updates the screen.
- Think synchronisation: keep an outside system in step with your state.
- Event-driven work belongs in event handlers, not effects.

> **Mental model**
> An effect says: whenever these values change, make the outside world match them.

> **Check your understanding**
> Saving a task to the server when the user clicks Save: effect or event handler?
>
> <details><summary>Answer</summary>
>
> Event handler. It happens because the user did something.
>
> </details>

### Your first effect

**src/components/Header.jsx**

```jsx
import { useEffect } from "react";

function Header({ tasks }) {
  const openCount = tasks.filter((t) => !t.done).length;

  useEffect(() => {
    document.title = `TaskBoard (${openCount} open)`;
  }, [openCount]);

  return <h1>TaskBoard</h1>;
}
```

`useEffect` takes two arguments. The first is a function containing the side effect. The second is the **dependency array**: the list of values the effect uses.

After each render, React compares the dependencies with their values from the previous render. If any changed, the effect runs again. Here, whenever `openCount` changes, the tab title updates.

- First argument: the effect function.
- Second argument: the dependency array.
- The effect runs after render when a dependency changes.

> **Your TaskBoard uses `status`, not `done`**
> Since Lab 3.3, TaskBoard tasks have a `status` of `"todo"`, `"doing"` or `"done"`. In your capstone, count open tasks with:
> ```jsx
> const openCount = tasks.filter((t) => t.status !== "done").length;
> ```

The ESLint plugin for React Hooks, included because we chose ESLint when we created the project with Vite, warns you if you forget a dependency. Take those warnings seriously: a missing dependency means your effect uses stale values.

> **Try it:** add the effect to TaskBoard's `Header`. Add and complete tasks, and watch the browser tab title change.

> **Check your understanding**
> What would happen if `openCount` were missing from the dependency array but the array was empty?
>
> <details><summary>Answer</summary>
>
> The title would be set once on first load and never update.
>
> </details>

### The dependency array controls when effects run

| Form | When it runs |
|---|---|
| `useEffect(fn, [a, b])` | After the first render, then again whenever `a` or `b` changes. This is what you want most of the time. |
| `useEffect(fn, [])` | Once, after the component first appears. Useful for one-time setup such as a subscription. |
| `useEffect(fn)` | No array: after every single render. Rarely correct, and a common cause of infinite loops. |

- **With values:** runs on mount and whenever those values change. This is the normal case. Include every prop, state value and function from the component that the effect reads.
- **Empty array:** runs once when the component mounts. In development, StrictMode deliberately mounts, unmounts and remounts components, so you will see mount effects run twice. That is intentional: it exposes missing cleanup. It does not happen in production.
- **No array:** runs after every render. If that effect sets state, you create an infinite loop: render, effect, set state, render, effect, forever. The counter races upwards and React logs a "Maximum update depth exceeded" error in the console over and over.

> **Check your understanding**
> Your effect reads `userId`. What goes in the array?
>
> <details><summary>Answer</summary>
>
> `[userId]`.
>
> </details>

### Cleanup functions

**src/components/Clock.jsx**

```jsx
import { useEffect, useState } from "react";

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <p>{now.toLocaleTimeString()}</p>;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () =>
      window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
```

If an effect starts something, it must stop it. You do that by returning a **cleanup function** from the effect.

React calls the cleanup before running the effect again, and when the component is removed from the page. Without cleanup, a timer keeps running after its component is gone and event listeners pile up, causing memory leaks and strange bugs.

`Clock` starts an interval and clears it in cleanup. The second example subscribes to window `resize` events and unsubscribes in cleanup. Notice the second one is already written as a custom Hook; you formalise that in Module 5.4.

This is why StrictMode mounts twice in development. If your cleanup is correct, you will not notice. If it is missing, you will see duplicated timers or subscriptions immediately.

- Return a function from the effect to clean up.
- The cleanup runs before the next effect and on unmount.
- Always undo what you set up: timers, listeners, subscriptions.
- StrictMode's double run checks this for you.

> **Try it:** render `Clock` behind a **Show clock** toggle and add a `console.log` inside the interval. Hide the clock: the logging stops. Now delete the `return () => clearInterval(id);` line and try again. The logging carries on forever after the clock is hidden, and React prints no warning about it, so the leak is silent. Put the cleanup back.

### You might not need an effect

This section is based on a page in the React docs titled [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect), and it will save you from many bugs.

**Unnecessary effect**

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);
```

**Calculate during render**

```jsx
const fullName = first + " " + last;

// Reset on click? Do it in the handler, not an effect:
function handleSubmit() {
  save();
  setTitle("");
}
```

The first version copies derived data into state with an effect. It works, but it causes an extra render with stale data first, and it adds state that can drift out of step. The second version simply calculates the value during render. Faster and simpler.

Rules of thumb:

- If you are **transforming data for display**, calculate it during render.
- If something happens **because of a user action**, do it in the event handler.
- If you need to **reset state when a prop changes**, give the component a `key` so React remounts it.

Effects are for synchronising with external systems. If there is no external system involved, you probably do not need one.

> **Check your understanding**
> A `filteredTasks` effect that runs when `search` changes: is it needed?
>
> <details><summary>Answer</summary>
>
> No. Derive `filteredTasks` during render, as on Day 4.
>
> </details>

---

## Module 5.2: Fetching Data

*Loading, error and empty states.*

Loading data when a component appears is the most common real-world use of `useEffect`. On Day 7 you will replace hand-written fetching with TanStack Query, and on Day 9 Next.js Server Components fetch data without effects at all. Understanding the manual version first makes those tools much clearer.

### Fetching in an effect

**src/components/UserList.jsx**

```jsx
import { useEffect, useState } from "react";

const API = "https://jsonplaceholder.typicode.com";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/users`);
        if (!res.ok) throw new Error(res.status);
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // rendering continues in "Rendering every state" below
```

Every data request has three possible states: loading, success and error. You model each with state.

The effect function itself cannot be marked `async`, because an async function returns a promise, and React expects the effect to return either nothing or a cleanup function. So you define an async function inside the effect and call it straight away.

The body is exactly the Day 2 fetch pattern: `try`, check `res.ok`, parse the JSON, `catch` errors, and turn loading off in `finally`. The empty dependency array means this runs once when `UserList` appears.

- Three pieces of state: data, loading, error.
- Define an async function inside the effect and call it.
- The effect itself cannot be async.
- `API` is the JSONPlaceholder base URL.

> **Try it:** in DevTools open the **Network** tab and set throttling to **Slow 4G**, then refresh. The loading state is now visible.

> **Troubleshooting**
> **Two identical requests in the Network tab.** This is StrictMode's development double mount. It does not happen in production, and the next section shows how to handle it properly with cleanup.

### Cancelling stale requests

**src/components/UserPosts.jsx**

```jsx
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API}/posts?userId=${userId}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [userId]);

  // render posts here
}
```

Here is a subtle bug. The user picks user 1, then quickly user 2. Request 1 is slow and finishes after request 2. Now the screen shows user 1's posts while user 2 is selected. This is called a **race condition**.

The fix is to cancel the old request in the cleanup function. `AbortController` is built into the browser. You pass its `signal` to `fetch`. When `userId` changes, React runs the cleanup first, which aborts the previous request. The aborted fetch rejects with an error named `AbortError`, which you deliberately ignore because it is expected.

Notice `userId` in the dependency array. Every time it changes, the old request is cancelled and a new one starts.

Honestly, this is a lot of code to get right every time. That is exactly why teams use data-fetching libraries like TanStack Query, which handle caching, cancellation, retries and race conditions for you. You meet it on Day 7.

- Race condition: a slow old response can overwrite a newer one.
- `AbortController` cancels the old request.
- The cleanup aborts when `userId` changes or on unmount.
- Ignore the expected `AbortError`.

> **Try it:** add a `<select>` that changes `userId`, keep throttling on, and switch users quickly. Cancelled requests appear in the Network tab as **(canceled)**.

### Rendering every state

**src/components/UserList.jsx (continued)**

```jsx
  if (loading) return <p>Loading users...</p>;
  if (error) {
    return (
      <div role="alert">
        <p>Could not load users: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  }
  if (users.length === 0) return <p>No users found.</p>;
  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

export default UserList;
```

A professional UI handles all four outcomes: **loading, error, empty and success**. Beginners often only build success, and users see a blank screen whenever anything goes wrong.

Early returns keep this tidy. Check loading first, then error, then empty, and finally render the list. (All the Hooks are called above the early returns, which matters for the Rules of Hooks in Module 5.4.)

`retry` is a function you write that resets the error, sets loading to true and loads again. One way is a `retryCount` state used as an effect dependency. TanStack Query gives you a `refetch` function for free.

<details><summary><strong>One way to write retry</strong></summary>

```jsx
const [retryCount, setRetryCount] = useState(0);

useEffect(() => {
  // ...the same load() function as above...
  load();
}, [retryCount]); // runs again whenever retryCount changes

function retry() {
  setError(null);
  setLoading(true);
  setRetryCount((c) => c + 1);
}
```

</details>

Skeleton screens, grey placeholder shapes, are a nicer loading experience than text. You will build one with Tailwind on Day 8.

- Loading: tell the user something is happening.
- Error: explain and offer a way forward.
- Empty: success, but nothing to show.
- Success: the actual data.
- Early returns keep this readable.

> **Try it:** test each state. Throttle the network to see loading; change the URL to `/userz` to see the error; filter the result to an empty array to see the empty state.

> **Check your understanding**
> Which state do users see most often on a slow mobile connection?
>
> <details><summary>Answer</summary>
>
> Loading, so make it good.
>
> </details>

---

## Module 5.3: useRef

*DOM access and values that do not trigger renders.*

Sometimes you need to reach directly into the page, for example to focus an input or scroll to an element. Sometimes you need to remember a value without re-rendering. `useRef` does both.

### Refs for DOM elements and stored values

**src/components/QuickAdd.jsx**

```jsx
import { useRef, useEffect } from "react";

function QuickAdd() {
  const inputRef = useRef(null);
  const renders = useRef(0);

  useEffect(() => {
    inputRef.current.focus(); // focus on first load
  }, []);

  useEffect(() => { renders.current += 1; });

  const selectAll = () => inputRef.current.select();

  return (
    <>
      <input ref={inputRef} placeholder="Quick add..." />
      <button onClick={selectAll}>Select</button>
    </>
  );
}
```

`useRef` returns an object with a single property, `current`. React keeps the same object for the lifetime of the component.

**First use: DOM access.** Pass the ref to an element's `ref` attribute. After React creates the element, `inputRef.current` is the real input element, so you can call `focus()`, `select()` or `scrollIntoView()` on it. Access it in effects or event handlers, not during rendering, because during the first render the element does not exist yet.

**Second use: remembering a value without re-rendering.** `renders.current` changes but the screen does not update. This is good for storing timer ids, previous values, or anything the UI does not display.

> **Do not touch `.current` while rendering**
> Read and write `.current` in effects or event handlers, never in the component body while it renders (the only exception is setting its initial value). That is why the render count above is updated inside an effect, which runs after each render. The React Hooks ESLint rules report an error if you write `renders.current += 1` directly in the component body.

React 19 note: you can now pass `ref` as a normal prop to your own components, which makes wrapping inputs much simpler. You cover that on Day 8.

- `useRef(initial)` returns `{ current: initial }`.
- `ref={inputRef}` puts the DOM element in `current`.
- Changing `.current` does not re-render.
- Use refs for focus, scroll, measuring and timer ids.

> **Try it:** build `QuickAdd`. Refresh and see the input focused automatically. Type something and click **Select**.

> **Check your understanding**
> You want to show on screen how many times a button was clicked. Ref or state?
>
> <details><summary>Answer</summary>
>
> State, because the screen must update.
>
> </details>

### Ref or state?

| Use state when... | Use a ref when... |
|---|---|
| The value is shown on screen | You need a DOM element |
| Changing it should update the UI | The value is not displayed |
| Other values are derived from it | Changing it must not cause a render |
| Examples: tasks, form input, `isOpen` | Examples: input element, interval id, previous value, scroll position |

A quick decision guide: if it appears on screen or affects what appears, use state. If it is behind the scenes, or it is a DOM element, use a ref.

> **Warning: refs are an escape hatch**
> If you find yourself using refs to read and change lots of DOM content, you are fighting React. Let state drive the UI and use refs only for the things React cannot express, such as focus.

---

## Module 5.4: Custom Hooks

*Reusable logic with your own use functions.*

Components share UI by being reused. Custom Hooks let components share **logic**. They are one of the most elegant ideas in React.

### What is a custom Hook?

A custom Hook is just a JavaScript function that uses other Hooks, and whose name starts with `use`. The name must be `use` followed by a capital letter, as in `useFetch`. The prefix matters: it tells other developers, ESLint and the React Compiler that the function follows the Rules of Hooks.

- A custom Hook is a function whose name starts with `use` and that calls other Hooks.
- It extracts stateful logic so components stay focused on UI.
- Each component gets its own copy of the state.
- It follows the Rules of Hooks: top level only, called from components or other Hooks.
- It returns whatever is useful: a value, an array or an object.

**The Rules of Hooks** are two rules:

1. **Call Hooks only at the top level** of a component or custom Hook. Never call them inside a condition, a loop, a nested function or after an early return. React matches each Hook call to its state by the order the calls happen, so the order must be the same on every render.
2. **Call Hooks only from React components or other custom Hooks**, not from ordinary JavaScript functions.

Custom Hooks share logic, not state. If two components call `useWindowWidth`, each gets its own independent `width` state.

You return whatever makes sense. `useLocalStorage` returns an array, like `useState`. `useFetch` returns an object with `data`, `loading` and `error`.

The payoff is readability. A component that says `const { data, loading, error } = useFetch(url)` is far easier to read than twenty lines of effect code.

> **When to extract**
> If two components contain the same `useState` and `useEffect` code, that code wants to be a custom Hook.

> **Try it:** create a folder `src/hooks`. Hook files use camelCase names: `useFetch.js`, `useLocalStorage.js`.

### useFetch

**src/hooks/useFetch.js**

```jsx
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => { setData(d); setError(null); })
      .catch((e) => e.name !== "AbortError" && setError(e.message))
      .finally(() => !ctrl.signal.aborted && setLoading(false));
    return () => { ctrl.abort(); setLoading(true); };
  }, [url]);

  return { data, error, loading };
}
```

Here is all the fetching logic from Module 5.2, packaged once. It tracks data, error and loading, cancels stale requests, and re-runs whenever the `url` changes.

Two details make it reliable:

- **Loading is switched off only if this request was not cancelled.** Without that check, a cancelled request (from StrictMode's double mount, or a `url` change) would set `loading` to `false` while the new request is still running, and code such as `data.current` would crash.
- **The cleanup sets loading back to true**, ready for the next `url`. You do not call `setLoading(true)` at the top of the effect, because the React Hooks ESLint rules report setting state synchronously inside an effect (`react-hooks/set-state-in-effect`).

Now `UserList` shrinks to `const { data: users, loading, error } = useFetch(API + "/users");` followed by the rendering. Notice the rename in the destructuring, `data: users`, from Day 2.

This Hook is deliberately simple. It has no caching, so navigating away and back fetches again. That is the gap TanStack Query fills on Day 7.

- Everything from Module 5.2 in one reusable function.
- Re-fetches when `url` changes.
- Usage: `const { data, loading, error } = useFetch(url)`.
- Remember to import `useState` and `useEffect`.

> **Try it:** refactor `UserList` and `UserPosts` to use `useFetch` and see how much shorter they become.

> **Check your understanding**
> Two components call `useFetch` with the same URL. How many requests happen?
>
> <details><summary>Answer</summary>
>
> Two. Custom Hooks do not share state or a cache.
>
> </details>

> **Troubleshooting**
> **Infinite requests.** The `url` was built as a new object each render (for example `new URL(...)`), or you passed an options object created inline and added it to the dependencies. A new object is "different" on every render, so the effect runs again and again. Keep dependencies to strings and numbers: pass `url.toString()` rather than a `URL` object.

### useLocalStorage

**src/hooks/useLocalStorage.js**

```jsx
import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**src/App.jsx: a one-word change**

```jsx
const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
```

`localStorage` is a small key-value store in the browser that survives page refreshes. It only stores strings, so you convert with `JSON.stringify` and `JSON.parse`.

Two techniques here:

- **Lazy initial state.** Passing a *function* to `useState` means React calls it only on the first render. Reading storage on every render would be wasteful.
- **An effect keeps storage in sync with state.** Whenever `value` changes, it is written back. This is a perfect use of an effect: synchronising with an external system.

The Hook returns the same shape as `useState`, so in `App` you replace `useState` with `useLocalStorage` and add a key. Everything else stays the same.

- Lazy initial state: pass a function so storage is read once.
- `localStorage` stores strings, so use JSON.
- The effect syncs state to storage on every change.
- Same API as `useState`.

> **Try it:** add a task, refresh, and the task is still there. In DevTools open the **Application** tab, then **Local Storage**, to see the stored JSON.

> **Good to know: localStorage is not a database**
> It is per browser and per device. On Day 9 you move the data to Supabase so it follows the user.

> **Troubleshooting**
> **"Unexpected token ... is not valid JSON" or `"undefined" is not valid JSON`.** Something that is not JSON was stored under that key earlier, often the text `undefined` after saving an `undefined` value. Delete the key in the **Application** tab, or wrap `JSON.parse` in `try` and `catch`:
>
> ```jsx
> const [value, setValue] = useState(() => {
>   const stored = localStorage.getItem(key);
>   if (stored === null) return initialValue;
>   try {
>     return JSON.parse(stored);
>   } catch {
>     return initialValue;
>   }
> });
> ```

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 5.1: Search-as-You-Type with Debouncing

| | |
|---|---|
| **Goal** | Fetch search results as the user types, without sending a request on every keystroke. |
| **Suggested time** | 40 min |

**Debouncing** waits until the user pauses typing before doing the work. It saves requests and server cost.

#### Steps

1. Create a `ProductSearch` component (`src/components/ProductSearch.jsx`) with a controlled input.
2. Store the `query` in state, and a `debouncedQuery` in state.
3. In an effect, set `debouncedQuery` 400 ms after `query` changes; clear the timeout in the cleanup.
4. Fetch `https://dummyjson.com/products/search?q=` plus `debouncedQuery`. The response is an object with a `products` array (each product has `id`, `title` and `price`).
5. Use `AbortController` to cancel stale requests.
6. Render loading, error, empty and results states.
7. Skip fetching when the query is shorter than 2 characters.
8. Check the Network tab for the request count, then commit.

#### Done when

- [ ] Typing quickly sends one request
- [ ] No stale results appear
- [ ] All four states render

<details><summary><strong>Hint: the debounce effect</strong> (try on your own first)</summary>

```jsx
useEffect(() => {
  const id = setTimeout(() => setDebouncedQuery(query), 400);
  return () => clearTimeout(id);
}, [query]);
```

Every keystroke clears the previous timer, so only the final pause triggers the update.

Encode the query before putting it in the URL: `encodeURIComponent(debouncedQuery)`.

</details>

<details><summary><strong>Hint: loading without breaking the lint rules</strong></summary>

Do not call `setLoading(true)` at the top of the fetch effect: the React Hooks ESLint rules flag it. Instead, store the query each result belongs to alongside the result, and *derive* loading: the search is loading while that query differs from `debouncedQuery`.

**src/components/ProductSearch.jsx**

```jsx
import { useEffect, useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState({ query: "", products: [], error: null });

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(id);
  }, [query]);

  const tooShort = debouncedQuery.trim().length < 2;

  useEffect(() => {
    if (tooShort) return;
    const controller = new AbortController();
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`;
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) =>
        setResult({ query: debouncedQuery, products: json.products, error: null })
      )
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResult({ query: debouncedQuery, products: [], error: err.message });
        }
      });
    return () => controller.abort();
  }, [debouncedQuery, tooShort]);

  const loading = !tooShort && result.query !== debouncedQuery;

  let content;
  if (tooShort) content = <p>Type at least 2 characters.</p>;
  else if (loading) content = <p>Searching...</p>;
  else if (result.error) content = <p role="alert">Search failed: {result.error}</p>;
  else if (result.products.length === 0) content = <p>No products found.</p>;
  else
    content = (
      <ul>
        {result.products.map((p) => (
          <li key={p.id}>{p.title}: ${p.price}</li>
        ))}
      </ul>
    );

  return (
    <section>
      <label htmlFor="search">Search products</label>
      <input id="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {content}
    </section>
  );
}

export default ProductSearch;
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| A request on every keystroke | The fetch uses `query` instead of `debouncedQuery`. |
| Results flash old data | The `AbortController` cleanup is missing. |
| dummyjson is blocked on your network | Fall back to fetching `https://jsonplaceholder.typicode.com/users` and filtering the users by name. |

> **Stretch challenge**
> Extract the debounce into a custom Hook, `useDebounce(value, delay)`, and reuse it. Highlight the matching text in the results.

### Lab 5.2: Weather Dashboard from a Public API

| | |
|---|---|
| **Goal** | Build a small dashboard with a custom `useFetch` Hook and a city selector. |
| **Suggested time** | 45 min |

[Open-Meteo](https://open-meteo.com/en/docs) is a free weather API that needs no key.

#### Steps

1. Create `src/hooks/useFetch.js` from the [useFetch](#usefetch) section.
2. Create a `WeatherDashboard` component with a `<select>` of three cities and their coordinates.
3. Build the Open-Meteo URL from the selected city.
4. Show the current temperature and wind speed.
5. Show a friendly loading state and error state.
6. Check that changing the city refetches and cancels the old request.
7. Show the last updated time, derived from the response.
8. Commit.

**URL pattern**

```text
https://api.open-meteo.com/v1/forecast?latitude=-26.20&longitude=28.05&current=temperature_2m,wind_speed_10m&timezone=auto
```

The response has a `current` object with `temperature_2m` (°C) and `wind_speed_10m` (km/h), plus `current.time` for the last updated time. `&timezone=auto` makes that time local; without it the API returns GMT.

**Suggested cities**

| City | Latitude | Longitude |
|---|---|---|
| Johannesburg | -26.20 | 28.05 |
| Cape Town | -33.92 | 18.42 |
| Durban | -29.86 | 31.02 |

You may choose any cities.

#### Done when

- [ ] Changing the city updates the data
- [ ] `useFetch` is reused, not copied
- [ ] There are no console errors or warnings

<details><summary><strong>Hints: expected shape</strong> (try on your own first)</summary>

**src/components/WeatherDashboard.jsx**

```jsx
import { useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

const cities = [
  { name: "Johannesburg", lat: -26.2, lon: 28.05 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Durban", lat: -29.86, lon: 31.02 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(cities[0].name);
  const city = cities.find((c) => c.name === cityName); // derived, not state

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.lat}&longitude=${city.lon}` +
    "&current=temperature_2m,wind_speed_10m&timezone=auto";
  const { data, loading, error } = useFetch(url);

  let content;
  if (loading) content = <p>Loading weather...</p>;
  else if (error) content = <p role="alert">Could not load the weather: {error}</p>;
  else
    content = (
      <div>
        <p>Temperature: {data.current.temperature_2m} °C</p>
        <p>Wind speed: {data.current.wind_speed_10m} km/h</p>
        <p>Last updated: {data.current.time.replace("T", " ")}</p>
      </div>
    );

  return (
    <section>
      <h2>Weather in {city.name}</h2>
      <label htmlFor="city">City </label>
      <select id="city" value={cityName} onChange={(e) => setCityName(e.target.value)}>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
      {content}
    </section>
  );
}

export default WeatherDashboard;
```

The URL is a plain string, so `useFetch` only re-runs when the city actually changes.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Crash: cannot read properties of null (reading `current`) | You are reading `data.current` before the data has arrived. Check `loading` and `error` first, or use `data?.current`. Make sure your `useFetch` only sets `loading` to `false` when the request was not aborted (see [useFetch](#usefetch)). |
| Infinite fetch loop | The URL was stored in an object (such as `new URL(...)`) recreated every render. Build it as a string. |
| Wrong values or a far-away place | Latitude and longitude are the wrong way round. |

> **Stretch challenge**
> - Add an hourly forecast as a simple bar list using the `hourly=temperature_2m` parameter.
> - Add a **Use my location** button with `navigator.geolocation` (the browser will ask for permission).

### Lab 5.3: TaskBoard: Persistence and Seed Data

| | |
|---|---|
| **Goal** | TaskBoard remembers tasks after a refresh and loads starter tasks from an API on first run. |
| **Suggested time** | 50 min |

This makes TaskBoard feel like a real app.

#### Steps

1. Create `src/hooks/useLocalStorage.js` from the [useLocalStorage](#uselocalstorage) section.
2. In `App.jsx`, replace `useState` for tasks with `useLocalStorage`.
3. On first run only (no stored tasks), fetch 5 todos from JSONPlaceholder: `https://jsonplaceholder.typicode.com/todos?_limit=5`.
4. Map them into TaskBoard's task shape, with `status` and `points`.
5. Show a loading message while seeding.
6. Auto-focus the add-task input in `AddTaskForm` with a ref.
7. Update the tab title with the open count in `Header`.
8. Add a **Reset board** button. Test refreshing, then commit and push.

#### Done when

- [ ] Tasks survive a page refresh
- [ ] Seed data loads only once
- [ ] The tab title shows the open count

<details><summary><strong>Hints: seeding the board</strong> (try on your own first)</summary>

Start `useLocalStorage` with `null` as the initial value. `null` means nothing has been stored yet. Derive `needsSeed` from it, and write an effect that returns early when there is nothing to do.

Do **not** check `localStorage.getItem("tasks")` inside an effect: `useLocalStorage`'s own effect has already written the initial value to storage by then, so the check never sees `null` and the board is never seeded.

**src/App.jsx**

```jsx
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);
  const needsSeed = tasks === null;

  useEffect(() => {
    if (!needsSeed) return;
    const controller = new AbortController();
    fetch(SEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((todos) =>
        setTasks(
          todos.map((t) => ({
            id: String(t.id),
            title: t.title,
            status: t.completed ? "done" : "todo",
            points: 1,
          }))
        )
      )
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort();
  }, [needsSeed, setTasks]);

  // Your Day 4 handlers (handleAdd, handleStatusChange, handleDelete, ...) stay the same.

  if (tasks === null) return <p>Loading starter tasks...</p>;

  return (
    <>
      <Header tasks={tasks} />
      <button onClick={() => setTasks(null)}>Reset board</button>
      <AddTaskForm onAdd={handleAdd} />
      <Board tasks={tasks} /* plus your Day 4 handler props */ />
    </>
  );
}

export default App;
```

- **Mapping:** `todos.map((t) => ({ id: String(t.id), title: t.title, status: t.completed ? "done" : "todo", points: 1 }))`.
- **Reset board:** call `setTasks(null)`. `needsSeed` becomes `true`, so the seeding effect runs again, and `useLocalStorage` saves the new value for you (no `localStorage.removeItem` needed). For an empty board instead, call `setTasks([])`.
- **Rules of Hooks:** the early `return` for the loading message comes *after* every Hook call.

</details>

<details><summary><strong>Hints: focus and tab title</strong></summary>

**src/components/AddTaskForm.jsx** (the new lines)

```jsx
import { useEffect, useRef, useState } from "react";

// inside AddTaskForm:
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);

// in the JSX:
<input id="title" ref={inputRef} value={title}
  onChange={(e) => setTitle(e.target.value)} />
```

**src/components/Header.jsx** (the new lines)

```jsx
const openCount = tasks.filter((t) => t.status !== "done").length;

useEffect(() => {
  document.title = `TaskBoard (${openCount} open)`;
}, [openCount]);
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Seed data duplicates on each refresh | Seeding runs even when stored tasks exist. Only fetch when `tasks === null`. |
| Seeding runs twice in development | That is StrictMode's double mount. Cancel the first request with an `AbortController` (or an "ignore" flag) in the cleanup. |
| Components crash because `tasks` is `null` | Render a loading message while `tasks` is `null`, before rendering `Header` or `Board`. |
| Reset board leaves "Loading starter tasks..." on screen forever | The seeding effect has `[]` dependencies, so it never runs again. Use `[needsSeed, setTasks]`. |
| The tab title says every task is open | The count uses `t.done`, but TaskBoard tasks use `status`. Use `t.status !== "done"`. |

> **Stretch challenge**
> Store a separate theme or filter preference with `useLocalStorage`.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. What is the purpose of the dependency array?
2. When does a cleanup function run?
3. Why can the effect function itself not be `async`?
4. What problem does `AbortController` solve when fetching in an effect?
5. Name two uses of `useRef`.
6. What makes a function a custom Hook?

---

## Key takeaways

### What you learned

- Effects synchronise React with external systems.
- Dependencies decide when effects run; cleanups undo them.
- If there is no external system, you probably do not need an effect.
- Always handle loading, error, empty and success.
- Refs reach the DOM and hold non-visual values.
- Custom Hooks turn repeated logic into one clean call.

You now know every core Hook that most apps need: `useState`, `useEffect` and `useRef`, plus how to build your own.

### Take-home practice

> Write two small custom Hooks:
>
> - `useDebounce(value, delay)`, which returns the value only after it has stopped changing for `delay` milliseconds.
> - `useOnlineStatus()`, which listens to the window `online` and `offline` events and returns `navigator.onLine`.
>
> Show an **Offline** banner in TaskBoard when the connection drops. Test it by switching the DevTools Network tab to **Offline**.

Commit and push everything tonight: tomorrow you convert the project to TypeScript, so your work must be saved first.

### Looking ahead

Tomorrow you professionalise TaskBoard with TypeScript, which catches bugs before you run the code, and React Router, which adds multiple pages. Your `useFetch` and `useLocalStorage` Hooks come with you and gain types.

---

## Further reading

These official resources cover today's topics in more depth. "You might not need an effect" is one of the most valuable pages in the React docs: read it this week.

| Resource | Link |
|---|---|
| React: Synchronizing with effects | https://react.dev/learn/synchronizing-with-effects |
| React: You might not need an effect | https://react.dev/learn/you-might-not-need-an-effect |
| React: Referencing values with refs | https://react.dev/learn/referencing-values-with-refs |
| React: Manipulating the DOM with refs | https://react.dev/learn/manipulating-the-dom-with-refs |
| React: Reusing logic with custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |
| React: Rules of Hooks | https://react.dev/reference/rules/rules-of-hooks |
| MDN: AbortController | https://developer.mozilla.org/en-US/docs/Web/API/AbortController |
| Open-Meteo API | https://open-meteo.com/en/docs |
| DummyJSON | https://dummyjson.com/docs/products |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap: Day 4

1. It schedules a new value and triggers a re-render.
2. `onClick={() => handleDelete(task.id)}`
3. Its value comes from state, and `onChange` updates that state.
4. `prev.map((t) => t.id === id ? { ...t, ...changes } : t)`
5. A value calculated from existing state or props during render. It cannot get out of sync.

### Knowledge check

1. It tells React when to re-run the effect: only when those values change.
2. Before the effect re-runs, and when the component unmounts.
3. Async functions return a promise; an effect must return nothing or a cleanup function.
4. Race conditions (stale responses overwriting newer ones), and wasted requests.
5. Accessing DOM elements (focus, scroll), and storing values that should not trigger re-renders (such as timer ids).
6. Its name starts with `use` (followed by a capital letter) and it calls other Hooks.

---

## My notes

&nbsp;
