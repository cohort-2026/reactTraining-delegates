import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

function getColumn(heading) {
  return screen.getByRole("heading", { name: heading }).closest("section");
}

function getSession(title) {
  return screen.getByRole("heading", { name: title }).closest("article");
}

describe("Conference schedule", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // React prints each warning only once, so this test runs first.
  it("renders without any React warnings in the console", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("lists every room in the header", () => {
    render(<App />);
    const rooms = screen.getByRole("list", { name: "Rooms" });
    expect(within(rooms).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Hall A",
      "Room 1",
      "Room 2",
    ]);
  });

  it("shows every session in the column for its track", () => {
    render(<App />);
    const morning = within(getColumn("Morning (3)"));
    expect(morning.getByRole("heading", { name: "Welcome and coffee" })).toBeInTheDocument();
    expect(morning.getByRole("heading", { name: "JSX in 30 minutes" })).toBeInTheDocument();
    expect(morning.getByRole("heading", { name: "Props and children" })).toBeInTheDocument();

    const afternoon = within(getColumn("Afternoon (2)"));
    expect(afternoon.getByRole("heading", { name: "Lists and keys" })).toBeInTheDocument();
    expect(afternoon.getByRole("heading", { name: "Thinking in React" })).toBeInTheDocument();
  });

  it("shows the time, room, speaker and seats for a session", () => {
    render(<App />);
    const session = within(getSession("Lists and keys"));
    expect(session.getByText("13:00 in Room 1")).toBeInTheDocument();
    expect(session.getByText("Speaker: Lerato Mokoena")).toBeInTheDocument();
    expect(session.getByText("5 seats left")).toBeInTheDocument();
  });

  it("marks a session with no seats left as fully booked", () => {
    render(<App />);
    expect(within(getSession("JSX in 30 minutes")).getByText("Fully booked")).toBeInTheDocument();
  });

  it("shows a session without a confirmed speaker, but no speaker line", () => {
    render(<App />);
    const session = getSession("Props and children");
    expect(within(session).getByText("10:30 in Room 2")).toBeInTheDocument();
    expect(within(session).queryByText(/Speaker:/)).not.toBeInTheDocument();
  });

  it("shows only the heading and a message in an empty column", () => {
    render(<App />);
    expect(getColumn("Evening (0)")).toHaveTextContent(/^Evening \(0\)Nothing scheduled yet$/);
  });
});
