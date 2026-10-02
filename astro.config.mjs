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
	// Generate several sizes of each image so phones download smaller files
	image: { layout: "constrained" },
	vite: {
		// Keep CSS readable by older browsers (e.g. iOS < 16.4 doesn't support media query range syntax)
		build: { cssTarget: ["safari14", "chrome90", "firefox90"] },
	},
	// No sessions are used, so don't provision the KV binding
	session: false,
	adapter: cloudflare({
		// Optimize post images at build time (no Cloudflare Images binding needed at runtime)
		imageService: "compile",
	}),
});
