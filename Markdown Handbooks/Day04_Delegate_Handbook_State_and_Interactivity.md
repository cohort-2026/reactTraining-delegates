# Day 4: State and Interactivity

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Make components respond to user input and manage changing data correctly.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 4 at a glance](#day-4-at-a-glance)
- [Morning recap](#morning-recap)
- [Module 4.1: useState](#module-41-usestate)
- [Module 4.2: Handling Events](#module-42-handling-events)
- [Module 4.3: Forms](#module-43-forms)
- [Module 4.4: Managing State Well](#module-44-managing-state-well)
- [Hands-on labs](#hands-on-labs)
  - [Lab 4.1: Counter, Toggle and Accordion Exercises](#lab-41-counter-toggle-and-accordion-exercises)
  - [Lab 4.2: Shopping Cart](#lab-42-shopping-cart)
  - [Lab 4.3: TaskBoard: Add, Complete, Edit and Delete](#lab-43-taskboard-add-complete-edit-and-delete)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook goes with the instructor-led session. It follows the same order as the slides and explains each concept in plain language. It also gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying. Typing builds memory and teaches you to read errors.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 4 at a glance

So far TaskBoard shows data, but nothing happens when you click. Today that changes. You learn **state**, which is data that changes over time, and **events**, which are how users trigger those changes. By the end of today you will be able to add, complete, edit and delete tasks in TaskBoard.

| Part | Topic |
|---|---|
| 4.1 | useState: giving components memory |
| 4.2 | Handling events |
| 4.3 | Forms and controlled inputs |
| 4.4 | Managing state well: immutability, lifting state, derived values |
| Labs | Counter and toggles, shopping cart, interactive TaskBoard |

### By the end of today you will be able to

- Give a component memory with `useState`, and explain why state is a snapshot and when to use an updater function
- Handle clicks, typing and form submission, and pass event handlers down to child components as props
- Build controlled text inputs, selects, checkboxes and radio buttons, with basic validation and error messages
- Update arrays and objects immutably, lift shared state up, and calculate derived values instead of storing them

### Labs today

| Lab | Title | Time |
|---|---|---|
| 4.1 | Counter, Toggle and Accordion Exercises | 35 min |
| 4.2 | Shopping Cart | 45 min |
| 4.3 | TaskBoard: Add, Complete, Edit and Delete | 60 min |

---

## Morning recap

Answer these questions on Day 3 before the session starts. Answers are in the [answer key](#answer-key).

1. What attribute replaces `class` in JSX?
2. How does a component receive data from its parent?
3. What is the `children` prop?
4. Why should list keys not be the array index when items can be deleted?
5. What is wrong with `{count && <p>{count} items</p>}` when `count` is 0?

> **Tip**
> Bring your SummaryBar homework. If you calculated the totals from the tasks array instead of storing them, you have already used today's *derived state* principle.

---

## Module 4.1: useState

*Giving components memory.*

A component function runs from top to bottom every time React renders it. Normal variables are recreated from scratch each time, so they forget everything. **State** is how a component remembers values between renders.

### Your first piece of state

**src/components/Counter.jsx**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Add one</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

`useState` is a **Hook**. Hooks are special React functions whose names start with `use`. They let components use React features, and this one adds memory.

`useState` takes an initial value, here `0`, and returns an array of two things. You destructure it, as you practised on Day 2: `count` is the current value, and `setCount` is the function that changes it.

When the button is clicked, `handleClick` calls `setCount` with a new value. React stores it and re-renders `Counter`. On that new render, `useState` returns the new value, so the screen shows the new number.

The naming convention is `something` and `setSomething`: `[isOpen, setIsOpen]`, `[tasks, setTasks]`.

**Key points**

- `useState(0)` creates state with a starting value.
- It returns a pair: the current value and a setter.
- Calling the setter stores the new value and re-renders.
- Name them `value` and `setValue` by convention.

> **Try it:** render `Counter` in `App` and click the button. Then open React DevTools, go to the **Components** tab, select `Counter`, and watch the state value update live under **hooks**.

> **Try it: the wrong way.** Replace the state with `let count = 0;` and use `count++` in the click handler. Click: nothing changes on screen. Add `console.log(count)` and you will see the variable change, but React never re-renders, and the value would reset to 0 on the next render anyway.

> **Check your understanding**
> What two things does calling `setCount` do?
>
> <details><summary>Answer</summary>
>
> It stores the new value and triggers a re-render.
>
> </details>

### What happens when you click

Understanding this cycle prevents most state bugs, so it is worth slowing down.

1. **Event fires.** The user clicks. React calls `handleClick`.
2. **State is set.** `setCount(1)` asks React to update the value. It does **not** change the `count` variable you are holding right now; it schedules an update.
3. **React re-renders.** React calls `Counter()` again. This time `useState` returns `1`.
4. **Screen updates.** React compares the new JSX with the old and changes only the number.

> **Rules of Hooks**
> - Only call Hooks at the **top level** of a component. Never call them inside `if` statements, loops or nested functions.
> - Only call Hooks from React components or from your own custom Hooks.
>
> React relies on Hooks being called in the same order on every render.

> **Try it:** add `console.log("render", count)` at the top of `Counter`. Click, and you will see one log per render. In development, StrictMode may log twice; this is expected.

> **Check your understanding**
> If you call `setCount` inside an `if` statement in a click handler, is that breaking the rules?
>
> <details><summary>Answer</summary>
>
> No. The rule applies to calling `useState` itself, not to calling the setter.
>
> </details>

### State is a snapshot: use updater functions

**src/components/Counter.jsx**

```jsx
function handlePlusThree() {
  // Bug: count is 0 in all three lines
  setCount(count + 1);  // 0 + 1
  setCount(count + 1);  // 0 + 1
  setCount(count + 1);  // 0 + 1  -> result: 1
}

function handlePlusThreeFixed() {
  // Updater: React passes the latest value in
  setCount((c) => c + 1);  // 0 -> 1
  setCount((c) => c + 1);  // 1 -> 2
  setCount((c) => c + 1);  // 2 -> 3
}

// Rule of thumb: when the next value depends
// on the previous value, pass a function.
```

This surprises almost everyone. Inside one render, `count` is a fixed snapshot, and calling `setCount` does not change it. So three calls of `setCount(count + 1)` all calculate `0 + 1`, and the result is 1, not 3.

The fix is an **updater function**. Instead of a value, you pass a function that receives the latest pending value and returns the next one. React queues the updates and runs them in order: 0 to 1, 1 to 2, 2 to 3. React also *batches* them: it waits until your whole event handler has finished and then re-renders once.

Rule of thumb: if the new state is calculated from the old state, use the updater form. For example, `setIsOpen((open) => !open)` and `setTasks((prev) => [...prev, newTask])`.

**Key points**

- `count` is fixed for the whole render.
- Setters do not change it immediately.
- Updater functions receive the latest queued value.
- They are essential for toggles, counters and list updates.

> **Try it:** add both buttons to `Counter` and compare them. Then add `console.log(count)` straight after the setters inside a handler: it still prints the old value.

> **Check your understanding**
> What does `console.log(count)` print immediately after `setCount(5)`, if `count` was 2?
>
> <details><summary>Answer</summary>
>
> `2`. The new value appears on the next render.
>
> </details>

### Props versus state

Props and state are both just data, but they differ in who owns them.

| Props | State |
|---|---|
| Passed in from the parent | Owned by the component itself |
| Read-only inside the component | Changed only through its setter |
| Change when the parent re-renders with new values | Changing it triggers a re-render |
| Like function arguments | Like the component's private memory |
| Example: a TaskCard's title | Example: whether a dropdown is open |

A common pattern is for a parent to hold state and pass it to its children as props. So one component's state is often another component's props. Today the task list becomes state in `App` and props in `Board`.

**How to decide if something should be state:**

1. Does it change over time? If not, it is not state.
2. Is it passed in from a parent? If so, it is a prop.
3. Can it be calculated from other state or props? If so, it is not state: calculate it. Module 4.4 covers this.

> **Check your understanding**
> For a search box on TaskBoard, is the typed text props or state?
>
> <details><summary>Answer</summary>
>
> State, owned by whichever component needs it.
>
> </details>

---

## Module 4.2: Handling Events

*Connecting user actions to state.*

Events are things the user does: clicking, typing, submitting, hovering, pressing keys. React lets you attach handlers to any element.

### Event handlers

**src/components/EventsDemo.jsx**

```jsx
import { useState } from "react";

function EventsDemo() {
  const [message, setMessage] = useState("");

  function handleClick(event) {
    console.log(event.target); // clicked element
    setMessage("Clicked!");
  }

  function handlePick(colour) {
    setMessage(`You chose ${colour}`);
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => handlePick("teal")}>Teal</button>
      <p>{message}</p>
    </div>
  );
}

export default EventsDemo;
```

Event props are camelCase and receive a function. React calls that function when the event happens. It passes in an **event object** with details such as which element was clicked or which key was pressed.

Handler functions start with `handle` by convention, like `handleClick` and `handleSubmit`.

> **The most common event bug**
> Writing `onClick={handlePick("teal")}` is a bug. With the brackets, `handlePick` runs immediately during render, not on click. If it sets state, you get an infinite loop and the error **"Too many re-renders"**. When you need to pass an argument, wrap the call in an arrow function: `onClick={() => handlePick("teal")}`.

Common events:

| Event | Typical use |
|---|---|
| `onClick` | Buttons |
| `onChange` | Inputs, selects, checkboxes |
| `onSubmit` | Forms |
| `onKeyDown` | Keyboard shortcuts |
| `onMouseEnter` | Hover effects |
| `onFocus`, `onBlur` | An input gaining or losing focus |

**Key points**

- Pass the function, do not call it: `onClick={handleClick}`.
- Need arguments? Wrap the call in an arrow function.
- The event object describes what happened.
- Common events: `onClick`, `onChange`, `onSubmit`, `onKeyDown`.

> **Try it:** build `EventsDemo`, then remove the arrow function around `handlePick("teal")`. Read the "Too many re-renders" error, then put the arrow function back.

> **Check your understanding**
> Why does `onClick={handleClick}` not need an arrow function?
>
> <details><summary>Answer</summary>
>
> It is already a function reference and needs no custom arguments.
>
> </details>

### Passing handlers down as props

**TaskCard.jsx and its parent**

```jsx
// TaskCard.jsx: the child reports the action
function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className="card">
      <label>
        <input type="checkbox" checked={task.done}
          onChange={() => onToggle(task.id)} />
        {task.title}
      </label>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </article>
  );
}

// Parent: owns the state and the logic
<TaskCard task={task}
  onToggle={handleToggle} onDelete={handleDelete} />
```

On Day 3 you learned that data flows down. So how does a checkbox deep inside `TaskCard` change the task list in `App`? The parent passes down a function, and the child calls it. This is step five of Thinking in React: **inverse data flow**.

`TaskCard` does not know how toggling works. It just says "the user toggled task 7" by calling `onToggle(7)`. The parent decides what that means.

Props that receive handlers start with `on`, like `onToggle` and `onDelete`, to match built-in events like `onClick`. The functions that implement them start with `handle`.

This keeps `TaskCard` reusable and simple. All the logic lives in one place: the component that owns the state.

Picture two sets of arrows: **data flows down** as props, and **events flow up** through callback functions.

> **TaskBoard note: two differences from Day 3**
> - On Day 3, `Column` spread `{...task}` into `TaskCard`. From today `TaskCard` receives the whole object as `task={task}`, next to its handler props, so update `Column` to match.
> - TaskBoard tasks have used `status` rather than `done` since Lab 3.3. In Lab 4.3 a status dropdown replaces this checkbox. The `done` checkbox just keeps the example small.

**Key points**

- Children cannot change parent state directly.
- The parent passes a function down as a prop.
- The child calls it with the relevant id.
- Naming: `onSomething` props, `handleSomething` functions.

> **Check your understanding**
> If `Column` sits between `App` and `TaskCard`, what must `Column` do?
>
> <details><summary>Answer</summary>
>
> Receive `onToggle` and `onDelete` as props and pass them on to each `TaskCard`. On Day 7 you learn Context, which avoids this passing through.
>
> </details>

---

## Module 4.3: Forms

*Controlled inputs and validation.*

Forms are where users give your app data. In React you usually keep the form's values in state. This pattern is called **controlled inputs**.

### Controlled inputs

**src/components/AddTaskForm.jsx**

```jsx
import { useState } from "react";

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    onAdd(title.trim());
    setTitle("");       // clear the input
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">New task</label>
      <input id="title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTaskForm;
```

A controlled input has two connections:

- `value={title}` means the input always displays what is in state.
- `onChange` writes every keystroke back to state with `e.target.value`, the current text in the input.

The loop is: the user types, `onChange` fires, state updates, React re-renders, and the input shows the new state. It sounds slow, but it is instant, and it gives you full control. You can validate, transform or clear the input at any time just by setting state.

Put `onSubmit` on the `form` element, not `onClick` on the button, so that pressing Enter also submits. Browsers reload the page when a form submits, which would wipe your app, so call `e.preventDefault()` first. After adding, clear the input by setting `title` back to an empty string.

**Key points**

- `value` comes from state.
- `onChange` writes every keystroke to state.
- `e.preventDefault()` stops the browser reload.
- State is the single source of truth for the input.

> **Try it:** render the form, type into the input, and watch the state change in React DevTools.

> **Good to know: React 19 form Actions**
> On Day 8 you will see React 19 form Actions, which offer another way to handle submission.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Warning: `A component is changing an uncontrolled input to be controlled` | The initial state was `undefined`. Always initialise text inputs with an empty string: `useState("")`. |
> | You cannot type in the input | `value` is set but `onChange` is missing, so state never changes. The Console also shows a warning that you provided a `value` prop to a form field without an `onChange` handler. |

### Selects, checkboxes and one state object

When a form has several fields, keep them in one state object and use one handler.

**src/components/TaskDetailsForm.jsx**

```jsx
import { useState } from "react";

function TaskDetailsForm() {
  const [form, setForm] = useState({
    title: "", priority: "medium", urgent: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title}
        onChange={handleChange} />

      <select name="priority" value={form.priority}
        onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>
        <input type="checkbox" name="urgent"
          checked={form.urgent} onChange={handleChange} />
        Urgent
      </label>

      <button type="submit">Save</button>
    </form>
  );
}

export default TaskDetailsForm;
```

Each input has a `name` attribute matching a key in the `form` object. The handler reads `name`, `value`, `type` and `checked` from the event target. It then copies the previous form with spread and overwrites just one property. The square brackets around `name` are a **computed property name**: they use the *value* of the variable `name` as the key.

- **Checkboxes are different:** their value is in `checked`, a boolean, so you bind them with `checked={...}` instead of `value`.
- **Selects:** in React you put a `value` prop on the `select` itself, rather than the `selected` attribute on an `option`.

**Key points**

- One handler for many fields, using `name`.
- `[name]:` sets the property that matches the input.
- Checkboxes use `checked`, not `value`.
- A select uses `value` on the `select` element.

> **Good to know: radio buttons**
> Give each radio in a group the same `name`, a different `value`, and a `checked` test against state. First add the field to the form object, for example `size: "small"`. The same `handleChange` works, because a radio's value is its own `value` attribute.

**Radio buttons in TaskDetailsForm.jsx**

```jsx
// in the initial state: { title: "", priority: "medium", urgent: false, size: "small" }
<label>
  <input type="radio" name="size" value="small"
    checked={form.size === "small"} onChange={handleChange} />
  Small
</label>
<label>
  <input type="radio" name="size" value="large"
    checked={form.size === "large"} onChange={handleChange} />
  Large
</label>
```

> **Try it:** build the form, change every field, submit it, and check the logged object in the Console.

> **Check your understanding**
> Why do we use the updater form, `setForm((prev) => ...)`?
>
> <details><summary>Answer</summary>
>
> The new form depends on the previous form. It is the safe pattern from Module 4.1.
>
> </details>

### Basic validation and error messages

Never trust input: check it before using it.

**src/components/AddTaskForm.jsx**

```jsx
const [title, setTitle] = useState("");
const [error, setError] = useState("");
const isEmpty = title.trim() === ""; // derived

function handleSubmit(e) {
  e.preventDefault();
  if (title.trim().length < 3) {
    return setError("Title needs 3+ characters.");
  }
  setError("");
  onAdd(title.trim());
  setTitle("");
}

// in the returned JSX, inside the form:
<input value={title} aria-invalid={Boolean(error)}
  onChange={(e) => setTitle(e.target.value)} />
{error && <p role="alert">{error}</p>}
<button disabled={isEmpty}>Add</button>
```

On submit, check the rule. If it fails, set an error message and return early so nothing is added. If it passes, clear the error and continue.

The error message displays only when it exists, using the `&&` pattern from Day 3.

`isEmpty` is **not** state. It is calculated from `title` on every render, and used to disable the button. This is *derived state*, which Module 4.4 formalises.

`aria-invalid` and `role="alert"` are accessibility attributes: screen readers announce the error when it appears. Accessibility is covered properly on Day 8, but it costs nothing to start now.

On Day 8 you will replace hand-written validation with React Hook Form and Zod, which scale much better for large forms. Knowing the manual way first helps you understand what those libraries do.

**Key points**

- Validate on submit and return early on failure.
- Store the error message in state.
- Show it conditionally with `&&`.
- Disable the button with a derived value.
- `role="alert"` announces errors to screen readers.

> **Try it:** submit `ab` and read the error, then submit a valid title and watch the error disappear.

---

## Module 4.4: Managing State Well

*Immutability, lifting state and derived values.*

Now for the rules that keep state bug-free. Most real-world React bugs come from breaking one of these three rules.

### Updating arrays of objects immutably

**src/App.jsx**

```jsx
const [tasks, setTasks] = useState(initialTasks);

function handleAdd(title) { // ADD
  const id = crypto.randomUUID();
  setTasks((prev) => [...prev, { id, title, done: false }]);
}

function handleToggle(id) { // UPDATE
  setTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    )
  );
}

function handleDelete(id) { // DELETE
  setTasks((prev) => prev.filter((t) => t.id !== id));
}
```

These three functions are the most copied code in React. Learn them by heart.

- **Add:** create a new array containing all the previous tasks plus the new one. `crypto.randomUUID()` is built into modern browsers and generates a unique id.
- **Update:** map over the tasks. For the one whose id matches, return a copy with `done` flipped. Return every other task unchanged.
- **Delete:** `filter` keeps every task except the one with the matching id.

> **TaskBoard note**
> Since Lab 3.3 your tasks have a `status` field instead of `done`. The patterns are identical; only the fields change. New tasks get `status: "todo"`, and completing a task means setting `status` to `"done"` with map and spread. Lab 4.3 uses these status versions.

**Why not `tasks.push(newTask)` then `setTasks(tasks)`?** Because it is the same array object. React compares the old and new values, sees the same array, and may skip the re-render. Even when it does re-render, mutating causes subtle bugs elsewhere. Always create new arrays and objects.

**Key points**

- Add: spread into a new array.
- Update: `map`, and copy the matching item.
- Delete: `filter` it out.
- Never `push`, `splice` or assign in place.
- `crypto.randomUUID()` makes unique ids.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `crypto.randomUUID is undefined` | It needs a secure context: `localhost` or HTTPS. It works on `localhost`. If you open the app via a network IP address, use `Date.now()` as a temporary id. |

### Updating nested objects

**Example**

```jsx
const [project, setProject] = useState({
  name: "Website",
  owner: { name: "Thabo", email: "thabo@example.com" },
  tags: ["web"],
});

// Copy every level on the path to the change
setProject((prev) => ({
  ...prev,
  owner: { ...prev.owner, email: "thabo@new.co.za" },
}));

// Add to a nested array
setProject((prev) => ({
  ...prev,
  tags: [...prev.tags, "urgent"],
}));
```

Spread only copies one level. If you change a property two levels deep, you must copy each level along the way: a new project object, containing a new owner object, containing the new email.

Read it from the outside in: copy the project, and replace `owner` with a copy of the old owner that has a new email. The same applies to arrays inside objects.

If this feels clumsy, that is a design signal. Keep state flat where possible, for example by storing owners separately and referring to them by id.

> **Good to know: easier complex updates**
> `useReducer` (Day 7) makes complex updates cleaner, and libraries such as Immer let you write "mutating" code safely. Master the manual way first.

**Key points**

- Spread is shallow: it copies one level.
- Copy every level on the path to the change.
- Keep state as flat as you can.
- Deeply nested state is a sign to restructure.

> **Check your understanding**
> What goes wrong with `project.owner.email = "x"` followed by `setProject(project)`?
>
> <details><summary>Answer</summary>
>
> It is the same object, so React may not re-render, and the old value is lost for any component that relied on it.
>
> </details>

### Lifting state up

When two components need the same state, it cannot live in either of them, because siblings cannot share state directly. So you **lift it up** to their closest common parent.

1. **Spot shared data.** Two sibling components need the same data. For example, `AddTaskForm` and `Board` both need `tasks`.
2. **Find the common parent.** The closest component above both is `App`.
3. **Move the state there.** `App` owns `tasks` with `useState`.
4. **Pass data and handlers down.** `Board` gets `tasks`, `AddTaskForm` gets `onAdd`, and the cards get their handlers.

In TaskBoard, `AddTaskForm` creates tasks and `Board` displays them, and neither is the parent of the other. Their common parent is `App`, so `App` owns the `tasks` state. It passes `tasks` down to `Board` and `onAdd` down to `AddTaskForm`.

| Before | After |
|---|---|
| `tasks` lives inside `Board`; `AddTaskForm` has no way to reach it | `tasks` lives in `App`, which passes `tasks` down to `Board` and `onAdd` down to `AddTaskForm` |

> **Rule of thumb**
> Keep state as low as possible, but as high as necessary. Local UI state, like whether one card's menu is open, stays in that card. Shared data moves up.

As apps grow, lifting state can mean passing props through many layers. That is called **prop drilling**, and on Day 7 you solve it with Context and Zustand.

### Derived state: calculate, do not store

- If you can calculate it, do not store it.
- **Good:** `const doneCount = tasks.filter((t) => t.done).length;`
- **Bad:** a separate `doneCount` state that you must remember to update.
- Filtered lists are derived from `tasks` plus a filter value.
- Do not copy props into state unless you intend to ignore later changes.
- Keep one source of truth for each piece of data.

This is the rule from your SummaryBar homework. If a value can be calculated from existing state or props, calculate it during render. Do not store it in its own state.

Imagine storing `doneCount` in state. Every time you add, toggle or delete a task, you must remember to update `doneCount` too. Forget once, and the number on screen is wrong. Calculate it, and it is always right.

Search is another example. Store the tasks and the search text, then calculate the visible tasks. Do not store `filteredTasks` separately:

```jsx
const visibleTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(search.toLowerCase())
);
```

Another trap is copying a prop into state: `useState(props.title)`. That copy is only read once, on the first render, so later changes from the parent are ignored.

What about performance? Calculating a filter on a few hundred items is instant. On Day 10 you will look at `useMemo` and the React Compiler for genuinely expensive calculations.

> **Why it matters**
> Two copies of the same fact will eventually disagree. When they do, users see bugs.

> **Check your understanding**
> TaskBoard shows "3 of 8 done". Which values are state?
>
> <details><summary>Answer</summary>
>
> Only `tasks`. Both numbers are derived.
>
> </details>

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab. Try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 4.1: Counter, Toggle and Accordion Exercises

| | |
|---|---|
| **Goal** | Practise `useState`, events and updater functions on small components. |
| **Suggested time** | 35 min |

Small components teach big lessons. The accordion shows both local state and lifted state in one exercise.

#### Steps

1. Build a `Counter` with plus, minus and reset buttons. It must never go below zero.
2. Add a **Plus 5** button that uses an updater function in a loop.
3. Build a `ThemeToggle` that switches a `light` or `dark` class on a wrapper element.
4. Build an `AccordionItem` that shows or hides its content on click.
5. Render three accordion items; each opens independently.
6. Add a **Show all / Hide all** button. To make it work, lift the open state up to the parent.
7. Inspect the state of each component in React DevTools.
8. Commit.

#### Done when

- [ ] The counter never shows a negative number
- [ ] Accordion items open and close independently
- [ ] Show all / Hide all controls every item

<details><summary><strong>Hints: counter and theme toggle</strong> (try on your own first)</summary>

Minimum zero, and Plus 5 with the updater form:

```jsx
function handleMinus() {
  setCount((c) => Math.max(0, c - 1));
}

function handlePlusFive() {
  for (let i = 0; i < 5; i++) {
    setCount((c) => c + 1);
  }
}
```

**src/components/ThemeToggle.jsx**

```jsx
import { useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : "light"}>
      <p>The current theme is {isDark ? "dark" : "light"}.</p>
      <button onClick={() => setIsDark((d) => !d)}>Toggle theme</button>
    </div>
  );
}

export default ThemeToggle;
```

</details>

<details><summary><strong>Hints: accordion with Show all</strong> (try on your own first)</summary>

Keep the open state in the parent as an array of open ids, `const [openIds, setOpenIds] = useState([])`. Each item receives `isOpen` and `onToggle` props.

**src/components/Accordion.jsx**

```jsx
import { useState } from "react";

const items = [
  { id: "state", title: "What is state?", body: "Data a component remembers between renders." },
  { id: "props", title: "What are props?", body: "Read-only inputs passed in by the parent." },
  { id: "events", title: "What is an event handler?", body: "A function React calls when something happens." },
];

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle} aria-expanded={isOpen}>
        {title}
      </button>
      {isOpen && <p>{children}</p>}
    </div>
  );
}

function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const allOpen = openIds.length === items.length; // derived

  function handleToggle(id) {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleToggleAll() {
    setOpenIds(allOpen ? [] : items.map((item) => item.id));
  }

  return (
    <section>
      <button onClick={handleToggleAll}>{allOpen ? "Hide all" : "Show all"}</button>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.body}
        </AccordionItem>
      ))}
    </section>
  );
}

export default Accordion;
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| All accordion items open together | A single boolean was lifted instead of one flag per item. Store an array (or object) of open ids. |
| "Too many re-renders" | `onClick={setOpen(!open)}` calls the setter during render. Wrap it in an arrow function: `onClick={() => setOpen((o) => !o)}`. |
| Plus 5 only adds 1 | `setCount(count + 1)` was used in the loop instead of the updater form `setCount((c) => c + 1)`. |

> **Stretch challenge**
> Allow only one accordion item to be open at a time by storing a single `openId` instead of an array.

### Lab 4.2: Shopping Cart

| | |
|---|---|
| **Goal** | Manage an array of objects in state with add, update quantity and remove. |
| **Suggested time** | 45 min |

A shopping cart is the classic state exercise, because it uses add, update and delete on an array, plus derived totals.

#### Steps

1. Reuse the product catalogue from Lab 3.2 (`src/components/catalogue/products.js`, with `id`, `name`, `price`, `category`, `inStock` and `rating`).
2. Add an **Add to cart** button to each `ProductCard`.
3. Keep the cart state in the common parent of `ProductGrid` and `Cart`, for example a new `Shop` component. Store it as an array of items with `productId` and `quantity`.
4. Adding a product that is already in the cart increases its quantity instead of adding a duplicate line.
5. In a `Cart` component, show plus and minus buttons for each line.
6. Remove a line when its quantity reaches zero, and add a **Remove** button.
7. Show the item count and total price as derived values.
8. Disable **Add to cart** for out-of-stock products, then commit.

#### Done when

- [ ] There are no duplicate lines in the cart
- [ ] Totals are always correct
- [ ] No cart totals are stored in state

<details><summary><strong>Hints: adding to the cart</strong> (try on your own first)</summary>

```jsx
setCart((prev) => {
  const existing = prev.find((i) => i.productId === id);
  if (existing) {
    return prev.map((i) =>
      i.productId === id ? { ...i, quantity: i.quantity + 1 } : i
    );
  }
  return [...prev, { productId: id, quantity: 1 }];
});
```

For totals, look up each product by id while reducing:

```jsx
const total = cart.reduce(
  (sum, i) => sum + products.find((p) => p.id === i.productId).price * i.quantity,
  0
);
```

</details>

<details><summary><strong>Hints: expected shape of the components</strong> (try on your own first)</summary>

This assumes `products.js` has `export const products = [...]`. Adjust the import if you exported it differently on Day 3.

**src/components/catalogue/Shop.jsx**

```jsx
import { useState } from "react";
import { products } from "./products.js";
import ProductGrid from "./ProductGrid.jsx";
import Cart from "./Cart.jsx";

function Shop() {
  const [cart, setCart] = useState([]); // [{ productId, quantity }]

  function handleAddToCart(id) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === id);
      if (existing) {
        return prev.map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: id, quantity: 1 }];
    });
  }

  function handleChangeQuantity(id, amount) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === id ? { ...i, quantity: i.quantity + amount } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((i) => i.productId !== id));
  }

  return (
    <div className="shop">
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      <Cart
        cart={cart}
        products={products}
        onChangeQuantity={handleChangeQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default Shop;
```

**src/components/catalogue/ProductGrid.jsx**

```jsx
import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) return <p>No products</p>;
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
```

**src/components/catalogue/ProductCard.jsx**

```jsx
function ProductCard({ id, name, price, rating, inStock, onAddToCart }) {
  return (
    <article className="card">
      <h3>{name}</h3>
      <p>R{price}</p>
      <p>{"★".repeat(rating)}</p>
      {!inStock && <span className="badge">Out of stock</span>}
      <button onClick={() => onAddToCart(id)} disabled={!inStock}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
```

**src/components/catalogue/Cart.jsx**

```jsx
function Cart({ cart, products, onChangeQuantity, onRemove }) {
  // Derived values: calculated on every render, never stored
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.reduce(
    (sum, i) => sum + products.find((p) => p.id === i.productId).price * i.quantity,
    0
  );

  if (cart.length === 0) {
    return <aside className="cart"><p>Your cart is empty</p></aside>;
  }

  return (
    <aside className="cart">
      <h2>Cart ({itemCount} items)</h2>
      <ul>
        {cart.map((i) => {
          const product = products.find((p) => p.id === i.productId);
          return (
            <li key={i.productId}>
              {product.name} x {i.quantity}
              <button onClick={() => onChangeQuantity(i.productId, -1)}>-</button>
              <button onClick={() => onChangeQuantity(i.productId, 1)}>+</button>
              <button onClick={() => onRemove(i.productId)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <p>Total: R{total}</p>
    </aside>
  );
}

export default Cart;
```

Render `<Shop />` in `App` while you work on this lab.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Duplicate lines in the cart | The `find` check for an existing line is missing. |
| Quantity goes negative | The remove-at-zero rule is missing. Filter out lines with quantity 0 after decrementing. |
| Totals wrong after an update | The total was stored in state. Refactor it to a derived value calculated during render. |

> **Stretch challenge**
> Do not persist anything yet. Instead, add a discount code input that applies 10 percent off when the code is `REACT10`. Store only the typed code in state, and calculate the discount and the final total as derived values.

### Lab 4.3: TaskBoard: Add, Complete, Edit and Delete

| | |
|---|---|
| **Goal** | Make TaskBoard fully interactive with state lifted to `App`. |
| **Suggested time** | 60 min |

This is the biggest lab so far: TaskBoard becomes a working app. Remember that TaskBoard tasks have `id`, `title`, `assignee`, `points` and `status` (`"todo"`, `"doing"` or `"done"`). "Completing" a task means moving it to `"done"`.

#### Steps

1. Move `tasks` into `useState` in `App`, initialised from `src/data/tasks.js`. Rename the import so it does not clash with the state variable: `import { tasks as initialTasks } from "./data/tasks.js"`.
2. Build `AddTaskForm` with `title`, `assignee` and `points` fields, and validate the title. New tasks get `status: "todo"`.
3. Add a status dropdown to each `TaskCard` to move the task between columns.
4. Add **Delete** with a `confirm()` prompt.
5. Add inline **Edit**: clicking Edit swaps the title for an input, and Save updates it.
6. Pass the handlers down through `Board` and `Column`. `Column` now passes `task={task}` plus the handlers to each `TaskCard`, instead of spreading `{...task}`.
7. Show derived counts in the `Header`, for example "2 of 8 done".
8. Test every action, then commit and push.

#### Done when

- [ ] Tasks can be added, moved, edited and deleted
- [ ] Counts update instantly
- [ ] There is no mutation anywhere

<details><summary><strong>Hints: guidance</strong> (try on your own first)</summary>

- **Status change handler in App:** `handleStatusChange(id, status)`, using `map` and spread.
- **Edit mode is local UI state in TaskCard:** `const [isEditing, setIsEditing] = useState(false)` and `const [draft, setDraft] = useState(task.title)`. This is one of the rare acceptable cases for initialising state from a prop, because you deliberately want an editable copy.
- **Save** calls `onRename(task.id, draft.trim())` and sets `isEditing` to `false`.
- **Points input:** `e.target.value` is always a string, even for `type="number"`. Convert it with `Number(value)`.
- **Initial data:** Day 3 exported the array as `tasks`. Writing `const [tasks, setTasks] = useState(tasks)` throws "Cannot access 'tasks' before initialization", so import it as `initialTasks`.

</details>

<details><summary><strong>Hints: App, Header and AddTaskForm</strong> (try on your own first)</summary>

**src/App.jsx**

```jsx
import { useState } from "react";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import { tasks as initialTasks } from "./data/tasks.js";

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks((prev) => [...prev, { ...newTask, id, status: "todo" }]);
  }

  function handleStatusChange(id, status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function handleRename(id, title) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <Header tasks={tasks} />
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
```

**src/components/Header.jsx**

```jsx
function Header({ tasks }) {
  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <header>
      <h1>TaskBoard</h1>
      <p>{doneCount} of {tasks.length} done</p>
    </header>
  );
}

export default Header;
```

**src/components/AddTaskForm.jsx**

```jsx
import { useState } from "react";

const emptyForm = { title: "", assignee: "", points: 1 };

function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) {
      setError("Title needs 3+ characters.");
      return;
    }
    setError("");
    onAdd({
      title,
      assignee: form.assignee.trim(),
      points: Number(form.points),
    });
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" value={form.title}
        aria-invalid={Boolean(error)} onChange={handleChange} />

      <label htmlFor="assignee">Assignee</label>
      <input id="assignee" name="assignee" value={form.assignee}
        onChange={handleChange} />

      <label htmlFor="points">Points</label>
      <input id="points" name="points" type="number" min="1"
        value={form.points} onChange={handleChange} />

      {error && <p role="alert">{error}</p>}
      <button type="submit">Add task</button>
    </form>
  );
}

export default AddTaskForm;
```

</details>

<details><summary><strong>Hints: Board, Column and TaskCard</strong> (try on your own first)</summary>

**src/components/Board.jsx**

```jsx
import Column from "./Column.jsx";

const columns = [["todo", "To do"], ["doing", "In progress"], ["done", "Done"]];

function Board({ tasks, onStatusChange, onRename, onDelete }) {
  return (
    <div className="board">
      {columns.map(([status, heading]) => (
        <Column
          key={status}
          heading={heading}
          tasks={tasks.filter((t) => t.status === status)}
          onStatusChange={onStatusChange}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
```

**src/components/Column.jsx**

```jsx
import TaskCard from "./TaskCard.jsx";

function Column({ heading, tasks, onStatusChange, onRename, onDelete }) {
  return (
    <section className="column">
      <h2>{heading} ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onStatusChange={onStatusChange}
                onRename={onRename}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Column;
```

**src/components/TaskCard.jsx**

```jsx
import { useState } from "react";

function TaskCard({ task, onStatusChange, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    const title = draft.trim();
    if (title === "") return;
    onRename(task.id, title);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <article className="card">
      {isEditing ? (
        <>
          <input aria-label="Task title" value={draft}
            onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      {task.assignee && <p>Assigned to {task.assignee}</p>}
      {task.points > 0 && <span>{task.points} pts</span>}

      <select aria-label="Status" value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}>
        <option value="todo">To do</option>
        <option value="doing">In progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={handleDeleteClick}>Delete</button>
    </article>
  );
}

export default TaskCard;
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Handlers are `undefined` in `TaskCard` | A prop was not passed through `Column` (or `Board`). Check each layer's props in React DevTools. |
| A new task has no status and does not appear | Default the status to `"todo"` when creating the task. |
| Editing one card edits all of them | The edit state was placed in `App` as a single boolean. Keep `isEditing` inside each `TaskCard`. |
| `Cannot access 'tasks' before initialization` | The import and the state variable are both called `tasks`. Import the data as `initialTasks`. |
| `TaskCard` shows nothing, or `task is undefined` | `Column` still spreads `{...task}`. Pass `task={task}` instead. |

> **Stretch challenge**
> - Add a search box in the `Header` that filters tasks by title across all columns, using derived state.
> - Add keyboard support to inline editing: Enter saves an edit, Escape cancels.

<details><summary><strong>Stretch hints</strong></summary>

**Search:** keep `const [search, setSearch] = useState("")` in `App`, pass `search` and `onSearchChange={setSearch}` to `Header`, and give `Board` the derived list. Keep passing the full `tasks` to `Header` so the counts stay correct.

```jsx
const visibleTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(search.toLowerCase())
);
```

**Keyboard support in TaskCard:** add these functions, and `onKeyDown={handleKeyDown}` on the edit input.

```jsx
function handleCancel() {
  setDraft(task.title);
  setIsEditing(false);
}

function handleKeyDown(e) {
  if (e.key === "Enter") handleSave();
  if (e.key === "Escape") handleCancel();
}
```

</details>

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. What does `useState` return?
2. Why does calling `setCount(count + 1)` three times only add 1?
3. What two props make an input controlled?
4. Write the immutable way to remove the task with a given id.
5. Where should state live when two siblings need it?
6. Should `filteredTasks` be stored in state?

---

## Key takeaways

### What you learned

- `useState` gives components memory; setters trigger re-renders.
- State is a snapshot; use updater functions for dependent updates.
- Pass handler functions, do not call them; children report events upward.
- Controlled inputs keep form values in state.
- Add with spread, update with `map`, delete with `filter`.
- Lift shared state up; derive everything you can.

If today felt like a lot, it was: state is the hardest core concept in React. Re-read [State is a snapshot](#state-is-a-snapshot-use-updater-functions) and [Updating arrays of objects immutably](#updating-arrays-of-objects-immutably) tonight. They will make everything else easier.

### Take-home practice

> Add a **Clear completed** button to TaskBoard that removes every done task (status `"done"`) in one update. It is a single `filter` call. Then add a `priority` field (low, medium, high) to the add form and show a coloured badge on each card. This practises forms and conditional class names.

### Looking ahead

TaskBoard now works. But refresh the page and everything you added disappears, because state only lives in memory. Tomorrow you fix that with effects, and you load data from an API.

---

## Further reading

These official resources cover today's topics in more depth. The "Updating arrays in state" page is worth reading twice: it has a clear table of which array methods mutate and which return new arrays.

| Resource | Link |
|---|---|
| React: Responding to events | https://react.dev/learn/responding-to-events |
| React: State, a component's memory | https://react.dev/learn/state-a-components-memory |
| React: State as a snapshot | https://react.dev/learn/state-as-a-snapshot |
| React: Queueing a series of state updates | https://react.dev/learn/queueing-a-series-of-state-updates |
| React: Updating objects in state | https://react.dev/learn/updating-objects-in-state |
| React: Updating arrays in state | https://react.dev/learn/updating-arrays-in-state |
| React: Sharing state between components | https://react.dev/learn/sharing-state-between-components |
| React: Choosing the state structure | https://react.dev/learn/choosing-the-state-structure |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap

1. `className`.
2. Through props, passed like attributes and received as one object.
3. Whatever is placed between the component's opening and closing tags.
4. Indexes shift when items are removed, so React can mismatch items and their internal state.
5. It renders a stray `0`. Use `count > 0 &&` instead.

### Knowledge check

1. An array: the current value and a setter function.
2. `count` is a snapshot fixed for that render, so all three calls calculate the same value. Use `setCount((c) => c + 1)`.
3. `value` (or `checked` for a checkbox) and `onChange`.
4. `setTasks((prev) => prev.filter((t) => t.id !== id))`
5. In their closest common parent.
6. No. Derive it from `tasks` and the search text during render.

---

## My notes

&nbsp;
