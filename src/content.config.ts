import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Projects: one Markdown file per project and language.
 *   src/content/projects/es/<slug>.md  -> /projects/<slug>/
 *   src/content/projects/en/<slug>.md  -> /en/projects/<slug>/
 * The language comes from the folder. Files starting with `_` (e.g. `_template.md`) are loaded
 * (so the collection is never empty and Astro does not warn) but never published: see
 * `isTemplate` in src/lib/projects.ts. Templates must stay valid against the schema.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
