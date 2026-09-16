import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { setOffline } from "./api/tasks";

function taskItem(title: string) {
  return within(screen.getByRole("list", { name: "Tasks" }))
    .getByText(title, { exact: false })
    .closest("li");
}

describe("Quick add (Day 8 exercise 2)", () => {
  beforeEach(() => {
    setOffline(false);
  });

  it("shows the schema message when the title is too short", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText("New task title");
    await user.type(input, "ab");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Title needs at least 3 characters",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("shows the new task straight away, marked as saving, then as saved", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("New task title"), "Write tests");
    await user.click(screen.getByRole("button", { name: /Add/ }));

    // Before the pretend server has answered
    expect(taskItem("Write tests")).toHaveAttribute("aria-busy", "true");

    // After it has answered: still there once, no longer saving
    await waitFor(() =>
      expect(taskItem("Write tests")).not.toHaveAttribute("aria-busy"),
    );
    expect(screen.getAllByText("Write tests", { exact: false })).toHaveLength(1);
  });

  it("disables the button and shows Adding... while the task is saving", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("New task title"), "Book venue");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("button", { name: "Adding..." })).toBeDisabled();
    expect(await screen.findByRole("button", { name: "Add" })).toBeEnabled();
  });

  it("removes the temporary task and shows an error when the save fails", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText("Simulate the server being offline"));
    await user.type(screen.getByLabelText("New task title"), "Doomed task");
    await user.click(screen.getByRole("button", { name: /Add/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Could not save the task");
    expect(screen.queryByText("Doomed task", { exact: false })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "TaskBoard quick add" })).toBeInTheDocument();
  });
});
