import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          environment: "jsdom",
          globals: true,
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
          env: {
            BASE_URL: "http://localhost/test",
          },
        },
      },
    ],
  },
});
