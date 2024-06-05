import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

import { ORIGINAL_URL } from "./src/constants/seo";

// https://astro.build/config
export default defineConfig({
  site: ORIGINAL_URL,
  integrations: [tailwind(), sitemap(), react(), playformCompress(), icon(), robotsTxt()]
});