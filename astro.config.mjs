import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// import playformCompress from "@playform/compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://jorgepeniaranda.dev.ar",
  integrations: [tailwind(), sitemap(), react(), icon(), robotsTxt()]
});