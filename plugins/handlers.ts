import type * as Mdast from 'mdast';
import type * as Hast from 'hast';
import type { TextDirective } from 'mdast-util-directive';
import { toHast, type Handler } from 'mdast-util-to-hast';
import { h } from 'hastscript';

const emptyText: Hast.Text = {
  type: 'text',
  value: '',
};

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
    default: {
      return safeToHast(node);
    }
  }
}

function phrasingToHast(mdNode: Mdast.PhrasingContent): Hast.ElementContent {
  if (mdNode.type === 'textDirective') {
    return _tdHandler(mdNode);
  } else {
    return safeToHast(mdNode);
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
