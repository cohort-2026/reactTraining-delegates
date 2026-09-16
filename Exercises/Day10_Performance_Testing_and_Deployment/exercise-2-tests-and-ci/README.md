# Exercise 10.2: Tests and CI

## The scenario

A teammate added automated tests for two TaskBoard components, `PointsStepper` and `TaskList`. They used Mock Service Worker (MSW) to fake the tasks API and wrote a GitHub Actions workflow to run everything on each push.

The components themselves work: the team checked them in the browser. But the tests fail, and the lead says the workflow breaks the team's CI rules. Your job is to fix the tests, the mocks and the workflow so that everything goes green. Do **not** change the components.

## What should happen

When everything is fixed:

- [ ] `npm test -- --run` reports 2 test files and 3 passing tests. The tests still check the same things, so do not delete assertions or skip tests.
- [ ] `npm run typecheck` and `npm run lint` pass.
- [ ] `npm run check:ci` prints only ✓ lines and ends with **All CI checks passed.**

The team's CI rules for `.github/workflows/ci.yml`:

- [ ] It runs on pushes to `main` and on every pull request.
- [ ] It uses the current major version of each official GitHub action.
- [ ] It uses a Node.js version that every tool in the project supports.
- [ ] It installs dependencies exactly as `package-lock.json` lists them.
- [ ] It runs the lint, type check and test scripts, with the tests running once rather than in watch mode.

## How to run it

Use a terminal in this folder. The commands are the same on Windows and macOS.

```bash
npm install
npm test
```

Vitest keeps watching and re-runs the tests when you save. Press `q` to quit. Also run:

```bash
npm run typecheck
npm run lint
npm run check:ci
```

`npm run check:ci` reads the workflow file and checks it against the rules above, so you do not need a GitHub repository for this exercise.

## Your task

**This exercise contains 5 bugs**, in the test files, the MSW mocks and the workflow. Do not change `src/components/PointsStepper.tsx`, `src/components/TaskList.tsx` or `scripts/`.

Revise these handbook sections (Day 10):

- Module 10.2: *Component testing with React Testing Library*, and *Mocking Server Actions and network calls* (including *Good to know: MSW versions*)
- Module 10.3: *Continuous integration with GitHub Actions*
- The MSW quick start: https://mswjs.io/docs/quick-start

<details><summary><strong>Hint 1</strong></summary>

When every test file fails with the same error before any test runs, look at the code that all test files load: `vitest.setup.ts` and what it imports.

</details>

<details><summary><strong>Hint 2</strong></summary>

When a query fails, Testing Library prints the page as it was at that moment. Is the text there yet? Some queries wait and retry, others check only once. And some things you start in a test return a promise.

</details>

<details><summary><strong>Hint 3</strong></summary>

Compare the workflow with the `ci.yml` in Module 10.3, line by line. The output of `npm run check:ci` tells you which Node.js versions your tools need.

</details>
