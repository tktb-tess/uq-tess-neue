import * as v from 'valibot';
import type { ReadonlyDeep } from 'type-fest';

export const todayWordSchema = v.object({
  name: v.string(),
  translations: v.array(v.tuple([v.string(), v.string()])),
  pronunciation: v.string(),
  dictUrl: v.string(),
});

export type TodayWord = ReadonlyDeep<v.InferOutput<typeof todayWordSchema>>;

export function getTag(o: unknown): string {
  return Object.prototype.toString.call(o);
}

export function cannotGetHandler<T extends Element>(
  name: string,
  expected: T,
  elem: unknown,
): never {
  throw TypeError(`${name} is not ${getTag(expected)}, but ${getTag(elem)}`, {
    cause: elem,
  });
}
