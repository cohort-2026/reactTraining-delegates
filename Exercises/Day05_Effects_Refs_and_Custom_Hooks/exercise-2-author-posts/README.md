# Day 5, Exercise 2 (harder): Author Posts

## The scenario

Your team's content editor wants a quick way to browse blog posts by author. A developer built a small app using the Day 5 custom Hooks, `useFetch` and `useLocalStorage`, and the JSONPlaceholder API. Now it crashes as soon as the posts load, and even when it did not crash, people reported odd behaviour: the wrong author's posts, a Like counter stuck at zero, and a forgotten author choice after a refresh. Your job is to find and fix the mistakes.

**This exercise contains 5 bugs.**

## What the app should do

- [ ] When the page opens it shows "Loading posts...", then the posts by the selected author (Leanne Graham the first time).
- [ ] Typing in **Filter by title** shows only the posts whose title contains that text.
- [ ] If the posts cannot be loaded, a message such as "Could not load posts: HTTP 500" appears.
- [ ] Choosing another author shows "Loading posts..." again, then that author's posts.
- [ ] Switching authors quickly never ends with a different author's posts on screen: the list always matches the author shown in the dropdown, even on a slow connection.
- [ ] After a refresh, the app opens with the author you chose last time.
- [ ] **Like this blog** counts every click on screen: `(1)`, `(2)`, `(3)`...
- [ ] There are no errors or warnings in the browser Console.

## How to run it

Open a terminal in this folder and install the packages once:

```bash
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173). It needs an internet connection to reach `jsonplaceholder.typicode.com`. |
| `npm test` | Runs the automated checks. They do **not** use the internet: they replace `fetch` with a pretend server, so they can make one response arrive later than another. They re-run every time you save; press `q` to quit. All 7 tests pass when the app is fixed. |
| `npm run lint` | Runs ESLint with the React Hooks rules. It reports no problems when the app is fixed. |

> **Tips for the browser**
> - In DevTools, open the **Network** tab and set throttling to **Slow 4G** (or **3G**). Then switch authors quickly and watch which requests finish, and in which order.
> - Open the **Application** tab, then **Local Storage**, to see exactly what is saved under the `authorId` key. Refresh a few times and look again.

## Revise these handbook sections

Day 5 handbook:

- Module 5.1: "The dependency array controls when effects run" and "Cleanup functions"
- Module 5.2: "Cancelling stale requests" and "Rendering every state"
- Module 5.3: "Refs for DOM elements and stored values" and "Ref or state?"
- Module 5.4: "What is a custom Hook?" (the Rules of Hooks), "useFetch" and "useLocalStorage"

## Hints

<details><summary>Hint 1</summary>

Start with `npm run lint`. It points at three of the five bugs. For the crash, read the Console error carefully: React counts the Hooks a component calls on every render, and the count must never change. What changes between the "loading" render and the "loaded" render?

</details>

<details><summary>Hint 2</summary>

Compare `src/hooks/useFetch.js` line by line with the `useFetch` in your handbook. What does the effect need in order to run again when the URL changes, and to throw away a request that is no longer wanted?

</details>

<details><summary>Hint 3</summary>

Two values in this app must survive something. One must survive a page refresh, so it is turned into text before saving: is it turned back the same way when read? The other must appear on screen when it changes: which Hook makes React re-render?

</details>
