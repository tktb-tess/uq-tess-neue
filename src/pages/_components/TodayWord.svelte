<script lang="ts">
  import {
    Success,
    Failed,
    Indefinite,
    type Result,
  } from '../../modules/result';
  import { todayWordSchema, type TodayWord } from '../../modules/helpers';
  import * as v from 'valibot';
  import { onMount } from 'svelte';

  type TodayWordResultAsync = Promise<Result<TodayWord, Error>>;

  async function fetchTodayWord(): TodayWordResultAsync {
    try {
      const url = 'https://api.tktb-tess.dev/today-word/';
      const resp = await fetch(url, { signal: AbortSignal.timeout(30000) });

      if (!resp.ok) {
        return Failed(
          Error(`Failed to fetch\n${resp.status} ${resp.statusText}`, {
            cause: resp,
          }),
        );
      }

      const j: unknown = await resp.json();
      const p = v.safeParse(todayWordSchema, j);

      if (p.success) {
        return Success(p.output);
      } else {
        return Failed(new v.ValiError(p.issues));
      }
    } catch (e) {
      if (e instanceof Error) {
        return Failed(e);
      } else {
        return Failed(Error('unexpected error', { cause: e }));
      }
    }
  }

  let result: TodayWordResultAsync = $state(Promise.resolve(Indefinite()));

  onMount(() => {
    result = fetchTodayWord();
  });

  $effect(() => {
    result.then(
      (res) => {
        if (res.status === 'failed') {
          console.error(res.error);
        }
      },
      (e) => console.error(e),
    );
  });
</script>

<div class="__today-word-rt">
  {#await result}
    <p class="__pending">読み込み中……</p>
  {:then res}
    {#if res.status === 'success'}
      {@const { name, pronunciation, translations, dictUrl } = res.value}
      <h2 class="__entry" data-big={name.length < 10 ? '' : null}>
        {name}
      </h2>
      <p class="__pronunciation">{pronunciation}</p>
      <table class="__yaku">
        <caption>訳</caption>
        <thead>
          <tr>
            <th>品詞</th>
            <th>訳語</th>
          </tr>
        </thead>
        <tbody>
          {#each translations as tra (tra.join('-'))}
            <tr>
              <td>{tra[0]}</td>
              <td>{tra[1]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <p>
        <a href={dictUrl} target="_blank">
          ZpDIC Online
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="ext-link-icon"
          >
            <path
              d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"
            >
            </path>
          </svg>
        </a>
      </p>
    {:else if res.status === 'failed'}
      <h2 class="__fail-h2">読み込みに失敗しました</h2>
      <button
        type="button"
        class="__refetch-btn btn-theme-1"
        onclick={(ev) => {
          ev.preventDefault();
          result = fetchTodayWord();
        }}
      >
        再読み込み
      </button>
    {/if}
  {:catch}
    <h2 class="__unexpect">unexpected error</h2>
  {/await}
</div>

<style lang="postcss">
  @reference '../../styles/app.css';

  @layer components {
    .__today-word-rt {
      @apply grid mx-auto inline-[min(720px,100%)] justify-items-center-safe
        border border-border rounded-sm gap-y-6 py-6 my-figure;

      h2,
      tr,
      td,
      th {
        border: unset;
      }

      h2 {
        font: unset;
      }

      p,
      h2 {
        @apply m-[unset] p-[unset] text-center;
      }

      .__fail-h2,
      .__unexpect {
        @apply text-caution text-xl;
      }

      .__refetch-btn {
        @apply block;
      }

      .__entry {
        @apply font-serif;

        &[data-big] {
          @apply text-5xl;
        }

        &:not([data-big]) {
          @apply text-4xl;
        }
      }

      .__pronunciation {
        @apply text-text/60 font-ipa text-sm;
      }

      .__yaku {
        @apply m-[unset];

        :is(td, th):not(:where(tbody td:last-child)) {
          @apply text-center;
        }
      }
    }
  }
</style>
