# Day 8 · Exercise 2 (harder): Quick add with Actions and optimistic updates

## Scenario

This is a stripped-down version of the Lab 8.3 quick-add bar. It uses React 19 features only: `useActionState` for the form, `useFormStatus` for the submit button and `useOptimistic` for the list. To keep things simple, the "server" is a pretend API in `src/api/tasks.ts`. It waits 300 ms before answering, and a checkbox on the page makes it fail as if the server were offline.

The developer who wrote it was reading a React 18 tutorial and a Zod 3 blog post at the same time. The result crashes as soon as you press **Add**. Find and fix every mistake.

## What the app should do

- [ ] A title shorter than 3 characters shows the schema's message, **Title needs at least 3 characters**, under the input (`role="alert"`), and the input is marked `aria-invalid="true"`.
- [ ] A valid title appears in the list **immediately**, faded and followed by **(saving...)**. When the pretend server answers, it turns solid and appears only once.
- [ ] While saving, the button reads **Adding...** and is disabled; afterwards it reads **Add** again.
- [ ] With **Simulate the server being offline** ticked, adding a task shows **Could not save the task. Try again.**, the temporary task disappears, and the rest of the page keeps working.
- [ ] `npm run typecheck` and `npm run lint` report no errors.

## How to run it

```bash
npm install
npm test -- --run
```

The tests describe the behaviour above. They fail now and should all pass once the code is fixed. Do not change the test file.

Also useful:

```bash
npm run typecheck   # TypeScript errors
npm run dev         # try it in the browser (Ctrl+C to stop)
```

**This exercise contains 5 bugs.**

## Revise these handbook sections

Day 8 handbook (`Markdown Handbooks/Day08_Delegate_Handbook_Styling_Forms_and_React_19_Features.md`):

- Module 8.3: the Zod 4 note in *Describing data with a Zod schema*
- Module 8.4: *Form actions with useActionState* (including its Troubleshooting) and *useFormStatus and useOptimistic*
- Lab 8.3: the hints and *Troubleshooting*

<details><summary><strong>Hint 1</strong></summary>

`TypeError: formData.get is not a function` means the value called `formData` is not a `FormData`. Check which arguments React passes to an action used with `useActionState`. The TypeScript errors from `npm run typecheck` point to the same places the tests do.

</details>

<details><summary><strong>Hint 2</strong></summary>

`useFormStatus` reads the status of a form *above* the component that calls it. Which component renders the `<form>`, and which component calls the Hook?

</details>

<details><summary><strong>Hint 3</strong></summary>

"Optimistic" means showing the result *before* you know it worked. Look at the order of the lines in the action. Then think about what happens to the page when an `await` inside an action throws.

</details>
