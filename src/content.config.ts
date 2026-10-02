import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Path relative to the post file, e.g. "./copertina.jpg" (optimized at build time)
			heroImage: image().optional(),
			// Draft posts are excluded from the home page, post routes and RSS feed
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
