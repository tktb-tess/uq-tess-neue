import { querySelectorAll, querySelector } from './helpers';

let dAndCSet:
  | readonly (readonly [HTMLDetailsElement, HTMLDivElement])[]
  | undefined;

function getDAndCSet() {
  if (!dAndCSet) {
    const d_ = querySelectorAll(
      document,
      '.__sidemenu-root > details',
      HTMLDetailsElement,
    );

    dAndCSet = d_.map((details) => {
      const content = querySelector(details, '.__content', HTMLDivElement);
      return [details, content];
    });
  }

  return dAndCSet;
}

export function setOpenHeight() {
  const dAndCSet = getDAndCSet();

  dAndCSet.forEach(([details, content]) => {
    const openHeight = `${content.scrollHeight + 1}px`;
    details.style.setProperty('--open-height', openHeight);
  });
}
