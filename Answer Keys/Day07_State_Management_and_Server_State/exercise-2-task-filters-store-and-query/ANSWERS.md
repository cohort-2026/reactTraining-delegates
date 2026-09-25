# Answer key · Day 7 · Exercise 2: Task filters with Zustand and TanStack Query

**Level:** harder · **Bugs:** 5 · **Self-check:** `npm test -- --run` (5 tests, API mocked with MSW) and `npm run typecheck`

The corrected project is in `fixed/`. It is identical to the exercise except for the five fixes below.

Verified: on the broken code all 5 tests fail with `Maximum update depth exceeded`, and `npm run typecheck` reports one error. Fixing the bugs in table order leaves 4, 3, 2, 1 and then 0 failing tests. The fixed project passes `npm test -- --run`, `npm run typecheck`, `npm run lint` and `npm run build`, and runs against `npm run api` (json-server 1).

## Bugs

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/components/FilterBar.tsx`, lines 5–8 | Blank page. Console: `The result of getSnapshot should be cached to avoid an infinite loop` and `Maximum update depth exceeded`. Every test fails with the same error. | The selector builds a **new object** on every call. Zustand 5 compares selector results by reference, so the snapshot always looks changed and React re-renders forever. | Select stable values one at a time (or use `useShallow`). Module 7.3 *Using the store with selectors* and its Troubleshooting table. |
| 2 | `src/hooks/useTasks.ts`, line 8 | Choosing **Done** in **Show** still lists all three tasks; no new request appears in the Network tab. Test "shows only the tasks that match the chosen status": `expected [...] to have a length of 1 but got 3`. | The query key is `["tasks"]` for every filter. The key does not change, so TanStack Query keeps serving the cached "all tasks" data (it is fresh for 30 s) and never runs the new `queryFn`. | The key must include every value the query depends on. Module 7.4 *Reading data with useQuery*; Take-home practice (`["tasks", { projectId }]`). |
| 3 | `src/hooks/useAddTask.ts`, line 9 | After **Add**, the `POST` succeeds but the list does not update until a refresh (or 30 s later on window focus). Test "adds a task and shows it in the list" cannot find `Review pull request`. | `invalidateQueries({ queryKey: ["task"] })` has a typo. Invalidation matches by prefix, and `["task"]` is not a prefix of `["tasks", { status }]`, so nothing is invalidated. | Invalidation keys and prefix matching. Module 7.4 *Changing data with useMutation*; Lab 7.3 Troubleshooting ("The UI does not update after a mutation"). |
| 4 | `src/api/tasks.ts`, lines 17–23 (`createTask`) | When the server replies `500`, no error message appears; the mutation counts as a success. Test "shows an error message when the server cannot save the task": `Unable to find role="alert"`. (With json-server fully stopped, `fetch` rejects, so the error does show; that is why this bug hides in manual testing.) | `createTask` never checks `res.ok`, so an HTTP error response is parsed as if it were the saved task and the `mutationFn` never throws. | `fetch` does not reject on HTTP errors; check `res.ok` and throw. Module 7.4 *Changing data with useMutation*; Lab 7.3 Troubleshooting ("A failed save does not show an error"). |
| 5 | `src/components/AddTaskForm.tsx`, line 26 | `npm run typecheck`: `TS2339: Property 'isLoading' does not exist on type 'UseMutationResult<Task, Error, NewTask, unknown>'`. In the browser the button never disables, so double clicks create duplicates. Test "disables the Add button while the task is saving" fails at `toBeDisabled()`. | TanStack Query v4 name. In v5 the flag is `isPending`; mutations have no `isLoading`, so the value is `undefined`. | v5 API: `isPending`. Module 7.4 *Changing data with useMutation* ("`isPending` drives the button"). |

## Fixes

### Bug 1: select stable values

**Before** (`src/components/FilterBar.tsx`)

```tsx
const { status, setStatus } = useFilterStore((s) => ({
  status: s.status,
  setStatus: s.setStatus,
}));
```

**After**

```tsx
const status = useFilterStore((s) => s.status);
const setStatus = useFilterStore((s) => s.setStatus);
```

Also acceptable: `useFilterStore(useShallow((s) => ({ status: s.status, setStatus: s.setStatus })))` with `import { useShallow } from "zustand/react/shallow"`.

### Bug 2: put the filter in the query key

**Before** (`src/hooks/useTasks.ts`)

```ts
queryKey: ["tasks"],
queryFn: () => fetchTasks(status),
```

**After**

```ts
queryKey: ["tasks", { status }],
queryFn: () => fetchTasks(status),
```

### Bug 3: invalidate with a matching prefix

**Before** (`src/hooks/useAddTask.ts`)

```ts
queryClient.invalidateQueries({ queryKey: ["task"] });
```

**After**

```ts
queryClient.invalidateQueries({ queryKey: ["tasks"] });
```

### Bug 4: throw on HTTP errors

**Before** (`src/api/tasks.ts`)

```ts
const res = await fetch(`${API}/tasks`, { method: "POST", headers, body: JSON.stringify(task) });
return res.json();
```

**After**

```ts
const res = await fetch(`${API}/tasks`, { method: "POST", headers, body: JSON.stringify(task) });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return res.json();
```

### Bug 5: use the v5 pending flag

**Before** (`src/components/AddTaskForm.tsx`)

```tsx
<button type="submit" disabled={addTask.isLoading}>
```

**After**

```tsx
<button type="submit" disabled={addTask.isPending}>
```

## Debrief suggestions

- Bugs 2 and 3 work together: once the key becomes `["tasks", { status }]`, ask the group why invalidating plain `["tasks"]` is *better* than listing every filter. That is prefix matching doing its job.
- Open the TanStack Query devtools (or add them) to show bug 2: one cache entry, whatever the filter.
- Bug 4 is a good moment to ask "how did you test the failure case?" Stopping json-server gives a network error, which already throws; only an HTTP error status reveals the missing `res.ok` check. The MSW handler in `src/test/server.ts` shows how tests can simulate that cheaply.
- Bug 5: many tutorials and AI suggestions still use v4 names (`isLoading`, `cacheTime`). The type checker catches them instantly.
