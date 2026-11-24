import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify("test"),
    __APP_COMMIT__: JSON.stringify("test-commit"),
  },
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
