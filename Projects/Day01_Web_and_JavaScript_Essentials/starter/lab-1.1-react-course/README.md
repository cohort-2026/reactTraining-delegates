# Lab 1.1 starter: Environment Setup and First GitHub Repository

**Goal:** a working toolchain and your first project pushed to GitHub. **Suggested time:** 45 min.

This lab has no code to start from. It starts from the commands below. The file `README.template.md` in this folder is the README you will fill in and commit in step 6.

If you are stuck on setup for more than five minutes, put your hand up: setup problems are not a learning opportunity, they are just friction.

## Step 1: install the tools

Install each of these (see *The tools we install today* in your handbook):

- **Node.js LTS** (Node 24) from [nodejs.org](https://nodejs.org/en/download). Always choose **LTS**.
- **Visual Studio Code** from [code.visualstudio.com](https://code.visualstudio.com/)
- **Git** from [git-scm.com](https://git-scm.com/downloads) (on macOS, `git --version` offers to install it if it is missing)
- **Chrome or Edge**, with the **React Developer Tools** extension ready for Day 3

## Step 2: check your installation

Open a **new** terminal (PowerShell on Windows, Terminal on macOS). Same commands on both:

```bash
node -v
npm -v
git --version
code --version
```

Each command should print a version number.

## Step 3: set up VS Code

1. Open the **Extensions** view and install **Prettier - Code formatter**, **ESLint** and **Auto Rename Tag**.
2. Open Settings (Ctrl+comma / Cmd+comma), search **format on save** and tick it.
3. Search **default formatter** and choose **Prettier - Code formatter**.

## Step 4: create a GitHub account

Sign up at [github.com](https://github.com) if you do not already have an account.

## Step 5: create the `react-course` folder

Go to somewhere sensible, such as Documents, then:

```bash
mkdir react-course
cd react-course
code .
```

Open the VS Code terminal with **Ctrl+backtick** (Ctrl, not Cmd, on a Mac). Use that terminal from now on.

## Step 6: add a README

Copy `README.template.md` from this folder into `react-course` and rename it to `README.md`. Replace the TODO lines with your name and your course goal.

## Step 7: make your first commit

Use the same email as your GitHub account. You only run the two `git config` lines once per computer.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

git init
git add .
git commit -m "Initial commit"
```

## Step 8: push to GitHub

On GitHub click **New repository**, name it `react-course`, leave it **empty** (no README, licence or .gitignore) and click **Create repository**. Copy the HTTPS URL from the green **Code** button, then:

```bash
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

- **Windows:** a browser window may open asking you to sign in to GitHub. That is Git Credential Manager; sign in and approve.
- **macOS:** GitHub no longer accepts your account password for Git. Install Git Credential Manager (`brew install --cask git-credential-manager`), or run `gh auth login` with the GitHub CLI, or paste a personal access token as the password.

## Step 9: share your repository

Share your GitHub repository URL or username with the trainer, as they ask.

## Done when

- [ x] All four version commands print a number
- [ x] Your README is visible on github.com
- [ x] You can open the VS Code terminal

## Troubleshooting

| Problem | Fix |
|---|---|
| PowerShell script execution disabled | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, answer **Y**. |
| Command not recognised after install | Close all terminals and open a new one. |
| `code: command not found` on macOS | In VS Code press Cmd+Shift+P, type "shell command" and choose **Install 'code' command in PATH**. |
| `error: src refspec main does not match any` | Nothing has been committed yet. Check `README.md` exists, then add and commit again. |
| `remote origin already exists` | Run `git remote remove origin`, then add it again. |

When you have finished, compare your work with `../../solution/lab-1.1-react-course/`.
