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
      include: ["src/**/*"], // Only include files inside the 'src' directory
      exclude: [
        "src/components/atoms/theme-preference.astro",
        "src/components/ui/**/*",
        "src/constants/**/*",
        "src/types/**/*",
        "src/env.d.ts",
      ],
    },
  },
});
