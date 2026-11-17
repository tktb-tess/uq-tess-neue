import type { Constructor } from './decl';

export function getTag(o: unknown): string {
  return Object.prototype.toString.call(o);
}

export function getElementById<T extends Element>(
  id: string,
  Kind: Constructor<T>,
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

export function querySelector<T extends Element>(
  parent: ParentNode,
  query: string,
  Kind: Constructor<T>,
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

export function querySelectorAll<T extends Element>(
  parent: ParentNode,
  query: string,
  Kind: Constructor<T>,
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
