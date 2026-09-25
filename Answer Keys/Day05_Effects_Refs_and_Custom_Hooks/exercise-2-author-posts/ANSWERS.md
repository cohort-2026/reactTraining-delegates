# Answers: Day 5, Exercise 2 (harder): Author Posts

Exercise folder: `Exercises/Day05_Effects_Refs_and_Custom_Hooks/exercise-2-author-posts/`
Corrected project: `fixed/` (run `npm install`, then `npm run dev`, `npm test -- --run`, `npm run lint`).

The exercise has **5 bugs** across four files. Line numbers refer to the broken files. The tests never touch the network: `src/App.test.jsx` replaces `fetch` with a controllable fake server that honours `AbortSignal`, so the race condition can be reproduced reliably.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/components/PostList.jsx`, line 11 | "Loading posts..." appears, then the page goes blank when the data arrives. Console: `Rendered more hooks than during the previous render.` Five tests fail with that error. `npm run lint`: `React Hook "useState" is called conditionally` (`react-hooks/rules-of-hooks`) | `useState` is called **after** the early `return`s. The loading render calls 4 Hooks (the 3 inside `useFetch` plus its `useEffect`); the loaded render calls 5. React matches state to Hooks by call order, so the order and number must be the same on every render | Rules of Hooks: call Hooks at the top level, never after an early return. Module 5.4 "What is a custom Hook?" (The Rules of Hooks); Module 5.2 "Rendering every state" ("All the Hooks are called above the early returns") |
| 2 | `src/hooks/useFetch.js`, line 17 | Choosing another author changes the dropdown but the list keeps showing the first author's posts, and no new request appears in the Network tab. Tests "loads the posts for a newly selected author" and "never shows a slow, older response…" fail. `npm run lint`: `React Hook useEffect has a missing dependency: 'url'` (`react-hooks/exhaustive-deps`, warning) | The dependency array is `[]`, so the effect runs only on mount even though it reads `url` | The dependency array must list every value the effect reads. Module 5.1 "The dependency array controls when effects run"; Module 5.4 "useFetch" ("re-runs whenever the `url` changes") |
| 3 | `src/hooks/useFetch.js`, lines 8–16 (once bug 2 is fixed) | Switching authors does not show "Loading posts..."; the old author's posts stay on screen until the new ones arrive. With throttling on, switching quickly can end with the **wrong** author's posts (a slow earlier response overwrites the newer one). No lint message. Tests "loads the posts for a newly selected author" (no loading message) and "never shows a slow, older response…" fail | No `AbortController` and no cleanup function. Old requests are never cancelled, so whichever response arrives last wins, and `loading` is never set back to `true` for the next URL | Race conditions; cancel stale requests in the cleanup. Module 5.2 "Cancelling stale requests"; Module 5.4 "useFetch" (the two details that make it reliable) |
| 4 | `src/hooks/useLocalStorage.js`, line 6 | The first visit works. After choosing an author and refreshing, the dropdown shows Leanne Graham (the first option) and the list is empty or wrong. In the **Application** tab the saved value gains extra quotes and backslashes on every refresh (`"3"`, then `"\"3\""`...). No lint message. Test "remembers the chosen author the next time the page opens" fails (`expect(element).toHaveValue("3")`) | The value is saved with `JSON.stringify` but read back **without** `JSON.parse`, so the state becomes the text `"3"` including the quote marks. It matches no `<option>`, is put into the URL as `userId="3"`, and is stringified again on the next save | `localStorage` stores strings: stringify on write, parse on read. Module 5.4 "useLocalStorage" (and its Troubleshooting callout) |
| 5 | `src/components/LikeButton.jsx`, lines 4, 7 and 10 | Clicking **Like this blog** leaves it at `(0)`. The number suddenly jumps to the real count when something else re-renders the button (for example choosing another author). Test "counts every click on the Like button" fails. `npm run lint`: `Cannot access refs during render` (`react-hooks/refs`) | The count is stored in a ref. Changing `ref.current` never triggers a re-render, and reading it during render is not allowed | Ref or state: if it is shown on screen, use state. Module 5.3 "Refs for DOM elements and stored values" (Check your understanding) and "Ref or state?" |

**How the bugs interact.** Bug 1 crashes the component, so fix it first; after that, each test fails for these bugs only:

| Test | Fails because of |
|---|---|
| shows a loading message, then the first author's posts | 1 |
| filters the posts by title | 1 |
| shows an error message when the posts cannot be loaded | (passes throughout) |
| loads the posts for a newly selected author | 1, 2, 3 |
| never shows a slow, older response for a different author | 1, 2, 3 |
| remembers the chosen author the next time the page opens | 1, 4 |
| counts every click on the Like button | 5 |

## Fixes

**Bug 1: Hook called after an early return** (`PostList.jsx`)

```jsx
// Before
const { data: posts, loading, error } = useFetch(`${API}/posts?userId=${authorId}`);

