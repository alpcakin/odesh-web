import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const legalSchema = z.object({
  title: z.string(),
  shortTitle: z.string(),
  subtitle: z.string(),
  description: z.string(),
  order: z.number().int(),
  /** Matches the app's constants/legal.ts TERMS_VERSION/PRIVACY_VERSION; omit for undocumented docs (veri-silme). */
  version: z.string().optional(),
});

// Same file names (= LegalDocId) in both folders; English URLs come from routes.ts LEGAL_SLUGS.
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: legalSchema,
});

const legalEn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal-en' }),
  schema: legalSchema,
});

export const collections = { legal, legalEn };
