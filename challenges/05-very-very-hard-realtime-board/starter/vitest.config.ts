import { defineConfig } from 'vitest/config'

// One `npx vitest run` at the root runs every workspace's tests.
export default defineConfig({
  test: {
    projects: ['server', 'client'],
  },
})
