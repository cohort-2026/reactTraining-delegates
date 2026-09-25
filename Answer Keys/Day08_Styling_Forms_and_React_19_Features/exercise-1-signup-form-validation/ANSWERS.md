# Answer key · Day 8 · Exercise 1: Sign-up form validation

**Level:** warm-up · **Bugs:** 3 · **Self-check:** `npm test -- --run` (4 tests) for bugs 1 and 2; the browser (`npm run dev`) for bug 3

The corrected project is in `fixed/`. It is identical to the exercise except for the three fixes below.

Verified: on the broken code 3 of 4 tests fail. Fixing bug 1 leaves 1 failing test; fixing bug 2 makes all 4 pass. For bug 3, the production CSS was inspected: the broken build compiles `dark:` utilities inside `@media (prefers-color-scheme: dark)` and contains no `.dark` selector; the fixed build uses `:where(.dark, .dark *)`. The fixed project passes `npm test -- --run`, `npm run typecheck`, `npm run lint` and `npm run build`.

## Bugs

| # | File and line | Symptom the delegate sees | Root cause | Concept and handbook section |
|---|---|---|---|---|
| 1 | `src/schemas/signup.ts`, line 7 | Nobody can sign up. After typing a team size, **Team size** shows `Invalid input: expected number, received string`. Tests "rejects a team size that is out of range" and "accepts a valid sign-up" fail. | `z.number()` without `coerce`. An input's value is always a string, and `register` passes it on unchanged, so Zod rejects it before `int`/`min`/`max` run. | `z.coerce.number()` converts form strings. Module 8.3 *Describing data with a Zod schema*; Lab 8.2 Troubleshooting ("Points error `Invalid input: expected number, received string`"). |
| 2 | `src/components/SignupForm.tsx`, lines 58–59 | With a valid email and a short password, the password input is **not** marked invalid. With both invalid, a screen reader reads the *email* message on the password field. Test "marks each invalid field and links it to its error message": `Expected element to have accessible description: Password needs at least 8 characters · Received: Enter a valid email address`. | The password input's `aria-invalid` and `aria-describedby` were copied from the email field and still read `errors.email` / `"email-error"`. | Accessible errors: `aria-invalid` plus `aria-describedby` pointing at that field's message `id`. Module 8.3 *React Hook Form with a Zod resolver* ("Accessible errors"); Lab 8.2 step 4. |
| 3 | `src/index.css`, line 1 (a line is missing after it) | In the browser the theme button changes its label and adds `class="dark"` to `<html>`, but the colours do not change. On a computer set to dark mode the card is dark all the time, whatever the button says. | Tailwind v4's `dark:` variant follows `prefers-color-scheme` by default. Without `@custom-variant dark (&:where(.dark, .dark *));` the `.dark` class on `<html>` has no effect. | Class-based dark mode in Tailwind v4. Module 8.1 *Responsive design and dark mode*; Lab 8.1 Troubleshooting ("`dark:` classes never apply"). |

## Fixes

### Bug 1: coerce the number

**Before** (`src/schemas/signup.ts`)

```ts
teamSize: z
  .number()
  .int("Team size must be a whole number")
```

**After**

```ts
teamSize: z.coerce
  .number()
  .int("Team size must be a whole number")
```

`useForm` has no type argument, so `zodResolver` infers the input type (`teamSize: unknown`) and the output type (`number`) and the change type-checks. If a delegate had written `useForm<SignupInput>`, this fix would produce the `Type 'Resolver<...>' is not assignable` error from the handbook: a good extra talking point. `register("teamSize", { valueAsNumber: true })` with `z.number()` is also an acceptable fix.

### Bug 2: point the password input at its own error

**Before** (`src/components/SignupForm.tsx`)

```tsx
<input id="password" type="password" {...register("password")} className={inputClass}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined} />
```

**After**

```tsx
<input id="password" type="password" {...register("password")} className={inputClass}
  aria-invalid={!!errors.password}
  aria-describedby={errors.password ? "password-error" : undefined} />
```

### Bug 3: tie `dark:` to the `.dark` class

**Before** (`src/index.css`)

```css
@import "tailwindcss";
```

**After**

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

## Debrief suggestions

- Bug 1: ask why TypeScript did not warn. The schema and the types agreed with each other (`number` in, `number` out); only the runtime data (a string) disagreed. That is exactly the gap Zod closes, as long as the schema describes what the form really sends.
- Bug 2 is invisible to sighted mouse users. Have one delegate turn on VoiceOver (Cmd+F5) or Narrator (Ctrl+Windows+Enter) and tab to the password field in the broken version. Mention that `toHaveAccessibleDescription` tests what a screen reader would announce.
- Bug 3: if a delegate's OS is in light mode, the symptom is "the button does nothing"; in dark mode it is "the page is always dark". Comparing the two machines makes the `prefers-color-scheme` default memorable.
