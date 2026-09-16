# Day 1: Web and JavaScript Essentials

**React Development: Beginner to Professional** · Delegate Handbook · Capstone project: TaskBoard

> **Objective:** Set up a professional development environment and write your first JavaScript programs.

---

## Contents

- [How to use this handbook](#how-to-use-this-handbook)
- [Day 1 at a glance](#day-1-at-a-glance)
- [How this course works](#how-this-course-works)
- [Module 1.1: How the Web Works](#module-11-how-the-web-works)
- [Module 1.2: Developer Environment](#module-12-developer-environment)
- [Module 1.3: HTML and CSS Refresher](#module-13-html-and-css-refresher)
- [Module 1.4: JavaScript Fundamentals](#module-14-javascript-fundamentals)
- [Hands-on labs](#hands-on-labs)
  - [Lab 1.1: Environment Setup and First GitHub Repository](#lab-11-environment-setup-and-first-github-repository)
  - [Lab 1.2: Build a Static Profile Page](#lab-12-build-a-static-profile-page)
  - [Lab 1.3: JavaScript Exercises: Tip Calculator and Grade Checker](#lab-13-javascript-exercises-tip-calculator-and-grade-checker)
- [Knowledge check](#knowledge-check)
- [Key takeaways](#key-takeaways)
- [Further reading](#further-reading)
- [Answer key](#answer-key)

---

## How to use this handbook

This handbook accompanies the instructor-led session. It follows the same order as the slides, explains each concept in plain language, and gives you everything you need to complete the labs and revise afterwards.

- **Modules** explain each topic, with code examples you can type and run.
- **Code** appears in code blocks. Type it yourself rather than copying: it builds memory and teaches you to read errors.
- **Commands** are shown for Windows (PowerShell) and macOS (Terminal). Where both are identical, one block is shown.
- **Callouts** marked Tip, Good to know, Troubleshooting and Check your understanding highlight key ideas. Answers are hidden in expandable sections so you can test yourself first.
- **Labs** have a goal, numbered steps and a *Done when* checklist.
- **The answer key** at the back covers the knowledge check questions.

---

## Day 1 at a glance

| Part | Topic |
|---|---|
| Intro | Welcome, course map and the capstone project |
| 1.1 | How the web works |
| 1.2 | Developer environment: Node.js, VS Code, terminal, Git |
| 1.3 | HTML and CSS refresher |
| 1.4 | JavaScript fundamentals |
| Labs | Three labs: setup, profile page, JavaScript exercises |

### By the end of today you will be able to

- Explain the roles of HTML, CSS and JavaScript, and what happens when a browser loads a URL
- Describe what React is and the problem it solves
- Install and check Node.js, npm, VS Code and Git, and use the terminal on Windows or macOS
- Create a Git repository and push it to GitHub
- Build a page with semantic HTML, Flexbox and Grid, and inspect it with DevTools
- Write and debug JavaScript that uses variables, conditionals, loops, functions, arrays and objects

### Labs today

| Lab | Title | Time |
|---|---|---|
| 1.1 | Environment Setup and First GitHub Repository | 45 min |
| 1.2 | Build a Static Profile Page | 50 min |
| 1.3 | JavaScript Exercises: Tip Calculator and Grade Checker | 50 min |

---

## How this course works

You will spend more time typing than listening. The trainer explains a concept briefly, shows it live, and then you do it yourself.

- **Short theory, lots of practice.** Roughly 40% explanation and demos, 60% hands-on.
- **One capstone app all course.** TaskBoard, a team task manager like a simplified Trello, grows a little every day. On Day 3 it is a static list. By Day 10 it has a login, a real database and automated tests, and it is live on the internet with a public URL you can share with an employer.
- **Daily knowledge check.** Five quick questions every morning on the previous day. It is not a test and nobody is marked.
- **Take-home practice.** One short exercise every evening to lock in the learning.
- **Ask early.** A question asked today saves an hour of confusion tomorrow.

> **Golden rule**
> Typing the code yourself, even when you could copy it, is how the patterns move from the slide into your fingers. When you make a typo and fix it, you learn how to read error messages, which is one of the most valuable skills in this job.

### The 10-day journey

| Stage | Days | Focus |
|---|---|---|
| 1 | Days 1 to 2 | Foundations: web basics, tools, JavaScript and modern JavaScript |
| 2 | Days 3 to 5 | React core: components, props, state, effects and hooks |
| 3 | Days 6 to 8 | Professional tools: TypeScript, routing, state libraries, styling, forms |
| 4 | Day 9 | Full-stack: Next.js, Server Components and a Supabase database |
| 5 | Day 10 | Ship it: performance, testing, CI/CD and deployment |

The pace is fast, which is why the take-home practice matters. If you feel lost at any point, tell the trainer at a break. It is normal and it is fixable.

> **Good to know: will you be job ready after ten days?**
> You will have a solid foundation and a real portfolio project. Job readiness comes from building several more projects on your own after this course.

---

## Module 1.1: How the Web Works

*Browsers, servers, and where React fits in.*

Before writing any code, you need a mental picture of what happens when you open a website. Everything else in the course hangs on this picture.

### The three languages of the browser

A browser works with three core languages. HTML describes the structure, CSS describes how things look, and JavaScript describes how they behave.

| Language | Role | Analogy |
|---|---|---|
| **HTML** | Structure: the content and its meaning (headings, paragraphs, buttons, images, forms) | The walls and rooms of a house |
| **CSS** | Presentation: colours, fonts, spacing, layout, animation | The paint, tiles and furniture |
| **JavaScript** | Behaviour: reacting to clicks, loading data, updating the page without a reload | The electricity and plumbing: flick a switch and something happens |

React is a JavaScript library. When you write React, you are writing JavaScript that generates HTML and applies CSS. The browser never sees "React"; it only ever sees HTML, CSS and JavaScript.

> **Try it:** open any website, right-click and choose **View page source** to see the raw HTML. Then open DevTools (F12 on Windows, Cmd+Option+I on macOS) and look at the **Elements** and **Styles** panels.

> **Check your understanding**
> 1. Which of the three would you change to make a button red?
> 2. Which would you change so that clicking a button shows a message?
>
> <details><summary>Answers</summary>
>
> 1. CSS.
> 2. JavaScript.
>
> </details>

### What happens when you visit a URL

1. **You type a URL.** The browser uses DNS to translate a name such as `google.com` into a numeric IP address, much like looking up a phone number.
2. **The browser sends a request.** An HTTP `GET` request asks the server for the page.
3. **The server sends a response.** It replies with a status code and the HTML, which links to CSS, JavaScript and images.
4. **The browser renders.** It downloads the CSS and JavaScript the HTML points to, builds the page, applies the CSS and runs the JavaScript, which can change the page at any time.

Two terms you will use all course:

- **Client:** the browser, running on the user's device. Our React code mostly runs here.
- **Server:** the computer that answers requests. On Day 9 we will also run React on the server.

Status codes you will see constantly:

| Code | Meaning |
|---|---|
| 200 | OK |
| 401 | Not logged in (unauthenticated) |
| 404 | Not found |
| 500 | Something went wrong on the server |

> **Try it:** in DevTools open the **Network** tab, refresh the page, and click the first request. Find the status code, the request headers and the response.

> **Good to know: HTTPS**
> HTTPS is HTTP with encryption, so nobody in between can read or change the data.

### What is React, and why does it exist?

React is a JavaScript library for building user interfaces. It was created at Facebook and has been open source since 2013. Facebook built it because their pages were getting too complex to update by hand: think of the notification badge, the chat window and the news feed all needing to stay in sync.

- **Components.** Instead of one giant page, you build small, reusable pieces such as a `Button`, a `TaskCard` or a `Navbar`, and combine them like building blocks.
- **Declarative.** In plain JavaScript you say "find this element, change its text, add a class, remove that other element". That is *imperative*. In React you say "when the task list has three items, the screen looks like this", and React works out what to change. Imperative is giving a taxi driver every turn; declarative is giving the driver the destination.
- **Huge ecosystem.** React is used by Meta, Netflix, Airbnb, Microsoft, Shopify and thousands of other employers.
- **React 19.** This course uses React 19. Some tutorials online still show older styles, such as class components; the course points out the differences when they matter.

> **The core idea**
> Without React you must manually find and change every part of the page when data changes. With React you change the data, and the page follows.

> **Good to know: React, Angular or Vue?**
> All are good. React has the largest job market and ecosystem, which is why this course uses it.

---

## Module 1.2: Developer Environment

*The professional toolkit you will use every day.*

Setting up your machine the way a professional developer would takes a bit of patience, but once it is done, it is done for the whole course. You need administrator rights on your laptop to install these tools; if you do not have them, tell the trainer straight away.

### The tools we install today

| Tool | What it does | Where to get it |
|---|---|---|
| **Node.js and npm** | Runs JavaScript outside the browser. Every React project uses Node behind the scenes to run a development server and build the final app. npm (the Node Package Manager) comes with Node and installs packages, including React itself. | Current **LTS** release from [nodejs.org](https://nodejs.org/en/download) |
| **Visual Studio Code** | A free code editor with excellent JavaScript and React support. | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Git and GitHub** | Git is a version control system: unlimited, labelled save points for your project. GitHub stores Git projects online and is where employers will look at your work. | [git-scm.com](https://git-scm.com/downloads) and [github.com](https://github.com) |
| **Chrome or Edge** | A modern browser with DevTools. Add the **React Developer Tools** extension ready for Day 3. | Your browser's extension store |

Always choose the **LTS** version of Node. LTS means Long Term Support: it is the stable release.

> **Good to know: Git on macOS**
> Git is often already installed on a Mac with the Xcode Command Line Tools. Typing `git --version` in Terminal will offer to install them if Git is missing.

### Check your installation

After installing, prove each tool works from the terminal. On Windows open **PowerShell** from the Start menu; on macOS open **Terminal** with Cmd+Space. Type each command on its own line and press Enter.

**Windows and macOS: same commands**

```bash
node -v
npm -v
git --version
code --version
```

Each command should print a version number. Do not worry if your numbers are slightly different from the trainer's; what matters is that each command prints a number.

> **Troubleshooting**
>
> | Platform | Problem | Fix |
> |---|---|---|
> | Windows | `npm : File ... cannot be loaded because running scripts is disabled on this system.` | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell, answer **Y**, then try `npm -v` again. |
> | Both | `command not found` or `not recognized` straight after installing | The terminal was opened before the install finished. Close every terminal window and open a new one. |
> | macOS | `code: command not found` | In VS Code press Cmd+Shift+P, type "shell command" and choose **Install 'code' command in PATH**. |

### Terminal survival kit

You only need six commands this week.

| Purpose | Windows (PowerShell) | macOS (Terminal) |
|---|---|---|
| Where am I? | `Get-Location` | `pwd` |
| What is here? | `ls` | `ls` |
| Make a folder | `mkdir react-course` | `mkdir react-course` |
| Move into a folder | `cd react-course` | `cd react-course` |
| Move up one level | `cd ..` | `cd ..` |
| Open this folder in VS Code | `code .` | `code .` |

In `code .` the dot means "this folder".

> **Tip**
> - Press **Tab** to autocomplete folder names, and the **Up arrow** to repeat a previous command.
> - VS Code has a built-in terminal. Open it with **Ctrl+backtick** (`` Ctrl+` ``) on both Windows and macOS (it is Ctrl, not Cmd, on a Mac). We use that terminal for the rest of the course so everything is in one window.

> **Good to know: can I use Command Prompt instead of PowerShell?**
> Yes, most commands are the same, but stick to PowerShell to match the slides.

### Set up VS Code like a professional

VS Code is good out of the box, but three extensions make a big difference. Click the **Extensions** icon on the left (the four squares) and search for each one:

- **Prettier - Code formatter** (publisher: Prettier): formats your code automatically every time you save.
- **ESLint** (publisher: Microsoft): highlights mistakes and bad patterns as you type.
- **Auto Rename Tag:** renames the closing HTML tag when you edit the opening one.

Then open Settings (Ctrl+comma on Windows, Cmd+comma on macOS):

1. Search **format on save** and tick it.
2. Search **default formatter** and choose **Prettier - Code formatter**.

Now whenever you save a file, the code is tidied automatically. This matters because messy indentation hides bugs, especially in React where we nest a lot.

Three shortcuts to learn today:

| Shortcut | Action |
|---|---|
| Ctrl+P / Cmd+P | Jump to any file by name |
| Ctrl+Shift+P / Cmd+Shift+P | Open the command palette, which can do almost anything |
| Alt+Up/Down / Option+Up/Down | Move the current line up or down |

### The Git workflow

Git works like a camera for your code.

1. **Initialise:** `git init` turns a folder into a repository. Git now watches it.
2. **Stage:** `git add .` selects the changes you want to save in the next snapshot (choosing what goes in the photo).
3. **Commit:** `git commit -m "message"` saves a labelled snapshot on your computer (taking the photo with a caption).
4. **Push:** `git push` uploads your commits to GitHub so they are backed up and visible.

A good commit message says what changed, in plain English, for example `Add profile page layout`. Avoid messages like "stuff" or "fix": future you, and future employers, will read them.

You will commit many times a day. Rule of thumb: every time something works, commit it. If you break something later, you can always get back.

> **Check your understanding**
> Why is it useful to have snapshots rather than a single saved file?
>
> <details><summary>Answer</summary>
>
> You can go back, compare changes, and work on experiments safely.
>
> </details>

> **Good to know: branches**
> A branch is a parallel line of snapshots, so you can try something without affecting the main version. You will use them on Day 10 with pull requests.

### Your first repository

**Windows and macOS: same commands**

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

- The two `git config` lines tell Git who you are. Use the same email as your GitHub account. Run them once per computer.
- `git init`, `git add .` and `git commit` create your first local snapshot.
- `git branch -M main` names your main branch `main`.
- `git remote add origin` tells Git where your GitHub repository lives. Copy `<your-repo-url>` (the HTTPS URL) from the green **Code** button on your new GitHub repository.
- `git push -u origin main` uploads your commits.

To create the repository on GitHub: click **New repository**, name it `react-course`, leave it empty (no README, licence or .gitignore), and click **Create repository**.

> **Troubleshooting**
>
> | Problem | Fix |
> |---|---|
> | **Windows:** the first push opens a browser window asking you to sign in to GitHub | This is Git Credential Manager, bundled with Git for Windows, and is expected. Sign in and approve. |
> | **macOS:** the terminal asks for a username and password, and your GitHub password is rejected | GitHub no longer accepts account passwords for Git. Install Git Credential Manager (`brew install --cask git-credential-manager`), or install the GitHub CLI and run `gh auth login`, then push again. A personal access token pasted as the password also works. |
> | `error: src refspec main does not match any` | You have not made a commit yet, usually because the folder is empty. Create a file, then add and commit again. |
> | `remote origin already exists` | Run `git remote remove origin`, then add it again. |

---

## Module 1.3: HTML and CSS Refresher

*Just enough to read and write what React produces.*

React outputs HTML and styles it with CSS, so you need a working knowledge of both. This is a refresher, not a full course: focus on the patterns you will see in every React component.

### Semantic HTML: a page skeleton

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Profile</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header><h1>Thandi Mokoena</h1></header>
    <main>
      <section>
        <h2>About me</h2>
        <p>Aspiring React developer.</p>
        <button>Contact me</button>
      </section>
    </main>
    <footer>2026</footer>
  </body>
</html>
```

Every page has the same outer shell: the doctype, the `html` element, a `head` for information about the page, and a `body` for what users see.

- An **element** is an opening tag, content, and a closing tag.
- **Attributes** live inside the opening tag and configure the element: `lang`, `rel` and `href` in this example. `href` on the `link` element points to our CSS file.
- **Semantic tags** such as `header`, `nav`, `main`, `section` and `footer` describe what the content *means*, rather than using a pile of `div` elements.
- Meaning helps screen readers guide blind users around the page, and helps search engines understand it. Accessibility is covered properly on Day 8.
- In VS Code, type `!` then press **Tab** in an empty `.html` file to generate a skeleton (this is Emmet). The generated skeleton also includes `<meta charset="UTF-8">` and a viewport tag, which you should keep.

> **Try it:** create `index.html`, generate the skeleton, fill in the body as shown, then open the file in the browser by double-clicking it in File Explorer or Finder.

> **Check your understanding**
> Which tag would you use for the main navigation links?
>
> <details><summary>Answer</summary>
>
> `nav`.
>
> </details>

### CSS layout: Flexbox and Grid

A CSS rule has a **selector** and a set of `property: value` pairs. The dot means "class", so `.nav` targets every element with `class="nav"`.

**Flexbox: one direction**

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

**Grid: rows and columns**

```css
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

- **Flexbox** lays items out in one direction, a row or a column. `justify-content` controls spacing *along* that direction, `align-items` controls alignment *across* it, and `gap` adds space between items. Ideal for navbars, button rows and centring things.
- **Grid** lays items out in two dimensions. `repeat(3, 1fr)` means three columns of equal width; `fr` means "fraction of the available space". Ideal for card layouts and dashboards.
- **The box model:** every element is a box made of content, then padding, then the border, then margin outside the border. When spacing looks wrong, it is almost always the box model.

> **Try it:** in DevTools, select an element and look at the box model diagram in the **Computed** tab. Toggle `display: flex` on a container and watch the layout change.

> **Tip**
> [Flexbox Froggy](https://flexboxfroggy.com/) and [Grid Garden](https://cssgridgarden.com/) are fun practice games.

---

## Module 1.4: JavaScript Fundamentals

*The language React is written in.*

This is the most important module of the day. Everything you write in React from Day 3 onwards is JavaScript. You will run your code with Node.js in the terminal, so no browser is needed. Create a folder called `js-basics` inside `react-course` and open it in VS Code.

### Variables and data types

A variable is a labelled box that holds a value. You create variables with `const` or `let`.

**basics.js**

```js
const courseName = "React Bootcamp"; // string
const days = 10;            // number
const isBeginner = true;    // boolean
let completedDays = 0;

completedDays = completedDays + 1; // ok
// days = 11; TypeError: const

let nickname;               // undefined
const mentor = null;        // empty on purpose

console.log(courseName, days, isBeginner);
console.log(typeof days);   // "number"
```

Run it with:

```bash
node basics.js
```

- **`const`** means the label always points at the same value. It cannot be reassigned. Use it by default.
- **`let`** means you can put a new value in later. Use it only when the value must change.
- **Avoid `var`.** It is the old way and has confusing scoping rules. You will still see it in older code.

| Type | Meaning | Example |
|---|---|---|
| string | Text, in quotes | `"React Bootcamp"` |
| number | Any number, whole or decimal | `10`, `67.5` |
| boolean | `true` or `false` | `true` |
| undefined | No value has been given yet | `let nickname;` |
| null | Deliberately empty | `const mentor = null;` |

`console.log` prints to the terminal and is your best friend for understanding what your code is doing. `typeof` tells you the type of a value.

> **Try it:** uncomment the `days = 11` line and run the file again. Read the error aloud: it tells you the file, the line and the problem (`TypeError: Assignment to constant variable.`).

> **Check your understanding**
> Should a user's shopping cart total be `const` or `let`?
>
> <details><summary>Answer</summary>
>
> `let`, because it changes. (In React you will handle changing values differently, with state.)
>
> </details>

### Decisions and repetition

**control.js**

```js
const score = 72;

if (score >= 80) {
  console.log("Distinction");
} else if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}

const label = score >= 50 ? "Pass" : "Fail"; // ternary

for (let i = 1; i <= 3; i++) {
  console.log("Day " + i);
}

console.log(5 === "5");  // false: always use ===
```

- **`if / else if / else`** chooses a path. The condition goes in round brackets and the code to run goes in curly braces. JavaScript checks each condition from top to bottom and runs the first one that is true.
- **The ternary operator** is a one-line if/else: `condition ? valueIfTrue : valueIfFalse`. You will use it constantly in React to decide what to show on screen.
- **A `for` loop** repeats code. It has three parts: a starting value, a condition to keep going, and what to do after each round. `i++` adds one to `i`. Tomorrow you will learn array methods that replace most `for` loops in React code.
- **Always compare with `===` and `!==`.** They compare value *and* type. Double equals converts types first, so `5 == "5"` is `true`, which causes subtle bugs.
- **Logical operators:** `&&` means AND, `||` means OR, `!` means NOT. In React you will use `&&` to show something only when a condition is true.

> **Try it:** run the file, then change `score` to 85 and to 30 and run it again.

### Functions and scope

**functions.js**

```js
function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
  return tip;
}

const tip = calculateTip(450, 15);
console.log("Tip: R" + tip);  // Tip: R67.5

function greet(name = "friend") {
  return "Hello, " + name;
}

console.log(greet("Sipho"));  // Hello, Sipho
console.log(greet());         // Hello, friend
```

- A function is a reusable recipe. You define it once with **parameters** (the ingredients) and call it many times with **arguments** (the actual values). **`return`** sends the result back to whoever called the function.
- **Default values** such as `name = "friend"` apply when an argument is missing.
- **Scope:** the `tip` inside the function is a different variable from the `tip` outside it. Variables created with `let` or `const` inside curly braces only exist inside those braces, which keeps functions independent and safe.

> **The most important sentence of the day**
> A React component is just a JavaScript function that returns what should appear on screen. If you understand functions, you are already halfway to understanding components.

> **Try it:** remove the `return` statement from `calculateTip` and run the file. `console.log` now prints `undefined`, one of the most common beginner bugs.

> **Check your understanding**
> What does a function return if it has no `return` statement?
>
> <details><summary>Answer</summary>
>
> `undefined`.
>
> </details>

### Arrays and objects

**data.js**

```js
const tasks = ["Install Node", "Learn Git"];
console.log(tasks[0]);     // "Install Node"
console.log(tasks.length); // 2
tasks.push("Write JS");

const task = {
  id: 1,
  title: "Learn Git",
  done: false,
  tags: ["tools", "day1"],
};
console.log(task.title);   // "Learn Git"
task.done = true;

const board = [
  { id: 1, title: "Install Node", done: true },
  { id: 2, title: "Learn Git", done: false },
];
```

- **Array:** an ordered list inside square brackets, counted from 0, so `tasks[0]` is the first item. `length` tells you how many items there are, and `push` adds to the end.
- **Object:** one thing described by `key: value` pairs inside curly braces. Read a value with a dot (`task.title`) and change it the same way.
- **Array of objects:** the shape of almost all app data: products, users, messages. Data from APIs almost always arrives like this, and TaskBoard stores its tasks exactly like this.
- **`const` does not freeze contents.** You can still `push` to a `const` array or change a property on a `const` object. `const` stops you reassigning the variable, not changing what is inside. On Day 2 you will learn why React code avoids changing things in place anyway.

> **Try it:** add `console.log(board[1].title)` and predict the output before you run it.

> **Check your understanding**
> How would you print whether the first task on the board is done?
>
> <details><summary>Answer</summary>
>
> `console.log(board[0].done);`
>
> </details>

### Debugging: reading errors without panic

You will see a lot of red text this week. That is normal: errors are the computer telling you exactly what went wrong.

- **Read the whole error.** It names the type, the message, and the location, such as `data.js:14`. Go to that line first.
- **`ReferenceError`:** you used a name that does not exist, usually a typo, or a variable used before it was created.
- **`TypeError`:** the value exists but you used it the wrong way, for example reading `.title` of `undefined` or calling `undefined` as a function.
- **`SyntaxError`:** the code is not valid JavaScript, usually a missing bracket, quote or comma. VS Code underlines these in red before you even run the code.
- **`console.log`** the value right before the line that fails.
- **Breakpoints:** in VS Code, click in the gutter to the left of a line number to add a red dot. Open **Run and Debug** (Ctrl+Shift+D or Cmd+Shift+D), choose **Node.js**, and step through with **F10** while watching variables in the side panel.

The debugging loop: read the error, form a guess, test it with `console.log`, fix, repeat.

> **Mindset**
> Every developer sees errors all day. Senior developers are simply faster at reading them.

---

## Hands-on labs

Work through each lab in order. Read the goal first, follow the numbered steps, and use the *Done when* checklist to confirm you have finished. Hints and troubleshooting notes follow each lab: try on your own first, then use them if you are stuck for more than a few minutes.

### Lab 1.1: Environment Setup and First GitHub Repository

| | |
|---|---|
| **Goal** | A working toolchain and your first project pushed to GitHub. |
| **Suggested time** | 45 min |

Follow the steps in order. If you are stuck on setup for more than five minutes, put your hand up: setup problems are not a learning opportunity, they are just friction.

#### Steps

1. Install **Node.js LTS**, **VS Code**, **Git** and **Chrome or Edge** (see [The tools we install today](#the-tools-we-install-today)).
2. Open a new terminal and run `node -v`, `npm -v`, `git --version` and `code --version`.
3. In VS Code, install **Prettier**, **ESLint** and **Auto Rename Tag**, then enable **Format On Save** with Prettier as the default formatter.
4. Create a GitHub account at [github.com](https://github.com) if you do not have one.
5. Create a `react-course` folder (for example in Documents) and open it with `code .`.
6. Add a `README.md` with your name and your course goal, for example:
   ```markdown
   # React Course
   Thandi Mokoena. By the end of this course I want to build a booking app for my running club.
   ```
7. Run `git config` (name and email), then `git init`, `git add .` and `git commit -m "Initial commit"`.
8. On GitHub create an **empty** repository called `react-course`, then run `git branch -M main`, `git remote add origin <your-repo-url>` and `git push -u origin main`.
9. Share your GitHub repository URL or username with the trainer, as they ask, so your work can be reviewed during the course.

#### Done when

- [ ] All four version commands print a number
- [ ] Your README is visible on github.com
- [ ] You can open the VS Code terminal

#### Troubleshooting

| Problem | Fix |
|---|---|
| PowerShell script execution disabled | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, answer **Y**. |
| Command not recognised after install | Close all terminals and open a new one. |
| Corporate laptop blocking installs | Tell the trainer straight away so venue IT can help, and pair with a neighbour in the meantime. |
| GitHub sign-in window does not appear | Run `git config credential.helper` (without `--global`, because the installers set it at system level) and check it shows `manager` (Windows) or `osxkeychain` (macOS). On macOS you need Git Credential Manager, `gh auth login` or a personal access token; see [Your first repository](#your-first-repository). |
| `error: src refspec main does not match any` | Nothing has been committed yet. Check `README.md` exists, then add and commit again. |

> **Stretch challenge**
> Edit the README on your machine, commit and push a second time, then view the commit history on GitHub.

### Lab 1.2: Build a Static Profile Page

| | |
|---|---|
| **Goal** | A personal profile page using semantic HTML and CSS layout. |
| **Suggested time** | 50 min |

Build a simple profile page about yourself. It does not need to be beautiful. What matters is that you use semantic tags, Flexbox for the navigation and Grid for the skills cards.

#### Steps

1. In `react-course`, create a folder `profile-page` containing `index.html` and `style.css`.
2. In `index.html`, type `!` and press **Tab** to generate the skeleton, then link the stylesheet inside `head`: `<link rel="stylesheet" href="style.css" />`.
3. Add a `header` containing a `nav`, a `main` with `section`s for **About**, **Skills** and **Goals**, and a `footer`.
4. Style the `nav` with Flexbox: your name on the left, links on the right.
5. Show your skills as a grid of three cards.
6. Add a button and style its hover state.
7. Open the page in the browser and inspect it with DevTools.
8. Commit and push.

#### Done when

- [ ] The page uses semantic tags, not only `div`s
- [ ] The nav uses Flexbox and the skills use Grid
- [ ] Your changes are pushed to GitHub

<details><summary><strong>Hints</strong> (try on your own first)</summary>

```css
/* Box sizing reset at the top of the CSS */
* { box-sizing: border-box; }

/* Centre the page */
main { max-width: 900px; margin: 0 auto; }

/* Card look */
.card { padding: 16px; border: 1px solid #ddd; border-radius: 8px; }

/* Hover style */
.btn:hover { background: #0e7490; color: white; }
```

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| Styles not applied | The `href` in the `link` tag does not match the filename, or `style.css` is in a different folder. |
| Changes not visible | The browser is showing a cached page. Save, then refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (macOS). |
| Flexbox not working | `display: flex` is on the child instead of the parent container. |

> **Stretch challenge**
> Make the skills grid responsive with a media query:
> ```css
> @media (max-width: 600px) {
>   .cards { grid-template-columns: 1fr; }
> }
> ```

### Lab 1.3: JavaScript Exercises: Tip Calculator and Grade Checker

| | |
|---|---|
| **Goal** | Practise variables, conditionals, functions, arrays and objects in Node.js. |
| **Suggested time** | 50 min |

This lab pulls together everything from Module 1.4. Work step by step and run the file after every step; do not write everything and run it once at the end.

#### Steps

1. In `js-basics`, create `lab1-3.js`.
2. Write `calculateTip(bill, percent)` that returns the tip.
3. Write `totalWithTip(bill, percent)` that reuses `calculateTip`.
4. Write `getGrade(score)` that returns `"Distinction"` (80 or more), `"Pass"` (50 or more) or `"Try again"`.
5. Create an array of 4 student objects, each with a `name` and a `score`.
6. Loop through the students and log each name with their grade.
7. Count how many students passed and log the total.
8. Run with `node lab1-3.js`, then commit and push.

#### Done when

- [ ] All functions return values (no `undefined`)
- [ ] The output lists every student with a grade
- [ ] The pass count is correct

<details><summary><strong>Hints: expected shape of the loop</strong> (try on your own first)</summary>

```js
const students = [{ name: "Ayanda", score: 82 }, ...];
let passed = 0;
for (let i = 0; i < students.length; i++) {
  const grade = getGrade(students[i].score);
  console.log(students[i].name + ": " + grade);
  if (grade !== "Try again") passed++;
}
```

Replace `...` with your other three students.

</details>

#### Troubleshooting

| Problem | Fix |
|---|---|
| `undefined` printed | The function is missing `return`. |
| `NaN` printed | A value in the maths is `undefined`, usually a missing argument or a misspelled property such as `students[i].scroe`. (A misspelled *variable* name throws a `ReferenceError` instead, and a number in quotes makes `+` join text rather than add.) |
| Loop goes one too far and crashes | The condition is written as `i <= students.length` instead of `i < students.length`. |

> **Stretch challenge**
> - Add an average score.
> - Add a function that returns the top student.
> - Format money to two decimal places with `tip.toFixed(2)`.

Keep this file. Tomorrow you will rewrite this loop in one line with an array method and compare.

---

## Knowledge check

Test yourself on today's content. Try to answer without looking back, then check the [answer key](#answer-key).

1. Which browser language controls behaviour: HTML, CSS or JavaScript?
2. What is the difference between `const` and `let`?
3. Which Git command uploads your commits to GitHub?
4. What does the ternary expression `score >= 50 ? "Pass" : "Fail"` return when `score` is 40?
5. What does a function return if it has no `return` statement?
6. Why is an array of objects such an important data shape?

---

## Key takeaways

### What you learned

- The browser speaks HTML, CSS and JavaScript; React generates all three.
- Node.js runs JavaScript on your machine; npm installs packages.
- Git snapshots your work; GitHub stores it and becomes your portfolio.
- Semantic HTML plus Flexbox and Grid cover most layouts.
- Variables, conditions, functions, arrays and objects are the building blocks of every React app.

### Take-home practice

> Write a function called `summariseTasks(tasks)` that takes an array of task objects with `title` and `done`, and logs how many are done and how many remain, for example `3 done, 2 remaining`. Push it to GitHub. This takes 20 to 30 minutes.
>
> Optional: play five levels of [Flexbox Froggy](https://flexboxfroggy.com/).

### Looking ahead

Tomorrow you move into modern JavaScript: arrow functions, destructuring, array methods and async code, which is exactly the JavaScript React uses. By the end of tomorrow, you will have created your first React project. Bring your laptop charged, with everything from today installed.

---

## Further reading

These official resources cover today's topics in more depth. When searching for help, add "mdn" to your search to get the reliable MDN answer first.

| Resource | Link |
|---|---|
| Node.js downloads | https://nodejs.org/en/download |
| VS Code | https://code.visualstudio.com/ |
| Git | https://git-scm.com/downloads |
| GitHub Docs: Hello World | https://docs.github.com/en/get-started/start-your-journey/hello-world |
| MDN: HTML basics | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content |
| MDN: JavaScript guide | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide |
| Flexbox Froggy | https://flexboxfroggy.com/ |
| Grid Garden | https://cssgridgarden.com/ |

---

## Answer key

Use these answers to check your own work. If an answer surprises you, return to the matching module.

### Knowledge check

1. JavaScript.
2. `const` cannot be reassigned; `let` can. Use `const` by default.
3. `git push`.
4. `"Fail"`.
5. `undefined`.
6. Most real app data arrives as lists of records (tasks, users, products), and React renders lists of objects constantly.

---

## My notes

&nbsp;
