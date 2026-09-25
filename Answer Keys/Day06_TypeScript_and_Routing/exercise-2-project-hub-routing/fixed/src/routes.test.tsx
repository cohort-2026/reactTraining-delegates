import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { routes } from "./routes";

// Renders the app's real routes in memory, starting at the given URL(s).
function renderAt(...paths: string[]) {
  const router = createMemoryRouter(routes, {
    initialEntries: paths,
    initialIndex: paths.length - 1,
  });
  render(<RouterProvider router={router} />);
  return { router, user: userEvent.setup() };
}

function navLink(name: string) {
  return within(screen.getByRole("navigation")).getByRole("link", { name });
}

beforeEach(() => {
  localStorage.clear();
});

describe("Pages and URL parameters", () => {
  it("shows the dashboard at /", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("shows the project page for /projects/1", () => {
    renderAt("/projects/1");
    expect(screen.getByRole("heading", { name: "Website" })).toBeInTheDocument();
    expect(screen.getByText("The new company website.")).toBeInTheDocument();
  });

  it("opens a project from the dashboard list", async () => {
    const { user } = renderAt("/");
    const list = within(screen.getByRole("main"));
    await user.click(list.getByRole("link", { name: "Mobile app" }));
    expect(screen.getByRole("heading", { name: "Mobile app" })).toBeInTheDocument();
  });

  it("shows a friendly page for an unknown project id", () => {
    renderAt("/projects/99");
    expect(screen.getByRole("heading", { name: "Project not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to dashboard" })).toBeInTheDocument();
  });

  it("shows 404 Not Found for an unknown path", () => {
    renderAt("/banana");
    expect(screen.getByRole("heading", { name: "404 Not Found" })).toBeInTheDocument();
  });
});

describe("Navigation bar", () => {
  it("moves between pages from the navigation bar", async () => {
    localStorage.setItem("user", JSON.stringify({ name: "Aisha" }));
    const { user } = renderAt("/");

    await user.click(navLink("Settings"));
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();

    await user.click(navLink("Website"));
    expect(screen.getByRole("heading", { name: "Website" })).toBeInTheDocument();

    await user.click(navLink("Dashboard"));
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("marks only the link for the current page as current", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Aisha" }));
    renderAt("/settings");
    expect(navLink("Settings")).toHaveAttribute("aria-current", "page");
    expect(navLink("Dashboard")).not.toHaveAttribute("aria-current");
    expect(navLink("Website")).not.toHaveAttribute("aria-current");
  });

  it("marks the current project's link as current on a project page", () => {
    renderAt("/projects/2");
    expect(navLink("Mobile app")).toHaveAttribute("aria-current", "page");
    expect(navLink("Dashboard")).not.toHaveAttribute("aria-current");
  });
});

describe("Protected Settings page", () => {
  it("sends a logged-out user to the login page", () => {
    renderAt("/settings");
    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Settings" })).not.toBeInTheDocument();
  });

  it("shows Settings straight away to a logged-in user", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Aisha" }));
    renderAt("/settings");
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
  });

  it("returns the user to Settings after logging in", async () => {
    const { user } = renderAt("/settings");
    await user.type(screen.getByLabelText("Your name"), "Aisha");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByText("Logged in as Aisha.")).toBeInTheDocument();
  });

  it("does not return to the login page when going Back after logging in", async () => {
    const { router, user } = renderAt("/", "/settings");
    await user.type(screen.getByLabelText("Your name"), "Aisha");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();

    await act(() => router.navigate(-1));

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });
});
