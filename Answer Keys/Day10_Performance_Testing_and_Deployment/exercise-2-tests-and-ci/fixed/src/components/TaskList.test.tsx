import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { TaskList } from "./TaskList";

it("shows the tasks from the API", async () => {
  render(<TaskList />);

  expect(await screen.findByText("Plan the sprint (todo)")).toBeInTheDocument();
  expect(screen.getByText("Build the board (doing)")).toBeInTheDocument();
});
