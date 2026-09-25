# Challenge 01 (easy): Login form with validation

## The scenario

TaskBoard is getting accounts, and the first thing every user will see is the sign-in page. The auth server is not ready yet, so the team has given you a mock `login(email, password)` function that behaves like the real one: it waits about 800 ms, then either resolves with the user or rejects with **Invalid email or password**.

Your job is to build the sign-in form. It must feel good to use (no shouting at people before they have finished typing) and it must work for keyboard and screen reader users. This is the first of five auth challenges; each one is standalone, so you only need this folder.

Unlike the bug-fix exercises, nothing here is broken. The form is simply not built yet. The `starter/` project runs, and `src/components/LoginForm.tsx` has TODO comments describing what is needed.

## What you are given

| File | What it is |
|---|---|
| `src/api/auth.ts` | The mock `login(email, password)` and the demo credentials. You do not need to change it. |
| `src/types.ts` | The `User` type that `login()` resolves with. |
| `src/App.tsx` | Shows `<LoginForm>` until it calls `onSuccess(user)`, then shows the welcome message. |
| `src/components/LoginForm.tsx` | **Your work goes here.** A placeholder with TODO comments. |
| `src/LoginForm.test.tsx` | The automated checks. Do not change the test files. |

The demo account is `demo@taskboard.dev` with the password `Passw0rd!`. Any other combination is rejected.

## What to build

- [ ] An **Email** input and a **Password** input, each with a visible `<label>`. The email input has `type="email"`.
- [ ] No error messages appear when the page first loads, or while the user is typing into a field for the first time.
- [ ] When the user leaves a field (blur), it is validated:
  - Email empty: **Enter your email address**
  - Email not a valid address (for example `sam@example`): **Enter a valid email address**
  - Password empty: **Enter your password**
  - Password shorter than 8 characters: **Password must be at least 8 characters**
- [ ] Once a field has been blurred, its error updates on every change: fixing the value clears the message straight away, and breaking it again shows the right message straight away.
- [ ] An input with an error has `aria-invalid="true"` and an `aria-describedby` pointing at the `id` of its message, so a screen reader reads the message when the field gets focus.
- [ ] A **Show password** button next to the password field reveals the password. Its label then changes to **Hide password**, and clicking it hides the password again. Clicking it never submits the form.
- [ ] The **Sign in** button is disabled until both fields are valid.
- [ ] While `login()` is running, the button reads **Signing in…** and is disabled, and both inputs are disabled.
- [ ] If `login()` rejects, the form shows **Invalid email or password** in an element with `role="alert"`, and the inputs and button are usable again.
- [ ] If `login()` resolves, `onSuccess(user)` is called and the page shows **Welcome back, demo@taskboard.dev**.
- [ ] `npm test`, `npm run typecheck` and `npm run lint` all pass, and there are no errors or warnings in the browser Console.

Use plain `useState` for this challenge. A form library is not needed (see the stretch goals).

## How to run it

Open a terminal in the `starter/` folder and install the packages once:

```bash
cd starter
npm install
```

Then use any of these:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the app. Open the address it prints (usually http://localhost:5173). Press Ctrl+C to stop it. |
| `npm test` | Runs the automated checks. They re-run every time you save; press `q` to quit. All 14 tests fail now and pass when the form is finished. |
| `npm run typecheck` | Checks the TypeScript types. |
| `npm run lint` | Runs ESLint. |

The tests find elements the way a user would: by their label (**Email**, **Password**) and by the button names given above. Match that text and you are free to structure the markup however you like. Do not change the test files.

Once the tests pass, try the form in the browser with only the keyboard (Tab, Shift+Tab, Space, Enter). If you have a screen reader (VoiceOver on macOS: Cmd+F5; Narrator on Windows: Ctrl+Win+Enter), check that an error is read out when you move back to a field.

## Revise these handbook sections

Day 3 handbook (`Markdown Handbooks/Day03_Delegate_Handbook_React_Fundamentals.md`):

- Module 3.3: *Conditional rendering patterns*

Day 4 handbook (`Markdown Handbooks/Day04_Delegate_Handbook_State_and_Interactivity.md`):

- Module 4.1: *State is a snapshot: use updater functions*
- Module 4.2: *Event handlers*
- Module 4.3: *Controlled inputs*, *Selects, checkboxes and one state object* and *Basic validation and error messages*
- Module 4.4: *Derived state: calculate, do not store*

Day 8 handbook (`Markdown Handbooks/Day08_Delegate_Handbook_Styling_Forms_and_React_19_Features.md`):

- Module 8.5: *Accessibility checklist*
- Module 8.3: *React Hook Form with a Zod resolver* (the "Accessible errors" part shows the same `aria-invalid` and `aria-describedby` pattern)

## Hints

<details><summary><strong>Hint 1: which state do I actually need?</strong></summary>

Start with the values (`email`, `password`) and a record of which fields have been **touched** (blurred), for example `{ email: false, password: false }`. The error messages themselves should **not** be state: call a small `validateEmail(value)` function during render and get back either a message or `null`. Then show the message only if that field is touched. That one rule gives you "validate on blur, then re-validate on every change" for free.

</details>

<details><summary><strong>Hint 2: the submit button and the pending state</strong></summary>

"Is the form valid?" is also derived: both validators return `null`. Use that for the button's `disabled`. For the pending state, set an `isSubmitting` flag to `true` before you `await login(...)` and back to `false` afterwards. A `try` / `catch` / `finally` block keeps this tidy. Remember `event.preventDefault()`, or the browser reloads the page.

</details>

<details><summary><strong>Hint 3: linking an error to its input</strong></summary>

Give each message an `id` and put the same value in the input's `aria-describedby`. Only add `aria-describedby` and `aria-invalid="true"` when there is a message to point at. `useId()` gives you a unique prefix, so the ids stay unique even if the form appears twice on a page.

</details>

<details><summary><strong>Hint 4: the form submits when I click Show password</strong></summary>

Inside a `<form>`, a `<button>` is `type="submit"` unless you say otherwise. Give the toggle `type="button"`. Also, the browser's own validation bubbles for `type="email"` will fight with yours: the `noValidate` attribute on the `<form>` turns them off.

</details>

## Stretch goals

- Clear the **Invalid email or password** message as soon as the user edits either field, and move keyboard focus back to the Email input after a failed sign-in (Day 5, `useRef`).
- Add a **Remember me** checkbox and keep the email in `localStorage` (Day 5).
- Rebuild the form with **React Hook Form** and a **Zod** schema (Day 8, Module 8.3), using `mode: "onTouched"` for the same validate-on-blur behaviour. Aim to keep every test passing without changing it.
- Rewrite the submit with React 19's `useActionState` and `useFormStatus` (Day 8, Module 8.4).
