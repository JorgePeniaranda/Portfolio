import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { ORIGINAL_URL } from "./src/constants/seo";

export default defineConfig({
  site: ORIGINAL_URL,
  integrations: [tailwind(), sitemap(), react()]
});