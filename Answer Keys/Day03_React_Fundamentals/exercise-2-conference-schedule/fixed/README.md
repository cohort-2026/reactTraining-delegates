# Day 3, Exercise 2 (harder): Conference Schedule

## The scenario

Your team is organising DevDay, a one-day conference, and wants a static schedule page. A colleague planned the component tree properly (`App` → `Header` and `Schedule` → `Column` → `SessionCard` → `Card`) and wired up the data, but the page is badly broken: rooms are missing, cards are empty, a session has disappeared, and there are warnings and a stray character on screen. Fix it before the programme is printed.

**This exercise contains 5 bugs.**

## What the app should do

**Header**

- Shows the title **DevDay schedule** and **5 sessions today**.
- Lists the three rooms: **Hall A**, **Room 1**, **Room 2**.

**Schedule**

- Three columns: **Morning (3)**, **Afternoon (2)** and **Evening (0)**.
- Every session appears in the column for its track, as a card showing:
  - the title;
  - the start time and room, for example **13:00 in Room 1**;
  - **Speaker: name**, but only when the session has a speaker. A session without a confirmed speaker is still shown, just without that line;
  - **Fully booked** when there are no seats left, otherwise **N seats left**.
- An empty column shows its heading and **Nothing scheduled yet**, and nothing else.
- There are **no warnings** in the browser Console.

The files you will work in:

```text
src/
  App.jsx
  components/
    Header.jsx
    Schedule.jsx
    Column.jsx
    SessionCard.jsx
    ui/
      Card.jsx
  data/
    schedule.js
```

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually `http://localhost:5173`) with DevTools open on the **Console** tab. Press **Ctrl+C** to stop. |
| `npm test` | Runs the self-check tests, which describe the required behaviour. |
| `npm run lint` | Runs ESLint, which spots some mistakes without running the app. |

The exercise is finished when all 7 tests pass, `npm run lint` reports no problems, and the Console shows no warnings. Do not change the test file, `src/App.test.jsx`.

## Revise these handbook sections

Day 3 handbook:

- Module 3.2: Default values and the children prop; Composition: building a tree
- Module 3.3: Rendering a list with map; Why keys matter; Conditional rendering patterns
- Lab 3.1 and Lab 3.2 Troubleshooting tables

## Hints

<details><summary>Hint 1</summary>

Start with `npm run lint`: it points at one bug directly. Then use React DevTools (Components tab) to check what props each component actually receives, and compare with what it renders.

</details>

<details><summary>Hint 2</summary>

When a whole list is empty, look at the arrow function inside `map`. When one item is missing, look for a component that decides to render nothing.

</details>

<details><summary>Hint 3</summary>

The key warning is still there even though a `key` is written in the code? Check which element in the `map` it is on.

</details>
