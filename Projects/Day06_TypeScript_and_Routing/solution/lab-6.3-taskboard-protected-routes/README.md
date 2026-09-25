# TaskBoard: Lab 6.3 solution (Protected Routes with a Mock Login)

TaskBoard after **Lab 6.3: Protected Routes with a Mock Login**, the last lab of Day 6. Settings is only reachable when you are logged in, and logging in takes you back to the page you came from.

This is a mock login for learning the routing pattern. It is not security: anyone can edit localStorage. On Day 9 it is replaced with Supabase Auth and server-side checks.

Built on: `../lab-6.2-taskboard-routing`.

## How to run

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

## What changed in this lab

- New `src/hooks/useAuth.ts`: stores `{ name }` with `useLocalStorage<User | null>("user", null)` and returns `user`, `login(name)` and `logout()`.
- New `src/pages/Login.tsx`: a name input; on submit it calls `login` and `navigate(from, { replace: true })`, where `from` comes from `location.state`.
- New `src/components/RequireAuth.tsx`: renders `<Navigate to="/login" replace state={{ from: location.pathname }} />` when there is no user.
- `src/main.tsx`: the `settings` route is wrapped in `<RequireAuth>`, and there is a new `login` route.
- `Layout` shows **Signed in as ...** with a **Log out** button, or a **Log in** link when you are logged out.

## Known limitation (expected today)

After you log in, the Layout still shows **Log in** until you refresh. `Login` and `Layout` each call `useAuth`, so each has its own copy of the user state. Day 7 fixes this with Context.

## Done when

- Settings redirects to Login when you are logged out
- Logging in returns you to the page you came from
- The Back button does not return to Login
