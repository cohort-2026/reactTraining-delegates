# Day 4: State and Interactivity — Presentation Guide

Use the finished checkpoints in order. Each project is cumulative: Labs 4.2 and 4.3 include the earlier Day 4 exercises.

## Run a Checkpoint

From the repository root, open a terminal and enter the checkpoint folder, then install and start it:

```bash
cd Projects/Day04_State_and_Interactivity/solution/lab-4.1-counter-toggle-accordion
npm install
npm run dev
```

For the other labs, use their folders instead:

- [Lab 4.1 checkpoint](Projects/Day04_State_and_Interactivity/solution/lab-4.1-counter-toggle-accordion)
- [Lab 4.2 checkpoint](Projects/Day04_State_and_Interactivity/solution/lab-4.2-shopping-cart)
- [Lab 4.3 checkpoint](Projects/Day04_State_and_Interactivity/solution/lab-4.3-taskboard)

Open the Local URL printed by Vite. Use Node.js 24 LTS and npm. Stop the dev server with Ctrl+C.

## Lab 4.1 — Counter, Toggle and Accordion

**What I built:** small components to practise `useState`, event handlers, updater functions and lifting state to a parent.

**How I built it:** the counter updates from its previous value; the toggle changes a wrapper class; the accordion stores open item ids in its parent and passes each item its open state and toggle handler.

**Demo and checks:**

- Click Plus and Minus. At zero, Minus must leave the count at zero.
- Click Plus 5 and confirm the count increases by exactly five; Reset returns it to zero.
- Toggle the theme and confirm both the label and wrapper appearance change.
- Open one accordion item, then a second. The first remains open, showing items work independently.
- Click Show all and confirm all three answers appear; click Hide all and confirm they all close.

## Lab 4.2 — Shopping Cart

**What I built:** a cart connected to the Day 3 product catalogue, with quantity controls and totals derived from cart state.

**How I built it:** `Shop` owns cart entries shaped as `{ productId, quantity }`; product cards call its add handler; `Cart` looks up product details and calculates item count and total during render.

**Demo and checks:**

- Add one in-stock product. Confirm a single cart line appears and the count and total update.
- Add that same product again. Confirm its quantity increases on the existing line rather than creating a duplicate.
- Use plus and minus to change quantity. Decrement the last item to zero and confirm the line disappears.
- Add an item, then use Remove and confirm that line is gone.
- Confirm out-of-stock products have a disabled Add to cart button.
- Remove all items and confirm the empty-cart message appears. Totals should always match the visible quantities and product prices.

## Lab 4.3 — TaskBoard: Add, Complete, Edit and Delete

**What I built:** the static board becomes interactive, with task state owned by `App` and progress derived in the header.

**How I built it:** the add form calls an add handler; `Board` and `Column` pass handlers to each card; each handler immutably updates the task array. Cards have a status selector, inline title editing and confirmed deletion.

**Demo and checks:**

- Submit a title shorter than three characters and confirm the validation message appears and no task is added.
- Add a valid task. It appears in To do with the entered assignee and points.
- Change its status to In progress and Done. Confirm it moves columns and the header's completed count changes.
- Edit the title and save; confirm the updated title is displayed. Optionally open Edit and Cancel to demonstrate the cancel control.
- Click Delete and cancel the browser confirmation; the task remains. Delete again and confirm; the task disappears and counts update.
- Show that the counter, accordion, theme toggle and shopping cart from earlier labs are still available in this cumulative checkpoint.

## Before Presenting

- Start the correct checkpoint and wait for Vite's ready message.
- Keep the browser console open if you want to show there are no runtime errors.
- Have one short explanation ready: task state is the source of truth; counts and cart totals are derived values rather than duplicated state.
