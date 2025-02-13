import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import playformCompress from '@playform/compress';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jorgepeniaranda.github.io/Portfolio/',
  base: '/Portfolio/',
  integrations: [react(), sitemap(), tailwind(), playformCompress(), icon(), robotsTxt()],
  compressHTML: true,
  output: process.env.NODE_ENV === 'development' ? 'server' : 'static',
  outDir: 'docs',
  build: {
    assets: 'static',
  },
});
