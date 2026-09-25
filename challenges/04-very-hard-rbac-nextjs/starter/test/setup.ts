import { beforeEach, vi } from "vitest";
import { resetStore } from "@/lib/db";
import { cookieJar } from "./next-mocks";

vi.mock("next/headers", async () => {
  const { cookies } = await import("./next-mocks");
  return { cookies };
});

vi.mock("next/navigation", async () => {
  const { redirect } = await import("./next-mocks");
  return { redirect };
});

vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));

beforeEach(() => {
  cookieJar.clear();
  resetStore();
  vi.clearAllMocks();
});
