// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { transformerNotationDiff } from '@shikijs/transformers';
import * as H from '@uq-tess/plugin';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://tktb-tess.dev',
  integrations: [
    svelte(),
    sitemap({
      serialize: (item) => {
        item.changefreq = ChangeFreqEnum.WEEKLY;
        item.lastmod = new Date().toISOString();
        const { pathname } = new URL(item.url);
        item.priority = pathname === '/' ? 1 : 0.8;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 8000,
  },
  build: {
    inlineStylesheets: 'never',
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        H.remarkMath,
        H.remarkDirective,
        [H.remarkToc, { heading: '目次' }],
      ],
      remarkRehype: {
        handlers: {
          table: H.tableHandler,
          textDirective: H.tdHandler,
        },
      },
      rehypePlugins: [
        H.rehypeKatex,
        rehypeHeadingIds,
        [
          H.rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['auto-link'],
            },
          },
        ],
      ],
    }),
    shikiConfig: {
      theme: 'github-dark',
      transformers: [transformerNotationDiff()],
    },
  },
});
