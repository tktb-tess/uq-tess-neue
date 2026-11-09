import * as v from 'valibot';

export const todayWordSchema = v.pipe(
  v.object({
    name: v.string(),
    translations: v.pipe(
      v.array(v.pipe(v.tuple([v.string(), v.string()]), v.readonly())),
      v.readonly(),
    ),
    pronunciation: v.string(),
    dictUrl: v.string(),
  }),
  v.readonly(),
);

export type TodayWord = v.InferOutput<typeof todayWordSchema>;
