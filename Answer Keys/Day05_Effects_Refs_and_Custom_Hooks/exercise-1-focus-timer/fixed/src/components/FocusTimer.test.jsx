import { act, fireEvent, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FocusTimer from "./FocusTimer.jsx";

function renderTimer() {
  render(
    <StrictMode>
      <FocusTimer minutes={1} />
    </StrictMode>
  );
}

function click(name) {
  fireEvent.click(screen.getByRole("button", { name }));
}

function waitSeconds(seconds) {
  act(() => {
    vi.advanceTimersByTime(seconds * 1000);
  });
}

describe("FocusTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("puts the cursor in the task box when it first appears", () => {
    renderTimer();
    expect(screen.getByLabelText("What are you working on?")).toHaveFocus();
  });

  it("does not count down until Start is clicked", () => {
    renderTimer();
    waitSeconds(5);
    expect(screen.getByRole("timer")).toHaveTextContent("01:00");
  });

  it("counts down one second per second after Start", () => {
    renderTimer();
    click("Start");
    waitSeconds(3);
    expect(screen.getByRole("timer")).toHaveTextContent("00:57");
  });

  it("stops counting when Pause is clicked", () => {
    renderTimer();
    click("Start");
    waitSeconds(2);
    click("Pause");
    waitSeconds(10);
    expect(screen.getByRole("timer")).toHaveTextContent("00:58");
  });

  it("carries on at normal speed after Pause and Start again", () => {
    renderTimer();
    click("Start");
    waitSeconds(2);
    click("Pause");
    click("Start");
    waitSeconds(3);
    expect(screen.getByRole("timer")).toHaveTextContent("00:55");
  });

  it("shows the time left in the browser tab title", () => {
    renderTimer();
    expect(document.title).toBe("01:00 - Focus Timer");
    click("Start");
    waitSeconds(4);
    expect(document.title).toBe("00:56 - Focus Timer");
  });

  it("stops and goes back to the full time on Reset", () => {
    renderTimer();
    click("Start");
    waitSeconds(5);
    click("Reset");
    waitSeconds(5);
    expect(screen.getByRole("timer")).toHaveTextContent("01:00");
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });

  it("tells you when the time is up", () => {
    renderTimer();
    click("Start");
    waitSeconds(61);
    expect(screen.getByRole("timer")).toHaveTextContent("00:00");
    expect(screen.getByRole("status")).toHaveTextContent("Time is up. Take a break!");
  });
});
