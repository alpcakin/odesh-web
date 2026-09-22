import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    subtitle: z.string(),
    description: z.string(),
    order: z.number().int(),
    /** Matches the app's constants/legal.ts TERMS_VERSION/PRIVACY_VERSION; omit for undocumented docs (veri-silme). */
    version: z.string().optional(),
  }),
});

export const collections = { legal };
