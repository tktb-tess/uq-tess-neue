// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
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
        remarkMath,
        remarkDirective,
        [remarkToc, { heading: '目次' }],
      ],
      remarkRehype: {
        handlers: {
          table: H.tableHandler,
          textDirective: H.tdHandler,
        },
      },
      rehypePlugins: [
        rehypeKatex,
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
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
