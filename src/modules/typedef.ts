export interface PageData {
  readonly title: string;
  readonly description?: string;
}

export type PageDataMap = ReadonlyMap<string, PageData>;

interface Success<T> {
  readonly status: 'success';
  value: T;
}

function Success<T>(value: T): Success<T> {
  return {
    status: 'success',
    value,
  };
}

interface Failed<E> {
  readonly status: 'failed';
  error: E;
}

function Failed<E>(error: E): Failed<E> {
  return {
    status: 'failed',
    error,
  };
}

interface Indefinite {
  readonly status: 'indefinite';
}

function Indefinite(): Indefinite {
  return {
    status: 'indefinite',
  };
}

export { Success, Failed, Indefinite };

export type Result<T, E> = Success<T> | Failed<E> | Indefinite;
