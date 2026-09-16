# Exercise 9.1 (warm-up): Project pages

## The scenario

A teammate has started moving the TaskBoard project pages to the Next.js App Router. They say it "nearly works", but `npm run build` fails, and they could not get any project page to show its tasks. Your job is to find and fix the mistakes so the pages behave as described below.

The data lives in `lib/data.ts` and is hard-coded, like the temporary data in Lab 9.1. No database or account is needed.

## What the app should do

When everything is fixed:

- [ ] `npm run build` finishes with no errors, and `npm run lint` and `npm run typecheck` pass.
- [ ] `/` lists three projects: Website redesign, Mobile app and Old archive.
- [ ] `/projects/website` shows the heading **Website redesign** and two task cards. `/projects/mobile` shows **Mobile app** and one card.
- [ ] On a task card, the **+** and **-** buttons change the points shown on that card.
- [ ] `/projects/nope` shows **Project not found** with a link back to all projects.
- [ ] `/projects/archive` shows **Something went wrong** with a **Try again** button, while the page header stays visible. The archive service in `lib/data.ts` is always offline on purpose, so this is the error page doing its job.
- [ ] While you click through the pages with `npm run dev` running, the terminal shows no errors, apart from the expected "The archive service is offline" when you open the archive project.

## How to run it

Use a terminal in this folder. The commands are the same on Windows and macOS.

```bash
npm install
npm run build
```

Once the build passes, start the development server and open http://localhost:3000:

```bash
npm run dev
```

Stop the server with **Ctrl+C**. You can also run `npm run lint` and `npm run typecheck`.

## Your task

**This exercise contains 3 bugs.** Fix them in `app/` and `components/`. Do not change `lib/data.ts`.

Revise these handbook sections (Day 9):

- Module 9.1: *Dynamic routes and params*
- Module 9.2: *The "use client" boundary*
- Module 9.4: *Error boundaries with error.tsx*

<details><summary><strong>Hint 1</strong></summary>

Read each build error slowly: the file, the line, and what Next.js says it expected. Next.js stops at errors in the code itself before it runs later checks, so fix what it reports, then build again.

</details>

<details><summary><strong>Hint 2</strong></summary>

A passing build is not the finish line. Run `npm run dev`, open every URL in the checklist, and watch the terminal as well as the browser. Next.js prints helpful messages there.

</details>

<details><summary><strong>Hint 3</strong></summary>

Compare each special file and each interactive component with the matching example in the handbook. Look at the very top of each file, and at how the page reads its URL parameter.

</details>
