export interface PageData {
  readonly title: string;
  readonly description?: string;
  readonly katex?: boolean;
}

export type PageDataMap = ReadonlyMap<string, PageData>;

const pageDataMap: PageDataMap = new Map<string, PageData>([
  ['/misc/musiken/', { title: '音楽', description: '作曲は楽しいぞ' }],
  [
    '/misc/math/4n_1_sum_of_sq/',
    { title: '4n + 1型素数を2平方和に分解', katex: true },
  ],
]);

export function getPageData(path: string): PageData {
  const pageData = pageDataMap.get(path);

  if (pageData == null) {
    throw Error(`Pagedata for ${path} is not found`);
  }

  return pageData;
}
