import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("Adding items", () => {
  it("adds new items to the list straight away and updates the totals", async () => {
    render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("New item"), "Swimming costume");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Swimming costume")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("1 of 4 packed")).toBeInTheDocument();
    expect(screen.getByLabelText("New item")).toHaveValue("");

    await user.type(screen.getByLabelText("New item"), "Hat{Enter}");
    expect(screen.getByText("Hat")).toBeInTheDocument();
    expect(screen.getByText("1 of 5 packed")).toBeInTheDocument();
  });
});
