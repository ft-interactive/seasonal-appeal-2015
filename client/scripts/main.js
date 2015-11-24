'use strict';

import ConstrainedSticky from './components/constrained-sticky';
import WithinViewport from './components/within-viewport';

document.addEventListener('DOMContentLoaded', () => {
  const ENHANCIFY_AT = 760;

  let withinViewportEls = document.querySelectorAll('.js-within-viewport');
  Array.prototype.forEach.call(withinViewportEls, el => new WithinViewport(el));

  if (window.innerWidth >= ENHANCIFY_AT) {
    let constainedStickyEls = document.querySelectorAll('.js-sticky-thing');
    Array.prototype.forEach.call(constainedStickyEls, el => new ConstrainedSticky(el));
  }
});
