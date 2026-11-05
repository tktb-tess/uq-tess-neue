<script lang="ts">
  import { cornacchia, bailliePSW } from '@tktb-tess/util-fns/baillie_psw';
  import { Failed, Success, type Result } from '../../../../../modules/result';
  import { renderToString } from 'katex';

  let n: bigint = $state(0n);
  const p = $derived((n << 2n) | 1n);

  interface SumObj {
    sum: [bigint, bigint];
    pyth: [bigint, bigint];
  }

  type CalcResult = Result<SumObj, Error>;

  const result: CalcResult = $derived.by(() => {
    if (!bailliePSW(p)) {
      return Failed(new Error(`${p}は素数ではありません`));
    }

    if ((p & 3n) === 3n) {
      return Failed(new Error('unexpected error', { cause: p }));
    }

    try {
      const r = cornacchia(p);
      if (r == null) {
        return Failed(new Error('unexpected error'));
      }
      const [m, n] = r;
      const a: [bigint, bigint] = [m * m - n * n, (m * n) << 1n];
      a.sort((a, b) => Number(a - b));
      return Success({
        sum: [m, n],
        pyth: a,
      });
    } catch (cause) {
      return Failed(new Error('unexpected error', { cause }));
    }
  });
</script>

<div class="__cornacchia">
  <p class="__input-text">
    4 ×
    <input
      type="number"
      id="__input"
      class="__input"
      min="0"
      max="9007199254740991"
      bind:value={
        () => n?.toString() ?? '0',
        (_n) => {
          const __n = BigInt(_n);
          const MAX = BigInt(Number.MAX_SAFE_INTEGER);

          if (__n < 0n) {
            n = 0n;
          } else if (__n > MAX) {
            n = MAX;
          } else {
            n = __n;
          }
        }
      }
    />
    + 1 = {p}
  </p>

  <p class="__result">
    {#if result.status === 'success'}
      {@const {
        sum: [m, n],
        pyth: [x, y],
      } = result.value}
      {@html renderToString(`${p} = ${m}^2 + ${n}^2`, { displayMode: true })}
      {@html renderToString(`${x}^2 + ${y}^2 = ${p}^2`, { displayMode: true })}
    {:else if result.status === 'failed'}
      {@const msg = result.error.message}
      {@html renderToString(`\\text\{${msg}\}`, { displayMode: true })}
    {/if}
  </p>
</div>

<style lang="postcss">
  @reference '../styles/global.css';

  @layer components {
    .__cornacchia {
      @apply flex flex-col gap-y-4 text-center *:mbs-0 my-4;

      .__input-text {
        @apply font-mono;
      }

      .__input {
        @apply inline-block min-inline-0 inline-45 mx-auto border border-border rounded-sm px-1 font-mono;
      }
    }
  }
</style>
