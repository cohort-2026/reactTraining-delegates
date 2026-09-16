import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Sign-up form (Day 8 exercise 1)", () => {
  it("shows a message under each required field when the form is submitted empty", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Join the beta" }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.map((a) => a.textContent)).toEqual([
      "Enter your name",
      "Enter a valid email address",
      "Password needs at least 8 characters",
    ]);
  });

  it("marks each invalid field and links it to its error message", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Join the beta" }));
    await screen.findAllByRole("alert");

    const fields = [
      ["Name", "Enter your name"],
      ["Email", "Enter a valid email address"],
      ["Password", "Password needs at least 8 characters"],
    ];
    for (const [label, message] of fields) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAccessibleDescription(message);
    }
  });

  it("rejects a team size that is out of range", async () => {
    const user = userEvent.setup();
    render(<App />);

    const teamSize = screen.getByLabelText("Team size");
    await user.clear(teamSize);
    await user.type(teamSize, "0");
    await user.click(screen.getByRole("button", { name: "Join the beta" }));

    expect(teamSize).toHaveAccessibleDescription("Team size must be at least 1");
  });

  it("accepts a valid sign-up and thanks the user", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Name"), "Sam");
    await user.type(screen.getByLabelText("Email"), "sam@example.com");
    await user.type(screen.getByLabelText("Password"), "correct-horse");
    const teamSize = screen.getByLabelText("Team size");
    await user.clear(teamSize);
    await user.type(teamSize, "5");
    await user.click(screen.getByRole("button", { name: "Join the beta" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thanks, Sam!");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
