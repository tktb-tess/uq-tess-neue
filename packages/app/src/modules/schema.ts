import * as v from 'valibot';
import type { ReadonlyDeep } from 'type-fest';

export const todayWordSchema = v.object({
  name: v.string(),
  translations: v.array(v.tuple([v.string(), v.string()])),
  pronunciation: v.string(),
  dictUrl: v.string(),
});

export type TodayWord = ReadonlyDeep<v.InferOutput<typeof todayWordSchema>>;
