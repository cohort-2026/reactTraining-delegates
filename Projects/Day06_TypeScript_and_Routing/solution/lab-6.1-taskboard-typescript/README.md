# TaskBoard: Lab 6.1 TypeScript checkpoint

This is the Day 5 TaskBoard converted to TypeScript. `src/types.ts` contains the shared task types, the components define their Props types, and both custom Hooks are generic.

## Run

```bash
npm install
npm run dev
```

Run `npx tsc --noEmit -p tsconfig.app.json` for a direct TypeScript check, `npm run lint` for ESLint, or `npm run build` for the type-checked production build. The first run loads starter tasks from JSONPlaceholder, so it needs an internet connection.

Lab 6.2 builds on this checkpoint by adding React Router and project pages.
