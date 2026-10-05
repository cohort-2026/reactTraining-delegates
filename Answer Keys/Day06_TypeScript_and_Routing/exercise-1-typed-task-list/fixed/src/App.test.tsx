import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

async function addTask(title: string, assignee = "") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Title"), title);
  if (assignee) {
    await user.type(screen.getByLabelText("Assignee (optional)"), assignee);
  }
  await user.click(screen.getByRole("button", { name: "Add task" }));
  return user;
}

describe("Sprint task list", () => {
  it("starts with an empty list", () => {
    render(<App />);
    expect(screen.getByText("No tasks yet.")).toBeInTheDocument();
    expect(screen.getByText("0 of 0 done")).toBeInTheDocument();
  });

  it("adds a task with an assignee and shows their first name", async () => {
    render(<App />);
    await addTask("Write release notes", "Thabo Mokoena");

    expect(screen.getByRole("heading", { name: "Write release notes" })).toBeInTheDocument();
    expect(screen.getByText("Owner: Thabo")).toBeInTheDocument();
    expect(screen.getByText("0 of 1 done")).toBeInTheDocument();
  });

  it("adds a task without an assignee", async () => {
    render(<App />);
    await addTask("Fix login bug");

    expect(screen.getByRole("heading", { name: "Fix login bug" })).toBeInTheDocument();
    expect(screen.getByText("Owner: Unassigned")).toBeInTheDocument();
  });

  it("clears the form and puts the cursor back in Title after adding", async () => {
    render(<App />);
    await addTask("Plan sprint", "Aisha");

    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Assignee (optional)")).toHaveValue("");
    expect(screen.getByLabelText("Title")).toHaveFocus();
  });

  it("counts a task as done when its status changes to Done", async () => {
    render(<App />);
    await addTask("Plan sprint", "Aisha");
    const user = await addTask("Update docs", "Sam");

    await user.selectOptions(screen.getByLabelText("Status of Update docs"), "Done");

    expect(screen.getByText("1 of 2 done")).toBeInTheDocument();
  });
});
