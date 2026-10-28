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
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import { transformerNotationDiff } from '@shikijs/transformers';
import * as H from './plugins/handlers';

const linkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>`;
const linkSvgContent = fromHtmlIsomorphic(linkSvg, { fragment: true }).children;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: '/uq-tess-neue',
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
            behaviour: 'append',
            properties: {
              className: ['anchor-link'],
            },
            content: linkSvgContent,
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
