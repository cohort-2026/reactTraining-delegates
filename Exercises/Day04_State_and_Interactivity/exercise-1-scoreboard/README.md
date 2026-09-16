# Day 4, Exercise 1 (warm-up): Scoreboard

## The scenario

Your office runs a five-a-side football league at lunchtime. A colleague started a small React scoreboard for the big screen: each team has a name box, a score and some buttons. It looked fine in their head, but the app will not even open. Your job is to find and fix the mistakes.

**This exercise contains 3 bugs.**

## What the app should do

The page shows two independent team panels, **Home** and **Away**. In each panel:

- [ ] The score starts at `Score: 0`.
- [ ] **+1** adds one point.
- [ ] **+3** adds three points (clicking it twice from zero shows `Score: 6`).
- [ ] **-1** takes one point away, but the score never goes below zero.
- [ ] **Reset** sets the score back to zero, and only when you click it.
- [ ] Typing in the **Team name** box shows what you type in the box, and the panel heading changes from "Home" (or "Away") to the name you typed.
- [ ] Clicking buttons in one panel never changes the other panel.
- [ ] There are no errors or warnings in the browser Console.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173) and keep the DevTools Console open. |
| `npm test` | Runs the automated checks. They re-run every time you save; press `q` to quit. All 7 tests pass when the app is fixed. |
| `npm run lint` | Runs ESLint. It reports no problems when the app is fixed. |

Fix one bug at a time, and check the app and the tests after each fix.

## Revise these handbook sections

Day 4 handbook:

- Module 4.1: "What happens when you click" and "State is a snapshot: use updater functions"
- Module 4.2: "Event handlers", especially the callout "The most common event bug"
- Module 4.3: "Controlled inputs" and its Troubleshooting table
- Lab 4.1 Troubleshooting table

## Hints

<details><summary>Hint 1</summary>

The page is blank and the Console shows a red error. Read it carefully: which React limit has been hit? Then look at the JSX for a place where a function is being *called* while React is rendering, rather than *passed* for React to call later.

</details>

<details><summary>Hint 2</summary>

**+1** works, but **+3** only ever adds one. Inside a single click, what value does `score` have on each of the three calls? Remember that `score` is a snapshot of this render.

</details>

<details><summary>Hint 3</summary>

A controlled input has two connections to state. Count how many the team name box has. The Console warning and `npm run lint` both point at the same line.

</details>
