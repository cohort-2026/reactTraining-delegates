# Day 8 projects: Styling, Forms and React 19 Features

Every Day 8 lab changes your TaskBoard project, so this folder has one starter and one finished checkpoint per lab. Each checkpoint is a complete, runnable project that builds on the one before, so if you fall behind you can carry on from the last checkpoint.

## Which folder to start from

Start today from **`starter/taskboard/`** (or keep using your own `taskboard-ts` from Day 7). It is an exact copy of the Day 7 Lab 7.3 solution, with `TODO` comments where today's labs change the code.

| Lab | Checkpoint (finished result) | Built on |
|---|---|---|
| 8.1 Restyle TaskBoard with Tailwind and shadcn/ui | `solution/lab-8.1-taskboard-tailwind-shadcn/` | `starter/taskboard/` |
| 8.2 Task Form with React Hook Form and Zod | `solution/lab-8.2-taskboard-task-form/` | `solution/lab-8.1-taskboard-tailwind-shadcn/` |
| 8.3 Quick Add with Actions and Optimistic Updates | `solution/lab-8.3-taskboard-quick-add/` | `solution/lab-8.2-taskboard-task-form/` |

## The labs

- **Lab 8.1:** Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config.js`) and shadcn/ui initialised with Radix (`npx shadcn@latest init -b radix`) replace the plain CSS classes. Buttons, cards, badges, inputs, labels and a dialog come from `src/components/ui/`. Dark mode toggles a `.dark` class on `<html>` via `@custom-variant dark`.
- **Lab 8.2:** a reusable `TaskForm` built with React Hook Form and a Zod schema (`src/schemas/task.ts`) replaces the old plain `AddTaskForm`. The same form creates a task, inside `NewTaskDialog`, and edits one, inside `EditTaskDialog`. `fetchTasks` validates API responses with `apiTaskSchema`, so a shape mismatch fails loudly instead of silently.
- **Lab 8.3:** a `QuickAddForm` built with React 19's `useActionState` sits above the board for fast entry. Its `SubmitButton` reads `useFormStatus` from a child component. `Board` wraps the task list in `useOptimistic`, so a new task appears instantly, faded, and turns solid once the server confirms it — matched by a temporary `clientId`, because json-server assigns its own `id`.

## How to run any project here

```bash
cd solution/lab-8.2-taskboard-task-form   # or any other folder
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). `npm run lint` runs ESLint and `npm run build` type-checks and builds.

**Every lab still needs the mock API**, because tasks live on json-server from Day 7. Run it in a second terminal and keep it running:

```bash
cd solution/lab-8.2-taskboard-task-form   # match whichever project you are running
npm run api        # json-server on http://localhost:3001
```

## What comes next

Day 9 migrates TaskBoard to Next.js and Supabase, starting from `solution/lab-8.3-taskboard-quick-add`. The state, types and API shape you built today (`status`, string ids, `Task`, TanStack Query) carry across.

Requirements: Node.js 24 LTS and npm (json-server 1 needs Node 22.12 or newer).
