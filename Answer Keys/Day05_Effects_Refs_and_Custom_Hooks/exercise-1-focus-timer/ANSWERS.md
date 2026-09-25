# Answers: Day 5, Exercise 1 (warm-up): Focus Timer

Exercise folder: `Exercises/Day05_Effects_Refs_and_Custom_Hooks/exercise-1-focus-timer/`
Corrected project: `fixed/` (run `npm install`, then `npm run dev`, `npm test -- --run`, `npm run lint`).

The exercise has **3 bugs**, all in `src/components/FocusTimer.jsx`. Line numbers refer to the broken file.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `FocusTimer.jsx`, lines 15–17 | The task box is not focused when the page opens. Once the timer runs, focus jumps back to the task box every second (click **Start**, and the cursor leaves the button). Test "puts the cursor in the task box when it first appears" fails. `npm run lint`: `Cannot access refs during render` (`react-hooks/refs`, three errors) | The ref is read and used in the component body during rendering. On the first render `taskInputRef.current` is still `null` (the input does not exist yet), so the `if` skips it. On every later render it calls `focus()` again | Refs hold DOM elements only after React has created them; use them in effects or event handlers, never while rendering. Module 5.3 "Refs for DOM elements and stored values" and the callout "Do not touch `.current` while rendering" |
| 2 | `FocusTimer.jsx`, lines 21–23 (interval effect) | **Pause** and **Reset** do not stop the countdown. Clicking **Start** again makes it run at double speed (two seconds per second), then triple speed, and so on. Tests "stops counting when Pause is clicked", "carries on at normal speed…" and "stops and goes back to the full time on Reset" fail. ESLint reports nothing | The effect starts an interval but never returns a cleanup function, so when `isRunning` changes the old interval keeps running and a new one is added | Cleanup functions: if an effect starts something, it must stop it. Module 5.1 "Cleanup functions" (Try it with `Clock`) |
| 3 | `FocusTimer.jsx`, line 28 (title effect) | The tab title stays at `25:00 - Focus Timer` while the timer counts down. Test "shows the time left in the browser tab title" fails (`expected '01:00 - Focus Timer' to be '00:56 - Focus Timer'`). `npm run lint`: `React Hook useEffect has a missing dependency: 'secondsLeft'` (`react-hooks/exhaustive-deps`, warning) | The dependency array is empty, so the effect runs only after the first render, even though it reads `secondsLeft` | The dependency array must list every value the effect reads. Module 5.1 "Your first effect" (Check your understanding) and "The dependency array controls when effects run" |

Each bug maps to its own tests: with only one bug left, only that bug's tests fail.

## Fixes

**Bug 1: ref used during render**

```jsx
// Before
const taskInputRef = useRef(null);

if (taskInputRef.current) {
  taskInputRef.current.focus();
}

// After
const taskInputRef = useRef(null);

useEffect(() => {
  taskInputRef.current.focus();
}, []);
```

**Bug 2: interval without cleanup**

```jsx
// Before
useEffect(() => {
  if (!isRunning) return;
  setInterval(() => {
    setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
  }, 1000);
}, [isRunning]);

// After
useEffect(() => {
  if (!isRunning) return;
  const id = setInterval(() => {
    setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
  }, 1000);
  return () => clearInterval(id);
}, [isRunning]);
```

**Bug 3: missing dependency**

```jsx
// Before
useEffect(() => {
  document.title = `${formatTime(secondsLeft)} - Focus Timer`;
}, []);

// After
useEffect(() => {
  document.title = `${formatTime(secondsLeft)} - Focus Timer`;
}, [secondsLeft]);
```

## Debrief suggestion (5 minutes)

- Bug 2 is the key one. Add `console.log("tick")` inside the interval, click Start, Pause, Start and show the logs doubling. Then walk through the order React follows when `isRunning` changes: run the old effect's cleanup, then run the new effect. Without a cleanup there is nothing to stop the old interval. Note that ESLint cannot catch this one.
- Ask why the interval uses the updater form `setSecondsLeft((s) => ...)`. With `setSecondsLeft(secondsLeft - 1)` the interval would keep seeing the snapshot from when it started (Day 4) and the display would stick at `24:59`.
- For bug 1, ask: "during the first render, does the input exist yet?" The `if` guard *hides* the crash but does not fix the timing. Point out the extra symptom (focus stolen every second): code that runs during render runs on *every* render.
- For bug 3, remind delegates that `exhaustive-deps` is a warning, not an error, so it is easy to ignore. Treat it as an error.
