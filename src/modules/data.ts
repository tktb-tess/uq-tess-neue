export interface PageData {
  readonly title: string;
  readonly description?: string;
}

export type PageDataMap = ReadonlyMap<string, PageData>;

const pageDataMap: PageDataMap = new Map([]);

export function getPageData(path: string): PageData {
  return pageDataMap.get(path) ?? { title: '[NODATA]' };
}
