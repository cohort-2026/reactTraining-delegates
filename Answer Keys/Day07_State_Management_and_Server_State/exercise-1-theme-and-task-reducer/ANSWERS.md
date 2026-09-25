# Answer key · Day 7 · Exercise 1: Theme context and task reducer

**Level:** warm-up · **Bugs:** 3 · **Self-check:** `npm test -- --run` (4 tests) and `npm run typecheck`

The corrected project is in `fixed/`. It is identical to the exercise except for the three fixes below.

Verified: on the broken code all 4 tests fail (the first error hides the others) and `npm run typecheck` reports one error. Fixing bug 1 leaves 2 failing tests; fixing bug 2 leaves 1; fixing bug 3 makes all 4 pass, with `npm run typecheck`, `npm run lint` and `npm run build` clean.

## Bugs

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/App.tsx`, lines 8–13 | Blank page. Console and every test: `Error: useTheme must be inside ThemeProvider`. | `<Header />` (which renders `ThemeButton`, which calls `useTheme`) is rendered *outside* `<ThemeProvider>`, so `useContext` returns the default `null` and the custom Hook throws. | A context consumer must be below its provider. Module 7.1 *Creating and providing context*, *Consuming context with a custom Hook*; Lab 7.1 Troubleshooting ("`useTheme` throws"). |
| 2 | `src/state/tasksReducer.ts`, lines 12–16 | Clicking **Done** does nothing. The card only jumps to Done when something else re-renders (for example typing in **New task**). Test "moves a task to the Done column" fails: the task is still in To do. | The `moved` case finds the task, mutates `task.status` and returns the **same** array. React compares with `Object.is`, sees no change and skips the re-render. | Reducers must be pure and return new state; use `map` to change an item. Module 7.2 *A reducer function*; Day 4 immutable updates. |
| 3 | `src/components/TaskCard.tsx`, line 26 | `npm run typecheck`: `TS2820: Type '"delete"' is not assignable to type '"added" \| "moved" \| "deleted"'. Did you mean '"deleted"'?` In the browser (Vite does not type-check) clicking **Delete** crashes the app: `TypeError: Cannot read properties of undefined (reading 'filter')`. | The action type is misspelt. No `case` matches, so the reducer returns `undefined`, and `tasks.filter` in `Board` crashes. | Discriminated union action types; event-style names in the past tense. Module 7.2 *A reducer function* ("a typo in a type name is an error"). |

## Fixes

### Bug 1: render the consumer inside the provider

**Before** (`src/App.tsx`)

```tsx
return (
  <>
    <Header />
    <ThemeProvider>
      <main>
        <Board />
      </main>
    </ThemeProvider>
  </>
);
```

**After**

```tsx
return (
  <ThemeProvider>
    <Header />
    <main>
      <Board />
    </main>
  </ThemeProvider>
);
```

### Bug 2: return a new array from the `moved` case

**Before** (`src/state/tasksReducer.ts`)

```ts
case "moved": {
  const task = tasks.find((t) => t.id === action.id);
  if (task) task.status = action.status;
  return tasks;
}
```

**After**

```ts
case "moved":
  return tasks.map((t) =>
    t.id === action.id ? { ...t, status: action.status } : t,
  );
```

### Bug 3: use the action type the union declares

**Before** (`src/components/TaskCard.tsx`)

```tsx
onClick={() => dispatch({ type: "delete", id: task.id })}
```

**After**

```tsx
onClick={() => dispatch({ type: "deleted", id: task.id })}
```

## Debrief suggestions

- Ask who read the error message in bug 1 before looking at the code. The custom Hook's `throw` turned a silent `null` into a precise message: that is the reason the handbook wraps `useContext` in a Hook.
- Bug 2 is the Day 4 mutation bug in a new place. Ask why the card moves when you type: any re-render reads the (mutated) array again. Point out that this also corrupts `initialTasks`, the module-level constant, which a test or a second mount would then see.
- Bug 3: Vite serves code with type errors, so the browser only shows a crash. Encourage delegates to keep `npm run typecheck` (or the editor's red squiggles) in their loop, and to notice how the union made TypeScript suggest the correct name.
