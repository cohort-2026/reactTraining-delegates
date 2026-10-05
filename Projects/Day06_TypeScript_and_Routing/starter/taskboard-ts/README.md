# TaskBoard: Day 6 solution

This is the completed TypeScript version of the Day 5 TaskBoard starter. It includes a shared layout, dashboard search, project task boards, and a mock login protecting Settings.

## Run locally

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite. The initial task list is loaded from JSONPlaceholder, so the first load needs an internet connection. Tasks and the mock user are stored in browser local storage.

## Routes

| URL | Page |
|---|---|
| `/` | Dashboard and URL-backed task search (`?q=`) |
| `/projects/website` | Website project tasks |
| `/projects/mobile` | Mobile app project tasks |
| `/settings` | Protected settings page |
| `/login` | Mock login |

The login is for practicing protected routes only. It is not real authentication or a security boundary.

## Checks

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npm run build
```

