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
  }),
});

export const collections = { legal };
