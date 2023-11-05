import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://jorgepeniaranda.github.io",
  base: "/Portfolio",
  integrations: [tailwind(), mdx(), sitemap()],
});
