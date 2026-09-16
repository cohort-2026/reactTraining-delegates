# Day 5, Exercise 1 (warm-up): Focus Timer

## The scenario

Your team wants a simple "focus timer" to work in 25-minute blocks. A colleague built one with `useState`, `useEffect` and `useRef`. At first glance it works: click **Start** and the numbers go down. But **Pause** does not really pause, the browser tab title is stuck, and the cursor is never in the task box when the page opens. Your job is to find and fix the mistakes.

**This exercise contains 3 bugs.**

## What the app should do

- [ ] When the page opens, the cursor is already in the **What are you working on?** box, so you can type straight away.
- [ ] The timer shows `25:00` and does not move until you click **Start**.
- [ ] After **Start**, it counts down exactly one second per second, and the button changes to **Pause**.
- [ ] **Pause** stops the countdown completely. **Start** again carries on from where it stopped, at normal speed.
- [ ] **Reset** stops the timer and puts it back to `25:00`.
- [ ] The browser tab title always shows the time left, for example `24:56 - Focus Timer`.
- [ ] At `00:00` the message "Time is up. Take a break!" appears.
- [ ] Focus stays wherever you put it: clicking **Start** does not move the cursor somewhere else.
- [ ] There are no errors or warnings in the browser Console.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173). Watch the browser tab title as well as the page. |
| `npm test` | Runs the automated checks. They use a fake clock, so "waiting 10 seconds" takes no time at all. They re-run every time you save; press `q` to quit. All 8 tests pass when the app is fixed. |
| `npm run lint` | Runs ESLint with the React Hooks rules. It reports no problems when the app is fixed. |

> **Tip:** in the browser, click **Start**, wait a few seconds, click **Pause**, then click **Start** again. Watch how fast the seconds go.

## Revise these handbook sections

Day 5 handbook:

- Module 5.1: "Your first effect", "The dependency array controls when effects run" and "Cleanup functions" (including its Try it)
- Module 5.3: "Refs for DOM elements and stored values", especially the callout "Do not touch `.current` while rendering"

## Hints

<details><summary>Hint 1</summary>

Run `npm run lint` first. The React Hooks rules point at two of the three problems. Read each message in full: one is about *when* you are allowed to use a ref, the other is about what an effect *reads*.

</details>

<details><summary>Hint 2</summary>

Every time **Start** is clicked, an interval is started. Where is it ever stopped? Remember: if an effect starts something, it must return a function that stops it.

</details>

<details><summary>Hint 3</summary>

On the very first render, what is inside `taskInputRef.current`? When does React put the input element there? Which part of a component runs *after* the element is on the page?

</details>
