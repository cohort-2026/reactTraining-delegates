# TaskBoard: Lab 6.3 protected-routes checkpoint

This checkpoint adds a local mock login to the routed TaskBoard. A logged-out visitor who opens Settings is redirected to Login; after login they are returned to Settings. The mock user is stored in localStorage and is not real authentication.

## Run

```bash
npm install
npm run dev
```

Use `npm run lint` to run ESLint and `npm run build` to type-check and build. The first run loads starter tasks from JSONPlaceholder, so it needs an internet connection.
