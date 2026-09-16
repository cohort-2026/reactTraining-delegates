# Day 10: Performance, Testing and Deployment

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Optimise, test and ship TaskBoard to production, then plan your next steps.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 10 at a glance](#day-10-at-a-glance)
- [Morning recap](#morning-recap)
- [Module 10.1: Performance](#module-101-performance)
- [Module 10.2: Testing](#module-102-testing)
- [Module 10.3: Shipping to Production](#module-103-shipping-to-production)
- [Module 10.4: Professional Practice](#module-104-professional-practice)
- [Hands-on labs](#hands-on-labs)
  - [Lab 10.1: Unit and Component Tests for TaskBoard](#lab-101-unit-and-component-tests-for-taskboard)
  - [Lab 10.2: CI Pipeline and Production Deployment](#lab-102-ci-pipeline-and-production-deployment)
  - [Lab 10.3: Capstone Demonstrations and Peer Code Review](#lab-103-capstone-demonstrations-and-peer-code-review)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are shown for Windows (PowerShell) and macOS (Terminal). Today every command is the same on both, so one block is shown.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the morning recap and the knowledge check.

---

## Day 10 at a glance

TaskBoard is already a working full-stack application. Today you do what separates a project from a product: make it fast, prove it works with automated tests, set up a pipeline that checks every change, and deploy it live. This afternoon you demo your deployed TaskBoard and take part in a code review.

| Part | Topic |
|---|---|
| 10.1 | Performance: rendering, memoisation, React Compiler, code splitting |
| 10.2 | Testing: Vitest, React Testing Library, Playwright |
| 10.3 | Shipping: linting, CI with GitHub Actions, Vercel |
| 10.4 | Professional practice and next steps |
| Labs | Tests, CI and deploy, capstone demos and code review |

### By the end of today you will be able to

- Explain what makes a React component re-render, and avoid unnecessary renders by moving state down, passing children, or memoising
- Use `memo`, `useMemo` and `useCallback` when measurements show a need, and enable the React Compiler to memoise automatically
- Load heavy code on demand with `next/dynamic` or `React.lazy` and `Suspense`, and measure with the React Profiler
- Write unit tests with Vitest and component tests with React Testing Library, mocking Server Actions and network calls
- Write an end-to-end test that drives the real app in a browser with Playwright
- Add lint, format, type-check and test scripts, and run them automatically with GitHub Actions
- Deploy TaskBoard to Vercel with the right environment variables, and configure Supabase Auth for your production URL
- Audit the live site with Lighthouse and Core Web Vitals, organise a growing project, and give constructive code review

### Labs today

| Lab | Title | Time |
|---|---|---|
| 10.1 | Unit and Component Tests for TaskBoard | 50 min |
| 10.2 | CI Pipeline and Production Deployment | 50 min |
| 10.3 | Capstone Demonstrations and Peer Code Review | 75 min |

> **Before you start**
> Make sure you have a free Vercel account linked to your GitHub account, and that your `taskboard-next` repository is pushed and up to date.

---

## Morning recap

Answer these questions on Day 9 before the session starts. The answers are in the [answer key](#answer-key).

1. What does a `page.tsx` file inside `app/settings` create?
2. Why keep `"use client"` at the leaves of the tree?
3. What does `revalidatePath` do after a Server Action?
4. Why use `getClaims()` rather than trusting the cookie on the server?
5. What happens to a query when RLS is on but no policy matches?

Last night you also wrote down three things about TaskBoard that should never break. Keep that list handy: those become today's tests.

---

## Module 10.1: Performance

*Render less, load less, measure first.*

The first rule of performance: **measure before you optimise**. Most React apps are fast enough by default. When something is slow, find out why before changing code.

### What makes a component re-render?

Four triggers cause a component to render:

1. **Its state changes.** Calling a setter schedules a render of that component.
2. **Its parent re-renders.** By default, all children render again, even with identical props.
3. **A context it reads changes.** Every consumer of that context renders.
4. **A store slice it selects changes.** Zustand and TanStack Query re-render only subscribed components.

The second one surprises people: when a parent renders, its children render too, even if their props did not change.

Rendering is usually cheap. React calls your function and compares the result; if nothing changed, the real page is not touched. A problem only appears when a render is **expensive** (a big list or a heavy calculation) and happens **often** (such as on every keystroke).

Two cheap fixes come before any memoisation:

- **Move state down**, so fewer components are affected when it changes.
- **Pass components as children**, so they are not re-created by a parent's state change.

> **Try it:** in React DevTools, open the settings cog, go to the **General** tab and tick **Highlight updates when components render**. Type in the TaskBoard search box and watch which components flash.

### memo, useMemo and useCallback

**components/Board.tsx**

```tsx
import { memo, useCallback, useMemo } from "react";

const TaskCard = memo(function TaskCard(
  { task, onMove }: TaskCardProps) {
  return <article>{task.title}</article>;
});

function Board({ tasks, filter }: BoardProps) {
  const visible = useMemo(
    () => tasks.filter((t) => matches(t, filter)),
    [tasks, filter]);
  const handleMove = useCallback(
    (id: string, s: Status) => moveTask(id, s), []);
  return visible.map((t) =>
    <TaskCard key={t.id} task={t} onMove={handleMove} />);
}
```

- **`memo`** wraps a component. When its parent re-renders, React compares the new props with the old ones. If they are equal, it skips rendering that component.
- **But `memo` compares by reference.** A new array or a new function created on each render is never equal to the previous one, so `memo` would never skip. That is where the Hooks come in.
- **`useMemo`** caches the result of a calculation and only recalculates when its dependencies change.
- **`useCallback`** caches a function, so the same reference is passed down each time.
- **They work together:** `memo` needs stable props, and `useMemo` and `useCallback` provide them.

On Day 4 you were promised these tools. They are real, but they have costs: extra code, extra comparisons, and dependency arrays that can go stale. Do not wrap everything. Use them only when the Profiler shows a slow component that renders too often. For most cases there is now a better way: the React Compiler, covered next.

> **Check your understanding**
> A `memo` component receives `style={{ color: "red" }}`. Will `memo` skip renders?
>
> <details><summary>Answer</summary>
>
> No. A new object is created on every render, so the props are never equal.
>
> </details>

### The React Compiler

The React Compiler analyses your components at build time and inserts memoisation automatically, at a finer level than most people would write by hand. The React team has released it as stable, and it is used in production at large scale.

- **Automatic memoisation at build time.**
- **Removes most manual `memo`, `useMemo` and `useCallback`.** Existing manual memoisation still works, so you do not need to remove it immediately.
- **Requires code that follows the Rules of React:** pure rendering, no mutation of props or state, Hooks at the top level. Everything you have learned this week follows those rules, which is one reason the course was strict about immutability.
- **ESLint flags code it cannot optimise.** The React Hooks rules that come with `create-next-app` include the compiler's rules, such as "Avoid calling setState() directly within an effect".

In Next.js, enabling it is a config flag plus the Babel plugin package:

**Windows and macOS: same commands**

```bash
npm install -D babel-plugin-react-compiler
```

**next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

> **Try it:** enable the compiler in `taskboard-next` and restart the dev server. In React DevTools, components the compiler has optimised show a **Memo ✨** badge.

> **Good to know: the React Compiler in a Vite project**
> Vite 8 uses `@vitejs/plugin-react` version 6, which no longer uses Babel, so the setup is different. Install `babel-plugin-react-compiler` and `@rolldown/plugin-babel`, then:
>
> ```js
> // vite.config.js
> import { defineConfig } from "vite";
> import react, { reactCompilerPreset } from "@vitejs/plugin-react";
> import babel from "@rolldown/plugin-babel";
>
> export default defineConfig({
>   plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
> });
> ```
>
> Older guides show `react({ babel: { plugins: ["babel-plugin-react-compiler"] } })`, which only works with plugin-react versions before 6. The setup has changed between versions, so check [react.dev](https://react.dev/learn/react-compiler/installation) for yours.

> **Note**
> Build times may increase slightly, because the compiler uses Babel.

### Code splitting and lazy loading

The fastest code is code the browser never downloads. **Code splitting** breaks your JavaScript into chunks that load only when needed.

**Examples**

```tsx
// Next.js: load a heavy client component on demand
import dynamic from "next/dynamic";
const ReportsChart = dynamic(
  () => import("@/components/ReportsChart"),
  { loading: () => <p>Loading chart...</p> }
);

// Vite / plain React
import { lazy, Suspense } from "react";
const Settings = lazy(() => import("./pages/Settings"));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>
```

- **Next.js splits by route automatically.** The settings page code only loads when you visit settings.
- **Load on demand:** for a heavy component on a page, such as a chart library or rich text editor, `next/dynamic` loads it separately with a loading placeholder.
- **In Vite apps,** `React.lazy` with a dynamic `import()` does the same, wrapped in `Suspense` for the fallback. It pairs naturally with React Router routes.
- **In Next.js,** `next/dynamic` is a wrapper around `React.lazy` and `Suspense`; `React.lazy` also works inside Client Components.
- **Server Components are the biggest win of all:** their code never reaches the browser, so they add no client JavaScript.
- **Measure bundle size before and after.**

> **Try it:** run `npm run build` in `taskboard-next`. The output lists each route and marks it as static (○) or dynamic (ƒ). Next.js 16 no longer prints JavaScript sizes per route. To see what is inside your bundle, run `npx next experimental-analyze`, and measure what the browser really downloads with Lighthouse or the DevTools **Network** tab.

> **Tip**
> For Vite apps, the `rollup-plugin-visualizer` package draws a map of what is in your bundle.

### Measure with the React Profiler

- **React DevTools, Profiler tab:** record, interact, stop.
- **The flame chart** shows which components rendered and how long each took. Wider and more yellow bars took longer.
- **"Why did this render?"** explains the trigger: props changed, state changed, parent rendered, or hooks changed.
- **Profile a production build for realistic numbers.** Development builds are slower than production because React adds extra checks. A standard production build leaves out React's profiling support, so build with `npm run build -- --profile` (the `--` passes the flag on to `next build`), then run `npm start`.
- **The browser's Performance tab** gives the complete picture: JavaScript, layout, painting and network. That matters because many slow pages are slow because of large images or slow APIs, not React.
- **Fix the biggest bar first, then measure again.** The loop is always the same: measure, fix the biggest problem, measure again.

> **Try it:** open React DevTools, **Profiler** tab. Click the settings cog and tick **Record why each component rendered while profiling**. Press **Record**, add a task and move a task, then press **Stop**. Click the widest bars and read why each component rendered.

---

## Module 10.2: Testing

*Proving it works, every time.*

Automated tests are code that checks your code. They let you change things confidently: if you break something, a test fails before your users notice. Every professional team expects them.

### The testing pyramid

The testing pyramid describes a healthy balance of tests.

| Layer | How many | What it covers | Tools |
|---|---|---|---|
| **End-to-end tests** (top) | Few, slower, realistic | A real browser drives the whole app: log in, add a task | Playwright |
| **Component tests** (middle) | Some | Render a component and interact like a user: click, type, read text | Vitest with React Testing Library |
| **Unit tests** (bottom) | Many, fast, focused | Pure functions: reducers, schemas, formatters. They run in milliseconds | Vitest |

- **Unit tests** check pure logic, like the `tasksReducer` from Day 7 and the Zod schema from Day 8.
- **Component tests** render a component in a simulated browser called **jsdom** and interact with it the way a user would.
- **End-to-end tests** run the real app in a real browser. They catch integration problems, such as a database policy blocking inserts, but they are slower and need test accounts.
- **In Next.js,** async Server Components are best covered by end-to-end tests, because Vitest does not support them yet. Vitest focuses on Client Components, synchronous Server Components and plain functions.

> **Check your understanding**
> Look at your three "never break" items from last night. Which layer of the pyramid does each one belong in?
>
> <details><summary>Answer</summary>
>
> Pure logic such as "moving a task never changes the original array" is a unit test. A component behaviour such as "the Add button calls addTask" is a component test. A whole journey such as "a user can log in and see only their own tasks" is an end-to-end test.
>
> </details>

### Installing Vitest and React Testing Library

- **Vitest** is a fast test runner built on Vite, compatible with the Jest style many teams know.
- **React Testing Library** renders components and finds elements the way users do. It needs `@testing-library/dom` installed alongside it.
- **user-event** simulates realistic typing and clicking.
- **jest-dom** adds readable assertions such as `toBeInTheDocument`.
- **vite-tsconfig-paths** lets tests understand the `@/` import alias.

**Windows and macOS: same commands** (run them inside `taskboard-next`)

```bash
npm install -D @types/node@24 vitest jsdom
npm install -D @vitejs/plugin-react vite-tsconfig-paths
npm install -D @testing-library/react @testing-library/dom
npm install -D @testing-library/user-event
npm install -D @testing-library/jest-dom
```

Then add a test script to the `scripts` section of `package.json`:

**package.json**

```json
"test": "vitest"
```

`@types/node@24` goes in the same command as `vitest` on purpose: `create-next-app` pins `@types/node` to version 20, which Vitest 5 does not accept, so installing Vitest on its own stops with an npm `ERESOLVE` error.

Vitest runs tests in **watch mode** by default, re-running them when you save. Use `npx vitest run` (or `npm test -- --run`) for a single run.

> **Note**
> This matches the Next.js testing guide for Vitest. In a Vite project, you can put the test configuration directly inside `vite.config.ts` instead of a separate file.

### Vitest configuration

Create both files in the project root.

**vitest.config.mts**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
```

**vitest.setup.ts**

```ts
import "@testing-library/jest-dom/vitest";
```

The config tells Vitest to use the React plugin and your path aliases, to run tests in jsdom, and to load the setup file before each test file.

- **`environment: "jsdom"`** simulates a browser in Node.
- **`globals: true`** makes `describe`, `it` and `expect` available without imports, and lets React Testing Library clean up rendered components automatically after each test. The examples still import them explicitly for clarity; both styles work.
- **`setupFiles`** loads the jest-dom matchers.
- **`exclude`** keeps the Playwright tests in `e2e` separate, because Playwright runs those itself.
- **Test files** are named `*.test.ts` or `*.test.tsx`. By convention, place a test next to the file it tests.

> **Try it:** run `npm test`. Vitest reports that no test files were found, which confirms it is configured. Press `q` to quit watch mode.

> **Good to know**
> When tests start, Vite 8 may print a note that it can resolve tsconfig paths natively with `resolve.tsconfigPaths: true`. The `vite-tsconfig-paths` plugin still works and is what the Next.js guide uses, so you can ignore the message.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | TypeScript says `toBeInTheDocument` does not exist | Make sure `vitest.setup.ts` is included by `tsconfig.json` (the Next.js default `"include"` of `**/*.ts` already covers it), or add `"@testing-library/jest-dom/vitest"` to `"types"` in `compilerOptions`. The plain `"@testing-library/jest-dom"` entry adds Jest's types, not Vitest's. |

### Unit testing pure logic

First copy `tasksReducer` from your Vite project (`src/state/tasksReducer.ts`) into `lib/tasksReducer.ts`.

**lib/tasksReducer.test.ts**

```ts
import { describe, it, expect } from "vitest";
import { tasksReducer } from "./tasksReducer";
import { taskSchema } from "./schemas";
import type { Task } from "@/types";

const task: Task = { id: "1", title: "Plan",
  status: "todo", points: 3, projectId: "website" };

describe("tasksReducer", () => {
  it("moves a task without mutating state", () => {
    const before = [task];
    const after = tasksReducer(before,
      { type: "moved", id: "1", status: "done" });
    expect(after[0].status).toBe("done");
    expect(before[0].status).toBe("todo");
  });
});

it("rejects short titles", () => {
  const r = taskSchema.safeParse({ ...task, title: "ab" });
  expect(r.success).toBe(false);
});
```

- **`describe`** groups related tests.
- **`it`** is one behaviour, named as a sentence: "moves a task without mutating state".
- **`expect`** asserts a result.
- **Arrange, act, assert:** arrange the input data, act by calling the function, assert the result with `expect`.
- **Pure functions are the easiest to test.**

The second assertion matters: it checks the original array was not changed. That turns the Day 4 immutability rule into something the computer enforces forever. The schema test checks that validation rejects a short title; if someone loosens the rule by accident, this test catches it.

The test data is typed as `Task` and includes every required field, such as `projectId` (added in Lab 6.2). Vitest does not check types, but `npm run typecheck` and `next build` do, and they include test files. Adjust the `@/types` import to wherever you copied your types on Day 9.

> **Try it:** run `npm test` and see the green output. Then break the reducer by mutating state (for example, change the `moved` case to set `t.status = action.status` and return `tasks`), read the failure message, and fix it again.

> **Check your understanding**
> What is the benefit of naming tests as sentences?
>
> <details><summary>Answer</summary>
>
> The failure output reads as a clear description of what broke.
>
> </details>

### Component testing with React Testing Library

`PointsStepper` is a small Client Component. It shows "{value} points" and has two buttons with `aria-label="Increase points"` and `aria-label="Decrease points"`.

**components/PointsStepper.test.tsx**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import { PointsStepper } from "./PointsStepper";

it("increases points when the button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<PointsStepper value={3} onChange={onChange} />);
  expect(screen.getByText("3 points")).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Increase points" }));
  expect(onChange).toHaveBeenCalledWith(4);
});
```

React Testing Library's philosophy is to **test what the user sees and does, not internal details**. That makes tests survive refactors.

- **`render`** mounts the component in jsdom.
- **`screen`** gives you queries to find elements. Prefer **`getByRole`**, which finds elements by their accessible role and name, the same way screen readers do. If `getByRole` cannot find your button, a screen reader user probably cannot either. That links back to accessibility on Day 8.
- **`userEvent.setup()`** creates a user that clicks and types realistically. Interactions are async, so you `await` them.
- **`vi.fn()`** creates a mock function that records every call. Here it is passed as `onChange`; after the click, the test asserts it was called with 4.
- **Test behaviour, not implementation.**

> **Query priority**
> `getByRole`, then `getByLabelText`, then `getByText`. Use `getByTestId` only as a last resort.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | `Unable to find an accessible element with the role "button" and name ...` | The button has no accessible name. Add visible text or an `aria-label`. |

### Mocking Server Actions and network calls

Component tests should not talk to a real server or database. **Mocks** replace those dependencies with fakes you control.

**Examples**

```tsx
import { vi } from "vitest";

// Replace a module (e.g. Server Actions) in a test
vi.mock("@/app/actions", () => ({
  addTask: vi.fn(async () => ({ error: null })),
}));

// Replace fetch for a client-side data test
vi.spyOn(globalThis, "fetch").mockResolvedValue(
  new Response(JSON.stringify([{ id: "1", title: "Plan" }]))
);

// Wait for async UI
expect(await screen.findByText("Plan")).toBeInTheDocument();

// Reset mocks between tests
afterEach(() => vi.restoreAllMocks());
```

- **`vi.mock` swaps a whole module.** Any component importing `addTask` gets the fake, which resolves immediately with no error. The test can then assert the fake was called.
- **`vi.spyOn` replaces one function,** here the global `fetch`, with a fake that returns a `Response` you build. This is useful for the Vite app's TanStack Query code.
- **`findBy` queries wait** and retry until the element appears or a timeout passes. Use them for anything that appears asynchronously.
- **Restore mocks so tests stay independent.** `vi.restoreAllMocks()` puts back functions replaced with `vi.spyOn`, such as `fetch`. Vitest 5 also clears the recorded calls of every mock before each test by default (`clearMocks` is `true`).
- **MSW is a popular tool for richer API mocking.** Mock Service Worker intercepts network requests at a lower level and works in tests and in the browser.

> **Good to know: MSW versions**
> MSW 2 imports `http` and `HttpResponse` from `msw`, and `setupServer` from `msw/node`. Tutorials that use `rest` and `res(ctx.json(...))` were written for the older MSW 1.

### End-to-end testing with Playwright

Set Playwright up inside `taskboard-next`:

**Windows and macOS: same commands**

```bash
npm init playwright@latest
```

Choose **TypeScript**, set the tests folder to **e2e**, answer **No** to adding a GitHub Actions workflow for now (the Lab 10.2 stretch challenge adds one), and accept installing browsers. It creates `playwright.config.ts` and an example test.

In `playwright.config.ts`, set a `baseURL` and a `webServer` entry, so Playwright starts the app automatically:

**playwright.config.ts** (the parts to change)

```ts
export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

**e2e/tasks.spec.ts**

```ts
import { test, expect } from "@playwright/test";

test("a user can sign in and add a task", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(process.env.E2E_EMAIL!);
  await page.getByLabel("Password")
    .fill(process.env.E2E_PASSWORD!);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page).toHaveURL("/");
  const title = `E2E task ${Date.now()}`;
  await page.getByLabel("Title").fill(title);
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText(title)).toBeVisible();
});
```

The test reads like instructions to a person: go to login, fill in email and password, click **Log in**, expect the dashboard, add a task, expect to see it.

- **Real browser, real app, real database.**
- **Same query style as Testing Library:** `getByRole` and `getByLabel`.
- **Auto-waiting:** Playwright waits for elements and navigation automatically, so there are no fragile sleep calls.
- **A unique title** made with `Date.now()` avoids clashes with earlier runs.
- **Dedicated test account in environment variables.** Put its credentials in `.env.local` locally, and in GitHub secrets for CI. Never use a real user's account. Once email confirmation is back on, confirm the test account's email before using it.
- **`npx playwright test --ui`** opens a visual runner.

`getByLabel("Title")` needs a label on the title input. The Day 9 `AddTaskForm` input only has a `name`, so add `aria-label="Title"` (or a visible `<label>`) first. It helps screen reader users too:

**components/AddTaskForm.tsx** (the title input)

```tsx
<Input name="title" aria-label="Title" required minLength={3} />
```

> **Try it:** run `npx playwright test --ui`. Step through the test and look at the timeline and screenshots.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Browsers fail to download on a restricted network | Run `npx playwright install chromium` later on a different network. |
> | Environment variables are `undefined` in Playwright | Playwright does not read `.env.local`. Run `npm install -D dotenv`, then add `import dotenv from "dotenv";` and `dotenv.config({ path: ".env.local" });` at the top of `playwright.config.ts`. (`import "dotenv/config"` on its own only loads `.env`.) |
> | `getByLabel("Title")` finds nothing | The title input has no label. Add `aria-label="Title"` or a visible label. |

---

## Module 10.3: Shipping to Production

*Quality gates, CI and deployment.*

Shipping means getting code to users safely and repeatably. You add automatic quality checks on every push, then deploy to Vercel, the company that builds Next.js.

### Linting, formatting and type checking

**package.json**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "next typegen && tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

**Windows and macOS: same commands**

```bash
npm install -D prettier eslint-config-prettier
```

- **ESLint finds bugs and bad patterns.** It was set up by `create-next-app`, including the React Hooks rules.
- **Prettier enforces one code style.**
- **`eslint-config-prettier` stops the two from clashing** by switching off ESLint rules that would conflict with Prettier's formatting.
- **`tsc --noEmit` checks types without building.** `next typegen` runs first because it generates `next-env.d.ts` and route types such as `LayoutProps`. Those files are git-ignored, so they are missing on a fresh checkout, for example on the CI server.
- **Scripts give the team and CI the same commands.** Everyone, including the CI server, runs checks the same way.

Add `eslint-config-prettier` last in your ESLint config:

**eslint.config.mjs**

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

> **Try it:** add the scripts, then run `npm run lint`, `npm run typecheck` and `npm run format:check`. Fix anything they report (`npm run format` fixes formatting for you).

> **Note**
> Next.js 16 removed the `next lint` command, and `next build` no longer runs ESLint, so linting only happens when you run it yourself or in CI. `create-next-app` adds `"lint": "eslint"`; that and `"eslint ."` both lint the whole project.

> **Tip**
> Add a `.prettierignore` listing `.next`, `node_modules` and `playwright-report`.

### Continuous integration with GitHub Actions

**Continuous integration (CI)** means a server automatically checks every change. GitHub Actions is built into GitHub and free for public repositories.

**.github/workflows/ci.yml**

```yaml
name: CI
on: { push: { branches: [main] }, pull_request: {} }
jobs:
  check:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.SUPABASE_KEY }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --run
      - run: npm run build
```

This workflow runs on pushes to `main` and on every pull request. It:

1. Checks out the code.
2. Installs Node 24 with npm caching.
3. Installs dependencies exactly as listed in `package-lock.json` (`npm ci`).
4. Runs lint, the type check, the unit and component tests, and a production build. `npm test -- --run` passes `--run` to Vitest so it runs once instead of watching.

If any step fails, the run fails and GitHub shows a red cross.

The build reads the Supabase variables, so they come from repository secrets. In GitHub, go to the repository **Settings**, **Secrets and variables**, **Actions**, **New repository secret**, and add `SUPABASE_URL` and `SUPABASE_KEY` (your publishable key). The secret names must match the workflow exactly.

End-to-end tests can run in CI too, with extra setup: installing browsers and providing test account secrets. That is a stretch challenge in Lab 10.2.

> **Try it:** create the file, commit and push. Open the **Actions** tab on GitHub and watch the run.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | Workflow does not run or shows a YAML error | YAML is sensitive to indentation. Use spaces only, never tabs. VS Code's YAML extension helps. |
> | `npm ci` fails with "lockfile out of sync" | Run `npm install` locally, commit `package-lock.json` and push again. |
> | Type check fails with `Cannot find name 'LayoutProps'` | The `typecheck` script must run `next typegen` before `tsc --noEmit`. |

### Deploying to Vercel

1. **Import the repo.** At vercel.com choose **Add New**, **Project**, then pick `taskboard-next` from GitHub. Vercel detects Next.js and fills in the build settings.
2. **Add environment variables.** Enter the same variables as your `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) **before** the first deploy. If you forget, the build may succeed but the app fails at runtime.
3. **Deploy.** In about a minute you have a public URL like `taskboard-next-yourname.vercel.app`. Every push to `main` triggers a new production deployment, and every pull request gets its own preview URL, which is excellent for code review.
4. **Update Supabase.** This step is often forgotten. Supabase must know your production URL, otherwise sign-up confirmation links and redirects point to localhost. In Supabase, go to **Authentication**, **URL Configuration**. Set the **Site URL** to your Vercel URL, and add `https://your-app.vercel.app/**` to the **Redirect URLs** (the `**` wildcard allows any path). Keep `http://localhost:3000/**` so local development still works.
5. **Protect main.** In GitHub branch settings, require the CI check to pass before merging, so nobody can merge a pull request into `main` unless CI passes.

Now that the app is public, turn email confirmation back on in Supabase.

> **Environment configuration: what reaches the browser**
> Only variables whose names start with `NEXT_PUBLIC_` reach browser code. Their values are written into the JavaScript at build time: anyone can read them, and a changed value only takes effect after a new build. That is why you must **redeploy** after adding or changing a variable in Vercel. The Supabase URL and publishable key are safe to expose because Row Level Security protects the data. **Never** give the secret key a `NEXT_PUBLIC_` name.

> **Good to know: branch protection on a free account**
> On a free personal GitHub account, branch protection is available for public repositories. Private repositories need a paid plan.

> **Good to know: deploying the Vite version of TaskBoard**
> Vercel and Netlify both deploy static builds. Configure a rewrite so every path serves `index.html`, which fixes the deep-link refresh problem from Day 6. On Vercel, add a `vercel.json` file:
>
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```

### Running in production

Deployment is not the end; it is the start of operating the app.

- **Preview deployments** for every pull request.
- **Environment separation:** use different Supabase projects for development and production, so experiments never touch real users' data.
- **Error monitoring:** Sentry or a similar tool captures crashes from real users, with the browser, the page and the stack trace. Remember the `useEffect` in `error.tsx` that logged errors? That is where you would report them.
- **Analytics:** Vercel Analytics and Speed Insights measure how fast the app is for real visitors on real devices, using Core Web Vitals.
- **Logs:** Vercel function logs and Supabase logs help with debugging.
- **Rollback:** if a release breaks something, promote a previous deployment in one click while you fix the problem.

> **Check your understanding**
> A user reports the board is blank on their phone. Where do you look first?
>
> <details><summary>Answer</summary>
>
> Error monitoring and the Vercel logs, then the Supabase logs.
>
> </details>

---

## Module 10.4: Professional Practice

*Working like a React developer on a team.*

This last module is about habits that make you effective on a real team, and how to keep growing after today.

### Structuring larger projects

```text
app/                         routes only: thin pages and layouts
  (auth)/login/page.tsx      route groups organise without URLs
  (app)/page.tsx
  (app)/projects/[projectId]/page.tsx
features/
  tasks/
    components/              TaskCard, Board, StatusSelect
    actions.ts               Server Actions for tasks
    queries.ts               data access functions
    schema.ts                Zod schemas and types
    tasks.test.ts
  projects/
  auth/
components/ui/               shadcn/ui primitives
lib/                         Supabase clients, utilities
e2e/                         Playwright tests
```

- **Group by feature, not by type.** As apps grow, this scales better. Everything about tasks lives together: its components, actions, queries, schema and tests. When you work on tasks, you open one folder.
- **Keep route files in `app` thin.** A page imports from `features` and composes them.
- **Route groups** are folders in round brackets. They organise routes and can give sections different layouts without changing URLs. Here the `(auth)` pages can use a minimal layout and the `(app)` pages the full dashboard layout.
- **Shared, generic pieces** stay in `components/ui` and `lib`.
- **There is no single correct structure.** Consistency across the team matters more than the exact layout. Document it in the README.

### Code review checklist

Code review means teammates read each other's changes before they are merged, usually as a GitHub pull request. It spreads knowledge and catches problems early.

- **Does it work?** Run it, including edge cases: empty, loading, error.
- **Is it secure?** Server-side auth checks, validation, no secrets in client code.
- **Is state in the right place?** Local first, derived where possible, no mutation.
- **Is it accessible?** Semantic elements, labels, keyboard use.
- **Is it tested?** New logic has tests; CI is green.
- **Is it readable?** Clear names, small components, no dead code.
- **Be kind:** comment on the code, not the person; suggest, and explain why.

This checklist summarises the whole course: correctness, security from Day 9, state rules from Days 4 and 7, accessibility from Day 8, testing from today, and readability throughout.

Tone matters. Write "Could we derive this instead of storing it? It avoids the two values drifting apart" rather than "This is wrong". Ask questions, and praise good work too. When you receive a review, remember the feedback is about the code. Everyone, including senior developers, gets review comments every day.

### Lighthouse audits and Core Web Vitals

- **Lighthouse** is built into Chrome DevTools. It scores **Performance, Accessibility, Best Practices and SEO**.
- **Run it on the production URL in an incognito window,** so extensions do not distort the results.
- **LCP (Largest Contentful Paint):** how quickly the main content appears. It measures loading.
- **INP (Interaction to Next Paint):** how quickly the page responds to interaction. It measures responsiveness.
- **CLS (Cumulative Layout Shift):** how much the layout jumps while loading. It measures visual stability.
- **Common fixes:** use the `next/image` component, which resizes and lazy-loads images; keep client JavaScript small with Server Components; give images and skeletons fixed sizes so content does not jump.

Core Web Vitals are Google's key user experience measures, and they also influence search rankings.

> **Good to know**
> - Google counts a page as "good" when, for 75% of visits, LCP is 2.5 seconds or less, INP is 200 milliseconds or less, and CLS is 0.1 or less. INP replaced the older First Input Delay (FID) metric in 2024.
> - Recent Lighthouse versions may also list a newer **Agentic Browsing** category. Today, focus on the four classic categories.

> **Try it:** run Lighthouse on your deployed TaskBoard. Aim for 90 or above in Accessibility and Best Practices.

### Your next 90 days

Ten days gave you a foundation and a portfolio project. Here is how to turn that into lasting skill.

| Area | What to do |
|---|---|
| **Build** | Two more projects of your own, from idea to deployment. Reuse this week's stack. Aim for one with a real user. |
| **Deepen** | TypeScript generics, SQL and Postgres, and the React docs' advanced pages. Read one good codebase each week. |
| **Show** | Clean READMEs with screenshots and live links. Pin your best repos on GitHub. Write a short post about what you learned. |
| **Connect** | Join a local or online developer community. Pair with others. Contribute a small fix to an open source project. |

- **Build:** projects teach more than tutorials, so pick things you care about. Remember the whiteboard from Day 1, where you wrote what you wanted to build? That is your first project.
- **Deepen:** TypeScript and SQL skills compound over a career. The React docs' "Escape Hatches" section and the Next.js docs are worth reading end to end.
- **Show:** employers look at GitHub. A clear README with a screenshot, the stack used, a live URL and how to run it locally makes a strong impression.
- **Connect:** communities give you feedback, motivation and job leads.

A good weekly rhythm: three focused coding sessions, one reading session, and one session reviewing someone else's code.

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

Timing is tight today, so Labs 10.1 and 10.2 are focused. The demos in Lab 10.3 start on time regardless of where you are.

### Lab 10.1: Unit and Component Tests for TaskBoard

| | |
|---|---|
| **Goal** | Automated tests protect the behaviour that must never break. |
| **Suggested time** | 50 min |

Focus on meaningful tests, not a high count. Each test should protect something a user or teammate relies on.

#### Steps

1. In `taskboard-next`, install Vitest, Testing Library and jsdom (see [Installing Vitest and React Testing Library](#installing-vitest-and-react-testing-library)), add the `"test": "vitest"` script, and create `vitest.config.mts` and `vitest.setup.ts`.
2. Copy `tasksReducer` into `lib/tasksReducer.ts` and write reducer tests in `lib/tasksReducer.test.ts`: add, move, delete, and no mutation.
3. Write schema tests for valid and invalid tasks, using `taskSchema` from `lib/schemas.ts`.
4. Build `components/PointsStepper.tsx` with accessible buttons, and test it in `components/PointsStepper.test.tsx`.
5. Test `AddTaskForm` with a mocked `addTask` Server Action. Give the title input a label first (for example `aria-label="Title"`).
6. Turn one of your "never break" items into a test.
7. Run `npx vitest run` until everything passes.
8. Commit and push.

#### Done when

- [ ] At least 6 passing tests
- [ ] Tests query by role or label
- [ ] No test depends on another

<details><summary><strong>Hints: expected shape of PointsStepper</strong> (try on your own first)</summary>

**components/PointsStepper.tsx**

```tsx
"use client";

type Props = { value: number; onChange: (next: number) => void };

export function PointsStepper({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Decrease points"
        onClick={() => onChange(value - 1)}>-</button>
      <span>{value} points</span>
      <button type="button" aria-label="Increase points"
        onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
```

</details>

<details><summary><strong>Hints: testing AddTaskForm</strong> (try on your own first)</summary>

After mocking the actions module, render the form, type a title, click **Add**, and wait for the mock to be called. Because `useActionState` passes the previous state first, the mock receives `(prevState, formData)`.

**components/AddTaskForm.test.tsx**

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import { addTask } from "@/app/actions";
import { AddTaskForm } from "./AddTaskForm";

vi.mock("@/app/actions", () => ({
  addTask: vi.fn(async () => ({ error: null })),
}));

it("sends the title to addTask", async () => {
  const user = userEvent.setup();
  render(<AddTaskForm />);
  await user.type(screen.getByLabelText("Title"), "New task");
  await user.click(screen.getByRole("button", { name: "Add" }));
  await waitFor(() => expect(addTask).toHaveBeenCalled());
  const [prevState, formData] = vi.mocked(addTask).mock.calls[0];
  expect(prevState).toEqual({ error: null });
  expect((formData as FormData).get("title")).toBe("New task");
});
```

`getByLabelText("Title")` only works if the title input has a label or `aria-label="Title"`.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `document is not defined` | The environment is not jsdom. Check `environment: "jsdom"` in `vitest.config.mts`. |
| `Cannot find module '@/...'` | `vite-tsconfig-paths` is missing from `plugins`. |
| Tests pass alone but fail together | Mocks are not restored, or state is leaking from a shared object. |
| Async Server Component tests fail | This is expected: Vitest does not support async Server Components. Cover those with Playwright instead. |
| `npm run typecheck` or `npm run build` fails in a test file | The test data is missing a required field of your `Task` type, such as `projectId`. Give it the full shape. |
| npm `ERESOLVE` error mentioning `@types/node` | Install `@types/node@24` in the same command as `vitest`. |

> **Stretch challenge**
> Add coverage: run `npx vitest run --coverage` (install `@vitest/coverage-v8` when prompted). Think about why 100 percent coverage is not the goal.

### Lab 10.2: CI Pipeline and Production Deployment

| | |
|---|---|
| **Goal** | TaskBoard is live on a public URL, and every push is checked automatically. |
| **Suggested time** | 50 min |

By the end of this lab you have a URL you can share with anyone.

#### Steps

1. Add the `lint`, `format`, `format:check`, `typecheck` and `test` scripts (see [Linting, formatting and type checking](#linting-formatting-and-type-checking)), install `prettier` and `eslint-config-prettier`, and fix any issues `npm run lint`, `npm run typecheck` and `npm run format:check` report.
2. Enable the React Compiler (`npm install -D babel-plugin-react-compiler` and `reactCompiler: true` in `next.config.ts`), restart the dev server and confirm the app still works.
3. Create `.github/workflows/ci.yml` and add the `SUPABASE_URL` and `SUPABASE_KEY` repository secrets.
4. Push and get a green CI run in the **Actions** tab.
5. Import the repo into Vercel, add the environment variables, and deploy.
6. In Supabase, set the Site URL and redirect URLs to your Vercel domain, and turn email confirmation back on.
7. Run Lighthouse on the live URL and fix one issue.
8. Add a README with the live link, a screenshot and the stack.

#### Done when

- [ ] Green tick on the latest commit
- [ ] The live URL works for sign-up and tasks
- [ ] The README shows the live link

<details><summary><strong>Hints: running the same checks as CI</strong> (try on your own first)</summary>

Before you push, run the same commands the workflow runs, in the same order. If they pass locally, CI will almost always pass too.

**Windows and macOS: same commands**

```bash
npm ci
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Vercel build fails with type errors | Run `npm run build` locally first and fix the errors there. |
| Deployed app shows "Invalid API key" or cannot connect | The environment variables are missing in Vercel, or were added after deploying without redeploying. |
| Login works locally but not in production | The Supabase URL configuration still points at localhost. |
| CI fails on build but the local build works | The GitHub secrets are missing, or named differently from the workflow. |
| Deployed page shows stale data after changes | Check that your Server Actions call `revalidatePath`. |
| CI type check fails with `Cannot find name 'LayoutProps'` or `'PageProps'` | The `typecheck` script must run `next typegen` before `tsc --noEmit`, because those types are generated and git-ignored. |

> **Stretch challenge**
> - Add a Playwright job to CI using the official GitHub Actions example from [playwright.dev](https://playwright.dev/docs/ci-intro), with `E2E_EMAIL` and `E2E_PASSWORD` secrets. Use `actions/checkout@v7` and `actions/setup-node@v7` with `node-version: 24`, as in `ci.yml`.
> - Protect the `main` branch so CI must pass before merging.

### Lab 10.3: Capstone Demonstrations and Peer Code Review

| | |
|---|---|
| **Goal** | Present your deployed TaskBoard, and give and receive constructive code review. |
| **Suggested time** | 75 min (demos about 45 min, review about 30 min) |

Celebrate progress, not perfection. Every app will have rough edges; that is normal for a first full-stack project. Each demo is strictly three minutes. You can present from your own laptop or share your URL for the projector machine.

#### Steps

1. Prepare a 3-minute demo: sign up, add, move and delete tasks, dark mode, and the mobile view.
2. Mention one technical decision you are proud of.
3. Mention one thing you would improve next.
4. Present to the room from your live URL.
5. Swap repository links with a partner.
6. Open a pull request or issue on your partner's repo with two suggestions and one piece of praise.
7. Respond to the review you received.
8. Update your README with next steps.

After your demo, the trainer may ask you about a decision, for example "Why did you put that state in Zustand rather than Context?" or "How do you know users cannot see each other's tasks?"

#### Done when

- [ ] Your demo ran from the live URL
- [ ] You gave and received a review
- [ ] You have a written list of next improvements

<details><summary><strong>Hints: writing a good review</strong> (try on your own first)</summary>

Use the [code review checklist](#code-review-checklist) from Module 10.4. Open one recent file in your partner's repository. Suggestions should be specific and kind, for example "This filter could be derived during render instead of stored in state." Praise should also be specific.

</details>

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. Why does a child re-render when its parent re-renders, and how can you avoid it?
2. What does the React Compiler do?
3. Which Testing Library query should you prefer, and why?
4. What is the difference between a component test and an end-to-end test?
5. What must you update in Supabase after deploying to Vercel?
6. Across the course: where should validation happen in TaskBoard?

---

## Key takeaways

### What you learned

**Today**

- Measure before you optimise: fix unnecessary renders with state placement, children, memoisation or the React Compiler, and ship less JavaScript with code splitting and Server Components.
- The testing pyramid: many unit tests, some component tests, a few end-to-end tests, run with Vitest, React Testing Library and Playwright.
- Scripts, CI and branch protection make every change prove itself before it reaches `main`.
- Vercel deploys every push; Supabase must know your production URL; only `NEXT_PUBLIC_` variables reach the browser.

**Across the course**

- Days 1 to 2: web fundamentals, tooling and modern JavaScript
- Days 3 to 5: components, props, state, effects and custom Hooks
- Days 6 to 8: TypeScript, routing, state libraries, Tailwind, forms and React 19
- Day 9: full-stack Next.js with Supabase auth and a secured database
- Day 10: performance, tests, CI/CD and a live deployment
- You built, tested and shipped TaskBoard

The most important habits to keep: type the code yourself, read error messages calmly, keep state simple and immutable, validate on the server, test what matters, and ship often.

### Take-home practice

> Within the next week: pick your Day 1 project idea, write a one-paragraph plan, create the repo, and deploy a first page. Then keep a 30-day log of what you build and learn.

### Looking ahead

Ten days ago, many of you had never opened a terminal. Today you have a deployed, tested, secure, full-stack React application in your GitHub account. That is a genuine achievement.

Your practice from here: start your own project this week, from the Day 1 whiteboard. A first deployed page within seven days builds momentum. Keep a short daily log; it becomes great material for interviews. Use the reference links below, together with those from Days 1 to 9, as your library for continuing on your own.

Thank you for your effort and energy this week. Keep building.

---

## Further reading

These official resources cover today's topics in more depth. They are the best place to look up details after the course.

| Resource | Link |
|---|---|
| React: Performance with memo | https://react.dev/reference/react/memo |
| React Compiler | https://react.dev/learn/react-compiler |
| Next.js: Testing with Vitest | https://nextjs.org/docs/app/guides/testing/vitest |
| Testing Library: Queries priority | https://testing-library.com/docs/queries/about/#priority |
| Playwright: Getting started | https://playwright.dev/docs/intro |
| GitHub Actions: Node.js | https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs |
| Vercel: Deploying Next.js | https://vercel.com/docs/frameworks/full-stack/nextjs |
| web.dev: Core Web Vitals | https://web.dev/articles/vitals |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Morning recap

1. The `/settings` route.
2. It keeps most components on the server, so less JavaScript is sent to the browser.
3. It tells Next.js to re-render that path with fresh data.
4. `getClaims()` verifies the signature of the session token (the JWT), so a tampered cookie cannot fake a user. `getSession()` on its own does not verify the token.
5. It returns no rows (and writes are rejected), without a crash.

### Knowledge check

1. React re-renders the whole subtree by default. Move state down, pass components as children, or memoise (or let the React Compiler do it).
2. It automatically memoises components and values at build time, based on the Rules of React.
3. `getByRole`, because it finds elements the way users and assistive technology do, which encourages accessible markup.
4. A component test renders one component in jsdom with mocked dependencies; an end-to-end test drives the real app in a real browser.
5. The Site URL and redirect URLs in the Auth URL configuration.
6. In three layers: the form (Zod with React Hook Form, or native attributes), the Server Action (Zod again), and the database (check constraints and RLS). That summarises the whole security story of the course.

---

## My notes

&nbsp;
