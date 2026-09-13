import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeTableWrap from './src/plugins/rehype-table-wrap.mjs';

export default defineConfig({
  site: 'https://odesh.app',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeTableWrap] }),
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
