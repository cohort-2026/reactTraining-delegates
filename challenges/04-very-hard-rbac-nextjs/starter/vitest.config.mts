import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    setupFiles: ["./test/setup.ts"],
    env: {
      SESSION_SECRET: "test-secret-for-vitest-only-0123456789abcdef",
    },
  },
});
