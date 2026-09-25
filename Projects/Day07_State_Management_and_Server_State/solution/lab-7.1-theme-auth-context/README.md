# TaskBoard: Lab 7.1 solution (Theme Switcher and Shared Auth with Context)

TaskBoard after **Lab 7.1: Theme Switcher and Shared Auth with Context**. A theme button switches between light and dark everywhere and remembers your choice, and logging in now updates the header immediately.

Built on: `../../starter/taskboard` (the Lab 6.3 solution).

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

## What changed in this lab

- New `src/context` folder:
  - `ThemeContext.ts`: the `Theme` and `ThemeValue` types and `ThemeContext = createContext<ThemeValue | null>(null)`.
  - `ThemeProvider.tsx`: stores the theme with `useLocalStorage<Theme>("theme", "light")`, sets `document.documentElement.dataset.theme` in an effect, and renders `<ThemeContext value={{ theme, toggle }}>` (the React 19 provider form).
  - `useTheme.ts`: reads the context and throws `useTheme must be inside ThemeProvider` when there is no provider.
  - `AuthContext.ts` and `AuthProvider.tsx`: the same pattern for `user`, `login` and `logout`, stored under the `user` key.
- `src/hooks/useAuth.ts` now reads `AuthContext` with `useContext`. `RequireAuth`, `Login` and `Layout` did not change, but they all share one user now.
- New `src/components/ThemeButton.tsx`, shown in the Layout nav.
- `src/main.tsx` wraps `<RouterProvider>` in `<AuthProvider>` and `<ThemeProvider>`.
- `src/index.css` defines colour variables in `:root` and overrides them in `[data-theme="dark"]`; `src/App.css` uses the variables instead of fixed colours.

**Why each context is split into two files.** The handbook puts the context object and its provider in one `ThemeContext.tsx`. With the Vite template's ESLint config, that makes `npm run lint` fail with the error `Fast refresh only works when a file only exports components. Move your React context(s) to a separate file`. This solution follows the handbook's suggested fix: the context object lives in `ThemeContext.ts` and the provider component in `ThemeProvider.tsx` (and the same for auth).

## Done when

- The theme toggles everywhere and survives a refresh
- Logging in updates the header without a refresh
- Using `useTheme` outside the provider throws a clear error
