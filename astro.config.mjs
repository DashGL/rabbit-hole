import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://dashgl.github.io',
  base: '/rabbit-hole',
  integrations: [tailwind(), icon(), sitemap(), robotsTxt(), mdx()]
});