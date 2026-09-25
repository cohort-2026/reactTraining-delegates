# Answer key · Day 8 · Exercise 2: Quick add with Actions and optimistic updates

**Level:** harder · **Bugs:** 5 · **Self-check:** `npm test -- --run` (4 tests) and `npm run typecheck`

The corrected project is in `fixed/`. It is identical to the exercise except for the five fixes below. Bugs 3, 4 and 5 live in the same function, so the complete corrected action is shown after the table.

Verified: on the broken code all 4 tests fail (`TypeError: formData.get is not a function`, reported as an unhandled error) and `npm run typecheck` reports two errors. Fixing the bugs in table order leaves 4, 3, 2, 1 and then 0 failing tests. The fixed project passes `npm test -- --run` with no React warnings, `npm run typecheck`, `npm run lint` and `npm run build`.

## Bugs

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/components/QuickAddForm.tsx`, line 18 | Pressing **Add** blanks the page. Console and tests: `TypeError: formData.get is not a function`, preceded by `An error occurred in the <QuickAddForm> component`. `npm run typecheck`: `TS2769: No overload matches this call` on `useActionState` (line 33). | The action is written as a plain form action, `(formData)`. With `useActionState`, React calls it with `(previousState, formData)`, so `formData` is really the state object `{ error: null }`. | An action used with `useActionState` receives the previous state and the `FormData`. Module 8.4 *Form actions with useActionState*; Day 8 knowledge check question 4. |
| 2 | `src/components/QuickAddForm.tsx`, line 21 | Once bug 1 is fixed, a short title blanks the page: `TypeError: Cannot read properties of undefined (reading '0')`. `npm run typecheck`: `TS2339: Property 'errors' does not exist on type 'ZodError<string>'`. Test "shows the schema message when the title is too short" fails. | Zod 3 habit: `result.error.errors`. Zod 4's `ZodError` exposes the list as `issues`; `errors` is `undefined`. | Zod 4 API (`error.issues`). Module 8.3 Zod 4 note; Lab 8.3 hint "`result.error.issues[0].message`". |
| 3 | `src/components/QuickAddForm.tsx`, lines 2 and 16, line 46; `src/components/SubmitButton.tsx`, line 1 | While saving, the button still reads **Add** and stays enabled, so it can be clicked again. Test "disables the button and shows Adding...": `Unable to find an accessible element with the role "button" and name "Adding..."`. | `useFormStatus()` is called in `QuickAddForm`, the component that *renders* the `<form>`, so there is no parent form and `pending` is always `false`. It is then passed down as a prop. | `useFormStatus` must be called in a component rendered inside the form. Module 8.4 *useFormStatus and useOptimistic*; Lab 8.3 Troubleshooting ("`useFormStatus` is always `false`"). |
| 4 | `src/components/QuickAddForm.tsx`, lines 25–28 | No instant feedback: the task appears only after 300 ms, never faded and never "(saving...)". Test "shows the new task straight away": `Unable to find an element with the text: Write tests`. | `onOptimisticAdd` (the `useOptimistic` setter) is called *after* `await createTask(...)`, when the real result is already known, so the optimistic state is never visible. | Add the optimistic item inside the action, before the request. Module 8.4 *useFormStatus and useOptimistic*; Lab 8.3 step 5. |
| 5 | `src/components/QuickAddForm.tsx`, lines 25–30 (no `try`/`catch`) | With **Simulate the server being offline** ticked, **Add** blanks the whole page; console: `Uncaught Error: Network request failed`. No error message is shown. Test "removes the temporary task and shows an error when the save fails": `Unable to find role="alert"`. | `createTask` rejects and nothing catches it. An error thrown from an action goes to the nearest error boundary, and there is none, so React unmounts the app. | Catch request errors inside the action and return an error state. Module 8.4 *Form actions with useActionState* Troubleshooting; Lab 8.3 step 6 and Troubleshooting. |

## Fixes

### Bug 1: accept the previous state first

**Before**

```tsx
async function addTaskAction(formData: FormData): Promise<State> {
```

**After**

```tsx
async function addTaskAction(_prev: State, formData: FormData): Promise<State> {
```

The underscore tells readers (and the linter) that the parameter is deliberately unused.

### Bug 2: read `issues`, not `errors`

**Before**

```tsx
return { error: result.error.errors[0].message };
```

**After**

```tsx
return { error: result.error.issues[0].message };
```

### Bug 3: call `useFormStatus` inside the form

**Before** (`src/components/SubmitButton.tsx`)

```tsx
export function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending} ...>
```

and in `QuickAddForm.tsx`: `import { useFormStatus } from "react-dom";`, `const { pending } = useFormStatus();` and `<SubmitButton pending={pending} />`.

**After** (`src/components/SubmitButton.tsx`)

```tsx
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} ...>
```

and in `QuickAddForm.tsx`: remove the `useFormStatus` import and call, and render `<SubmitButton />`.

### Bugs 4 and 5: optimistic item first, request inside `try`/`catch`

**Before** (body of `addTaskAction` after validation)

```tsx
const clientId = crypto.randomUUID();
const saved = await createTask({ clientId, title: result.data, status: "todo", points: 1 });
onOptimisticAdd({
  id: clientId, clientId, title: result.data, status: "todo", points: 1, pending: true,
});
onSaved(saved);
return { error: null };
```

**After**

```tsx
const clientId = crypto.randomUUID();
onOptimisticAdd({
  id: clientId, clientId, title: result.data, status: "todo", points: 1, pending: true,
});

try {
  const saved = await createTask({ clientId, title: result.data, status: "todo", points: 1 });
  onSaved(saved);
  return { error: null };
} catch {
  return { error: "Could not save the task. Try again." };
}
```

### The complete corrected action

```tsx
async function addTaskAction(_prev: State, formData: FormData): Promise<State> {
  const result = taskSchema.shape.title.safeParse(formData.get("title") ?? "");
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const clientId = crypto.randomUUID();
  onOptimisticAdd({
    id: clientId, clientId, title: result.data, status: "todo", points: 1, pending: true,
  });

  try {
    const saved = await createTask({ clientId, title: result.data, status: "todo", points: 1 });
    onSaved(saved);
    return { error: null };
  } catch {
    return { error: "Could not save the task. Try again." };
  }
}
```

## Debrief suggestions

- Bugs 1 and 2 both came from older sources (React 18 `<form action>` examples without `useActionState`, and Zod 3). Both are caught instantly by `npm run typecheck`, yet Vite happily serves the code. Ask who ran the type checker first.
- Bug 3: draw the tree on the whiteboard (`QuickAddForm` → `<form>` → `SubmitButton`) and point out where the Hook has to sit. The prop-passing version *looks* reasonable, which is why this bug is so common.
- Bug 4: slow the pretend API to 3 seconds in `src/api/tasks.ts` and compare the broken and fixed versions side by side. Also point out that the temporary item disappears on failure *without any rollback code*: `useOptimistic` drops it when the action ends.
- Bug 5: mention that a thrown error inside an action is treated like a rendering error. A global error boundary is still worth having, but expected failures such as "server offline" belong in the returned state.
- Extension question: why does the optimistic update function check `clientId`? (So the temporary copy is not shown twice once `onSaved` has added the real task, which matches the Lab 8.3 Troubleshooting entry.)
