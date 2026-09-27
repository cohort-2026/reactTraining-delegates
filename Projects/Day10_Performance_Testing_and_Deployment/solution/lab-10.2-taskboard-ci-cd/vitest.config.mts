import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// No @vitejs/plugin-react here: Vite's built-in esbuild transform already
// handles JSX in .tsx files (tsconfig.json sets "jsx": "react-jsx"), and
// @vitejs/plugin-react 6's peer chain (@rolldown/plugin-babel wants
// @babel/core 8) conflicts with @babel/core 7, which the shadcn CLI's own
// dependencies pull in. The plugin mainly adds Fast Refresh and React
// Compiler integration, neither of which matters for running tests.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
