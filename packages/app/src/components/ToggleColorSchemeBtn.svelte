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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75V5a.75.75 0 0 1-1.5 0V2.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25H7A.75.75 0 0 1 7 12h-.268a5.712 5.712 0 0 1-.765 2.5H7A.75.75 0 0 1 7 16H4.5a.75.75 0 0 1-.565-1.243c.772-.885 1.193-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25v-7.5Z"
      >
      </path>
      <path
        d="M10.75 7h3.5c.967 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 16h-3.5A1.75 1.75 0 0 1 9 14.25v-5.5C9 7.784 9.783 7 10.75 7Zm-.25 1.75v5.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25Z"
      >
      </path>
    </svg>
  {:else if mode === 'light'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8Zm-8 5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Zm3.536-1.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM2.343 2.343a.75.75 0 0 1 1.061 0l1.06 1.061a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018l-1.06-1.06a.75.75 0 0 1 0-1.06Z"
      >
      </path>
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z"
      >
      </path>
    </svg>
  {/if}
</button>

<style lang="postcss">
  @reference '../styles/app.css';

  @layer components {
    button {
      @apply p-2;
    }

    button > svg {
      @apply inline-4 block-auto;
    }
  }
</style>
