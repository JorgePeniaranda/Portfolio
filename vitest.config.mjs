/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true, // Allows describe, it, expect without imports
    // Specify the TypeScript configuration file
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    coverage: {
      reporter: ['text', 'json', 'html'], // Enable coverage reports
      include: ['src/**/*'], // Only include files inside the 'src' directory
      exclude: [
        'src/components/atoms/theme-preference.astro',
        'src/components/ui/**/*',
        'src/constants/**/*',
        'src/messages/**/*',
        'src/helpers/client/**/*',
        'src/schemas/**/*',
        'src/hooks/use-mobile.tsx',
        'src/hooks/use-toast.ts',
        'src/types/**/*',
        'src/pages/**/*.astro',
        'src/env.d.ts',
      ],
    },
  },
});
