import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { clearSession } from "../auth/tokenStore";
import { mockBackend } from "../mocks/backend";
import { server } from "../mocks/node";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  mockBackend.reset();
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  clearSession();
  server.resetHandlers();
});

afterAll(() => server.close());
