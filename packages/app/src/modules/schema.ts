import * as v from 'valibot';
import { Success, Failed, type Result } from './result';
import type { ReadonlyDeep } from 'type-fest';

const todayWordSchema = v.object({
  name: v.string(),
  translations: v.array(v.tuple([v.string(), v.string()])),
  pronunciation: v.string(),
  dictUrl: v.string(),
});

export type TodayWord = ReadonlyDeep<v.InferOutput<typeof todayWordSchema>>;

export function parseTodayWord(
  o: unknown,
): Result<
  TodayWord,
  v.ValiError<v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>
> {
  const r = v.safeParse(todayWordSchema, o);
  if (r.success) {
    return Success(r.output);
  } else {
    return Failed(new v.ValiError(r.issues));
  }
}
