import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import App from "./App";
import { failNextSave } from "./test/server";

function renderApp() {
  // Same staleTime as main.tsx; no retries so failures show straight away
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: false },
      mutations: { retry: false },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

async function taskList() {
  return within(await screen.findByRole("list", { name: "Tasks" }));
}

describe("TaskBoard (Day 7 exercise 2)", () => {
  it("shows the tasks from the API", async () => {
    renderApp();

    const list = await taskList();
    expect(list.getAllByRole("listitem")).toHaveLength(3);
  });

  it("shows only the tasks that match the chosen status", async () => {
    const user = userEvent.setup();
    renderApp();
    await taskList();

    await user.selectOptions(screen.getByLabelText("Show"), "done");

    await waitFor(async () => {
      const list = await taskList();
      expect(list.getAllByRole("listitem")).toHaveLength(1);
    });
    expect((await taskList()).getByText("Book room")).toBeInTheDocument();
  });

  it("adds a task and shows it in the list without a page refresh", async () => {
    const user = userEvent.setup();
    renderApp();
    await taskList();

    await user.type(screen.getByLabelText("New task"), "Review pull request");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByText("Review pull request")).toBeInTheDocument();
    expect((await taskList()).getAllByRole("listitem")).toHaveLength(4);
  });

  it("disables the Add button while the task is saving", async () => {
    const user = userEvent.setup();
    renderApp();
    await taskList();

    await user.type(screen.getByLabelText("New task"), "Update docs");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Add" })).toBeEnabled(),
    );
  });

  it("shows an error message when the server cannot save the task", async () => {
    const user = userEvent.setup();
    failNextSave();
    renderApp();
    await taskList();

    await user.type(screen.getByLabelText("New task"), "Doomed task");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Could not save the task");
  });
});
