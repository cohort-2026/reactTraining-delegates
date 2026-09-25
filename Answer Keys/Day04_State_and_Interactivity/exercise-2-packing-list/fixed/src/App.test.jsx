import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

function renderApp() {
  render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  return userEvent.setup();
}

describe("Packing list", () => {
  it("shows the starting items and how many are packed", () => {
    renderApp();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("1 of 3 packed")).toBeInTheDocument();
  });

  it("ticks an item and updates the packed count", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("checkbox", { name: "Phone charger" }));
    expect(screen.getByRole("checkbox", { name: "Phone charger" })).toBeChecked();
    expect(screen.getByText("2 of 3 packed")).toBeInTheDocument();
  });

  it("unticks a packed item", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("checkbox", { name: "Passport" }));
    expect(screen.getByRole("checkbox", { name: "Passport" })).not.toBeChecked();
    expect(screen.getByText("0 of 3 packed")).toBeInTheDocument();
  });

  it("deletes an item and updates the totals", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("button", { name: "Delete Sun cream" }));
    expect(screen.queryByText("Sun cream")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("1 of 2 packed")).toBeInTheDocument();
  });

  it("hides packed items and shows them again", async () => {
    const user = renderApp();
    const hidePacked = screen.getByRole("checkbox", { name: "Hide packed items" });

    await user.click(hidePacked);
    expect(hidePacked).toBeChecked();
    expect(screen.queryByText("Passport")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    await user.click(hidePacked);
    expect(hidePacked).not.toBeChecked();
    expect(screen.getByText("Passport")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("does not add a blank item", async () => {
    const user = renderApp();
    await user.type(screen.getByLabelText("New item"), "   ");
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Type the name of an item first.");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
