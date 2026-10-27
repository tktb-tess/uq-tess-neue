// @ts-check
import { vitePreprocess } from '@astrojs/svelte';

/** @type {import('@sveltejs/vite-plugin-svelte').Options} */
export default {
  preprocess: [vitePreprocess()],
  compilerOptions: {
    runes: (o) =>
      o.filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
  },
};
