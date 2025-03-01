import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jorgepeniaranda.dev.ar',
  integrations: [react(), sitemap(), playformCompress(), icon(), robotsTxt()],
  vite: {
    plugins: [tailwindcss()],
  },
  // base: '/Portfolio/',
  // eslint-disable-next-line no-undef
  output: process?.env?.NODE_ENV === 'development' ? 'server' : 'static',
  outDir: 'docs',
  compressHTML: true,
  build: {
    assets: 'static',
  },
});
