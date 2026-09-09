import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    /** Full SEO title of the article (used in <title> and og:title) */
    title: z.string(),
    /** Meta description – keep under 160 characters */
    description: z.string(),
    /** ISO date string e.g. "2026-09-15" */
    publishDate: z.coerce.date(),
    /** Optional update date for freshness signals */
    updatedDate: z.coerce.date().optional(),
    /** Byline shown on the article */
    author: z.string().default('InchPixels Team'),
    /** Topical cluster this article belongs to */
    cluster: z.enum(['conceptual', 'how-to', 'industry']),
    /** Short list of tags for related-article matching */
    tags: z.array(z.string()),
    /** Approximate reading time in minutes */
    readingTime: z.number().optional(),
    /** Inline FAQ items rendered as FAQPage schema + visible Q&A block */
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog };
