import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { TaskList } from "./TaskList";

it("shows the tasks from the API", () => {
  render(<TaskList />);

  expect(screen.getByText("Plan the sprint (todo)")).toBeInTheDocument();
  expect(screen.getByText("Build the board (doing)")).toBeInTheDocument();
});
