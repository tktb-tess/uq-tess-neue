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

  async function fetchTodayWord(): Promise<Result<TodayWord, Error>> {
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

      const j = await resp.json();
      console.log(j);

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
    <p>読み込み中……</p>
  {:then res}
    {#if res.status === 'success'}
      {@const { value } = res}
      <h2>{value.name}</h2>
      <p>{value.pronunciation}</p>
      <table class="__yaku">
        <caption>訳</caption>
        <thead>
          <tr>
            <th>品詞</th>
            <th>訳語</th>
          </tr>
        </thead>
        <tbody>
          {#each value.translations as tra (tra.join('-'))}
            <tr>
              <td>{tra[0]}</td>
              <td>{tra[1]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else if res.status === 'failed'}
      <h2>読み込みに失敗しました</h2>
      <button
        type="button"
        onclick={(ev) => {
          ev.preventDefault();
          result = fetchTodayWord();
        }}
      >
        再読み込み
      </button>
    {/if}
  {:catch}
    <p>unexpected error</p>
  {/await}
</div>

<style lang="postcss">
</style>
