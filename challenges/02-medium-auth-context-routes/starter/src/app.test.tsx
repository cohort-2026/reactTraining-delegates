import { act, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as authApi from "./api/authApi";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/useAuth";
import { routes } from "./routes";

// Renders the app's real routes in memory, starting at the given URL.
// `visited` records every URL the router passes through, so a test can
// check that the login page never flashed up on the way somewhere else.
function renderAt(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] });
  const visited: string[] = [url];
  router.subscribe((state) => {
    visited.push(state.location.pathname + state.location.search);
  });
  const view = render(<RouterProvider router={router} />);
  return { router, visited, unmount: view.unmount, user: userEvent.setup() };
}

type Router = ReturnType<typeof renderAt>["router"];

function currentUrl(router: Router) {
  return router.state.location.pathname + router.state.location.search;
}

function redirectParam(router: Router) {
  return new URLSearchParams(router.state.location.search).get("redirect");
}

function nav() {
  return within(screen.getByRole("navigation"));
}

async function logInAsAda(user: ReturnType<typeof userEvent.setup>) {
  await user.type(await screen.findByLabelText("Email"), "ada@taskboard.dev");
  await user.type(screen.getByLabelText("Password"), "taskboard");
  await user.click(screen.getByRole("button", { name: "Log in" }));
}

// Starts a session the same way a real login would, before the app renders.
async function seedSession() {
  await authApi.login("ada@taskboard.dev", "taskboard");
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useAuth and AuthProvider", () => {
  it("throws a helpful error when used outside <AuthProvider>", () => {
    // React logs the thrown error; keep the test output clean.
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/);
  });

  const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;

  it("starts as 'loading', then becomes 'anonymous' when there is no session", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.status).toBe("loading");
    await waitFor(() => expect(result.current.status).toBe("anonymous"));
    expect(result.current.user).toBeNull();
  });

  it("restores a stored session as 'authenticated' with the user", async () => {
    await seedSession();
    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("authenticated"));
    expect(result.current.user?.name).toBe("Ada Lovelace");
  });
});

describe("Public pages", () => {
  it("shows the home page to a logged-out visitor, with a Log in link", async () => {
    renderAt("/");
    expect(screen.getByRole("heading", { name: "Welcome to TaskBoard" })).toBeInTheDocument();
    expect(await nav().findByRole("link", { name: "Log in" })).toBeInTheDocument();
  });
});

describe("Protected routes", () => {
  it.each(["/dashboard", "/settings"])(
    "sends a logged-out visitor from %s to /login with a redirect parameter",
    async (path) => {
      const { router } = renderAt(path);
      expect(await screen.findByRole("heading", { name: "Log in" })).toBeInTheDocument();
      expect(router.state.location.pathname).toBe("/login");
      expect(redirectParam(router)).toBe(path);
      expect(screen.queryByRole("heading", { name: /dashboard|settings/i })).not.toBeInTheDocument();
    }
  );

  it("keeps the query string in the redirect parameter", async () => {
    const { router } = renderAt("/settings?tab=notifications");
    await screen.findByRole("heading", { name: "Log in" });
    expect(redirectParam(router)).toBe("/settings?tab=notifications");
  });

  it("shows a loading status, not the login page, while the session is checked", async () => {
    await seedSession();
    const { visited } = renderAt("/dashboard");

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Log in" })).not.toBeInTheDocument();

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(visited.some((url) => url.startsWith("/login"))).toBe(false);
  });
});

describe("Logging in", () => {
  it("returns the user to the page (and query string) they first asked for", async () => {
    const { router, user } = renderAt("/settings?tab=notifications");
    await logInAsAda(user);

    expect(await screen.findByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Notifications" })).toBeInTheDocument();
    expect(currentUrl(router)).toBe("/settings?tab=notifications");
  });

  it("goes to /dashboard when there is no redirect parameter", async () => {
    const { router, user } = renderAt("/login");
    await logInAsAda(user);

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/dashboard");
  });

  it.each([
    "https://evil.example/steal",
    "//evil.example/steal",
    "/\\evil.example/steal",
    "javascript:alert(1)",
    "dashboard",
  ])("ignores the unsafe redirect %s and goes to /dashboard", async (target) => {
    const { router, user } = renderAt(`/login?redirect=${encodeURIComponent(target)}`);
    await logInAsAda(user);

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/dashboard");
  });

  it("shows an error and stays on the login page when the password is wrong", async () => {
    const { router, user } = renderAt("/login?redirect=%2Fsettings");
    await user.type(screen.getByLabelText("Email"), "ada@taskboard.dev");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/incorrect email or password/i);
    expect(router.state.location.pathname).toBe("/login");
  });

  it("shows the user's name and a Log out button in the nav bar", async () => {
    const { user } = renderAt("/login");
    await logInAsAda(user);

    expect(await nav().findByText(/Ada Lovelace/)).toBeInTheDocument();
    expect(nav().getByRole("button", { name: "Log out" })).toBeInTheDocument();
    expect(nav().queryByRole("link", { name: "Log in" })).not.toBeInTheDocument();
  });
});

describe("Session persistence", () => {
  it("stays logged in after a refresh", async () => {
    const first = renderAt("/login");
    await logInAsAda(first.user);
    await screen.findByRole("heading", { name: "Dashboard" });
    first.unmount();

    // A "refresh": a brand-new app instance with nothing in React state.
    const { visited } = renderAt("/dashboard");
    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(await nav().findByText(/Ada Lovelace/)).toBeInTheDocument();
    expect(visited.some((url) => url.startsWith("/login"))).toBe(false);
  });
});

describe("Logging out", () => {
  it("clears the session, returns home and protects the private pages again", async () => {
    await seedSession();
    const { router, user } = renderAt("/settings");
    await screen.findByRole("heading", { name: "Settings" });

    await user.click(nav().getByRole("button", { name: "Log out" }));

    expect(await screen.findByRole("heading", { name: "Welcome to TaskBoard" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/");
    expect(await nav().findByRole("link", { name: "Log in" })).toBeInTheDocument();
    expect(nav().queryByRole("button", { name: "Log out" })).not.toBeInTheDocument();
    expect(await authApi.getSession()).toBeNull();

    await act(() => router.navigate("/dashboard"));
    expect(await screen.findByRole("heading", { name: "Log in" })).toBeInTheDocument();
  });
});
