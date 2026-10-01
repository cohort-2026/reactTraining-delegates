# Day 3, Exercise 1 (warm-up): Team Directory

## The scenario

Your company intranet needs a simple "Our team" page. A colleague built it in React from static data: a `TeamList` component that renders a `MemberCard` for each person. The page looks almost right, but the browser Console is full of red warnings and some cards show something odd. Tidy it up.

**This exercise contains 3 bugs.**

## What the app should do

- Show the heading **Our team** and the text **4 people**.
- Show a card for each of the four team members with their name and role.
- Show an **Open tasks: N** badge only for members who have open tasks. Members with no open tasks show just their name and role, and nothing else.
- Produce **no warnings** in the browser Console.

The files you will work in:

```text
src/
  App.jsx
  components/
    TeamList.jsx
    MemberCard.jsx
  data/
    team.js
```

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then either look at the page in the browser:

```bash
npm run dev
```

Open the address it prints (usually `http://localhost:5173`), and open DevTools (F12, or Cmd+Option+I on macOS) on the **Console** tab. Press **Ctrl+C** in the terminal to stop the server.

Or run the self-check tests, which describe the required behaviour:

```bash
npm test
```

The exercise is finished when all 4 tests pass and the Console shows no warnings. Do not change the test file, `src/App.test.jsx`.

## Revise these handbook sections

Day 3 handbook:

- Module 3.1: JSX is not quite HTML
- Module 3.3: Rendering a list with map; Why keys matter; Conditional rendering patterns

## Hints

<details><summary>Hint 1</summary>

Read each Console warning in full. React tells you what it wants and, for some warnings, which component to check.

</details>

<details><summary>Hint 2</summary>

Look carefully at Sipho's and Thabo's cards. What do they have in common in the data, and what is shown on screen that should not be?

</details>

<details><summary>Hint 3</summary>

React does not render `false`, `null` or `undefined`, but it does render every number.

</details>
