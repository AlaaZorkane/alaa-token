/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    testTimeout: 100_000,
    watch: false,
    include: ["**/*.{test,spec}.{ts,mts,cts,tsx}"],
  },
});
