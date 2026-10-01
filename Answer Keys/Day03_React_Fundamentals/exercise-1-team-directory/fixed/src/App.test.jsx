import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

function getCard(name) {
  return screen.getByRole("heading", { name }).closest("article");
}

describe("Team directory", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // React prints each warning only once, so this test runs first.
  it("renders without any React warnings in the console", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("shows a card with the name and role of every team member", () => {
    render(<App />);
    expect(screen.getByText("4 people")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(within(getCard("Zanele Dube")).getByText("Frontend developer")).toBeInTheDocument();
    expect(within(getCard("Thabo Molefe")).getByText("Tester")).toBeInTheDocument();
  });

  it("shows an open-tasks badge for members who have open tasks", () => {
    render(<App />);
    expect(within(getCard("Zanele Dube")).getByText("Open tasks: 3")).toBeInTheDocument();
    expect(within(getCard("Naledi Khumalo")).getByText("Open tasks: 1")).toBeInTheDocument();
  });

  it("shows only the name and role for members with no open tasks", () => {
    render(<App />);
    expect(getCard("Sipho Nkosi")).toHaveTextContent(/^Sipho NkosiBackend developer$/);
    expect(getCard("Thabo Molefe")).toHaveTextContent(/^Thabo MolefeTester$/);
  });
});
