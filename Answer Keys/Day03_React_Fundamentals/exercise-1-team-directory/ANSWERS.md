# Answers: Day 3, Exercise 1 (warm-up): Team Directory

Exercise folder: `Exercises/Day03_React_Fundamentals/exercise-1-team-directory/`
Corrected project: `fixed/` (`npm install`, then `npm test`, `npm run lint`, `npm run build`, `npm run dev`).

The exercise has **3 bugs**. Line numbers refer to the broken exercise files. On the broken code, `npm test` shows **2 failed | 2 passed**; `npm run lint` and `npm run build` pass (the template's ESLint rules do not catch these bugs).

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/components/MemberCard.jsx`, line 3 | Console: ``Invalid DOM property `class`. Did you mean `className`?`` Test "renders without any React warnings" fails with this call listed. (The styling still works, which is why it is easy to ignore) | `class` is a reserved word in JavaScript; JSX uses `className` | JSX attribute names; Module 3.1 "JSX is not quite HTML" |
| 2 | `src/components/TeamList.jsx`, line 7 | Console: `Each child in a list should have a unique "key" prop. Check the render method of TeamList.` The same warnings test fails with this call listed | The `li` returned by `map` has no `key` | Keys on the outermost element returned by `map`; Module 3.3 "Rendering a list with map", "Why keys matter" |
| 3 | `src/components/MemberCard.jsx`, line 6 | A stray **0** after the role on Sipho's and Thabo's cards. Test "shows only the name and role for members with no open tasks" fails: received `Sipho NkosiBackend developer0` | `{openTasks && ...}` gives back `0` when `openTasks` is 0, and React renders numbers | The `&&` trap with 0; Module 3.3 "Conditional rendering patterns" |

## Fixes

**Bug 1: `class` instead of `className`**

```jsx
// Before
<article class="member-card">

// After
<article className="member-card">
```

**Bug 2: missing key**

```jsx
// Before
{members.map((member) => (
  <li>
    <MemberCard {...member} />
  </li>
))}

// After
{members.map((member) => (
  <li key={member.id}>
    <MemberCard {...member} />
  </li>
))}
```

**Bug 3: `&&` with a number**

```jsx
// Before
{openTasks && <span className="badge">Open tasks: {openTasks}</span>}

// After
{openTasks > 0 && <span className="badge">Open tasks: {openTasks}</span>}
```

## Notes for the trainer

- The warnings test spies on `console.error` and runs first, because React prints each distinct warning only once per page load (and once per test file). If a delegate runs a single test in isolation, the result is unchanged.
- In the browser, each warning is printed once per page load. Encourage delegates to reload the page after each fix so the Console starts clean.
- A ternary (`{openTasks > 0 ? <span ...> : null}`) is an equally good fix for bug 3.

## Debrief suggestion (5 minutes)

- Ask: "Bug 1 did not break anything visible. Why fix it?" Warnings hide real problems when there are many of them; a clean Console is a professional habit.
- Use bug 3 to rehearse the rule from Module 3.3: compare explicitly (`> 0`, `.length > 0`) instead of relying on truthiness of numbers.
- Show React DevTools on the fixed app: `App` → `TeamList` → four `MemberCard`s with their props.
