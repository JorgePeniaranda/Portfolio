import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "var(--home-primary-bg)",
        "primary-bg-dark": "var(--home-primary-bg-dark)",
        "primary-text": "var(--home-primary-text)",
        "primary-text-dark": "var(--home-primary-text-dark)"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      minWidth: {
        'svgSize': '30rem',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
