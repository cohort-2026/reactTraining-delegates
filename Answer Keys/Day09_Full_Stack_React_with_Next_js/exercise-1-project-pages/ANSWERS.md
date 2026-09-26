# Answers: Exercise 9.1 (warm-up), Project pages

Exercise folder: `Exercises/Day09_Full_Stack_React_with_Next_js/exercise-1-project-pages/`
Corrected project: `fixed/` (identical to the exercise apart from the three fixes below).

Next.js 16.3.5, React 19.2, TypeScript 5. Checked with `npm run build`, `npm run lint`, `npm run typecheck`, and by clicking through every URL with `next dev` and `next start`.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Fix | Concept and handbook section |
|---|---|---|---|---|---|
| 1 | `components/PointsStepper.tsx`, line 2 | `npm run build` fails with *The "use client" directive must be placed before other expressions. Move it to the top of the file to resolve this issue.*, plus *You're importing a module that depends on `useState` into a React Server Component module*. `npm run dev` shows the same error overlay on project pages. ESLint also warns *Expected an assignment or function call* on line 2. | The directive is below the `import`. A directive only counts as the **first** statement in the file, so the component is treated as a Server Component even though it uses `useState` and `onClick`. | Before: `import { useState } from "react";` then `"use client";`. After: `"use client";` on line 1, then the import. | The "use client" boundary must be the first line. Module 9.2, *The "use client" boundary*. |
| 2 | `app/projects/[projectId]/page.tsx`, lines 6, 10 and 12 | Every project page, even `/projects/website`, shows **Project not found**. The `next dev` terminal prints: *Route "/projects/[projectId]" used `params.projectId`. `params` is a Promise and must be unwrapped with `await` or `React.use()`*. `next build` and `tsc` do **not** catch it, because the props type was also written the old way. | Old-tutorial code. In Next.js 16, `params` is a Promise, so `params.projectId` is `undefined`, `getProject(undefined)` finds nothing, and `notFound()` runs. | Before: `params: { projectId: string };` and `getProject(params.projectId)` / `getTasks(params.projectId)`. After: `params: Promise<{ projectId: string }>;`, then `const { projectId } = await params;` and use `projectId` in both calls. | Async `params` in dynamic routes. Module 9.1, *Dynamic routes and params* (Troubleshooting box). |
| 3 | `app/error.tsx`, line 1 | `npm run build` fails with *app/error.tsx must be a Client Component. Add the "use client" directive the top of the file*, plus *You're importing a module that depends on `useEffect` into a React Server Component module*. In `next dev` it shows as a build error overlay on every page, because the root `error.tsx` wraps every route. | `"use client"` is missing. `error.tsx` must be a Client Component: it uses an effect and an `onClick`, and React error boundaries only exist on the client. | Add `"use client";` as line 1. | Error boundaries are Client Components. Module 9.4, *Error boundaries with error.tsx*. |

## The fixes in full

### Bug 1: `components/PointsStepper.tsx`

```tsx
// Before
import { useState } from "react";
"use client";

// After
"use client";
import { useState } from "react";
```

### Bug 2: `app/projects/[projectId]/page.tsx`

```tsx
// Before
type Props = {
  params: { projectId: string };
};

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.projectId);
  if (!project) notFound();
  const tasks = await getTasks(params.projectId);

// After
type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  if (!project) notFound();
  const tasks = await getTasks(projectId);
```

### Bug 3: `app/error.tsx`

```tsx
// Before
import { useEffect } from "react";

// After
"use client";
import { useEffect } from "react";
```

## Order the delegate meets the bugs

1. The first `npm run build` reports bugs 1 and 3 together, as four compile errors (two messages for each bug).
2. After those are fixed, the build passes, which surprises people. Bug 2 only shows in the browser (**Project not found** everywhere) and in the `next dev` terminal.

Point this out in the debrief. A green build does not prove the app works.

## Expected results after fixing

- `npm run build` lists `/` as static (○) and `/projects/[projectId]` as dynamic (ƒ).
- `/projects/archive` shows the error boundary. The terminal logs `Error: The archive service is offline` on purpose, and in the browser console React logs the same error from the `useEffect`.

## Debrief suggestions (10 minutes)

- Ask: "Why did the build not catch the `params` mistake?" Because the type said `params` was a plain object, TypeScript believed it. Types only protect you when they describe reality. Show that typing `params` as a `Promise` (or using the generated `PageProps<"/projects/[projectId]">` helper) turns the mistake into a type error.
- Ask: "Where exactly must `"use client"` go, and what does it mark?" The first line; it marks the file and everything it imports as client code.
- Ask: "Why must `error.tsx` be a Client Component when the page it catches is a Server Component?" Error boundaries and `retry` run in the browser.
- Link back to the Lab 9.1 *Done when* item: "Only interactive files have `"use client"`". The fix is not to put the directive on `TaskCard` or the page.
