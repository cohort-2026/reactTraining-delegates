import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const unusedVars = [
  'error',
  { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
]

export default defineConfig([
  globalIgnores(['**/dist', '**/node_modules', 'playwright-report', 'test-results']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: { '@typescript-eslint/no-unused-vars': unusedVars },
  },
  {
    files: ['server/**/*.ts', 'shared/**/*.ts', 'e2e/**/*.ts', '*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['client/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: { globals: globals.browser },
  },
])
