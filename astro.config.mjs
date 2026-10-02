// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://cknlgs.cc",
	redirects: {
		"/blog": "/",
		// Browsers and crawlers request /favicon.ico when a page doesn't declare an icon (e.g. the RSS feed)
		"/favicon.ico": "/favicon.svg",
	},
	// Keep Astro 5 whitespace handling (Astro 7 defaults to "jsx", which removes spaces between inline elements)
	compressHTML: true,
	// The site's CSS is small: inline it in each page instead of separate render-blocking files
	build: { inlineStylesheets: "always" },
	integrations: [mdx(), sitemap()],
	markdown: {
		// GitHub's high-contrast dark theme: every syntax color is at least 7:1 on the code background (WCAG AAA)
		shikiConfig: { theme: "github-dark-high-contrast" },
	},
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
