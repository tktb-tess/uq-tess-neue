import type * as Mdast from 'mdast';
import type * as Hast from 'hast';
import type { TextDirective } from 'mdast-util-directive';
import { toHast, type Handler } from 'mdast-util-to-hast';
import { h } from 'hastscript';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';

const emptyText: Hast.Text = {
  type: 'text',
  value: '',
};

const extLinkIconElem = (() => {
  /** from Octicons */
  const txt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path></svg>`;
  const parsed = fromHtmlIsomorphic(txt, { fragment: true }).children[0];

  if (parsed == null || parsed.type !== 'element') {
    throw Error('Not svg');
  }

  parsed.properties.className ??= [];
  parsed.properties.className.push('ext-link-icon');
  return parsed;
})();

/**
 * 危険なデータは消しつつhastに変換
 * @param tree
 * @returns
 */
function safeToHast(tree: Mdast.Nodes) {
  const hast = toHast(tree, { allowDangerousHtml: true });
  if (
    hast.type === 'root' ||
    hast.type === 'doctype' ||
    (hast.type === 'element' && hast.tagName === 'script')
  ) {
    return emptyText;
  }

  return hast;
}

function phrasingToHast(mdNode: Mdast.Nodes): Hast.ElementContent {
  switch (mdNode.type) {
    case 'textDirective': {
      return _tdHandler(mdNode);
    }
    default: {
      return safeToHast(mdNode);
    }
  }
}

function _tdHandler(node: TextDirective): Hast.ElementContent {
  switch (node.name) {
    case 'ipa': {
      return h('span.font-ipa', node.children.map(phrasingToHast));
    }
    case 'sup': {
      return h('sup', node.children.map(phrasingToHast));
    }
    case 'sub': {
      return h('sub', node.children.map(phrasingToHast));
    }
    case 'exl': {
      const href = node.attributes?.h ?? '';

      return h(
        'a',
        {
          href,
          target: '_blank',
        },
        [...node.children.map(phrasingToHast), extLinkIconElem],
      );
    }
    default: {
      return safeToHast(node);
    }
  }
}

export const tdHandler: Handler = (_, node: TextDirective) => {
  return _tdHandler(node);
};

function tcHandler(tc: Mdast.TableCell, tag: 'td' | 'th') {
  // 子要素は1個だけを想定
  if (tc.children.length !== 1) {
    return h(tag, tc.children.map(phrasingToHast));
  }

  const ph = tc.children[0];

  // TextDirective以外は除外
  if (ph == null || ph.type !== 'textDirective') {
    return h(tag, tc.children.map(phrasingToHast));
  }

  switch (ph.name) {
    case 's': {
      const parse = (v: string) => {
        const n = Number.parseInt(v);
        return Number.isFinite(n) && n >= 0 ? n : 1;
      };

      const rowspan = parse(ph.attributes?.r ?? '1');
      const colspan = parse(ph.attributes?.c ?? '1');

      if (rowspan === 0 || colspan === 0) {
        return null;
      }

      return h(tag, { rowspan, colspan }, ph.children.map(phrasingToHast));
    }
    case 'e': {
      return null;
    }
    default: {
      return h(tag, tc.children.map(phrasingToHast));
    }
  }
}

export const tableHandler: Handler = (_, node: Mdast.Table) => {
  const [head, ...body] = node.children;

  if (head == null) {
    throw TypeError('unexpected: `head` is undefined');
  }

  const headThs = head.children
    .map((th) => tcHandler(th, 'th'))
    .filter((e) => e != null);

  const cond = headThs.some((th) => th.children.length > 0);

  const thead = cond ? h('thead', h('tr', headThs)) : null;

  const bodyTrs = body.map((row) => {
    return row.children
      .map((td) => tcHandler(td, 'td'))
      .filter((e) => e != null);
  });

  // 左罫線が正しく表示されるようにする
  bodyTrs.forEach((row, i) => {
    const first = row[0];
    let rowSpan = first?.properties.rowSpan;
    if (rowSpan == null) return;
    if (typeof rowSpan === 'string') {
      rowSpan = Number.parseInt(rowSpan);
    }

    if (!Number.isFinite(rowSpan) || rowSpan <= 1) return;

    for (let j = 1; j < rowSpan; j++) {
      const first = bodyTrs[i + j]?.[0];
      if (first == null) continue;
      first.properties.className ??= [];
      first.properties.className.push('need-border');
    }
  });

  const tbody = h(
    'tbody',
    bodyTrs.map((tds) => h('tr', tds)),
  );
  const table = h('table', thead ? [thead, tbody] : tbody);

  return h('div.table-container', table);
};
