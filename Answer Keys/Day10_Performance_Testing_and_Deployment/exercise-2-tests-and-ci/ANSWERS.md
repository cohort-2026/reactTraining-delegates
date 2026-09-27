# Answers: Exercise 10.2, Tests and CI

Exercise folder: `Exercises/Day10_Performance_Testing_and_Deployment/exercise-2-tests-and-ci/`
Corrected project: `fixed/` (identical to the exercise apart from the five fixes below).

React 19.3, Vitest 5, React Testing Library 16, user-event 14, jest-dom 7, MSW 2.15, `yaml` 2.9, `semver` 7. Checked with `npm test -- --run`, `npm run typecheck`, `npm run lint` and `npm run check:ci`.

`scripts/check-workflow.mjs` parses `.github/workflows/ci.yml` with the `yaml` package (strict mode). It then checks:

- the triggers;
- the action majors, against a table of current majors from September 2026 (`actions/checkout` v7, `actions/setup-node` v7);
- that `node-version` intersects the `engines.node` range of every installed dependency;
- that the install step is `npm ci`;
- that every `npm run …` step names a real script;
- that the tests run once.

## Bug table

| # | File and line | Symptom the delegate sees | Root cause | Fix | Concept and handbook section |
|---|---|---|---|---|---|
| 1 | `src/mocks/handlers.ts`, lines 1 and 11 | Every test file fails before any test runs: *TypeError: Cannot read properties of undefined (reading 'get')* at `handlers.ts:11`, via `server.ts` and `vitest.setup.ts`. `npm run typecheck`: *Module '"msw"' has no exported member 'rest'*. | The handler uses the MSW 1 API (`rest`, `(req, res, ctx) => res(ctx.json(…))`), copied from an old tutorial. MSW 2 has no `rest` export. | Before: `import { rest } from "msw";` and `rest.get(url, (req, res, ctx) => res(ctx.json(testTasks)))`. After: `import { http, HttpResponse } from "msw";` and `http.get(url, () => HttpResponse.json(testTasks))`. | MSW 2 handlers. Module 10.2, *Mocking Server Actions and network calls* (*Good to know: MSW versions*). |
| 2 | `src/components/TaskList.test.tsx`, lines 5 and 8 | Test *shows the tasks from the API* fails: *Unable to find an element with the text: Plan the sprint (todo)*. The printed DOM shows `Loading tasks...`. | The tasks arrive after an async `fetch`, but `getByText` checks only once, immediately after `render`. | Make the test `async` and wait: `expect(await screen.findByText("Plan the sprint (todo)")).toBeInTheDocument();`. Line 9 can stay `getByText`, because both tasks are on screen once the first has appeared. | `findBy` queries wait for async UI. Module 10.2, *Mocking Server Actions and network calls* ("findBy queries wait"). |
| 3 | `src/components/PointsStepper.test.tsx`, line 11 | Test *increases points when the button is clicked* fails: *expected "vi.fn()" to be called with arguments: [ 4 ]. Number of calls: 0*. The second stepper test passes, which is a useful clue. | `user.click(…)` returns a promise that is not awaited, so the assertion runs before the click has happened. | Before: `user.click(`. After: `await user.click(`. | user-event interactions are async. Module 10.2, *Component testing with React Testing Library* ("Interactions are async, so you `await` them"). |
| 4 | `.github/workflows/ci.yml`, lines 7–8 | `npm run check:ci`: *actions/checkout@v4 is not the current major version of actions/checkout* (and the same for `actions/setup-node`). On GitHub, older majors are no longer updated, and those built on retired Node.js runtimes show deprecation warnings in the run. | Copied from an older workflow. The current majors are `actions/checkout@v7` and `actions/setup-node@v7`. | Before: `actions/checkout@v4`, `actions/setup-node@v4`. After: `actions/checkout@v7`, `actions/setup-node@v7`. | Keeping CI actions current. Module 10.3, *Continuous integration with GitHub Actions*. |
| 5 | `.github/workflows/ci.yml`, line 9 | `npm run check:ci`: *node-version 20 is not supported by: @testing-library/jest-dom (needs Node >=22), jsdom (needs Node ^22.22.2 \|\| ^24.15.0 \|\| >=26.0.0), vitest (needs Node ^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0)*. On GitHub, `npm ci` prints `EBADENGINE` warnings under Node 20, and tools that need Node 22 or later are not supported there. Node 20 also reached end-of-life in April 2026. | The workflow pins an old Node.js major. | Before: `node-version: 20`. After: `node-version: 24`. `lts/*` is also accepted. | Node 24 LTS; tool engine requirements. Module 10.3, *Continuous integration with GitHub Actions* ("Installs Node 24"). |

## The fixes in full

### Bug 1: `src/mocks/handlers.ts`

```ts
// Before
import { rest } from "msw";
// ...
export const handlers = [
  rest.get(`${API_URL}/tasks`, (req, res, ctx) => res(ctx.json(testTasks))),
];

// After
import { http, HttpResponse } from "msw";
// ...
export const handlers = [
  http.get(`${API_URL}/tasks`, () => HttpResponse.json(testTasks)),
];
```

### Bug 2: `src/components/TaskList.test.tsx`

```tsx
// Before
it("shows the tasks from the API", () => {
  render(<TaskList />);

  expect(screen.getByText("Plan the sprint (todo)")).toBeInTheDocument();

// After
it("shows the tasks from the API", async () => {
  render(<TaskList />);

  expect(await screen.findByText("Plan the sprint (todo)")).toBeInTheDocument();
```

### Bug 3: `src/components/PointsStepper.test.tsx`

```tsx
// Before
  user.click(
    screen.getByRole("button", { name: "Increase points" }));

// After
  await user.click(
    screen.getByRole("button", { name: "Increase points" }));
```

### Bugs 4 and 5: `.github/workflows/ci.yml`

```yaml
# Before
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }

# After
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
```

## Order the delegate meets the bugs

1. `npm test`: bug 1 breaks every file, because the MSW server is set up in `vitest.setup.ts`.
2. With bug 1 fixed: two failing tests (bugs 2 and 3).
3. `npm run check:ci`: bugs 4 and 5, which are independent of the tests.

## Watch for "fixes" that are not fixes

- Deleting the assertion, adding `it.skip`, or changing the component to render the tasks synchronously. The README forbids all of these; the component is correct.
- Wrapping the assertion in `waitFor` for bug 2 also passes and is acceptable, but `findBy` is the idiomatic query.
- Changing `CURRENT_MAJORS` in the check script, or `engines`, instead of the workflow.
- Switching `npm ci` to `npm install` because "it's more forgiving". The check script rejects this, and it is worth a sentence: CI must install exactly what `package-lock.json` locks.

## Debrief suggestions (10 minutes)

- Ask: "Which of these bugs were in the product, and which in the safety net?" All of them are in the safety net. Broken tests and CI are real bugs, because the team trusts them.
- Show bug 3 again. An un-awaited promise can make a test fail, or worse, pass for the wrong reason. Ask how the second stepper test proves the component works.
- Compare the fixed `ci.yml` with the handbook's version. It is the same shape without the build step, because this exercise has no Next.js app. Remind delegates that `npm run check:ci` is a local stand-in; on GitHub, the **Actions** tab is the real check.
