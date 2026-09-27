# Answers: Exercise 10.1 (warm-up), Board performance

Exercise folder: `Exercises/Day10_Performance_Testing_and_Deployment/exercise-1-board-performance/`
Corrected project: `fixed/` (identical to the exercise apart from the three fixes below).

React 19.3, Vite 8, Vitest 5, React Testing Library 16, ESLint 10 with `eslint-plugin-react-hooks` 7. Checked with `npm test -- --run`, `npm run lint`, `npm run typecheck`, and in the browser with `npm run dev`.

The re-render test uses `vi.mock("../format", { spy: true })` to count calls to `formatPoints`. `TaskCard` calls it once per render, so the call count is the number of card renders.

## Bug table

All three bugs are in `src/components/Board.tsx`.

| # | File and line | Symptom the delegate sees | Root cause | Fix | Concept and handbook section |
|---|---|---|---|---|---|
| 1 | `Board.tsx`, lines 20–22 | Clicking **Done** (or any filter) changes nothing: all 4 cards stay visible. Test *shows only the tasks that match the chosen filter* fails: *expected [ …(4) ] to have a length of 1 but got 4*. ESLint warns: *React Hook useMemo has a missing dependency: 'filter'*. | `filter` is read inside `useMemo` but missing from the dependency array, so the cached list is only recalculated when `tasks` changes. | Before: `[tasks]`. After: `[tasks, filter]`. | Dependency arrays must list every value the calculation reads. Module 10.1, *memo, useMemo and useCallback* ("dependency arrays that can go stale"); Day 5, Module 5.1, *The dependency array controls when effects run*. |
| 2 | `Board.tsx`, lines 24–26 | Moving one task works, but moving a second task puts the first one back to its old status. Newly added tasks also vanish on the next move. Test *keeps every status change when several tasks are moved* fails: *Expected the element to have value: done, Received: todo*. ESLint warns: *React Hook useCallback has a missing dependency: 'tasks'*. | `useCallback(…, [])` keeps the function from the first render forever, and that function reads the first render's `tasks`. Each move rebuilds the list from the original tasks. | Recommended: use an updater and keep `[]`, so the function stays stable for `memo`: `setTasks((prev) => prev.map(…))`. Also accepted: add `tasks` to the dependency array. The tests pass either way, but the callback then changes after every move. | Stale closures; updater functions. Module 10.1, *memo, useMemo and useCallback*; Day 4, Module 4.1, *State is a snapshot: use updater functions*. |
| 3 | `Board.tsx`, line 62 | Every card re-renders on each keystroke in **New task title**. You can see it with DevTools *Highlight updates* or in the Profiler. Test *does not re-render the task cards while you type a new task title* fails: *expected "vi.fn()" to not be called at all, but actually been called 24 times*, which is 6 keystrokes × 4 cards. No lint warning. | `statusLabels={{ … }}` creates a new object on every render of `Board`. `memo` compares props by reference, so `TaskCard`'s props are never equal and `memo` never skips. | Move the object out of the component: `const statusLabels = { todo: "To do", doing: "In progress", done: "Done" };` at module level, then `statusLabels={statusLabels}`. A `useMemo` with `[]` also works, but a constant is simpler. | `memo` needs stable props. Module 10.1, *memo, useMemo and useCallback* (the *Check your understanding* question about `style={{ color: "red" }}`). |

## The fixes in full

```tsx
// Before
const filters: { value: Filter; label: string }[] = [ /* ... */ ];

export function Board({ initialTasks }: { initialTasks: Task[] }) {
  // ...
  const visible = useMemo(
    () => tasks.filter((t) => filter === "all" || t.status === filter),
    [tasks]);

  const handleMove = useCallback((id: string, status: Status) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);
  // ...
        <TaskCard
          key={t.id}
          task={t}
          statusLabels={{ todo: "To do", doing: "In progress", done: "Done" }}
          onMove={handleMove}
        />

// After
const filters: { value: Filter; label: string }[] = [ /* ... */ ];

const statusLabels = { todo: "To do", doing: "In progress", done: "Done" };

export function Board({ initialTasks }: { initialTasks: Task[] }) {
  // ...
  const visible = useMemo(
    () => tasks.filter((t) => filter === "all" || t.status === filter),
    [tasks, filter]);

  const handleMove = useCallback((id: string, status: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }, []);
  // ...
        <TaskCard
          key={t.id}
          task={t}
          statusLabels={statusLabels}
          onMove={handleMove}
        />
```

## Notes for the trainer

- Bugs 1 and 2 are flagged by `react-hooks/exhaustive-deps` as warnings. `npm run lint` still exits successfully, which is a good moment to ask whether CI should fail on warnings (`eslint . --max-warnings 0`).
- Bug 3 is the one lint cannot see. It needs measurement: the Profiler, *Highlight updates*, or a test like the one provided.
- If a delegate "fixes" bug 3 by removing `memo`, the test still fails. If they fix bug 2 by adding `tasks` to the dependencies, all tests pass. Discuss why the updater version is better for a memoised child: the function reference never changes.
- The React Compiler (Module 10.1) would memoise all of this automatically, and it would not have written these bugs. That is the "better way" the handbook mentions.

## Debrief suggestions (10 minutes)

- Ask: "Which of the three bugs made the app **wrong**, and which only made it **slow**?" Bugs 1 and 2 are correctness bugs caused by memoisation. Bug 3 is a wasted optimisation. Memoisation has costs, so measure before adding it.
- Show the Profiler on the broken and fixed versions while typing. The fixed version shows the cards as "did not render".
- Link to Day 4: the updater form `setTasks((prev) => …)` removes the need for `tasks` in the dependency list.
