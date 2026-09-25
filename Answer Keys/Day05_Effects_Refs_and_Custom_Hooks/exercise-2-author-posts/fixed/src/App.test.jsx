import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

// A pretend server: every request waits until the test answers it with
// respond(). A request that has been aborted fails like a real fetch, so a
// late answer to it changes nothing. respond() answers the newest request
// for that URL that has not been answered yet.
function createFakeServer() {
  const waiting = [];

  const fetchMock = vi.fn((url, options = {}) => {
    return new Promise((resolve, reject) => {
      const request = { url: String(url), resolve, answered: false };
      waiting.push(request);
      options.signal?.addEventListener("abort", () => {
        reject(new DOMException("The operation was aborted.", "AbortError"));
      });
    });
  });

  async function respond(authorId, body, status = 200) {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${authorId}`;
    const request = waiting.findLast((r) => r.url === url && !r.answered);
    if (!request) throw new Error(`No request is waiting for ${url}`);
    request.answered = true;
    await act(async () => {
      request.resolve({
        ok: status >= 200 && status < 300,
        status,
        json: async () => body,
      });
    });
  }

  return { fetchMock, respond };
}

const postsByAuthor = {
  1: [
    { id: 1, userId: 1, title: "Sunt aut facere" },
    { id: 2, userId: 1, title: "Qui est esse" },
  ],
  2: [
    { id: 11, userId: 2, title: "Et ea vero quia" },
    { id: 12, userId: 2, title: "In quibusdam tempore" },
  ],
  3: [{ id: 21, userId: 3, title: "Asperiores ea ipsam" }],
};

let server;

beforeEach(() => {
  localStorage.clear();
  server = createFakeServer();
  vi.stubGlobal("fetch", server.fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Author posts", () => {
  it("shows a loading message, then the first author's posts", async () => {
    render(<App />);
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();

    await server.respond(1, postsByAuthor[1]);

    expect(screen.getByText("Sunt aut facere")).toBeInTheDocument();
    expect(screen.getByText("Qui est esse")).toBeInTheDocument();
  });

  it("filters the posts by title", async () => {
    const user = userEvent.setup();
    render(<App />);
    await server.respond(1, postsByAuthor[1]);

    await user.type(screen.getByLabelText("Filter by title"), "esse");

    expect(screen.getByText("Qui est esse")).toBeInTheDocument();
    expect(screen.queryByText("Sunt aut facere")).not.toBeInTheDocument();
  });

  it("shows an error message when the posts cannot be loaded", async () => {
    render(<App />);
    await server.respond(1, {}, 500);
    expect(screen.getByRole("alert")).toHaveTextContent("Could not load posts: HTTP 500");
  });

  it("loads the posts for a newly selected author", async () => {
    const user = userEvent.setup();
    render(<App />);
    await server.respond(1, postsByAuthor[1]);

    await user.selectOptions(screen.getByLabelText("Author"), "Ervin Howell");
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
    await server.respond(2, postsByAuthor[2]);

    expect(screen.getByText("Et ea vero quia")).toBeInTheDocument();
    expect(screen.queryByText("Sunt aut facere")).not.toBeInTheDocument();
  });

  it("never shows a slow, older response for a different author", async () => {
    const user = userEvent.setup();
    render(<App />);
    await server.respond(1, postsByAuthor[1]);

    await user.selectOptions(screen.getByLabelText("Author"), "Ervin Howell");
    await user.selectOptions(screen.getByLabelText("Author"), "Clementine Bauch");

    // Author 3 answers quickly, then author 2's slow answer finally arrives.
    await server.respond(3, postsByAuthor[3]);
    await server.respond(2, postsByAuthor[2]);

    expect(screen.getByText("Asperiores ea ipsam")).toBeInTheDocument();
    expect(screen.queryByText("Et ea vero quia")).not.toBeInTheDocument();
  });

  it("remembers the chosen author the next time the page opens", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await server.respond(1, postsByAuthor[1]);
    await user.selectOptions(screen.getByLabelText("Author"), "Clementine Bauch");
    unmount();

    render(<App />);

    expect(screen.getByLabelText("Author")).toHaveValue("3");
    await server.respond(3, postsByAuthor[3]);
    expect(screen.getByText("Asperiores ea ipsam")).toBeInTheDocument();
  });

  it("counts every click on the Like button", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /like this blog/i }));
    await user.click(screen.getByRole("button", { name: /like this blog/i }));

    expect(screen.getByRole("button", { name: "Like this blog (2)" })).toBeInTheDocument();
  });
});
