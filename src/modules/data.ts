export interface PageData {
  readonly title: string;
  readonly description?: string;
}

export type PageDataMap = ReadonlyMap<string, PageData>;

const pageDataMap: PageDataMap = new Map([
  ['/misc/musiken/', { title: '音楽', description: '作曲は楽しいぞ' }],
]);

export function getPageData(path: string): PageData {
  const pageData = pageDataMap.get(path);

  if (pageData == null) {
    throw Error(`Pagedata for ${path} is not found`);
  }

  return pageData;
}
