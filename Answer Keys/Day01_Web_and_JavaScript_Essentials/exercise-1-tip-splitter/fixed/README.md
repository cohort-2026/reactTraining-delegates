# Day 1, Exercise 1 (warm-up): Tip Splitter

## The scenario

Your team goes out for lunch every Friday. A colleague wrote a small script that works out the tip, the total bill and how much each person pays, but it does not work. Your job is to find and fix the mistakes.

**This exercise contains 3 bugs.**

## What the code should do

`tip-splitter.js` holds a list of four lunches. For each lunch it should:

- work out the tip from the bill and the tip percentage;
- add the tip to the bill to get the total;
- if only one person ate, say there is no need to split; otherwise show how much each person pays.

At the end it counts how many lunches were split between more than one person.

When the code is fixed, the output is exactly:

```text
Team lunch tip splitter
-----------------------
Corner Café: total R495, each pays R165
Pizza Palace: total R690, each pays R172.5
Sushi Bar: total R144 (no need to split)
Braai Spot: total R1100, each pays R220
Lunches split between more than one person: 3
```

## How to run it

Open a terminal in this folder and run:

```bash
node tip-splitter.js
```

Run it again after every fix and compare your output with the expected output above.

## Revise these handbook sections

Day 1 handbook, Module 1.4: JavaScript Fundamentals:

- Decisions and repetition
- Functions and scope
- Debugging: reading errors without panic
- Lab 1.3 Troubleshooting table

## Hints

<details><summary>Hint 1</summary>

Start with the red error at the bottom. Read the whole message: it names the problem and the line. Which value is `undefined`, and why would the loop ask for it?

</details>

<details><summary>Hint 2</summary>

`NaN` means "not a number": some maths used a value that was not a number. Add a `console.log` inside each function to see what it gives back.

</details>

<details><summary>Hint 3</summary>

Even the four-person lunches say "no need to split". Look very closely at how the number of people is compared.

</details>
