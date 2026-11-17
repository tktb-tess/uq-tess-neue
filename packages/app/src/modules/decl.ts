export type Constructor<T, Arg extends unknown[] = unknown[]> = {
  new (...args: Arg): T;
  readonly prototype: T;
};