if (loading) return <p>Loading posts...</p>;
if (error) return <p role="alert">Could not load posts: {error}</p>;

const [search, setSearch] = useState("");

// After
const { data: posts, loading, error } = useFetch(`${API}/posts?userId=${authorId}`);
const [search, setSearch] = useState("");

if (loading) return <p>Loading posts...</p>;
if (error) return <p role="alert">Could not load posts: {error}</p>;
```

**Bugs 2 and 3: missing dependency, no cancellation** (`useFetch.js`, back to the handbook version)

```jsx
// Before
useEffect(() => {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((d) => { setData(d); setError(null); })
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));
}, []);

// After
useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((d) => { setData(d); setError(null); })
    .catch((e) => e.name !== "AbortError" && setError(e.message))
    .finally(() => !ctrl.signal.aborted && setLoading(false));
  return () => { ctrl.abort(); setLoading(true); };
}, [url]);
```

Bug 2 is the `[]` to `[url]` change. Bug 3 is everything to do with `ctrl`: the controller, passing its `signal`, ignoring the expected `AbortError`, only switching loading off for a request that was not aborted, and the cleanup that aborts and resets `loading`.

**Bug 4: reading without `JSON.parse`** (`useLocalStorage.js`)

```jsx
// Before
return stored !== null ? stored : initialValue;

// After
return stored !== null ? JSON.parse(stored) : initialValue;
```

Delegates who refreshed the page before fixing this will still have a badly escaped value saved. After the fix, `JSON.parse` turns it back into text that *includes* quote marks, and saving that again produces the same escaped value, so refreshing does not clear it. Tell them to choose an author once (which saves a clean value) or delete the `authorId` key in the **Application** tab.

**Bug 5: a ref used for a value shown on screen** (`LikeButton.jsx`)

```jsx
// Before
import { useRef } from "react";

function LikeButton() {
  const likes = useRef(0);

  function handleLike() {
    likes.current += 1;
  }

  return <button onClick={handleLike}>Like this blog ({likes.current})</button>;
}

// After
import { useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((l) => l + 1);
  }

  return <button onClick={handleLike}>Like this blog ({likes})</button>;
}
```

## Debrief suggestion (10 to 15 minutes)

- Bug 1: draw two columns on the board, "loading render" and "loaded render", and list the Hook calls in order. The mismatch is obvious once written down. Stress that ESLint caught it before the code ever ran.
- Bugs 2 and 3: demonstrate the race live. Fix bug 2 only, set throttling to Slow 4G, switch Leanne, Ervin, Clementine quickly, and watch the list settle on the wrong author. Then add the `AbortController` and show the **(canceled)** requests in the Network tab. Ask why ignoring `AbortError` matters. Mention that TanStack Query (Day 7) does all of this for you, which is exactly why teams use it.
- Point out how the fake server in the tests works: it holds responses back and releases them in a chosen order. That is the only reliable way to test a race condition, and it previews Day 10 testing.
- Bug 4: show the Application tab after three refreshes. Connect it to the handbook's Troubleshooting note about invalid JSON in storage.
- Bug 5: ask "ref or state?" for three values: the like count (state), an interval id (ref), the search text (state). Note the tell-tale symptom: the number is "right" but only appears after some unrelated re-render.
