# Day 1, Exercise 2 (harder): Sprint Report

## The scenario

Your team plans its work in two-week sprints. Every Friday the team lead runs a script that prints a short progress report. This week the report is wrong in several places and ends with an error. Fix it before the stand-up meeting.

**This exercise contains 5 bugs.**

## What the code should do

`sprint-report.js` holds two sprints, each with an array of task objects. The script should:

1. For each sprint, count the tasks that are done, work out the percentage, and give a status:
   - `Ahead` when 80% or more is done;
   - `On track` when 50% or more is done;
   - `Behind` otherwise.
2. Look up a task by its `id` and print its title and assignee, or `not found` if no task has that id.
3. Add up the points of every task in both sprints.

When the code is fixed, the output is exactly:

```text
Sprint report
=============
Sprint 11: 4 of 5 tasks done (80%) - Ahead
Sprint 12: 2 of 4 tasks done (50%) - On track
Task 3: Design login page (Naledi)
Task 6: Fix typo in footer (Naledi)
Total points across all sprints: 36
```

Check the numbers yourself from the data at the top of the file before you trust the script.

## How to run it

Open a terminal in this folder and run:

```bash
node sprint-report.js
```

Run it after every fix. Some bugs only change one word of the output, so compare carefully, line by line.

## Revise these handbook sections

Day 1 handbook, Module 1.4: JavaScript Fundamentals:

- Variables and data types (`const` and `let`)
- Decisions and repetition
- Functions and scope (what `return` does)
- Arrays and objects
- Debugging: reading errors without panic

## Hints

<details><summary>Hint 1</summary>

Work line by line. For each wrong line of output, find the function that produces it and follow it with a real example: "Sprint 12 has 4 tasks. Which of them does this loop actually look at?"

</details>

<details><summary>Hint 2</summary>

JavaScript checks `if / else if` conditions from top to bottom and runs the **first** one that is true. Try `getStatus(80)` in your head.

</details>

<details><summary>Hint 3</summary>

`return` stops a function straight away, even in the middle of a loop. And `undefined` in the output usually means a property name does not match the data exactly.

</details>
