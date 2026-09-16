import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { resetDb, server } from "./server";
import { useFilterStore } from "../state/useFilterStore";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  resetDb();
  useFilterStore.setState({ status: "all" });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
