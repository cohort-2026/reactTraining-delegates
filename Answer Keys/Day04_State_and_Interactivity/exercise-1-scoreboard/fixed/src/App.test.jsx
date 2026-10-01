import { render, screen, within } from "@testing-library/react";
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
  return {
    user: userEvent.setup(),
    home: within(screen.getByRole("region", { name: "Home team" })),
    away: within(screen.getByRole("region", { name: "Away team" })),
  };
}

describe("Scoreboard", () => {
  it("starts both teams on zero", () => {
    const { home, away } = renderApp();
    expect(home.getByText("Score: 0")).toBeInTheDocument();
    expect(away.getByText("Score: 0")).toBeInTheDocument();
  });

  it("adds one point with +1", async () => {
    const { user, home } = renderApp();
    await user.click(home.getByRole("button", { name: "+1" }));
    await user.click(home.getByRole("button", { name: "+1" }));
    expect(home.getByText("Score: 2")).toBeInTheDocument();
  });

  it("adds three points with +3", async () => {
    const { user, home } = renderApp();
    await user.click(home.getByRole("button", { name: "+3" }));
    expect(home.getByText("Score: 3")).toBeInTheDocument();
    await user.click(home.getByRole("button", { name: "+3" }));
    expect(home.getByText("Score: 6")).toBeInTheDocument();
  });

  it("never goes below zero", async () => {
    const { user, home } = renderApp();
    await user.click(home.getByRole("button", { name: "+1" }));
    await user.click(home.getByRole("button", { name: "-1" }));
    await user.click(home.getByRole("button", { name: "-1" }));
    expect(home.getByText("Score: 0")).toBeInTheDocument();
  });

  it("sets the score back to zero with Reset", async () => {
    const { user, home } = renderApp();
    await user.click(home.getByRole("button", { name: "+3" }));
    await user.click(home.getByRole("button", { name: "Reset" }));
    expect(home.getByText("Score: 0")).toBeInTheDocument();
  });

  it("keeps the two teams' scores separate", async () => {
    const { user, home, away } = renderApp();
    await user.click(away.getByRole("button", { name: "+1" }));
    expect(home.getByText("Score: 0")).toBeInTheDocument();
    expect(away.getByText("Score: 1")).toBeInTheDocument();
  });

  it("shows the typed team name as the heading", async () => {
    const { user, home } = renderApp();
    await user.type(home.getByLabelText("Team name"), "Lions");
    expect(home.getByLabelText("Team name")).toHaveValue("Lions");
    expect(home.getByRole("heading", { name: "Lions" })).toBeInTheDocument();
  });
});
