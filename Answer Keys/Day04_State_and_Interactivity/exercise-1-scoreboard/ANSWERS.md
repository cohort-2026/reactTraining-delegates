# Answers: Day 4, Exercise 1 (warm-up): Scoreboard

Exercise folder: `Exercises/Day04_State_and_Interactivity/exercise-1-scoreboard/`
Corrected project: `fixed/` (run `npm install`, then `npm run dev`, `npm test -- --run`, `npm run lint`).

The exercise has **3 bugs**, all in `src/components/TeamScore.jsx`. Line numbers refer to the broken file.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `TeamScore.jsx`, line 41 (Reset button) | Blank page. Console: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` All 7 tests fail with the same error. `npm run lint`: `Cannot call setState during render` (`react-hooks/set-state-in-render`) | `onClick={handleReset()}` calls `handleReset` while rendering. It sets state, which triggers another render, which calls it again, forever | Pass the function, do not call it; Module 4.2 "Event handlers" (callout "The most common event bug"), Lab 4.1 Troubleshooting |
| 2 | `TeamScore.jsx`, line 8 (`addPoint`) | **+1** works, but **+3** only adds one point (`Score: 1` instead of `Score: 3`). Test "adds three points with +3" fails | `setScore(score + 1)` uses the `score` snapshot of the current render. The three calls inside one click all calculate `0 + 1` | State is a snapshot; use an updater function when the next value depends on the previous one; Module 4.1 "State is a snapshot: use updater functions", Lab 4.1 Troubleshooting ("Plus 5 only adds 1") |
| 3 | `TeamScore.jsx`, line 34 (team name input) | You cannot type in the Team name box and the heading never changes. Console: `You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field.` Test "shows the typed team name as the heading" fails. `npm run lint`: `'setTeamName' is assigned a value but never used` | The input has `value={teamName}` but no `onChange`, so state never changes and React keeps resetting the field to `""` | Controlled inputs need `value` **and** `onChange`; Module 4.3 "Controlled inputs" (Troubleshooting: "You cannot type in the input") |

Bug 1 hides the other two: until it is fixed nothing renders, so every test fails with the same error. Once it is fixed, exactly two tests fail, one for each remaining bug.

## Fixes

**Bug 1: handler called during render**

```jsx
// Before
<button onClick={handleReset()}>Reset</button>

// After
<button onClick={handleReset}>Reset</button>
```

`onClick={() => handleReset()}` is also correct.

**Bug 2: stale snapshot instead of an updater function**

```jsx
// Before
function addPoint() {
  setScore(score + 1);
}

// After
function addPoint() {
  setScore((s) => s + 1);
}
```

`setScore(score + 3)` in `handleAddThree` would make the test pass too, but it misses the point: `addPoint` is a reusable helper, and any helper that may run more than once per event must use the updater form.

**Bug 3: controlled input without `onChange`**

```jsx
// Before
<input id={`${label}-name`} value={teamName} />

// After
<input
  id={`${label}-name`}
  value={teamName}
  onChange={(e) => setTeamName(e.target.value)}
/>
```

## Debrief suggestion (5 minutes)

- Start with bug 1: ask how many people read the whole Console message before looking at the code. Show that ESLint names the exact line (`Found setState() in render`), so `npm run lint` is worth running as soon as something looks wrong.
- For bug 2, put `console.log(score)` straight after the three `addPoint()` calls and click **+3**. It prints the old value, which makes "state is a snapshot" concrete. Ask: why does **-1** not have the same problem? (It already uses the updater form.)
- For bug 3, ask the room what "read-only field" means in the warning, and connect it to the loop on the controlled-inputs slide: type, `onChange`, set state, re-render.
- Point out that the two panels stay independent because each `TeamScore` has its own state, even though they are the same component.
