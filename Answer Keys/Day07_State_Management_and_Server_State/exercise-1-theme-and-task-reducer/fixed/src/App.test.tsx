import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

function column(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("TaskBoard (Day 7 exercise 1)", () => {
  it("toggles the theme from the button in the header", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Theme: light" }));

    expect(screen.getByRole("button", { name: "Theme: dark" })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("adds a new task to the To do column", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("New task"), "Review pull request");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(column("To do").getByText(/Review pull request/)).toBeInTheDocument();
  });

  it("moves a task to the Done column when Done is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Mark Plan sprint as done" }));

    expect(column("To do").queryByText(/Plan sprint/)).not.toBeInTheDocument();
    expect(column("Done").getByText(/Plan sprint/)).toBeInTheDocument();
  });

  it("removes a task when Delete is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Delete Write report" }));

    expect(screen.queryByText(/Write report/)).not.toBeInTheDocument();
  });
});
