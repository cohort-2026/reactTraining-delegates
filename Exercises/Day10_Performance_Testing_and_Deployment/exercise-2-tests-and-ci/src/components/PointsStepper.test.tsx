import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { PointsStepper } from "./PointsStepper";

it("increases points when the button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<PointsStepper value={3} onChange={onChange} />);
  expect(screen.getByText("3 points")).toBeInTheDocument();
  user.click(
    screen.getByRole("button", { name: "Increase points" }));
  expect(onChange).toHaveBeenCalledWith(4);
});

it("decreases points when the minus button is clicked", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<PointsStepper value={3} onChange={onChange} />);
  await user.click(
    screen.getByRole("button", { name: "Decrease points" }));
  expect(onChange).toHaveBeenCalledWith(2);
});
