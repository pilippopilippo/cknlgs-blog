// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://cknlgs.cc",
	redirects: { "/blog": "/" },
	// Keep Astro 5 whitespace handling (Astro 7 defaults to "jsx", which removes spaces between inline elements)
	compressHTML: true,
	integrations: [mdx(), sitemap()],
	vite: {
		// Keep CSS readable by older browsers (e.g. iOS < 16.4 doesn't support media query range syntax)
		build: { cssTarget: ["safari14", "chrome90", "firefox90"] },
	},
	// No sessions or image transforms are used, so don't provision the KV/Images bindings
	session: false,
	adapter: cloudflare({
		imageService: "passthrough",
	}),
});
