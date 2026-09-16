# Day 9: Full-Stack React with Next.js

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Build a full-stack application with server rendering, a real database and user accounts.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 9 at a glance](#day-9-at-a-glance)
- [Morning recap: Day 8 knowledge check](#morning-recap-day-8-knowledge-check)
- [Module 9.1: Next.js Foundations](#module-91-nextjs-foundations)
- [Module 9.2: Server and Client Components](#module-92-server-and-client-components)
- [Module 9.3: Server Actions and Mutations](#module-93-server-actions-and-mutations)
- [Module 9.4: Suspense and Error Handling](#module-94-suspense-and-error-handling)
- [Module 9.5: Backend with Supabase](#module-95-backend-with-supabase)
- [Hands-on labs](#hands-on-labs)
  - [Lab 9.1: Migrate TaskBoard to the Next.js App Router](#lab-91-migrate-taskboard-to-the-nextjs-app-router)
  - [Lab 9.2: Connect TaskBoard to Supabase](#lab-92-connect-taskboard-to-supabase)
  - [Lab 9.3: Sign Up, Log In and Per-User Tasks](#lab-93-sign-up-log-in-and-per-user-tasks)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)
- [My notes](#my-notes)

---

## How to use this handbook

This handbook goes with the trainer-led session. It follows the slides in the same order and explains each idea in plain language. It also gives you what you need to finish the labs and to revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks, with the file name in bold above it. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are the same on Windows (PowerShell) and macOS (Terminal) today, so one block is shown.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in sections you click to open, so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 9 at a glance

| Part | Topic |
|---|---|
| 9.1 | Next.js foundations: App Router and file-based routing |
| 9.2 | Server and Client Components |
| 9.3 | Server Actions and mutations |
| 9.4 | Suspense, streaming and error handling |
| 9.5 | Backend with Supabase: Postgres, Auth and Row Level Security |
| Labs | Migrate, connect database, add accounts |

Today is the biggest day of the course, because React now runs in **two places**: on the server and in the browser. Once that idea clicks, the rest follows. The morning covers Next.js. The afternoon covers Supabase and the labs that bring it all together.

### By the end of today you will be able to

- Create a Next.js project and build pages, layouts and dynamic routes with the App Router
- Decide which components run on the server and which need `"use client"`, and fetch data in Server Components
- Change data with Server Actions called from forms, and refresh pages with `revalidatePath`
- Show loading states with `loading.tsx` and Suspense, and recover from errors with `error.tsx`
- Create a Postgres table in Supabase, protected by grants and Row Level Security
- Add email and password sign up, log in and log out, and protect pages on the server
- Keep secrets out of the browser with the right environment variables

### Labs today

| Lab | Title | Time |
|---|---|---|
| 9.1 | Migrate TaskBoard to the Next.js App Router | 60 min |
| 9.2 | Connect TaskBoard to Supabase | 50 min |
| 9.3 | Sign Up, Log In and Per-User Tasks | 50 min |

> **Before you start**
> You need a Supabase account, created and verified (see the end of Day 8). If you have not done it yet, do it now at [supabase.com](https://supabase.com) while the recap runs.

---

## Morning recap: Day 8 knowledge check

Answer these questions about yesterday before the session starts. Answers are in the [answer key](#answer-key).

1. How do you apply a style only from tablet width upward in Tailwind?
2. What does the Zod `parse` method do with bad data?
3. What does `register` return in React Hook Form?
4. What does `useOptimistic` do if the action fails?
5. Why is a `div` with `onClick` a poor substitute for a `button`?

---

## Module 9.1: Next.js Foundations

*A full-stack React framework.*

React is a library for building user interfaces. A **framework** adds everything around it: routing, data loading, server rendering, bundling and deployment conventions. The React team recommends starting new full-stack apps with a framework, and Next.js is the most popular choice.

### Why use a React framework?

Until now TaskBoard has run entirely in the browser, talking to a mock API. With Vite, the browser downloads an almost empty HTML page, and JavaScript builds everything. With Next.js, the server can send ready-made HTML, so users see content sooner and search engines can read it.

- **Routing built in:** folders become URLs, with no router setup.
- **Server rendering:** HTML arrives ready, which helps speed and search engines.
- **Server Components:** they run only on the server, can query a database directly, and send no JavaScript to the browser for that component.
- **Server Actions:** a form can call a server function directly. You do not need to design and write a separate REST API for your own app.
- **Optimised by default:** images, fonts and code splitting.
- **Deploys easily** to Vercel and other hosts.

> **Good news**
> Everything from Days 3 to 8 still applies. Components, props, state, Hooks, TypeScript, Tailwind, shadcn/ui, Zod and React Hook Form all work in Next.js. You are adding a server side to the React you already know, not starting over.

> **Good to know: is Vite obsolete then?**
> No. Vite is excellent for pure client apps, dashboards behind a login, and apps with a separate backend. Choose based on the project.

### Create a Next.js project

`create-next-app` scaffolds a project. Its first question asks whether to use the **recommended Next.js defaults**: TypeScript, ESLint, Tailwind CSS and the App Router. Answer **Yes**. The prompts change occasionally between versions. If you are asked about a `src` directory, choose **No** to match the slides. If you are asked about the import alias, keep the default `@/*`.

**Windows and macOS: same commands**

```bash
cd react-course
npx create-next-app@latest taskboard-next
# Accept the recommended defaults:
# TypeScript, ESLint, Tailwind CSS, App Router
cd taskboard-next
npm run dev
```

Open http://localhost:3000. Next.js runs its own development server with fast refresh, just like Vite.

Then add shadcn/ui to the new project. Choose **Radix** as the component base, as on Day 8. The alias is already configured by `create-next-app`, so no extra setup is needed.

```bash
npx shadcn@latest init -b radix
```

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Next.js starts on port 3001 instead of 3000 | Port 3000 was busy, so Next.js picked 3001, which is where json-server ran on Day 7. Stop json-server; we no longer need it from today. |
> | `create-next-app` complains about the Node.js version | Install the current LTS (Node 24) from [nodejs.org](https://nodejs.org), open a new terminal and try again. |

### The App Router: folders become routes

In the App Router, the folder structure inside `app` **is** the route structure. A folder becomes a URL segment, and a `page.tsx` file inside it makes that URL visitable.

```text
app/
  layout.tsx             root layout: html, body, providers
  page.tsx               /
  globals.css
  login/
    page.tsx             /login
  projects/
    [projectId]/
      page.tsx           /projects/website
      loading.tsx        shown while the page loads
  settings/
    page.tsx             /settings
  not-found.tsx          unknown URLs
  error.tsx              errors in this segment
lib/
  supabase/server.ts     shared server code
components/              UI components (not routes)
```

- **Square brackets create a dynamic segment.** `projects/[projectId]` matches `/projects/website`, exactly like `:projectId` in React Router on Day 6.
- **Special file names have special meaning.**

  | File | What it does |
  |---|---|
  | `layout.tsx` | Wraps its folder and all subfolders |
  | `page.tsx` | Makes the URL visitable |
  | `loading.tsx` | Shows while the page loads |
  | `error.tsx` | Catches errors |
  | `not-found.tsx` | Handles unknown URLs |

- **Mapping to Day 6:** `layout.tsx` is React Router's `Layout` with `Outlet`. Folders are route paths. `[param]` is `:param`.
- **Only files named `page.tsx` become routes**, so you can safely keep other files elsewhere. We keep components in a top-level `components` folder and shared server code in `lib`.

> **Check your understanding**
> What URL does `app/settings/profile/page.tsx` create?
>
> <details><summary>Answer</summary>
>
> `/settings/profile`.
>
> </details>

### Layouts and pages

**app/layout.tsx and app/page.tsx**

```tsx
// app/layout.tsx
import "./globals.css";
import { Header } from "@/components/Header";

export default function RootLayout(
  { children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}

// app/page.tsx
import Link from "next/link";

export default function Home() {
  return <Link href="/projects/website">Open project</Link>;
}
```

- **The root layout is required.** It renders the `html` and `body` tags and wraps every page. Keep the `import "./globals.css";` line at the top, otherwise the Tailwind styles disappear.
- **`children` is the current page:** whichever page matches the URL. It is the equivalent of `Outlet`.
- **Layouts persist between navigations.** They do not re-render or lose state when you move between pages inside them, so headers and sidebars stay put.
- **`next/link` replaces React Router's `Link`.** Use `href` instead of `to`. For navigating from code, use `useRouter` from `next/navigation` in Client Components, or `redirect` from `next/navigation` on the server.
- **Pages are default exports.**
- Nested folders can have their own `layout.tsx`, for example a projects layout with a project sidebar.

> **Tip**
> Export a `metadata` object from a layout or page to set the page title: `export const metadata = { title: "TaskBoard" };`

> **Try it:** replace the starter page with a TaskBoard heading, add a simple `Header` component in `components/Header.tsx`, and import it in the layout.

### Dynamic routes and params

**app/projects/[projectId]/page.tsx**

```tsx
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();
  return (
    <section>
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <TaskBoard projectId={projectId} />
    </section>
  );
}
```

- **`params` is a Promise: await it.** A dynamic page receives `params`. In current Next.js it is a Promise, so the page is `async` and awaits it. This lets Next.js optimise rendering.
- **Pages can be async on the server.** This component awaits data, which is only possible because it is a Server Component, the topic of the next module.
- **`notFound()` shows `not-found.tsx`.** If the project does not exist, calling `notFound()` stops rendering and shows the nearest `not-found.tsx`.
- **`searchParams` works the same way.** Query strings arrive in a `searchParams` prop, which is also a Promise.

> **Troubleshooting**
> Older tutorials use `params.projectId` directly, without `await`. Next.js 16 removed that synchronous access: TypeScript reports an error and the value is `undefined` at runtime. Always await `params`.

> **Check your understanding**
> How does this compare with `useParams` in React Router?
>
> <details><summary>Answer</summary>
>
> It is the same idea, but the page receives `params` as a prop on the server instead of reading them with a Hook in the browser. In Client Components, `useParams` from `next/navigation` also exists.
>
> </details>

---

## Module 9.2: Server and Client Components

*React running in two places.*

This is the most important concept of the day. In the App Router, **every component is a Server Component by default**. You opt into running in the browser with a directive.

### Server Components versus Client Components

| Server Components (default) | Client Components (`"use client"`) |
|---|---|
| Run on the server only | Rendered on the server, then hydrated in the browser |
| Can be `async` and await data | Use `useState`, `useEffect`, `onClick`, `useOptimistic` |
| Can access databases and secrets | Access `window`, `localStorage` |
| Send no component JavaScript to the browser | Add to the JavaScript bundle |
| Cannot use state, effects, event handlers or browser APIs | Cannot import server-only code |

**Server Components** run only on the server. They can be async, query the database directly, and read secret environment variables safely. Their output is sent to the browser, but their code is not, so there is less JavaScript to download. They cannot be interactive: no `useState`, no `useEffect`, no `onClick`, no `window`.

**Client Components** are marked with `"use client"` at the top of the file. They are the React you have used all week. They still render on the server first for fast HTML, and then **hydrate** in the browser: React attaches event handlers and state to that HTML.

**Rule of thumb:** use Server Components for fetching and displaying data, and Client Components for interactivity. Keep Client Components as small as possible, at the leaves of the component tree.

> **Analogy: a restaurant**
> The kitchen (Server Components) prepares the food with ingredients customers never see. The table (Client Components) is where customers interact: salt, cutlery, ordering more.

> **Check your understanding**
> 1. A task list that only displays tasks: server or client?
> 2. The drag-and-drop status control: server or client?
>
> <details><summary>Answers</summary>
>
> 1. Server.
> 2. Client.
>
> </details>

### A Server Component that fetches data

**app/page.tsx**

```tsx
import { createClient } from "@/lib/supabase/server";
import { TaskCard } from "@/components/TaskCard";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, status, points")
    .order("created_at");
  if (error) throw new Error(error.message);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tasks.map((t) => <TaskCard key={t.id} task={t} />)}
    </div>
  );
}
```

Compare this with Day 5. There is no `useState` for data, no `useEffect`, no loading flags and no `AbortController`. The component is `async`, awaits the data, and returns JSX.

- **Async component, awaits data directly.**
- **Runs on the server next to the data.** It can use server-only clients and secrets. The browser receives only the rendered result.
- **Loading and errors are handled elsewhere:** loading states by `loading.tsx` or Suspense boundaries, and thrown errors by `error.tsx`. Both are covered in Module 9.4.
- You will build `lib/supabase/server.ts` in Module 9.5. For now, understand the shape: create a client, query the `tasks` table, select specific columns, order the results.

> **Good to know: what about TanStack Query?**
> It still has a place in Next.js, for client-side data that changes frequently or needs polling. For page data like this, Server Components are simpler.

> **Try it:** before Supabase is ready, use hard-coded data: `const tasks = await getTasks();` where `getTasks` returns a promise of an array. Lab 9.1 does exactly this.

### The "use client" boundary

**components/StatusSelect.tsx**

```tsx
"use client";
import { useTransition } from "react";
import { moveTask } from "@/app/actions";
import type { Status } from "@/lib/types";

export function StatusSelect(
  { id, status }: { id: string; status: Status }) {
  const [isPending, startTransition] = useTransition();
  return (
    <select defaultValue={status} disabled={isPending}
      onChange={(e) => startTransition(() =>
        moveTask(id, e.target.value as Status))}>
      <option value="todo">To do</option>
      <option value="doing">In progress</option>
      <option value="done">Done</option>
    </select>
  );
}
```

- **`"use client"` must be the first line.** It marks this file, and everything it imports, as client code. It is a boundary, not a label on one component.
- **Everything it imports joins the client bundle.**
- **Server Components can render Client Components.** A Server Component such as `TaskCard` can render `StatusSelect` and pass it props.
- **Props must be serialisable.** Props travel over the network, so they must be strings, numbers, booleans, plain objects, arrays, dates and a few more. You cannot pass ordinary functions from server to client. The exception is Server Actions, which can be passed and called, as `moveTask` is here.
- **Push the boundary to the leaves.** Do not put `"use client"` on a whole page just because one dropdown needs it. Make the dropdown its own small Client Component.

`useTransition` marks the update as a transition and gives us `isPending`, so the select is disabled while the Server Action runs.

Context providers such as the `ThemeProvider` from Day 7 must also be Client Components. Wrap them in a small `app/providers.tsx` file with `"use client"`, and use it inside the root layout.

> **Troubleshooting**
>
> | Error | Fix |
> |---|---|
> | "You're importing a component that needs useState. This React Hook only works in a Client Component." | Add `"use client"` to that component's file. |
> | "Functions cannot be passed directly to Client Components" | A plain function was passed as a prop from a Server Component. Move the function into the Client Component, or make it a Server Action. |

### Caching and revalidation

Next.js can cache rendered pages and data to make sites fast. Since Next.js 15, `fetch` requests are **not** cached unless you opt in. Caching has changed several times across major versions, so treat the official docs for your installed version as the source of truth. To check your version, run `npx next --version`.

- **Pages that read cookies (like the logged-in user) render per request.** TaskBoard's pages read the user's session from cookies, so each page is rendered fresh for each request and each user. That is exactly what we want for private data.
- **`revalidatePath("/")` refreshes a page's data after a change.** After a Server Action changes data, call `revalidatePath` with the affected path, and Next.js re-renders that page with fresh data. You will do this in the next module.
- **`revalidateTag(tag, "max")` refreshes data labelled with a tag.** In Next.js 16 the second argument, a cache profile, is required; the one-argument form is deprecated.
- **Next.js 16 has an opt-in `"use cache"` directive** for explicit caching of a function or component, available when the `cacheComponents` option is enabled. It gives big speed gains for public, rarely changing content such as a marketing page or blog.
- **For per-user dashboards like TaskBoard, dynamic rendering is the right default.**

---

## Module 9.3: Server Actions and Mutations

*Calling server code from forms.*

Yesterday you wrote actions with `useActionState` that ran in the browser. Today the same pattern runs on the server, by adding one directive.

### Defining Server Actions

**app/actions.ts**

```ts
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { taskSchema } from "@/lib/schemas";

type State = { error: string | null };

export async function addTask(prev: State, formData: FormData) {
  const parsed = taskSchema.safeParse(
    Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid task" };
  const supabase = await createClient();
  const { error } = await supabase.from("tasks")
    .insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { error: null };
}
```

- **`"use server"` at the top of a file makes every exported async function a Server Action.** Next.js creates a hidden endpoint for each one. When a Client Component calls it, a request goes to the server, the function runs there, and the result comes back.
- **Two names.** The React and Next.js docs call any `"use server"` function a **Server Function**. One used for a form or a data change is called a **Server Action**. You will see both names.
- **Same signature as yesterday.** The action receives the previous state and `FormData`, just like Day 8's `useActionState` action. `State` is the same type as on Day 8. `Object.fromEntries` turns `FormData` into a plain object that Zod can check.
- **Validate with Zod again: never trust the client.** Always validate on the server, even if the browser validated already. A malicious user can call this endpoint directly with any data.
- **`revalidatePath` refreshes the page data.** After inserting, `revalidatePath("/")` tells Next.js to re-render the dashboard with fresh data, so the new task appears.
- **`moveTask` and `deleteTask` follow the same pattern:** validate, get the client, update or delete, revalidate.
- **We do not send `user_id` from the form.** The database fills it in from the logged-in user, which you set up in Module 9.5. This prevents users writing tasks into someone else's account.

> **Try it:** create `app/actions.ts` and `lib/schemas.ts`. Copy yesterday's `taskSchema` from `src/schemas/task.ts` into `lib/schemas.ts`.

### Using a Server Action in a form

**components/AddTaskForm.tsx**

```tsx
"use client";
import { useActionState } from "react";
import { addTask } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddTaskForm() {
  const [state, formAction, isPending] =
    useActionState(addTask, { error: null });
  return (
    <form action={formAction} className="flex gap-2">
      <Input name="title" aria-label="Task title" required minLength={3} />
      <input type="hidden" name="status" value="todo" />
      <input type="hidden" name="points" value="1" />
      <Button disabled={isPending}>Add</Button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
```

- **Same code as Day 8, but the action runs on the server.** This is almost identical to yesterday's `QuickAddForm`. The only difference is that `addTask` is imported from a `"use server"` file.
- **Progressive enhancement.** Forms that use Server Actions can work even before the JavaScript bundle has loaded, because Next.js wires the form to a real server endpoint.
- **Hidden inputs send default values** for `status` and `points`.
- **Browser checks versus server checks.** The native `required` and `minLength` attributes give instant browser feedback. The Zod check on the server is the real protection.
- **`useFormStatus` and `useOptimistic` still apply,** including yesterday's `SubmitButton`.

A Server Component page can render this Client Component directly, so add `<AddTaskForm />` to the dashboard page.

> **Check your understanding**
> The action returned an error. Where does it appear?
>
> <details><summary>Answer</summary>
>
> In `state.error`, rendered in the `role="alert"` paragraph.
>
> </details>

### Server Actions are public endpoints

Server Actions feel like calling a local function, which makes it easy to forget that they are network endpoints. Anyone who can load your site can call them, with any arguments.

- **Anyone can call them, not just your form.**
- **Always check who the user is inside the action.**
- **Always validate input with Zod on the server.**
- **Never trust ids from the client for ownership:** let the database enforce it. In TaskBoard, Row Level Security in the database enforces ownership, which is a strong second layer.
- **Keep secrets server-side.** Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser code. Anything else, such as the Supabase secret key, stays on the server. Never prefix a secret with `NEXT_PUBLIC_`.
- **Return safe error messages** and log the details on the server.

> **Security rule**
> Treat every Server Action like an API route on the public internet, because that is what it is.

This is the promise from Day 6: route protection in the browser is user experience, and real security lives on the server. Today you build the real thing.

---

## Module 9.4: Suspense and Error Handling

*Streaming UI and graceful failures.*

Server Components await data. While they wait, what does the user see? And if something fails, what happens? Next.js answers both questions with React Suspense and error boundaries.

### Streaming with loading.tsx and Suspense

**app/loading.tsx**

```tsx
export default function Loading() {
  return <BoardSkeleton />;
}
```

**app/page.tsx (finer control with Suspense)**

```tsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Suspense fallback={<BoardSkeleton />}>
        <TaskBoard />   {/* async, slow */}
      </Suspense>
      <Suspense fallback={<p>Loading stats...</p>}>
        <Stats />       {/* async, independent */}
      </Suspense>
    </>
  );
}
```

- **Suspense shows a fallback until its children are ready.** Suspense is a React feature. A child might not be ready because it is an async Server Component still awaiting data.
- **`loading.tsx` wraps the page in Suspense for you,** using your `Loading` component as the fallback.
- **Streaming:** the server sends HTML to the browser in chunks as each boundary resolves.
- **Slow sections do not block fast ones.** In the example, the heading appears immediately. The board shows a skeleton until its data arrives, and the stats load independently.

Reuse the skeleton from yesterday's Tailwind lab, for example a few of `<div className="h-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />`.

> **Try it:** add an artificial delay inside a Server Component, `await new Promise((r) => setTimeout(r, 2000));`, and watch the skeleton appear before the content. Remove the delay afterwards.

> **Check your understanding**
> Two sections are wrapped in one Suspense boundary. One is fast, one is slow. When does the fast one appear?
>
> <details><summary>Answer</summary>
>
> Only when the slow one is ready. Separate boundaries let them appear independently.
>
> </details>

### Error boundaries with error.tsx

**app/error.tsx**

```tsx
"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error, retry,
}: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);   // send to monitoring on Day 10
  }, [error]);
  return (
    <div role="alert" className="rounded-lg bg-red-50 p-6">
      <h2 className="font-semibold">Something went wrong</h2>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
```

An error boundary catches errors thrown while rendering the components below it, and shows a fallback instead of a blank screen. In Next.js, `error.tsx` creates one for its route segment.

- **Must be a Client Component,** because it uses effects and event handlers.
- **Catches errors thrown while rendering its segment.**
- **`retry()` re-fetches and re-renders the segment.** Older Next.js versions used a `reset` prop. It still exists, but it only re-renders without fetching again.
- **The layout stays visible.** Only the segment is replaced, so navigation still works.
- **`global-error.tsx` covers the root layout.**

In production, Next.js hides the real error message from users for security, and provides a `digest` id you can match with the server logs.

Error boundaries do **not** catch errors inside plain event handlers; handle those with `try` and `catch`. An unhandled error thrown by a Server Action called from a form action or inside `startTransition` does reach the nearest error boundary. So return expected errors, such as failed validation, as state from the action, as `addTask` does.

> **Note**
> The props available to `error.tsx` can change between Next.js versions. `retry` became stable in Next.js 16.3; on older versions use `reset`. If TypeScript complains, check the `error.js` page in the docs for your version.

> **Try it:** throw an error on purpose in the dashboard component (`throw new Error("Test")`), see the boundary, click **Try again**, then remove the line.

---

## Module 9.5: Backend with Supabase

*Postgres, authentication and Row Level Security.*

Supabase is an open source backend platform built on Postgres, one of the most respected databases in the world. It provides a database, authentication, file storage and more, with a generous free tier. It is a very common pairing with Next.js.

### Setting up a Supabase project

1. **Create a project.** At supabase.com, click **New project**. Choose a name, a strong database password and the nearest region.
2. **Create the table.** Open the **SQL Editor** and run the tasks table script in the next section.
3. **Copy the keys.** Click **Connect** (or open **Settings, API Keys**) to copy the project URL and the publishable key.
4. **Configure auth.** In the Authentication settings, keep **Email** enabled. For class, you may turn off email confirmation.

- **Region and password.** Choose a region close to your users. For South Africa, a European region or the nearest available region is usually a good choice. Save the database password in a password manager: you will rarely need it, but it cannot be viewed again.
- **Keys.** The project URL and the **publishable key** (`sb_publishable_...`) are safe to use in the browser, because Row Level Security protects the data. Older projects also show a legacy `anon` key, a long value starting with `eyJ`. Supabase is deprecating the legacy keys by the end of 2026, so use the publishable key. The **secret key** (`sb_secret_...`, or the legacy `service_role` key) bypasses Row Level Security. Never put it in client code or in a `NEXT_PUBLIC_` variable.
- **Email confirmation** is on by default for hosted projects. In production, keep it on. In a classroom, turning it off saves waiting for emails: go to **Authentication, Sign In / Providers, Email**. Turn it back on for real projects.

> **Note**
> Supabase's dashboard layout changes from time to time. The concepts stay the same; look for the equivalent menu if a label differs.

> **Troubleshooting**
> New projects take a minute or two to provision. Run the table script only when the dashboard shows that the project is ready.

### The tasks table and Row Level Security

**Supabase SQL Editor**

```sql
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users on delete cascade,
  title text not null check (char_length(title) >= 3),
  status text not null default 'todo'
    check (status in ('todo', 'doing', 'done')),
  points int not null default 1,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

grant select, insert, update, delete
  on public.tasks to authenticated;

drop policy if exists "Users manage their own tasks" on public.tasks;
create policy "Users manage their own tasks"
  on public.tasks for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
```

The script is safe to run twice: `if not exists` and `drop policy if exists` stop it failing the second time. Here is what each part does.

- **`id`** is a UUID generated by the database.
- **`user_id`** defaults to `auth.uid()`, the id of the logged-in user making the request, so the app never sends it. `references auth.users` links it to Supabase's users table, and `on delete cascade` removes a user's tasks if the account is deleted.
- **The check constraints** mirror our Zod rules for title length and status, so even a buggy client cannot store an invalid status. That is **defence in depth**: validation in the form, in the Server Action and in the database.
- **`enable row level security`** means no rows are visible or writable unless a policy allows it.
- **`grant ... to authenticated`** gives logged-in users permission to reach the table through Supabase's Data API at all. New tables are no longer exposed automatically. **Grants decide whether a role can use the table; RLS policies decide which rows.**
- **The policy** applies to all operations, for logged-in users. A row is visible only if its `user_id` matches the current user (`using`). A new or updated row is allowed only if its `user_id` matches the current user (`with check`). Wrapping `auth.uid()` in `select` is a Supabase-recommended performance pattern for policies.

The result: even if someone calls the API with a forged request, they can only ever touch their own tasks. The database itself enforces it.

> **Try it:** run the script in the SQL Editor, then open the **Table Editor** and find the empty `tasks` table with RLS enabled.

> **Troubleshooting**
>
> | Symptom | Cause |
> |---|---|
> | Every query returns an empty list with no error | RLS is enabled and no policy matches. This silent empty result confuses many beginners. |
> | `permission denied for table tasks` | The grant was not run. Check the grant before you debug the policy. |

### Connecting Next.js to Supabase

**Windows and macOS: same commands**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

**.env.local** (project root, never commit)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Restart the dev server after editing `.env.local`.

- **Two packages:** the Supabase JavaScript client, and the SSR helper. The helper stores the login session in cookies, so both server and browser code can see it.
- **`.env.local`** holds environment variables for local development. The `.gitignore` from `create-next-app` already excludes it. Double-check with `git status` that it is not staged.
- **The `NEXT_PUBLIC_` prefix** exposes these values to browser code, which is fine for the URL and the publishable key.
- **Secrets never get the prefix.** If you ever need the secret key (`sb_secret_...`), store it without the prefix, for example `SUPABASE_SECRET_KEY`, and use it only in server code. TaskBoard does not need it.
- Older guides use `NEXT_PUBLIC_SUPABASE_ANON_KEY` with a legacy anon key (`eyJ...`). Supabase is retiring those keys, so use the publishable key.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Variables are `undefined` in code | Restart the dev server after creating the file. Check the file is in the project root. On Windows, Notepad may have saved it as `.env.local.txt`: in File Explorer turn on **View, File name extensions** to check. |
> | "Invalid API key" | The key was copied incompletely, has a space or line break inside it, or is a legacy key that has been disabled. Copy the publishable key again. Quotes and spaces *around* the value are fine: Next.js strips them. |

### A server-side Supabase client

**lib/supabase/server.ts**

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options));
          } catch { /* called from a Server Component */ }
        },
    } }
  );
}
```

This helper creates a Supabase client for server code: Server Components, Server Actions and Route Handlers. It reads and writes the auth session through Next.js cookies. `cookies()` is async in current Next.js, so we await it.

- **Reads the session from request cookies.**
- **Create a new client per request.** Never store a server client in a module-level variable, because it would share one user's session with everyone.
- **Why the `try` and `catch`:** Server Components cannot set cookies, so `setAll` ignores the error there.
- **A browser client lives in `lib/supabase/client.ts`.**
- **Supabase's guide also adds a `proxy.ts` file to refresh sessions.** It is a small request interceptor that runs before each page. In Next.js 16 it is `proxy.ts` in the project root, exporting a function named `proxy`. Older versions called it `middleware.ts`.

Copy `lib/supabase/client.ts`, `proxy.ts` and `lib/supabase/proxy.ts` from Supabase's official guide, **Setting up Server-Side Auth for Next.js** (link in [Further reading](#further-reading)). Copying these from the official guide is normal professional practice. The details change occasionally, and the guide is kept current. The versions at the time of writing are in the [Lab 9.2 hints](#lab-92-connect-taskboard-to-supabase).

### Sign up, log in and log out

**app/login/actions.ts**

```ts
"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type State = { error: string | null };

export async function login(
  prev: State, formData: FormData): Promise<State> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/");
}
// signup: supabase.auth.signUp({ email, password })
// logout: await supabase.auth.signOut(); redirect("/login")
```

- **Auth runs in Server Actions.** Authentication is just more Server Actions. `signInWithPassword` checks the credentials.
- **Supabase sets session cookies automatically.** On success, the Supabase SSR client writes the session cookies.
- **`redirect()` navigates after success.** On failure, the action returns the error message to the form instead. `redirect` works by throwing a special internal signal, so call it **outside** any `try` and `catch` block, as here.
- **Sign up** works the same way with `signUp({ email, password })`. With email confirmation off, the user is signed in immediately. With it on, Supabase sends a confirmation email first.
- **Log out** calls `signOut` and redirects to the login page.
- **The login page** is a Client Component with a form that uses `useActionState(login, { error: null })`. Its email and password inputs need `name` attributes, `type="email"` and `type="password"`, and proper labels.
- **The `Promise<State>` return type matters.** `redirect` never returns, so without the annotation TypeScript decides that `login` only ever returns an error string. It then rejects `{ error: null }` as the initial state.

> **Tip: one form, two buttons**
> Give the **Log in** and **Sign up** buttons each a `formAction` prop pointing to a different action. Call `useActionState` once for `login` and once for `signup`, and pass each returned function to its button. Do not pass the raw Server Action to `formAction`: it would be called with `FormData` only, not `(prev, formData)`. The full page is in the [Lab 9.3 hints](#lab-93-sign-up-log-in-and-per-user-tasks).

> **Troubleshooting**
> "Email not confirmed": confirmation is still enabled in Supabase. Turn it off for class, or click the link in the email.

### Protecting pages on the server

**app/page.tsx**

```tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");
  const { data: tasks } = await supabase
    .from("tasks").select("*").order("created_at");
  return (
    <>
      <p>Signed in as {data.claims.email}</p>
      <Board tasks={tasks ?? []} />
    </>
  );
}
```

This is real, server-side protection. Before rendering anything, the page asks Supabase who the user is.

- **`getClaims()` verifies the signed session token.** It checks the token's signature, locally with the project's public keys (or through Supabase Auth on projects with older keys). That means nobody can fake a user by editing cookies.
- **Redirect before any data is rendered.** No valid claims means an immediate redirect to the login page.
- **RLS filters rows, so no `user_id` filter is needed.** Row Level Security already restricts rows to the current user. Log in as two different accounts to prove it.
- **Add the same check inside every Server Action:** `const { data } = await supabase.auth.getClaims(); if (!data?.claims) return { error: "Not signed in" };`

Compare this with Day 6. The mock `RequireAuth` wrapper only hid pages in the browser. This check runs on the server, and the database enforces access even if this page had a bug.

> **Note**
> Supabase's guide recommends `getClaims()` for protecting pages and data. Use `getUser()` only when you need the full, up-to-date user record from the Auth server, which costs a network request. Avoid `getSession()` for authorisation decisions on the server, because it does not verify the token.

> **Try it:** log out, visit `/`, and confirm that you are redirected to `/login`.

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 9.1: Migrate TaskBoard to the Next.js App Router

| | |
|---|---|
| **Goal** | TaskBoard runs in Next.js with Server and Client Components in the right places. |
| **Suggested time** | 60 min |

Move component by component. For each one, ask: does it need state, effects, event handlers or browser APIs? If not, it stays a Server Component.

#### Steps

1. Create `taskboard-next` with `npx create-next-app@latest taskboard-next` (recommended defaults), then run `npx shadcn@latest init -b radix` inside it.
2. Copy your components, schemas and types from the Vite app: `src/types.ts` to `lib/types.ts`, `src/schemas/task.ts` to `lib/schemas.ts`, and components to `components/`. Add the shadcn components you used, for example `npx shadcn@latest add button input`.
3. Build `app/layout.tsx` with the `Header` and an `app/providers.tsx` Client Component.
4. Create the pages: `/` (dashboard), `/projects/[projectId]`, `/settings` and `/login`.
5. Keep display components as Server Components.
6. Add `"use client"` only to the interactive leaves: `StatusSelect`, dialogs and forms.
7. Add `loading.tsx`, `error.tsx` and `not-found.tsx`.
8. Use temporary in-memory data (see the hints). Commit, and push to a new GitHub repository.

#### Done when

- [ ] All pages load at their URLs
- [ ] Only interactive files have `"use client"`
- [ ] The skeleton and error pages appear when triggered

<details><summary><strong>Hints: temporary data</strong> (try on your own first)</summary>

Create `lib/data.ts` with an async `getTasks()` that returns an array after a short delay. You will swap it for Supabase in Lab 9.2.

**lib/data.ts**

```ts
import type { Task } from "@/lib/types";

const tasks: Task[] = [
  { id: "1", title: "Plan the sprint", status: "todo", points: 3, tags: [] },
  { id: "2", title: "Build the board", status: "doing", points: 5, tags: [] },
  { id: "3", title: "Write the README", status: "done", points: 1, tags: [] },
];

export async function getTasks(): Promise<Task[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tasks;
}
```

In `app/page.tsx`: `const tasks = await getTasks();`

</details>

<details><summary><strong>Hints: providers and layout</strong></summary>

**app/providers.tsx**

```tsx
"use client";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

**app/layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Providers } from "./providers";

export const metadata: Metadata = { title: "TaskBoard" };

export default function RootLayout(
  { children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Providers>
          <Header />
          <main className="mx-auto max-w-6xl p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
```

`ThemeProvider` must have `"use client"` at the top of its file, because it uses state.

</details>

<details><summary><strong>Hints: mapping from the Vite app</strong></summary>

| Vite app (React Router) | Next.js |
|---|---|
| `Link to="..."` | `Link href="..."` from `next/link` |
| `useNavigate` | `useRouter` from `next/navigation` (client) or `redirect` (server) |
| `useParams` in pages | The awaited `params` prop |
| Zustand filters and `ThemeProvider` | Client Components; wrap providers in `app/providers.tsx` |
| TanStack Query for the board | Not needed today: Server Components fetch the data |

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| "useState only works in Client Components" | Add `"use client"` to that component's file, not to the page. |
| Hydration mismatch warnings | Something renders differently on the server and the client, such as `Date.now()`, `Math.random()` or reading `localStorage` during render. Move it into an effect. |
| Theme flickers on load | Acceptable for today. |

> **Stretch challenge**
> Add `export const metadata` to each page with a meaningful title, for example `{ title: "Settings | TaskBoard" }`.

### Lab 9.2: Connect TaskBoard to Supabase

| | |
|---|---|
| **Goal** | Tasks are stored in Postgres and changed through Server Actions. |
| **Suggested time** | 50 min |

#### Steps

1. Create the Supabase project and run the tasks table SQL from [Module 9.5](#the-tasks-table-and-row-level-security), including the grant.
2. Temporarily turn off email confirmation for class (**Authentication, Sign In / Providers, Email**).
3. Install the packages with `npm install @supabase/supabase-js @supabase/ssr`, and add `.env.local` with your URL and publishable key.
4. Add the server client (`lib/supabase/server.ts`), the browser client (`lib/supabase/client.ts`) and the session refresh files (`proxy.ts` and `lib/supabase/proxy.ts`) from the official guide.
5. Replace `getTasks` in the dashboard with a Supabase query.
6. Write the `addTask`, `moveTask` and `deleteTask` Server Actions, with Zod and `revalidatePath`.
7. Connect the forms and `StatusSelect` to the actions.
8. Confirm the rows in the Supabase Table Editor, then commit.

> **Why you cannot add tasks yet**
> Inserts will fail with a Row Level Security or permission error at this point, because nobody is logged in. That is correct behaviour, and it proves RLS works. The guide's proxy also sends logged-out visitors to `/login`, so you will test reads and writes after Lab 9.3; tick the first *Done when* item then. The SQL Editor has no logged-in user either, so a test insert there must supply the `user_id` of a real user.

#### Done when

- [ ] Tasks survive refresh and appear in the Table Editor (confirm after Lab 9.3)
- [ ] Invalid input is rejected on the server
- [ ] `.env.local` is not in Git

<details><summary><strong>Hints: session refresh files from the official guide</strong> (check the guide for the latest version)</summary>

**lib/supabase/client.ts**

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

**proxy.ts** (project root, next to `app`)

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Every path except static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

**lib/supabase/proxy.ts**

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and getClaims().
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Return supabaseResponse as it is, so the refreshed cookies reach the browser.
  return supabaseResponse;
}
```

</details>

<details><summary><strong>Hints: moveTask and deleteTask</strong></summary>

Validate `status` with `z.enum` before updating.

**app/actions.ts** (add below `addTask`)

```ts
import { z } from "zod";
import type { Status } from "@/lib/types";

const statusSchema = z.enum(["todo", "doing", "done"]);

export async function moveTask(id: string, status: Status) {
  const parsed = statusSchema.safeParse(status);
  if (!parsed.success) return;
  const supabase = await createClient();
  await supabase.from("tasks").update({ status: parsed.data }).eq("id", id);
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  await supabase.from("tasks").delete().eq("id", id);
  revalidatePath("/");
}
```

Put the `import` lines at the top of the file with the others. A Server Component can call `deleteTask` from a small form, with the task id bound in:

**components/TaskCard.tsx**

```tsx
import { StatusSelect } from "@/components/StatusSelect";
import { deleteTask } from "@/app/actions";
import type { Task } from "@/lib/types";

export function TaskCard(
  { task }: { task: Pick<Task, "id" | "title" | "status" | "points"> }) {
  return (
    <article className="rounded-lg border bg-white p-4">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm">{task.points} points</p>
      <div className="mt-2 flex gap-2">
        <StatusSelect id={task.id} status={task.status} />
        <form action={deleteTask.bind(null, task.id)}>
          <button>Delete</button>
        </form>
      </div>
    </article>
  );
}
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| "new row violates row-level security policy" | You are not signed in. This is expected until Lab 9.3. |
| "permission denied for table tasks" | The grant lines in the table SQL were not run. Run them in the SQL Editor. |
| Empty list with no error | RLS is filtering the rows. Check the signed-in user and the policy. |
| Points arrive as a string | Use `z.coerce.number()` in the schema. |
| Changes do not appear | `revalidatePath` is missing, or it uses the wrong path. |
| Environment variable is `undefined` | Stop and restart `npm run dev`. |

> **Stretch challenge**
> Generate TypeScript types from your database with the Supabase CLI, `npx supabase gen types typescript --project-id your-project-ref > lib/database.types.ts` (sign in to the CLI first when it asks). Then pass the types to the client, `createServerClient<Database>(...)`, for fully typed queries.

### Lab 9.3: Sign Up, Log In and Per-User Tasks

| | |
|---|---|
| **Goal** | Each user signs in and sees only their own tasks. |
| **Suggested time** | 50 min |

This lab completes the security story that started on Day 6. When you finish, TaskBoard is a genuine multi-user application.

#### Steps

1. Build `/login` with email and password fields and `useActionState`.
2. Write the `login`, `signup` and `logout` Server Actions.
3. Protect the dashboard and project pages with `getClaims` and `redirect`.
4. Check the user inside every task Server Action.
5. Show the user's email and a **Log out** button in the `Header`.
6. Create two accounts and add tasks with each.
7. Confirm each account sees only its own tasks.
8. Commit and push.

#### Done when

- [ ] Logged-out visitors are redirected to `/login`
- [ ] Two accounts never see each other's tasks
- [ ] Log out works from every page

> **Try it: attack your own app**
> Pair up with a neighbour. Each of you tries to see the other's tasks by any means: changing URLs, editing a request in DevTools, or calling an action with another task's id. None of these should succeed.

<details><summary><strong>Hints: auth actions</strong> (try on your own first)</summary>

**app/login/actions.ts**

```ts
"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type State = { error: string | null };

export async function login(
  prev: State, formData: FormData): Promise<State> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/");
}

export async function signup(
  prev: State, formData: FormData): Promise<State> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: error.message };
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
```

</details>

<details><summary><strong>Hints: login page with two buttons</strong></summary>

**app/login/page.tsx**

```tsx
"use client";
import { useActionState } from "react";
import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [loginState, loginAction, loginPending] =
    useActionState(login, { error: null });
  const [signupState, signupAction, signupPending] =
    useActionState(signup, { error: null });
  const error = loginState.error ?? signupState.error;

  return (
    <form className="mx-auto flex max-w-sm flex-col gap-3">
      <label htmlFor="email">Email</label>
      <Input id="email" name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <Input id="password" name="password" type="password" required minLength={6} />
      <Button formAction={loginAction} disabled={loginPending}>Log in</Button>
      <Button formAction={signupAction} disabled={signupPending} variant="outline">
        Sign up
      </Button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
```

</details>

<details><summary><strong>Hints: the Header and checks inside actions</strong></summary>

Make `Header` an async Server Component that calls `getClaims`, renders `data.claims.email`, and includes a small form that calls `logout`.

**components/Header.tsx**

```tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims.email;

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/" className="font-bold">TaskBoard</Link>
      {email && (
        <form action={logout} className="flex items-center gap-2">
          <span className="text-sm">{email}</span>
          <Button variant="ghost">Log out</Button>
        </form>
      )}
    </header>
  );
}
```

At the start of every task action, after `createClient()`:

```ts
const { data } = await supabase.auth.getClaims();
if (!data?.claims) return { error: "Not signed in" };
```

In `moveTask` and `deleteTask`, which return nothing, use `if (!data?.claims) return;` instead.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Login succeeds but the dashboard still redirects | The session refresh file is missing or in the wrong folder. It must be `proxy.ts`, exporting a function named `proxy` (`middleware.ts` before Next.js 16), in the project root next to `app`. |
| "Invalid login credentials" | Wrong password, or the account was never confirmed. |
| Header does not update after login | `redirect` after login normally triggers a fresh render. If it does not, call `revalidatePath("/", "layout")` in the action. |

> **Stretch challenge**
> Add a display name field and save it in the user's metadata during sign up: `signUp({ email, password, options: { data: { name } } })`.

> **Before you share your app**
> Turn email confirmation back on in Supabase before you share the app publicly tomorrow.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. How does Next.js turn folders into URLs?
2. Name two things a Server Component can do that a Client Component cannot.
3. What does `"use client"` actually mark?
4. Why must Server Actions validate input and check the user?
5. What does Row Level Security do?
6. Which environment variables reach the browser?

---

## Key takeaways

### What you learned

- Next.js adds routing, server rendering and a server side to React.
- Server Components fetch data; Client Components handle interaction.
- Server Actions replace hand-written API endpoints for your own app.
- Suspense streams UI; `error.tsx` contains failures.
- Supabase provides Postgres and Auth; grants open a table to logged-in users, and RLS enforces ownership.
- Security lives on the server and in the database.

### Take-home practice

> Add a `projects` table with RLS and grants, a `project_id` column on `tasks`, and a sidebar that lists the user's projects. Use the same grant and policy pattern as the `tasks` table.
>
> Then write down three things about TaskBoard that should never break. Tomorrow you will turn them into automated tests.

### Looking ahead

Look at what you built: a full-stack application with authentication, a real database and row-level security. Tomorrow is the final day. You will make TaskBoard fast, write automated tests, set up a CI pipeline and deploy the app live on the internet, so you leave with a URL you can share.

Tonight, create a free Vercel account at [vercel.com](https://vercel.com) using your GitHub login.

---

## Further reading

For Next.js and Supabase, always check the docs for your installed version. Both evolve quickly, and the official guides are kept current.

| Resource | Link |
|---|---|
| Next.js docs | https://nextjs.org/docs |
| Next.js: Server and Client Components | https://nextjs.org/docs/app/getting-started/server-and-client-components |
| Next.js: Mutating data (Server Actions) | https://nextjs.org/docs/app/getting-started/mutating-data |
| Next.js: Error handling | https://nextjs.org/docs/app/getting-started/error-handling |
| React: Server Components | https://react.dev/reference/rsc/server-components |
| Supabase: Server-side auth for Next.js | https://supabase.com/docs/guides/auth/server-side/nextjs |
| Supabase: Row Level Security | https://supabase.com/docs/guides/database/postgres/row-level-security |
| Supabase: Securing your API (grants) | https://supabase.com/docs/guides/api/securing-your-api |
| Supabase: API keys | https://supabase.com/docs/guides/api/api-keys |
| Supabase JavaScript reference | https://supabase.com/docs/reference/javascript/introduction |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, go back to the matching module.

### Morning recap: Day 8

1. Prefix the class with `md:`, for example `md:grid-cols-3`.
2. It throws an error describing what did not match. `safeParse` returns a result object instead.
3. The `name`, `ref`, `onChange` and `onBlur` props to spread onto an input.
4. The optimistic value is discarded and the UI shows the real state again.
5. It is not focusable, not keyboard operable, and not announced as a button.

### Knowledge check

1. Each folder in `app` is a URL segment; `page.tsx` makes it a route; `[param]` folders are dynamic.
2. Any two of: be `async` and await data directly; access databases and secrets; send no component JavaScript to the browser.
3. A boundary: that file and everything it imports becomes client code.
4. They are public HTTP endpoints that anyone can call with any data.
5. It enforces, in the database, which rows each user can read and write.
6. Only those prefixed with `NEXT_PUBLIC_`.

---

## My notes

&nbsp;
