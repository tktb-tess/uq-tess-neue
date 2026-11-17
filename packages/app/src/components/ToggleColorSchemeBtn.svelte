<script lang="ts">
  import { onMount } from 'svelte';
  import { isColorScheme, type ColorScheme } from '../modules/consts';

  let mode: ColorScheme = $state('light dark');

  onMount(() => {
    const colorScheme = localStorage.getItem('color-scheme');

    if (isColorScheme(colorScheme)) {
      mode = colorScheme;
    }
  });

  $effect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-scheme', mode);
    localStorage.setItem('color-scheme', mode);
  });
</script>

<button
  type="button"
  class="btn-theme-1"
  onclick={(ev) => {
    ev.preventDefault();
    switch (mode) {
      case 'light dark': {
        mode = 'light';
        return;
      }
      case 'light': {
        mode = 'dark';
        return;
      }
      case 'dark': {
        mode = 'light dark';
        return;
      }
    }
  }}
>
  {#if mode === 'light dark'}
    Device default
  {:else if mode === 'light'}
    Light
  {:else}
    Dark
  {/if}
</button>

<style lang="postcss">
  @reference '../styles/app.css';

  @layer components {
    button > :global(svg) {
      @apply inline-4 block-auto;
    }
  }
</style>
