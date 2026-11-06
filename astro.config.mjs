// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { transformerNotationDiff } from '@shikijs/transformers';
import * as H from './plugins/handlers';
import { h } from 'hastscript';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://tktb-tess.dev',
  integrations: [svelte()],
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
            content: h(
              'span.anchor',
              {},
              { type: 'text', value: '🔗' },
            ),
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
