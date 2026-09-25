import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import App from "./App";
import { AuthProvider } from "./auth/AuthProvider";
import { AUTH_CHANNEL_NAME } from "./auth/crossTab";
import { getAccessToken } from "./auth/tokenStore";
import { DEMO_PASSWORD, mockBackend } from "./mocks/backend";

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const user = userEvent.setup();
  render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>,
  );
  return { user, queryClient };
}

async function signInThroughTheForm(user: ReturnType<typeof userEvent.setup>, password = DEMO_PASSWORD) {
  await user.clear(screen.getByLabelText("Email"));
  await user.type(screen.getByLabelText("Email"), "demo@taskboard.dev");
  await user.type(screen.getByLabelText("Password"), password);
  await user.click(screen.getByRole("button", { name: "Sign in" }));
}

async function taskItems() {
  const list = await screen.findByRole("list", { name: "Tasks" });
  return within(list).getAllByRole("listitem");
}

function storedValues(storage: Storage) {
  return Array.from({ length: storage.length }, (_, i) => storage.getItem(storage.key(i)!) ?? "");
}

/** Opens a second BroadcastChannel, like another browser tab would. */
function openOtherTab() {
  const channel = new BroadcastChannel(AUTH_CHANNEL_NAME);
  const received: unknown[] = [];
  channel.onmessage = (event: MessageEvent) => received.push(event.data);
  return { channel, received };
}

describe("TaskBoard sign-in", () => {
  it("signs in and shows the tasks", async () => {
    const { user } = renderApp();

    await signInThroughTheForm(user);

    expect(await taskItems()).toHaveLength(3);
    expect(screen.getByText(/Signed in as Dana Demo/)).toBeInTheDocument();
  });

  it("shows an error for a wrong password and stays on the login page", async () => {
    const { user } = renderApp();

    await signInThroughTheForm(user, "wrong-password");

    expect(await screen.findByRole("alert")).toHaveTextContent("Wrong email or password");
    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
  });

  it("keeps the access token in memory, not in localStorage or sessionStorage", async () => {
    const { user } = renderApp();
    await signInThroughTheForm(user);
    await taskItems();

    const token = getAccessToken();
    expect(token).toMatch(/^at_/);
    const stored = [...storedValues(localStorage), ...storedValues(sessionStorage)];
    expect(stored.some((value) => value.includes(token!))).toBe(false);
  });
});

describe("TaskBoard silent refresh", () => {
  it("refreshes the access token without bothering the user", async () => {
    const { user } = renderApp();
    await signInThroughTheForm(user);
    await taskItems();

    mockBackend.expireAccessTokens();
    await user.click(screen.getByRole("button", { name: "Reload" }));

    await waitFor(() => expect(mockBackend.stats.refreshCalls).toBe(1));
    await waitFor(() => expect(screen.getByRole("button", { name: "Reload" })).toBeEnabled());
    expect(await taskItems()).toHaveLength(3);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Sign in" })).not.toBeInTheDocument();
  });

  it("goes back to the login page and clears cached data when the refresh fails", async () => {
    const { user, queryClient } = renderApp();
    await signInThroughTheForm(user);
    await taskItems();

    mockBackend.expireAccessTokens();
    mockBackend.revokeAllSessions();
    await user.click(screen.getByRole("button", { name: "Reload" }));

    expect(await screen.findByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Your session has expired");
    await waitFor(() => expect(queryClient.getQueryCache().getAll()).toHaveLength(0));
    expect(getAccessToken()).toBeNull();
  });
});

describe("TaskBoard sign-out", () => {
  it("signs out on the server, clears cached data and tells the other tabs", async () => {
    const otherTab = openOtherTab();
    try {
      const { user, queryClient } = renderApp();
      await signInThroughTheForm(user);
      await taskItems();
      expect(mockBackend.activeSessionCount()).toBe(1);

      await user.click(screen.getByRole("button", { name: "Sign out" }));

      expect(await screen.findByRole("heading", { name: "Sign in" })).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(mockBackend.activeSessionCount()).toBe(0);
      expect(getAccessToken()).toBeNull();
      await waitFor(() => expect(queryClient.getQueryCache().getAll()).toHaveLength(0));
      await waitFor(() => expect(otherTab.received).toEqual([{ type: "logout" }]));
    } finally {
      otherTab.channel.close();
    }
  });

  it("signs out when another tab signs out", async () => {
    const { user, queryClient } = renderApp();
    await signInThroughTheForm(user);
    await taskItems();

    const otherTab = openOtherTab();
    try {
      otherTab.channel.postMessage({ type: "logout" });

      expect(await screen.findByRole("heading", { name: "Sign in" })).toBeInTheDocument();
      expect(getAccessToken()).toBeNull();
      await waitFor(() => expect(queryClient.getQueryCache().getAll()).toHaveLength(0));
    } finally {
      otherTab.channel.close();
    }
  });
});
