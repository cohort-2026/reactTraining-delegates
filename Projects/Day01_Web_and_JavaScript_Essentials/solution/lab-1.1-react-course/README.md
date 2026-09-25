# Lab 1.1 solution: Environment Setup and First GitHub Repository

This lab produces a working toolchain and a `react-course` repository on GitHub, so there is no code here. This folder contains:

- `example-README.md`: what a finished `react-course/README.md` looks like.
- The checklist below: what a finished setup looks like, so you can check yours.

## What changed in this lab

- Node.js LTS, npm, Git, VS Code and Chrome or Edge are installed.
- VS Code has Prettier, ESLint and Auto Rename Tag, with Format On Save using Prettier.
- A `react-course` folder exists with a `README.md`, committed and pushed to a GitHub repository called `react-course`.

## Finished setup checklist

### Tools

- [ ] `node -v` prints a version starting with `v24` (the current LTS)
- [ ] `npm -v` prints a version number
- [ ] `git --version` prints a version number
- [ ] `code --version` prints a version number
- [ ] The React Developer Tools extension is installed in Chrome or Edge (needed on Day 3)

### VS Code

- [ ] Extensions installed: **Prettier - Code formatter**, **ESLint**, **Auto Rename Tag**
- [ ] **Format On Save** is ticked and the **Default Formatter** is Prettier: add some messy indentation to `README.md`, save, and it is tidied
- [ ] The built-in terminal opens with Ctrl+backtick

### Git and GitHub

- [ ] `git config --global user.name` and `git config --global user.email` print your name and your GitHub email
- [ ] In `react-course`, `git status` says `On branch main` and `nothing to commit, working tree clean`
- [ ] `git log --oneline` shows your `Initial commit`
- [ ] `git remote -v` shows `origin` pointing at `https://github.com/<your-username>/react-course.git`
- [ ] Opening `https://github.com/<your-username>/react-course` shows your README rendered on the page
- [ ] The trainer has your repository URL or username

### What your terminal should look like

Version numbers will differ slightly from these; what matters is that each command prints a number.

```text
$ node -v
v24.19.0
$ npm -v
11.17.0
$ git --version
git version 2.50.1
$ git log --oneline
a1b2c3d (HEAD -> main, origin/main) Initial commit
$ git remote -v
origin  https://github.com/thandi-mokoena/react-course.git (fetch)
origin  https://github.com/thandi-mokoena/react-course.git (push)
```

## Stretch challenge

Edit the README on your machine, then:

```bash
git add README.md
git commit -m "Update course goal in README"
git push
```

On GitHub, click the commit count (the clock icon above the file list) to see both commits in the history.
