# Day 8: Styling, Forms and React 19 Features

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Build polished, accessible interfaces and use the latest React form APIs.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 8 at a glance](#day-8-at-a-glance)
- [Morning recap: Day 7 knowledge check](#morning-recap-day-7-knowledge-check)
- [Module 8.1: Styling Approaches](#module-81-styling-approaches)
- [Module 8.2: Component Libraries](#module-82-component-libraries)
- [Module 8.3: Production Forms](#module-83-production-forms)
- [Module 8.4: React 19 Features](#module-84-react-19-features)
- [Module 8.5: Accessibility](#module-85-accessibility)
- [Hands-on labs](#hands-on-labs)
  - [Lab 8.1: Restyle TaskBoard with Tailwind and shadcn/ui](#lab-81-restyle-taskboard-with-tailwind-and-shadcnui)
  - [Lab 8.2: Task Form with React Hook Form and Zod](#lab-82-task-form-with-react-hook-form-and-zod)
  - [Lab 8.3: Quick Add with Actions and Optimistic Updates](#lab-83-quick-add-with-actions-and-optimistic-updates)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)
- [My notes](#my-notes)

---

## How to use this handbook

This handbook goes with the instructor-led session. It follows the same order as the slides and explains each concept in plain language. It also gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying: that builds memory and teaches you to read errors.
- **Commands** are the same on Windows (PowerShell) and macOS (Terminal) today, so one block is shown.
- **Callouts** highlight key ideas. They are marked Tip, Good to know, Troubleshooting, Try it and Check your understanding. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 8 at a glance

| Part | Topic |
|---|---|
| Recap | Day 7 knowledge check |
| 8.1 | Styling approaches: CSS Modules and Tailwind CSS |
| 8.2 | Component libraries: shadcn/ui |
| 8.3 | Production forms: React Hook Form and Zod |
| 8.4 | React 19: Actions, useActionState, useOptimistic, use() |
| 8.5 | Accessibility essentials |
| Labs | Restyle, validated form, optimistic updates |

TaskBoard already works well. Today you make it look and feel professional:
- restyle it with Tailwind CSS and shadcn/ui;
- build robust forms with React Hook Form and Zod;
- learn the new React 19 form features;
- make sure everyone can use the app, including people who use a keyboard or a screen reader.

Five modules make the pace brisk. Before the first module, check that both `json-server` and the Vite dev server start on your machine.

### By the end of today you will be able to

- Style components with CSS Modules and Tailwind CSS, including responsive layouts and class-based dark mode
- Set up the `@` import alias and add shadcn/ui (Radix) components that you own and can customise
- Describe data once with a Zod schema, and use it for TypeScript types, form validation and API responses
- Build validated, accessible forms with React Hook Form
- Use React 19 Actions, `useActionState`, `useFormStatus`, `useOptimistic`, `use()` and `ref` as a prop
- Check an app for accessibility with keyboard testing, Lighthouse, axe and a screen reader

### Labs today

| Lab | Title | Time |
|---|---|---|
| 8.1 | Restyle TaskBoard with Tailwind and shadcn/ui | 60 min |
| 8.2 | Task Form with React Hook Form and Zod | 45 min |
| 8.3 | Quick Add with Actions and Optimistic Updates | 40 min |

---

## Morning recap: Day 7 knowledge check

Answer these questions about Day 7 before the session starts. The answers are in the [answer key](#answer-key).

1. How does React 19 let you provide a context value?
2. What must a reducer never do?
3. Why use selectors with Zustand?
4. What is a `queryKey` for?
5. After adding a task with `useMutation`, how does the list update?

---

## Module 8.1: Styling Approaches

*From plain CSS to utility-first styling.*

React does not dictate how you style components. So far we have used plain global CSS. Global CSS becomes risky in large apps because class names from different components can clash. This module covers two popular solutions.

### CSS Modules and Tailwind CSS

**CSS Modules.** Any file whose name ends in `.module.css` has its class names made unique automatically at build time. You import the file as an object and use its properties as class names. You get no clashes and still write normal CSS, and Vite supports it with zero setup.

**src/components/TaskCard.module.css**

```css
.card { padding: 1rem;
  border-radius: 8px; }
.done { opacity: 0.6; }
```

**src/components/TaskCard.tsx**

```tsx
import s from "./TaskCard.module.css";

<article className={s.card}>
```

**Tailwind CSS.** Instead of writing CSS files, you compose small utility classes directly in your markup:
- `p-4` is padding;
- `rounded-lg` is border radius;
- `hover:shadow-md` adds a shadow on hover;
- `dark:` applies a class only in dark mode.

**src/components/TaskCard.tsx (Tailwind version)**

```tsx
<article className="rounded-lg
  border bg-white p-4 shadow-sm
  hover:shadow-md
  dark:bg-slate-800">
  <h3 className="font-semibold
    text-slate-900 dark:text-white">
    {task.title}
  </h3>
</article>
```

Notice `dark:text-white` on the heading. Without it, dark text would sit on a dark card in dark mode, which is almost unreadable. Always check both themes.

Tailwind looks noisy at first, but most developers who try it for a day end up preferring it:
- you never switch between files;
- you never have to invent class names;
- the design stays consistent, because spacing and colours come from a fixed scale.

Tailwind is now the most common styling choice in new React projects, and shadcn/ui is built on it, so we use it for TaskBoard.

> **Check your understanding**
> What does CSS Modules protect you from?
>
> <details><summary>Answer</summary>
>
> Class name clashes between components.
>
> </details>

### Installing Tailwind CSS in Vite

Setting up Tailwind for Vite takes three steps:
1. Install two packages.
2. Add the plugin to `vite.config.ts`.
3. Replace `index.css` with a single import line.

**Windows and macOS: same commands**

```bash
npm install tailwindcss @tailwindcss/vite
```

**vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**src/index.css** (replace everything with this line)

```css
@import "tailwindcss";
```

- Tailwind v4 needs only a Vite plugin and one CSS import.
- You do not need a config file to start.
- Only the classes you actually use end up in the final CSS.
- Install the **Tailwind CSS IntelliSense** extension in VS Code. It autocompletes class names and shows the CSS behind each one when you hover.

> **Try it:** restart the dev server. Then add `className="text-3xl font-bold text-cyan-700"` to the `h1` in your app and watch the style apply.

> **Tip**
> The official Prettier plugin, `prettier-plugin-tailwindcss`, sorts class names automatically.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | A tutorial tells you to run `npx tailwindcss init`, create `tailwind.config.js` and add three `@tailwind` directives | That is Tailwind version 3. Version 4 does not need any of them. Use the Vite installation page on tailwindcss.com instead. |
> | Existing `App.css` rules override Tailwind or look inconsistent | Remove old CSS gradually as you restyle each component. |

### Responsive design and dark mode

Tailwind is **mobile first**. Classes without a prefix apply to all screen sizes. Prefixes such as `md:` and `lg:` apply from that breakpoint upward. So `grid-cols-1 md:grid-cols-3` means one column on phones, and three columns from tablet width.

The `dark:` prefix applies styles in dark mode. By default, Tailwind follows the operating system setting. TaskBoard has its own theme toggle, so we tell Tailwind to use a `.dark` class instead, with a `@custom-variant` line in `index.css`.

**src/components/Board.tsx**

```tsx
<div className="grid grid-cols-1 gap-4
  md:grid-cols-3">
  {columns.map((c) => (
    <section key={c.status}
      className="rounded-xl bg-slate-100 p-4
        dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold
        uppercase text-slate-600 dark:text-slate-400">
        {c.label}
      </h2>
    </section>
  ))}
</div>
```

**src/index.css** (class-based dark mode)

```css
@custom-variant dark (&:where(.dark, .dark *));
```

To connect the theme toggle, update `ThemeProvider` from Day 7 so that its effect toggles the class on the `html` element. Once the old CSS variables are gone, you can remove the Day 7 `data-theme` line.

**src/context/ThemeContext.tsx** (inside `ThemeProvider`)

```tsx
useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
}, [theme]);
```

- Mobile first: unprefixed classes apply everywhere.
- `md:` and `lg:` apply from that width upward.
- `dark:` applies when dark mode is active.
- `@custom-variant` ties `dark:` to a `.dark` class.
- Toggle `.dark` on `html` from the theme context.

Check the contrast in both themes. `text-slate-500` is only about 4.3 to 1 on `bg-slate-100`, and about 3.7 to 1 on `bg-slate-900`. Both are below the 4.5 to 1 needed for small text. That is why the column heading uses `text-slate-600` with `dark:text-slate-400`, which give about 6.9 and 6.8 to 1. You will learn more about contrast in Module 8.5.

> **Try it:** resize the browser, or open DevTools device mode (Ctrl+Shift+M on Windows, Cmd+Shift+M on macOS), and watch the board collapse to one column.

> **Tip**
> When a `className` gets very long, take that as a signal to extract a component, not to write custom CSS.

---

## Module 8.2: Component Libraries

*shadcn/ui and accessible primitives.*

Dialogs, dropdowns and date pickers that work well with keyboards and screen readers are hard to build. Component libraries solve this for you, so you can focus on your product.

### Why shadcn/ui?

shadcn/ui is unusual. It is not a package of components that you install. Instead, its command-line tool (CLI) copies the source code of each component into your project, usually into `src/components/ui`. You can read and change every line.

Underneath, the components use **Radix UI** primitives. These implement tricky behaviours correctly:
- trapping focus inside dialogs;
- arrow-key navigation in menus;
- screen reader announcements.

That is weeks of work you do not have to do.

- **Not a dependency you install:** components are copied into your project as source files.
- **You own the code:** edit anything, with no fighting a library's styles.
- **Built on Radix UI primitives:** keyboard, focus and ARIA are handled correctly.
- **Styled with Tailwind** and CSS variables for theming.
- **A CLI adds components one at a time:** button, card, dialog, select.
- **Alternatives:** MUI, Mantine, Chakra UI, React Aria.

> **In one sentence**
> Radix handles the hard behaviour. Tailwind handles the look. You own the result.

Other excellent libraries exist. MUI implements Google's Material Design and is common in enterprise apps. Mantine and Chakra UI are full-featured. Choose based on your team and your design needs.

Remember the `ui` folder with `Button` and `Card` from Day 3? shadcn/ui is the professional version of that idea.

> **Good to know: Radix or Base UI?**
> New shadcn/ui projects now use Base UI primitives by default instead of Radix. Radix is still fully supported and this course uses it, so you pass `-b radix` when you run `init`.

### Adding shadcn/ui to TaskBoard

shadcn/ui needs an **import alias**, so that components can import each other with paths like `@/components/ui/button`. You add the alias to both the TypeScript config and the Vite config.

**Windows and macOS: same commands**

```bash
npm install -D @types/node
```

**tsconfig.json** and **tsconfig.app.json**: add `paths` inside `compilerOptions` in *both* files

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

In `tsconfig.app.json`, add the `paths` entry alongside the existing options rather than replacing them.

**vite.config.ts**

```ts
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Then initialise shadcn/ui and add components:

```bash
npx shadcn@latest init -b radix
npx shadcn@latest add button card dialog
npx shadcn@latest add input label select
```

The CLI asks you to pick a preset; any choice is fine. `init` then:
- installs the dependencies it needs, including `radix-ui` and `lucide-react`;
- creates a `components.json` config file;
- creates `src/lib/utils.ts`, which exports the `cn()` helper for merging class names;
- adds theme CSS variables to `index.css`.

`add` copies the components you ask for into `src/components/ui`.

> **Note**
> The shadcn/ui Vite page (Installation, then Vite, then the *Existing Project* section) is the source of truth if the CLI steps change. It still shows a `"baseUrl": "."` line in the tsconfig files. Leave that line out. The Vite template uses TypeScript 6, which rejects `baseUrl`, and `paths` works without it.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `No import alias found in your tsconfig.json file` | The `paths` setting is missing from the root `tsconfig.json`. Add it there as well as in `tsconfig.app.json`. |
> | `npm run build` fails with `error TS5101: Option 'baseUrl' is deprecated` | Remove the `baseUrl` line from `tsconfig.json` and `tsconfig.app.json`. `paths` works on its own. |
> | Your Day 3 `ui/Button.tsx` and `ui/Card.tsx` conflict with the generated files | Rename or delete your own files before running `add`, and let the CLI overwrite. |
> | The CLI asks to overwrite `index.css` variables | Accept. You can re-add custom rules afterwards. |
> | `npm run lint` reports `Fast refresh only works when a file only exports components` in `components/ui/button.tsx` or `badge.tsx` | The generated files also export variant helpers. It is harmless. Add `"src/components/ui"` to `globalIgnores` in `eslint.config.js`, for example `globalIgnores(["dist", "src/components/ui"])`. |

### Using shadcn/ui components

shadcn/ui components are composed from small parts. A `Dialog` has a `Trigger` that opens it, and `Content` that appears. `asChild` tells the trigger to use our `Button` element rather than rendering an extra button around it.

**src/components/NewTaskDialog.tsx**

```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function NewTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
        </DialogHeader>
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
```

- **Composed parts:** Trigger, Content, Header, Title.
- **`asChild`** makes our `Button` the trigger.
- **Free behaviour:** Escape closes the dialog, focus is trapped inside it, and focus returns to the trigger afterwards.
- **Variants:** `<Button variant="outline" size="sm">`.

`Button` has variants such as `default`, `outline`, `secondary`, `ghost` and `destructive`, and sizes such as `sm` and `lg`. Open `src/components/ui/button.tsx` to see how the variants are defined; you can add your own.

The `cn()` helper combines class names and resolves Tailwind conflicts, so a `className` prop can cleanly override a component's defaults.

> **Try it:** open `NewTaskDialog`, then use only the keyboard. Tab to the button, press Enter to open, and press Tab repeatedly: focus cycles inside the dialog without escaping. Press Escape to close, and notice that focus returns to the button. All of that is Radix behaviour you did not have to write.

---

## Module 8.3: Production Forms

*React Hook Form with Zod validation.*

On Day 4 you wrote validation by hand. That works for one field. Real forms have many fields, rules that involve more than one field, and errors that come back from the server. For those, teams use **React Hook Form** with a schema validation library such as **Zod**.

### Describing data with a Zod schema

Zod lets you describe the shape of your data and its rules in one place. Each field has a type and constraints, with custom error messages.

**Windows and macOS: same commands**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**src/schemas/task.ts**

```ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim()
    .min(3, "Title needs at least 3 characters")
    .max(80, "Keep titles under 80 characters"),
  status: z.enum(["todo", "doing", "done"]),
  points: z.coerce.number().int().min(1).max(13),
  assignee: z.string().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;

// Also validates API data at runtime (apiTaskSchema adds id: see below)
const tasks = z.array(apiTaskSchema).parse(await res.json());
```

- **One schema** defines both the rules and the messages.
- **`z.infer`** creates the TypeScript type for free.
- **`coerce`** turns input strings into numbers.
- **`parse`** checks real data at runtime.

`z.infer` derives a TypeScript type from the schema. You no longer write the type and the validation separately, so they can never disagree.

`z.coerce.number()` converts the string from an input field into a number before checking it.

**Input and output types.** `z.infer` gives you the type *after* validation, called the output. With `z.coerce.number()` the input can be anything, so the two types differ:
- `z.input<typeof taskSchema>` has `points: unknown`;
- `z.infer<typeof taskSchema>` has `points: number`.

That difference matters when you type React Hook Form in the next section.

Remember the Day 6 warning that TypeScript does not validate API data? Zod does. `parse` throws an error if the data does not match. `safeParse` does not throw; it returns an object with a `success` flag instead. Use one of them on API responses to catch backend changes early.

A Zod object also **removes any key it does not list**. If you parsed API data with `taskSchema`, every task would silently lose its `id`. For API data, extend the schema with the extra fields:

```ts
export const apiTaskSchema = taskSchema.extend({
  id: z.string(),
  tags: z.array(z.string()).default([]),
});
```

> **Check your understanding**
> Where else is this schema useful besides the form?
>
> <details><summary>Answer</summary>
>
> Validating API responses and, on Day 9, validating data on the server.
>
> </details>

> **Note**
> This course uses **Zod 4** (`import { z } from "zod"`). The basics shown here are the same as in Zod 3, but older tutorials differ in places:
> - Zod 4 uses `z.email()` instead of `z.string().email()`;
> - Zod 4 uses `{ error: "..." }` instead of `{ message: "..." }`.
>
> If a method name differs, check [zod.dev](https://zod.dev/).

### React Hook Form with a Zod resolver

**src/components/TaskForm.tsx** (core parts)

```tsx
const { register, handleSubmit, reset,
  formState: { errors, isSubmitting } } =
  useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", status: "todo", points: 1 },
  });

async function onSubmit(values: TaskInput) {
  await addTask.mutateAsync(values);
  reset();
}

<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <Label htmlFor="title">Title</Label>
  <Input id="title" {...register("title")}
    aria-invalid={!!errors.title}
    aria-describedby={errors.title ? "title-error" : undefined} />
  {errors.title && (
    <p id="title-error" role="alert">{errors.title.message}</p>
  )}
  <Button disabled={isSubmitting}>Save</Button>
</form>
```

- **`register`** connects an input by name.
- **`handleSubmit`** validates, then calls `onSubmit`.
- **`errors`** holds messages per field.
- **`isSubmitting`** is true while `onSubmit` awaits.
- **Far fewer re-renders** than controlled inputs.

`useForm` returns a set of tools. `register("title")` returns the `name`, `ref`, `onChange` and `onBlur` props for an input, which you spread onto it. The resolver runs the Zod schema.

**Why there is no `<TaskInput>` after `useForm`.** `zodResolver` tells `useForm` both types:
- the raw form values going in (`z.input`, where `points` is `unknown` because of `coerce`);
- the validated values coming out (`TaskInput`), which is what `onSubmit` receives.

With Zod 4, writing `useForm<TaskInput>` does not type-check, because it claims the raw values already have `points` as a number. If you want to write the types yourself, use `useForm<z.input<typeof taskSchema>, unknown, TaskInput>`.

`handleSubmit` wraps your function. It prevents the default submit and validates all fields. If everything passes, it calls `onSubmit` with typed, clean values; otherwise it fills `errors`.

**Accessible errors.** Each error has a message from the schema. Wire it up in three ways:
- Show the message under the field with `role="alert"`, so screen readers announce it when it appears.
- Set `aria-invalid` on the input, so screen readers report the field as invalid. shadcn/ui's `Input` also styles itself red when `aria-invalid` is set.
- Give the message an `id` and point the input at it with `aria-describedby`, so screen readers read the message again whenever the field gets focus.

`isSubmitting` is true while your async `onSubmit` runs, so the button disables automatically. `mutateAsync` is the promise-returning version of `mutate` from TanStack Query.

React Hook Form uses uncontrolled inputs internally, so typing does not re-render the whole form. It stays fast even with dozens of fields.

> **Try it:** build the form inside `NewTaskDialog`, submit it empty, and read the messages that appear.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `register` does nothing on a shadcn/ui `Select` | shadcn/ui's `Select` is not a native `<select>`, so `register` does not work on it directly. Use React Hook Form's `Controller` component; the current shadcn/ui React Hook Form guide pairs it with its `Field` components. For today, a native `<select>` styled with Tailwind is fine. |
> | `Type 'Resolver<...>' is not assignable` on `resolver:` | You wrote `useForm<TaskInput>`. Remove the type argument, or use `useForm<z.input<typeof taskSchema>, unknown, TaskInput>`. |

---

## Module 8.4: React 19 Features

*Actions, form hooks, optimistic UI and use().*

React 19 added built-in support for handling forms asynchronously. These APIs are also the foundation of Next.js Server Actions, so understanding them today makes Day 9 much easier.

### What React 19 added for data and forms

| Feature | What it does |
|---|---|
| **Actions** | Pass an async function to a form's `action` prop. React handles the pending state and resets the form when it finishes. |
| **`useActionState`** | Wraps an action and gives you its latest result and a pending flag. Ideal for validation messages from the server. |
| **`useFormStatus`** | Lets a child component, such as a submit button, know whether its parent form is submitting. |
| **`useOptimistic`** | Shows the expected result immediately while the real request runs, and reverts if it fails. |
| **`use()`** | Reads a promise or a context. Unlike Hooks, it can be called inside conditions. |
| **`ref` as a prop** | Function components receive `ref` like any other prop. `forwardRef` is no longer needed. |

An **Action** is any async function used in a transition, most commonly one passed to a form's `action` prop.
- With a form action, React tracks the pending state for you. It also automatically resets uncontrolled form fields once the action finishes without throwing, even if the action returns an error message.
- `useActionState` gives you the result of the last submission, such as an error message, plus a pending flag.
- `useFormStatus` lets a deeply nested submit button know the form is submitting, without any props.
- `useOptimistic` updates the UI instantly, so the app feels faster.
- `use()` is a new kind of API, not a Hook. It reads promises, suspending until they resolve, and it reads context, even inside `if` statements.
- `ref` is now just a prop on function components.

**When to use which?** React Hook Form is still excellent for complex client-side forms. React 19 Actions are simpler for straightforward forms, and they shine with server functions in Next.js.

### Form actions with useActionState

This is a completely different style from React Hook Form. Inputs are uncontrolled: they just have a `name`. The form's `action` prop receives `formAction`.

**src/components/QuickAddForm.tsx** (core parts)

```tsx
import { useActionState } from "react";

type State = { error: string | null };

async function addTaskAction(
  prev: State, formData: FormData
): Promise<State> {
  const title = String(formData.get("title") ?? "");
  const result = taskSchema.shape.title.safeParse(title);
  if (!result.success) return { error: "Title too short" };
  await createTask({ title, status: "todo", points: 1 });
  return { error: null };
}

const [state, formAction, isPending] =
  useActionState(addTaskAction, { error: null });

<form action={formAction}>
  <input name="title" />
  {/* ... */}
</form>
```

- The action receives the previous state and the `FormData`.
- Whatever the action returns becomes the new state.
- `isPending` is built in.
- There is no `onChange` and no `preventDefault`.
- Fields reset when the action finishes.

When the form is submitted, React calls `addTaskAction` with two arguments: the previous state and a `FormData` object containing the input values. `formData.get("title")` reads a field by name.

Whatever the action returns becomes the new state; here that is an error message or `null`. Display it with `{state.error && <p role="alert">{state.error}</p>}`. `isPending` is true while the action runs, so use it to disable the button.

There is no `preventDefault`, no `onChange` and no `value`. React handles the submit and resets the form fields after the action completes.

The input still needs a label, even in a compact bar. Add `id="quick-title"` to the input and `<label htmlFor="quick-title" className="sr-only">New task title</label>`. The `sr-only` class hides the label visually, but screen readers still read it.

This app uses TanStack Query, so call `queryClient.invalidateQueries({ queryKey: ["tasks"] })` after `createTask` to refresh the board. To get `queryClient`, define `addTaskAction` *inside* the `QuickAddForm` component and call `const queryClient = useQueryClient()` there. The complete version is in the Lab 8.3 hints.

On Day 9, in Next.js, `addTaskAction` will run on the server once `"use server"` is added at the top of its file. The component code stays almost identical.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | The whole page shows an error screen when the API is down | If the action *throws*, React shows the nearest error boundary instead of the form. Wrap the request in `try`/`catch` and return an error state such as `{ error: "Could not save the task" }`. |

### useFormStatus and useOptimistic

**src/components/SubmitButton.tsx** and **the task list**

```tsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>
    {pending ? "Saving..." : "Save"}</Button>;
}

const [optimistic, addOptimistic] = useOptimistic(
  tasks,
  (current: Task[], newTask: Task) => [...current, newTask]
);

async function formAction(formData: FormData) {
  const task = makeTask(formData);
  addOptimistic({ ...task, pending: true });
  await createTask(task);
}
// render optimistic, style pending tasks faded
```

- `useFormStatus` comes from `react-dom`.
- It must be called inside the form it reads.
- `useOptimistic` shows a temporary state during an action.
- The temporary state reverts automatically when the action ends.
- Add `pending?: boolean` to your `Task` type.

`useFormStatus` is imported from `react-dom`, not `react`. It reads the status of the parent form. It must therefore be called in a component rendered *inside* that form, not in the component that renders the form. A reusable `SubmitButton` is the classic use.

`useOptimistic` takes the real state and an update function. It returns two things: an optimistic version of the state, and a function that adds optimistic changes.
- While the action runs, the UI shows the optimistic list immediately.
- When the action finishes and the real data has updated, the real value replaces the optimistic one.
- If the action fails, the temporary item disappears. Catch the error inside the action and return an error state, because an uncaught error replaces the UI with the nearest error boundary.

The optimistic update must be called inside an action or a transition, such as a form action, as here.

Render `optimistic` instead of `tasks`, and give pending items lower opacity, for example `className={task.pending ? "opacity-50" : ""}`.

> **Try it:** in DevTools, open the **Network** tab and set throttling to **Slow 4G**, then add a task. It appears instantly but faded, then turns solid when the server confirms.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | The optimistic item flickers away before the real one appears | The real list must update before the action finishes. Await the invalidation inside the action: `await queryClient.invalidateQueries({ queryKey: ["tasks"] })`. |

### The use() API and ref as a prop

**Examples**

```tsx
import { use, Suspense } from "react";

// Read context, even conditionally
function Banner({ show }: { show: boolean }) {
  if (!show) return null;
  const { theme } = use(ThemeContext)!;
  return <p>Theme: {theme}</p>;
}

// ref is now a normal prop
function TextField({ label, ref, ...rest }:
  { label: string } & React.ComponentProps<"input">) {
  return <label>{label} <input ref={ref} {...rest} /></label>;
}

// use(promise) suspends until it resolves;
// create the promise outside render (e.g. in a loader)
const quotePromise = fetchQuote(); // created once, outside any component

function Quote() {
  const quote = use(quotePromise);
  return <blockquote>{quote}</blockquote>;
}

<Suspense fallback={<p>Loading quote...</p>}>
  <Quote />
</Suspense>
```

- `use(Context)` works after early returns.
- `use(promise)` pairs with `Suspense`.
- Do not create the promise during render.
- Passing `ref` as a prop removes the need for `forwardRef`.
- Cleanup functions for ref callbacks are also new in React 19.

`use()` is unusual because it can be called conditionally. In `Banner`, the component returns early and only then reads context. With `useContext`, that would break the Rules of Hooks; with `use`, it is allowed.

`use` can also read a promise. The component **suspends**, meaning React shows the nearest `Suspense` fallback until the promise resolves. The promise must be created outside the component, for example in a route loader or passed down from a Server Component. A promise created during render is new on every render, so React keeps showing the fallback and the content never appears. The promise must be cached so the same one is reused. In practice, you will mostly see `use(promise)` with Next.js on Day 9.

**`ref` as a prop.** Before React 19, passing a ref into your own component meant wrapping the component in `forwardRef`. Now `ref` arrives as a normal prop, as in `TextField`. `React.ComponentProps<"input">` types every native input attribute, so the component also accepts `placeholder`, `type`, `onChange` and so on. shadcn/ui components generated for React 19 already use this pattern: open `src/components/ui/input.tsx` to see it.

---

## Module 8.5: Accessibility

*Building for everyone.*

Accessibility, often shortened to **a11y**, means people with disabilities can use your app. That includes people who are blind, who use only a keyboard, who have low vision, or who have motor or cognitive impairments. It is also a legal requirement in many regions, and it improves the experience for everyone.

### Accessibility checklist

| Area | What to check |
|---|---|
| **Semantic HTML** | Use `button` for actions and `a` for navigation. Use headings in order. Use `nav`, `main` and `section`. Never use a `div` with `onClick` as a button. |
| **Labels and names** | Every input has a label. Icon-only buttons need `aria-label`. Images need meaningful `alt` text, or `alt=""` if they are decorative. |
| **Keyboard** | Everything works with Tab, Enter, Space and Escape. Focus is visible. Dialogs trap focus and restore it when they close. |
| **Visual** | Text contrast of at least 4.5 to 1. Do not rely on colour alone; add text or icons to status. Respect reduced motion. |

Four areas cover most problems.

- **Semantic HTML first.** A `button` element is focusable, works with Enter and Space, and is announced as a button. A `div` with `onClick` has none of that. This single rule fixes a huge number of issues.
- **Names.** Screen readers need text. An icon-only delete button must have `aria-label="Delete task"`. Every input must have a label connected with `htmlFor` and `id`.
- **Keyboard.** Imagine your mouse is unplugged and try to use your app. Can you reach every control? Can you see where focus is? Tailwind's `focus-visible:ring` classes help, and Radix handles dialogs for us.
- **Visual.** A text contrast of at least 4.5 to 1 for normal-sized text is the WCAG AA standard. In TaskBoard, status must not be shown by colour alone: include the word as well.

ARIA attributes are useful, but the first rule of ARIA is: **do not use ARIA if a native HTML element does the job.**

> **Try it:** press Tab repeatedly through TaskBoard. Find one issue, such as an icon button without a name, and fix it, for example by adding `aria-label`.

### Testing accessibility

Use a mix of automated and manual testing.

- **Keyboard test:** put the mouse away and complete every task flow.
- **Lighthouse in Chrome DevTools:** gives an Accessibility score with specific issues.
- **axe DevTools browser extension:** detailed, reliable automated checks.
- **Screen readers:** NVDA (free, Windows), Narrator (Windows), VoiceOver (macOS).
- **eslint-plugin-jsx-a11y:** catches problems while you type. Check that it supports your ESLint version first: version 6.10.2 does not yet install alongside the ESLint 10 used by new Vite projects.
- **Manual testing matters:** automated tools find only part of the issues.

Automated tools catch perhaps a third to a half of real issues. Keyboard and screen reader testing catch much of the rest.

On Day 10, React Testing Library will encourage accessible code, because its preferred queries find elements by role and label, just as assistive technology does.

> **Try it: a Lighthouse audit.** In Chrome DevTools, open the **Lighthouse** tab. Tick only **Accessibility** and click **Analyze page load**. Read one flagged issue and fix it.

> **Try it: contrast of one colour pair.** Inspect some text in Chrome DevTools and click the colour swatch next to `color` in the **Styles** pane. The colour picker shows the contrast ratio against the background, with AA and AAA checks.

> **Try it: a screen reader.** Turn it on for a minute and move through a few elements to hear the difference good labels make. Turn it off with the same shortcut.
>
> | Platform | Screen reader | On/off |
> |---|---|---|
> | Windows | Narrator | Ctrl+Windows+Enter |
> | macOS | VoiceOver | Cmd+F5 |

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab. Try on your own first, and use them if you are stuck for more than a few minutes.

The hints use the TaskBoard code from earlier days:
- the `Task` and `Status` types in `src/types.ts` (Day 6);
- `ThemeProvider` (Day 7);
- `fetchTasks`, `createTask` and `updateTask` in `src/api/tasks.ts`, and `useAddTask` (Day 7);
- `json-server` on port 3001 (Day 7).

### Lab 8.1: Restyle TaskBoard with Tailwind and shadcn/ui

| | |
|---|---|
| **Goal** | A polished, responsive, dark-mode-ready TaskBoard. |
| **Suggested time** | 60 min |

Aim for clean and consistent rather than flashy. Use the same spacing and corner radius everywhere.

#### Steps

1. Install Tailwind with the Vite plugin and replace `src/index.css` (see [Installing Tailwind CSS in Vite](#installing-tailwind-css-in-vite)).
2. Configure the `@` alias in `tsconfig.json`, `tsconfig.app.json` and `vite.config.ts`, then run `npx shadcn@latest init -b radix` (see [Adding shadcn/ui to TaskBoard](#adding-shadcnui-to-taskboard)).
3. Add the button, card, dialog, input, label and badge components: `npx shadcn@latest add button card dialog input label badge`.
4. Rebuild `TaskCard` with `Card` and `Badge`. Show the status as text *plus* colour.
5. Make the board one column on mobile and three columns from `md`.
6. Enable class-based dark mode with `@custom-variant`, and connect the theme toggle in `ThemeProvider`.
7. Add a loading skeleton for the board.
8. Remove the old CSS files, then commit.

#### Done when

- [ ] It looks good at phone and desktop widths
- [ ] Dark mode works everywhere
- [ ] No leftover global CSS rules remain

<details><summary><strong>Hints</strong> (try on your own first)</summary>

**Skeleton while loading.** Repeat a few of these while `isPending` is true:

```tsx
<div className="h-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
```

**Page container**

```tsx
<main className="mx-auto max-w-6xl p-4 md:p-8">
```

**Badge colours by status.** Map each status to a class name in an object, and always show the word too:

**src/components/TaskCard.tsx**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Status, Task } from "@/types";

const statusStyles: Record<Status, string> = {
  todo: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  doing: "bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-50",
  done: "bg-emerald-200 text-emerald-950 dark:bg-emerald-800 dark:text-emerald-50",
};

const statusLabels: Record<Status, string> = {
  todo: "To do", doing: "In progress", done: "Done",
};

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className={task.pending ? "opacity-50" : ""}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2">
        <Badge className={statusStyles[task.status]}>
          {statusLabels[task.status]}
        </Badge>
        <span className="text-sm">{task.points} pts</span>
      </CardContent>
    </Card>
  );
}
```

**Theme toggle.** In `ThemeProvider`, toggle the `dark` class on `html` inside an effect:

```tsx
useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
}, [theme]);
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Tailwind classes are not applied | The plugin is missing from `vite.config.ts`, or the dev server was not restarted. |
| `@/` imports fail in the editor but work in Vite, or the other way round | The alias is only in one place. It must be in the tsconfig files *and* in `vite.config.ts`. |
| `dark:` classes never apply | The `@custom-variant` line is missing, or `ThemeProvider` still sets only the Day 7 `data-theme` attribute instead of toggling the `dark` class on `html`. |
| `npm run build` fails with `TS5101 Option 'baseUrl' is deprecated` | Remove `baseUrl` from both tsconfig files; keep `paths`. |

> **Stretch challenge**
> - Add a `lucide-react` icon to each column header. shadcn/ui has already installed `lucide-react`, for example `import { ListTodo } from "lucide-react";` then `<ListTodo aria-hidden="true" className="size-4" />`.
> - Add a subtle lift on hover: `hover:-translate-y-0.5 transition`.

### Lab 8.2: Task Form with React Hook Form and Zod

| | |
|---|---|
| **Goal** | A validated create and edit form inside a dialog. |
| **Suggested time** | 45 min |

#### Steps

1. Install the packages: `npm install react-hook-form zod @hookform/resolvers`.
2. Create `taskSchema` and `TaskInput` in `src/schemas/task.ts`.
3. Build `TaskForm` with title, status, points and assignee fields.
4. Show field errors under each input with `role="alert"`, and connect each one to its input with `aria-describedby`.
5. Submit through the TanStack Query mutation, and close the dialog on success.
6. Reuse `TaskForm` for editing by passing `defaultValues`.
7. Validate API responses in `fetchTasks` with Zod.
8. Test invalid input and keyboard use, then commit.

#### Done when

- [ ] Invalid submissions show clear messages
- [ ] The same form creates and edits
- [ ] Bad API data raises a clear error

<details><summary><strong>Hints: schema and API validation</strong> (try on your own first)</summary>

The API task also has `id` and `tags`, and Zod removes any key the schema does not list, so extend the form schema for API data.

**src/schemas/task.ts**

```ts
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim()
    .min(3, "Title needs at least 3 characters")
    .max(80, "Keep titles under 80 characters"),
  status: z.enum(["todo", "doing", "done"]),
  points: z.coerce.number().int().min(1).max(13),
  assignee: z.string().optional(),
});

// What the form holds before validation (points can be any value)
export type TaskFormValues = z.input<typeof taskSchema>;
// What you get after validation (points is a number)
export type TaskInput = z.infer<typeof taskSchema>;

// Tasks from the API also have an id and tags
export const apiTaskSchema = taskSchema.extend({
  id: z.string(),
  tags: z.array(z.string()).default([]),
});
```

**src/api/tasks.ts** (`fetchTasks`)

```ts
import { z } from "zod";
import { apiTaskSchema } from "../schemas/task";
import type { Task } from "../types";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return z.array(apiTaskSchema).parse(await res.json());
}
```

</details>

<details><summary><strong>Hints: a reusable TaskForm</strong> (try on your own first)</summary>

The form takes optional `defaultValues` and an `onSubmit` function, so the same component can create and edit.

**src/components/TaskForm.tsx**

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schemas/task";
import type { TaskFormValues, TaskInput } from "@/schemas/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TaskFormProps = {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskInput) => Promise<unknown>;
};

export function TaskForm({ defaultValues, onSubmit }: TaskFormProps) {
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues, unknown, TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", status: "todo", points: 1, ...defaultValues },
  });

  async function submit(values: TaskInput) {
    await onSubmit(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined} />
        {errors.title && (
          <p id="title-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <select id="status" {...register("status")}
          className="h-9 rounded-md border bg-transparent px-2">
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="points">Points</Label>
        <Input id="points" type="number" {...register("points")}
          aria-invalid={!!errors.points}
          aria-describedby={errors.points ? "points-error" : undefined} />
        {errors.points && (
          <p id="points-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
            {errors.points.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Input id="assignee" {...register("assignee")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
```

</details>

<details><summary><strong>Hints: controlled dialogs for create and edit</strong> (try on your own first)</summary>

Control the dialog with state so you can close it after a successful submit: `const [open, setOpen] = useState(false);` and `<Dialog open={open} onOpenChange={setOpen}>`.

**src/components/NewTaskDialog.tsx**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { useAddTask } from "@/hooks/useAddTask";

export function NewTaskDialog() {
  const [open, setOpen] = useState(false);
  const addTask = useAddTask();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a task</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={async (values) => {
            await addTask.mutateAsync({ ...values, tags: [] });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
```

For editing, you need an update mutation. Build `useUpdateTask` the same way you built `useMoveTask` on Day 7, calling `updateTask(id, changes)` from `src/api/tasks.ts`.

**src/hooks/useUpdateTask.ts**

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Task } from "../types";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...changes }: Partial<Task> & { id: string }) =>
      updateTask(id, changes),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
```

**src/components/EditTaskDialog.tsx**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import type { Task } from "@/types";

export function EditTaskDialog({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const updateTask = useUpdateTask();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <TaskForm
          key={task.id}
          defaultValues={task}
          onSubmit={async (v) => {
            await updateTask.mutateAsync({ id: task.id, ...v });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Points error `Invalid input: expected number, received string` | Use `z.coerce.number()` in the schema, or `register("points", { valueAsNumber: true })`. |
| The form does not reset when you edit a different task | Pass `key={task.id}` to `TaskForm` so it remounts with the new default values. |
| Nothing happens on submit | Validation is failing on a field you cannot see. Log `errors` (for example `console.log(errors)`) to find it. |
| `Property 'tags' is missing` in `fetchTasks` | Zod removed a key the schema does not list. Add the field to `apiTaskSchema`. |
| `Type 'Resolver<...>' is not assignable` | Remove `<TaskInput>` from `useForm`, or use `useForm<TaskFormValues, unknown, TaskInput>`. |

> **Stretch challenge**
> Add a due date with a native `<input type="date">`, and a rule that it cannot be in the past, using `z.refine`.

### Lab 8.3: Quick Add with Actions and Optimistic Updates

| | |
|---|---|
| **Goal** | A React 19 quick-add bar that feels instant. |
| **Suggested time** | 40 min |

This is the modern React feel: instant feedback, and correct results.

#### Steps

1. Build `QuickAddForm` using `useActionState` and an action function.
2. Validate the title in the action, and return an error state if it is invalid.
3. Extract a `SubmitButton` that uses `useFormStatus`.
4. Wrap the task list with `useOptimistic`.
5. Add the optimistic task inside the action, before the request.
6. Await the query invalidation inside the action, and catch request errors.
7. Style pending tasks with reduced opacity.
8. Test with **Slow 4G** throttling and with `json-server` stopped. Then commit and push.

#### Done when

- [ ] New tasks appear instantly, faded, then turn solid
- [ ] Invalid titles show a clear error message
- [ ] Failed saves remove the temporary task and show an error message

<details><summary><strong>Hints: types and SubmitButton</strong> (try on your own first)</summary>

Add two optional fields to the `Task` type from Day 6:
- `pending` marks optimistic tasks;
- `clientId` is a temporary id that lets you recognise the real task when it arrives (see Troubleshooting).

**src/types.ts**

```ts
export type Status = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
  points: number;
  assignee?: string;
  tags: string[];
  clientId?: string;  // temporary id sent with a quick-add
  pending?: boolean;  // true while an optimistic task is saving
}

export type NewTask = Omit<Task, "id">;
```

If you use `apiTaskSchema` from Lab 8.2, add `clientId: z.string().optional()` to it as well, so Zod keeps the field.

**src/components/SubmitButton.tsx**

```tsx
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Add"}
    </Button>
  );
}
```

</details>

<details><summary><strong>Hints: QuickAddForm with useActionState</strong> (try on your own first)</summary>

The action is defined inside the component so it can use `queryClient`. It receives `onOptimisticAdd` from the board, which owns the optimistic list.

**src/components/QuickAddForm.tsx**

```tsx
import { useActionState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { taskSchema } from "@/schemas/task";
import { createTask } from "@/api/tasks";
import type { Task } from "@/types";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

type State = { error: string | null };

export function QuickAddForm({ onOptimisticAdd }: {
  onOptimisticAdd: (task: Task) => void;
}) {
  const queryClient = useQueryClient();

  async function addTaskAction(_prev: State, formData: FormData): Promise<State> {
    const result = taskSchema.shape.title.safeParse(formData.get("title") ?? "");
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const clientId = crypto.randomUUID();
    onOptimisticAdd({
      id: clientId, clientId, title: result.data, status: "todo",
      points: 1, tags: [], pending: true,
    });

    try {
      await createTask({ clientId, title: result.data, status: "todo", points: 1, tags: [] });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      return { error: null };
    } catch {
      return { error: "Could not save the task. Is json-server running?" };
    }
  }

  const [state, formAction] = useActionState(addTaskAction, { error: null });

  return (
    <form action={formAction} className="flex flex-wrap items-start gap-2">
      <label htmlFor="quick-title" className="sr-only">New task title</label>
      <Input id="quick-title" name="title" placeholder="Add a task..."
        className="max-w-sm"
        aria-invalid={!!state.error}
        aria-describedby={state.error ? "quick-error" : undefined} />
      <SubmitButton />
      {state.error && (
        <p id="quick-error" role="alert" className="w-full text-sm text-red-700 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
```

`result.data` is the trimmed title, and `result.error.issues[0].message` is the message from your schema, so "too short" and "too long" each get the right text.

</details>

<details><summary><strong>Hints: the board with useOptimistic</strong> (try on your own first)</summary>

**src/components/Board.tsx**

```tsx
import { useOptimistic } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import type { Status, Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { QuickAddForm } from "./QuickAddForm";

const columns: { status: Status; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "doing", label: "In progress" },
  { status: "done", label: "Done" },
];

export function Board() {
  const { data: tasks = [], isPending, isError, error } =
    useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  const [optimistic, addOptimistic] = useOptimistic(
    tasks,
    (current: Task[], newTask: Task) =>
      current.some((t) => t.clientId === newTask.clientId)
        ? current                // the real task has arrived
        : [...current, newTask],
  );

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <div className="grid gap-6">
      <QuickAddForm onOptimisticAdd={addOptimistic} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((c) => (
          <section key={c.status}
            className="rounded-xl bg-slate-100 p-4 dark:bg-slate-900">
            <h2 className="mb-3 text-sm font-semibold uppercase text-slate-600 dark:text-slate-400">
              {c.label}
            </h2>
            <div className="grid gap-3">
              {optimistic
                .filter((t) => t.status === c.status)
                .map((t) => <TaskCard key={t.id} task={t} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
```

`TaskCard` from Lab 8.1 already fades tasks where `pending` is true.

</details>

> **Good to know: fields reset even after an error**
> After an action finishes, React resets the uncontrolled form fields, even if the action returned an error state. To keep the typed value when there is an error, return it in the state and use it as `defaultValue`. Change `key` so the input remounts with the new value. `title` and `attempt` are extra fields you add to `State`; this is an advanced detail.
>
> ```tsx
> type State = { error: string | null; title: string; attempt: number };
>
> // in the action, on a validation error:
> return { error: "...", title: String(formData.get("title") ?? ""), attempt: prev.attempt + 1 };
>
> // in the form (initial state: { error: null, title: "", attempt: 0 }):
> <input name="title" defaultValue={state.title} key={state.attempt} />
> ```

#### Troubleshooting

| Problem | Fix |
|---|---|
| `An optimistic state update occurred outside a transition or action` | `addOptimistic` was called in an `onClick` handler. Call it inside the form action, or wrap the call in `startTransition`. |
| `useFormStatus` is always `false` | It is called in the component that renders the form, not in a child component inside the form. |
| A duplicate task shows briefly | When the refetch finishes, the real list already contains the task while the optimistic copy is still shown. `json-server` 1.x replaces any `id` sent in a POST, so you cannot match on `id`. Send a temporary `clientId` (`crypto.randomUUID()`) with the new task. In the `useOptimistic` update function, return `current` unchanged if it already contains a task with that `clientId`. |
| With `json-server` stopped, the board is replaced by an error screen | The action threw, so React showed the nearest error boundary. Wrap `createTask` in `try`/`catch` inside the action and return an error state. The temporary task still disappears when the action ends. |
| The optimistic item flickers away before the real one appears | Await `queryClient.invalidateQueries({ queryKey: ["tasks"] })` inside the action. |

> **Stretch challenge**
> Apply `useOptimistic` to status moves as well.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. What does `md:grid-cols-3` mean in Tailwind?
2. Why does shadcn/ui copy code into your project?
3. What does `z.infer` give you?
4. What arguments does an action used with `useActionState` receive?
5. Where must `useFormStatus` be called?
6. Name two accessibility checks you can do in five minutes.

---

## Key takeaways

### What you learned

- Tailwind utilities keep styling fast and consistent.
- shadcn/ui gives you accessible components that you own.
- Zod defines rules once, for forms and for API data.
- React Hook Form scales to complex forms.
- React 19 Actions, `useActionState`, `useFormStatus` and `useOptimistic` simplify async forms.
- Accessibility starts with semantic HTML and keyboard testing.

TaskBoard now looks and behaves like a professional product.

### Take-home practice

> Run a Lighthouse accessibility audit on TaskBoard and fix every issue it reports. Then add a delete confirmation using the shadcn/ui **AlertDialog** component (`npx shadcn@latest add alert-dialog`).

### Looking ahead

Tomorrow is the big one: full-stack. You move TaskBoard to Next.js, where components can run on the server, and connect it to a real Postgres database with user accounts through Supabase.

**Before tomorrow**, create a free Supabase account at [supabase.com](https://supabase.com). Signing in with GitHub is quickest. Check that you can open the dashboard, so no time is lost in the morning.

---

## Further reading

These official resources cover today's topics in more depth. They are the best place to look up details after the course. The React 19 release post is the best single summary of everything new. The WCAG quick reference is the accessibility standard itself, and you can filter it by level.

| Resource | Link |
|---|---|
| Tailwind CSS: Vite installation | https://tailwindcss.com/docs/installation/using-vite |
| Tailwind CSS: Dark mode | https://tailwindcss.com/docs/dark-mode |
| shadcn/ui: Vite installation | https://ui.shadcn.com/docs/installation/vite |
| React Hook Form | https://react-hook-form.com/get-started |
| Zod | https://zod.dev/ |
| React 19 release notes | https://react.dev/blog/2024/12/05/react-19 |
| React: useActionState | https://react.dev/reference/react/useActionState |
| WCAG 2.2 quick reference | https://www.w3.org/WAI/WCAG22/quickref/ |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap: Day 7

1. Render the context directly as the provider: `<ThemeContext value={...}>`.
2. Have side effects: fetching, randomness or mutating state.
3. The component re-renders only when the selected slice changes.
4. It uniquely identifies cached data; changing it refetches.
5. `onSuccess` calls `invalidateQueries` for `["tasks"]`, which refetches the list.

### Knowledge check

1. Three grid columns from the `md` breakpoint upward.
2. So that you own the component source and can customise it; it is not a locked dependency.
3. A TypeScript type derived from the schema (the validated output type).
4. The previous state and the `FormData`.
5. In a component rendered inside the form it reads.
6. Any two of: a keyboard-only walkthrough, a Lighthouse accessibility audit, an axe DevTools scan, or a quick screen reader pass.

---

## My notes

&nbsp;
