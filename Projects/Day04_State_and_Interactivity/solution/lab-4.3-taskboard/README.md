# TaskBoard: Lab 4.3 solution (Interactive Task List)

Built on: `../lab-4.2-shopping-cart`.

This final Day 4 checkpoint carries forward the counter, theme toggle, accordion and shopping cart, and adds interactive TaskBoard task management.

## How to run

```bash
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to check the project.

## What changed

- `App` owns task state and adds tasks with unique ids.
- Status changes, renames and deletions use immutable state updates.
- The add form validates the title and converts points to a number.
- Task cards support status changes, inline rename and confirmed deletion.
- The header derives the completed count from task state.

This checkpoint is the Day 5 starter base.