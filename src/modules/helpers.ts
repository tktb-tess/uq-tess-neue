export function clone<T>(o: readonly T[]): T[] {
  return structuredClone(o) as T[];
}

