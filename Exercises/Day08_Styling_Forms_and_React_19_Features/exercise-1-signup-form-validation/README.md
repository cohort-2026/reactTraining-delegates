# Day 8 · Exercise 1 (warm-up): Sign-up form validation

## Scenario

Marketing wants a sign-up page for the TaskBoard beta. A colleague built it with Tailwind CSS, React Hook Form and a Zod schema, and added a theme button for dark mode. Testers report that nobody can actually sign up, that a screen reader user heard the wrong message on one field, and that the theme button "does nothing". Find and fix the mistakes.

## What the app should do

- [ ] Submitting the empty form shows a message under **Name**, **Email** and **Password**, each announced to screen readers (`role="alert"`).
- [ ] Each invalid input is marked with `aria-invalid="true"` and is linked to **its own** message with `aria-describedby`, so a screen reader reads that message when the field gets focus.
- [ ] **Team size** must be a whole number from 1 to 50; `0` shows **Team size must be at least 1**.
- [ ] A valid sign-up (for example Sam, `sam@example.com`, `correct-horse`, team size `5`) shows **Thanks, Sam! Check your inbox to confirm.** and clears the form.
- [ ] In the browser, clicking **Theme: light** switches the whole card to dark colours, and clicking again switches back, whatever your operating system's light/dark setting is.
- [ ] `npm run typecheck` and `npm run lint` report no errors.

## How to run it

```bash
npm install
npm test -- --run
```

The tests cover the form behaviour. They fail now and should all pass once the code is fixed. Do not change the test file.

The theme cannot be checked by the tests (they run without real CSS), so check it in the browser:

```bash
npm run dev
```

Open the address Vite prints, click the theme button, and watch the card. Press Ctrl+C in the terminal to stop the server.

**This exercise contains 3 bugs.**

## Revise these handbook sections

Day 8 handbook (`Markdown Handbooks/Day08_Delegate_Handbook_Styling_Forms_and_React_19_Features.md`):

- Module 8.1: *Responsive design and dark mode*
- Module 8.3: *Describing data with a Zod schema* and *React Hook Form with a Zod resolver* (the "Accessible errors" part)
- Lab 8.1 and Lab 8.2: *Troubleshooting*

<details><summary><strong>Hint 1</strong></summary>

Fill in every field correctly and submit. Read the message that appears under the field that still complains. What type does an `<input type="number">` really give you?

</details>

<details><summary><strong>Hint 2</strong></summary>

In DevTools, submit the empty form and inspect each input. Compare its `aria-invalid` and `aria-describedby` values with the `id` of the message underneath it. Copy and paste is a common source of this kind of bug.

</details>

<details><summary><strong>Hint 3</strong></summary>

Inspect the `<html>` element while you click the theme button: does the `dark` class appear? If it does, the React side works, so ask how Tailwind v4 knows that `dark:` classes should follow a class rather than the operating system.

</details>
