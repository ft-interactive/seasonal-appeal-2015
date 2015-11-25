'use strict';

import ConstrainedSticky from './components/constrained-sticky';
import WithinViewport from './components/within-viewport';
import Blackscreen from './components/blackscreen';

document.addEventListener('DOMContentLoaded', () => {
  let withinViewportEls = document.querySelectorAll('.js-within-viewport');
  Array.prototype.forEach.call(withinViewportEls, el => new WithinViewport(el));

  let constainedStickyEls = document.querySelectorAll('.js-sticky-thing');
  Array.prototype.forEach.call(constainedStickyEls, el => new ConstrainedSticky(el));

  let blackscreenEls = document.querySelectorAll('.js-blackscreen');
  Array.prototype.forEach.call(blackscreenEls, el => new Blackscreen(el));
});
