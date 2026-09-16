import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { formatPoints } from "../format";
import { sampleTasks } from "../sampleTasks";
import { Board } from "./Board";

// Spy on formatPoints so the tests can count how often task cards render.
vi.mock("../format", { spy: true });

describe("Board", () => {
  it("shows only the tasks that match the chosen filter", async () => {
    const user = userEvent.setup();
    render(<Board initialTasks={sampleTasks} />);

    await user.click(screen.getByRole("button", { name: "Done" }));

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Write the README" })).toBeInTheDocument();
  });

  it("keeps every status change when several tasks are moved", async () => {
    const user = userEvent.setup();
    render(<Board initialTasks={sampleTasks} />);

    await user.selectOptions(screen.getByLabelText("Status of Plan the sprint"), "done");
    await user.selectOptions(screen.getByLabelText("Status of Build the board"), "done");

    expect(screen.getByLabelText("Status of Plan the sprint")).toHaveValue("done");
    expect(screen.getByLabelText("Status of Build the board")).toHaveValue("done");
  });

  it("does not re-render the task cards while you type a new task title", async () => {
    const user = userEvent.setup();
    render(<Board initialTasks={sampleTasks} />);
    expect(formatPoints).toHaveBeenCalledTimes(sampleTasks.length);
    vi.mocked(formatPoints).mockClear();

    await user.type(screen.getByLabelText("New task title"), "Review");

    expect(screen.getByLabelText("New task title")).toHaveValue("Review");
    expect(formatPoints).not.toHaveBeenCalled();
  });
});
