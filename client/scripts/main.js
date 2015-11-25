'use strict';

import WithinViewport from './components/within-viewport';
import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';

document.addEventListener('DOMContentLoaded', () => {
  let withinViewportEls = document.querySelectorAll('.js-within-viewport');
  Array.prototype.forEach.call(withinViewportEls, el => new WithinViewport(el));

  let blackscreenEls = document.querySelectorAll('.js-blackscreen');
  Array.prototype.forEach.call(blackscreenEls, el => new Blackscreen(el));

  let paginationEls = document.querySelectorAll('.js-pagination');
  Array.prototype.forEach.call(paginationEls, el => new Pagination(el));
});
