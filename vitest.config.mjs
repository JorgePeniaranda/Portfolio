/// <reference types="vitest" />
import {getViteConfig} from "astro/config";

export default getViteConfig({
  test: {
    globals: true, // Allows describe, it, expect without imports
    environment: "jsdom", // For React testing
    // Specify the TypeScript configuration file
    typescript: {
      tsconfigPath: "./tsconfig.json",
    },
    coverage: {
      reporter: ["text", "json", "html"], // Enable coverage reports
    },
  },
});
