import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['**/*.tsx'],
      exclude: ['**/node_modules/**','**/dist/**', '**/pages/**'],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./") }]
  }
});