export const SITE_NAME = '悠久肆方体';
export const BASE_URL = 'https://tktb-tess.dev';

export type ColorScheme = 'light dark' | 'light' | 'dark';

export function isColorScheme(o: unknown) {
  return o === 'light dark' || o === 'light' || o === 'dark';
}
