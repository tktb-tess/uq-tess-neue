<script lang="ts">
  import { Success, Failed } from '../../modules/result';

  const url = 'https://api.tktb-tess.dev/today-word/';

  async function fetchTodayWord() {
    try {
      const resp = await fetch(url, { signal: AbortSignal.timeout(30000) });

      if (!resp.ok) {
        return Failed(
          Error(`Failed to fetch\n${resp.status} ${resp.statusText}`, {
            cause: resp,
          }),
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        return Failed(e);
      } else {
        return Failed(Error('unexpected error', { cause: e }));
      }
    }
  }
</script>

<div></div>

<style lang="postcss">
</style>
