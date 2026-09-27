# Lab 10.2 solution: CI pipeline and production deployment

Adds linting, formatting, type checking, the React Compiler, and a GitHub Actions workflow that runs all of it on every push and pull request.

## What's new since Lab 10.1

- **`package.json` scripts:** `lint`, `format`, `format:check`, `typecheck` (`next typegen && tsc --noEmit`), `test`.
- **`eslint.config.mjs`:** adds `eslint-config-prettier` last, so ESLint never fights Prettier over formatting.
- **`.prettierignore`:** `.next`, `node_modules`, `playwright-report`.
- **`next.config.ts`:** `reactCompiler: true`. Needs `babel-plugin-react-compiler` installed as a dev dependency.
- **`.github/workflows/ci.yml`:** checks out the code, installs Node 24 with npm caching, runs `npm ci`, then lint, typecheck, tests and a build — in that order, matching what you should run locally before pushing.

## A fix to the handbook's install commands (carried over from Lab 10.1)

Lab 10.1's README explains why `vitest.config.mts` does not use `@vitejs/plugin-react`: it conflicts with `shadcn`'s own dependencies over `@babel/core`. Everything here still works without it.

## Setting up the real thing

1. **GitHub secrets.** In your repository's **Settings, Secrets and variables, Actions**, add `SUPABASE_URL` and `SUPABASE_KEY` (your project's publishable key). The names must match `ci.yml` exactly.
2. **Push and watch.** Open the **Actions** tab and confirm a green run.
3. **Vercel.** Import the repo, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` as environment variables **before** the first deploy, then deploy.
4. **Supabase URL configuration.** Set the **Site URL** to your Vercel domain and add `https://your-app.vercel.app/**` to **Redirect URLs**, keeping `http://localhost:3000/**` for local development. Turn email confirmation back on now that the app is public.
5. **Branch protection.** Require the CI check to pass before merging into `main`.

None of this was run against a real GitHub repository, Vercel project or Supabase project here — this solution only shows and verifies the code and configuration that make each step work.

## Verified

Ran the exact sequence `ci.yml` runs, locally, after a clean `rm -rf node_modules .next` and `npm ci` (not `npm install`):

1. `npm ci` — installs from `package-lock.json` with no errors.
2. `npm run lint` — clean.
3. `npm run typecheck` — clean (runs `next typegen` first, so it works on a fresh checkout where generated types don't exist yet).
4. `npm test -- --run` — 3 files, 12 tests, all passing.
5. `npm run build` — compiles and type-checks with the React Compiler enabled, using placeholder values in `.env.local`.

Also checked separately: `.github/workflows/ci.yml` parses as valid YAML (verified with `js-yaml`) and matches the structure in the handbook exactly. `npm run format:check` passes after running `npm run format` once.
