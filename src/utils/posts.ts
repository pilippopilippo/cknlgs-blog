import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export interface Tag {
	/** URL-safe identifier, e.g. "cucina-italiana" */
	slug: string;
	/** Name as written in the posts (lowercase), e.g. "cucina italiana" */
	label: string;
	count: number;
}

/** Published (non-draft) posts, newest first */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** "Cucina Italiana" / "cucina-italiana" / "cucina italiàna" → "cucina-italiana" */
export function tagSlug(tag: string): string {
	return tag
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** A post's tags, deduplicated by slug */
export function postTags(post: Post): Omit<Tag, 'count'>[] {
	const tags = new Map<string, string>();
	for (const label of post.data.tags) {
		const slug = tagSlug(label);
		if (slug && !tags.has(slug)) tags.set(slug, label);
	}
	return [...tags].map(([slug, label]) => ({ slug, label }));
}

/** All tags used by the given posts, most used first */
export function getTags(posts: Post[]): Tag[] {
	const tags = new Map<string, Tag>();
	for (const post of posts) {
		for (const { slug, label } of postTags(post)) {
			const tag = tags.get(slug) ?? { slug, label, count: 0 };
			tag.count++;
			tags.set(slug, tag);
		}
	}
	return [...tags.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
