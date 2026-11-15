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
  throw TypeError(`'${name}' is not ${getTag(expected)}, but ${getTag(elem)}`, {
    cause: elem,
  });
}

export type Constructor<T, Arg extends unknown[] = unknown[]> = {
  new (...args: Arg): T;
  readonly prototype: T;
};

export function getElementById<T extends Element, U extends unknown[]>(
  id: string,
  Kind: Constructor<T, U>,
) {
  const elem: Element | null = document.getElementById(id);

  if (!(elem instanceof Kind)) {
    throw TypeError(
      `'${id}' is expected to be ${getTag(Kind.prototype)}, but ${getTag(elem)} is gotten`,
      { cause: elem },
    );
  }

  return elem;
}

export function querySelector<T extends Element, U extends unknown[]>(
  parent: ParentNode,
  query: string,
  Kind: Constructor<T, U>,
) {
  const elem = parent.querySelector(query);

  if (!(elem instanceof Kind)) {
    throw TypeError(
      `'${query}' is expected to be ${getTag(Kind.prototype)}, but ${getTag(elem)} is gotten`,
      { cause: elem },
    );
  }

  return elem;
}

export function querySelectorAll<T extends Element, U extends unknown[]>(
  parent: ParentNode,
  query: string,
  Kind: Constructor<T, U>,
) {
  const elems = parent.querySelectorAll(query);

  return Array.from(elems, (elem) => {
    if (!(elem instanceof Kind)) {
      throw TypeError(
        `'${query}' is expected to be ${getTag(Kind.prototype)}, but ${getTag(elem)} is gotten`,
        { cause: elem },
      );
    }

    return elem;
  });
}
