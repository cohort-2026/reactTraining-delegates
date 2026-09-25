# Answers: Day 3, Exercise 2 (harder): Conference Schedule

Exercise folder: `Exercises/Day03_React_Fundamentals/exercise-2-conference-schedule/`
Corrected project: `fixed/` (`npm install`, then `npm test`, `npm run lint`, `npm run build`, `npm run dev`).

The exercise has **5 bugs**. Line numbers refer to the broken exercise files. On the broken code:

- `npm test` shows **7 failed**;
- `npm run lint` reports 1 error (`'children' is defined but never used`);
- `npm run build` still succeeds, which is worth pointing out: a build that passes is not a page that works.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/components/ui/Card.jsx`, line 5 (with `children` destructured on line 1) | Every card shows only its title: no time, room, speaker or seats. `npm run lint`: `'children' is defined but never used`. Tests "shows the time, room, speaker and seats", "marks ... fully booked" and "shows a session without a confirmed speaker" fail | `Card` receives `children` but never places `{children}` in its markup | The `children` prop and composition; Module 3.2 "Default values and the children prop" |
| 2 | `src/components/Header.jsx`, lines 7–9 | The rooms list in the header is empty (no errors). Test "lists every room in the header" fails: `Unable to find an accessible element with the role "listitem"` | The `map` callback has curly braces but no `return`, so it returns `undefined` for every room | Implicit return with round brackets; Module 3.3 "Rendering a list with map" (the number one list bug), Lab 3.1 Troubleshooting |
| 3 | `src/components/Column.jsx`, lines 13–14 | Console: `Each child in a list should have a unique "key" prop. Check the render method of Column.` Test "renders without any React warnings" fails | The `key` is on `SessionCard`, which is inside the `li`; the key must be on the outermost element returned by `map` | Key placement; Module 3.3 "Rendering a list with map", Lab 3.2 Troubleshooting (key warning) |
| 4 | `src/components/Column.jsx`, line 10 | A stray **0** under the **Evening (0)** heading, next to "Nothing scheduled yet". Test "shows only the heading and a message in an empty column" fails | `{sessions.length && (...)}` gives back `0` for an empty array, and React renders numbers | The `&&` trap with 0; Module 3.3 "Conditional rendering patterns" |
| 5 | `src/components/SessionCard.jsx`, line 4 | The session "Props and children" (no speaker) is missing, although the heading still says **Morning (3)**. Tests "shows every session in the column for its track" and "shows a session without a confirmed speaker" fail | An early `return null` hides the whole card when only the speaker line should be hidden. The `{speaker && ...}` line already handles the missing speaker | Early return versus `&&`; Module 3.3 "Conditional rendering patterns" |

## Fixes

**Bug 1: `children` not rendered**

```jsx
// Before
<div className="card-body"></div>

// After
<div className="card-body">{children}</div>
```

**Bug 2: braces without `return` in `map`**

```jsx
// Before
{rooms.map((room) => {
  <li key={room}>{room}</li>;
})}

// After
{rooms.map((room) => (
  <li key={room}>{room}</li>
))}
```

**Bug 3: key on the wrong element**

```jsx
// Before
{sessions.map((session) => (
  <li>
    <SessionCard key={session.id} {...session} />
  </li>
))}

// After
{sessions.map((session) => (
  <li key={session.id}>
    <SessionCard {...session} />
  </li>
))}
```

**Bug 4: `&&` with a length**

```jsx
// Before
{sessions.length && (

// After
{sessions.length > 0 && (
```

(Replacing both conditions with one ternary, `sessions.length === 0 ? <p ...> : <ul>...</ul>`, is an equally good fix.)

**Bug 5: early return hides the whole card**

```jsx
// Before
function SessionCard({ title, startTime, room, speaker, seatsLeft }) {
  if (!speaker) return null;

  return (

// After
function SessionCard({ title, startTime, room, speaker, seatsLeft }) {
  return (
```

## Which test fails because of which bug

| Test | Bugs |
|---|---|
| renders without any React warnings in the console | 3 |
| lists every room in the header | 2 |
| shows every session in the column for its track | 5 |
| shows the time, room, speaker and seats for a session | 1 |
| marks a session with no seats left as fully booked | 1 |
| shows a session without a confirmed speaker, but no speaker line | 1 and 5 (each on its own makes it fail) |
| shows only the heading and a message in an empty column | 4 |

## Notes for the trainer

- The warnings test runs first because React prints each distinct warning only once per test file.
- Bug 5 is a good one to watch for: some delegates "fix" it by adding a speaker to the data. Point them back to the requirement that sessions without a confirmed speaker are still shown.

## Debrief suggestion (10 minutes)

- Ask which tool found which bug: lint (1), tests (all), Console (3), eyes on the page (2, 4, 5). Different tools catch different mistakes, which is a preview of Day 10.
- Bugs 1 and 5 are both "the data is right but nothing shows". Show how React DevTools proves `SessionCard` received the right props, which narrows the problem to what the component renders.
- Bug 5 versus the `{speaker && ...}` line: an early return is for "nothing sensible to show at all"; `&&` is for an optional part. Relate to Lab 3.3's hidden assignee line.
