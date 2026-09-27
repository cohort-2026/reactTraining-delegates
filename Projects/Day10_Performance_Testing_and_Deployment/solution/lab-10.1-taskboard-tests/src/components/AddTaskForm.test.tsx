import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import { addTask } from "@/app/actions";
import { AddTaskForm } from "./AddTaskForm";

vi.mock("@/app/actions", () => ({
  addTask: vi.fn(async () => ({ error: null })),
}));

it("sends the title to addTask", async () => {
  const user = userEvent.setup();
  render(<AddTaskForm />);
  await user.type(screen.getByLabelText("Title"), "New task");
  await user.click(screen.getByRole("button", { name: "Add" }));
  await waitFor(() => expect(addTask).toHaveBeenCalled());
  const [prevState, formData] = vi.mocked(addTask).mock.calls[0];
  expect(prevState).toEqual({ error: null });
  expect((formData as FormData).get("title")).toBe("New task");
});
