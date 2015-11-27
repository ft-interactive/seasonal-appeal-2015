'use strict';

import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';
import LazyLoad from './components/lazy-load';

(() => {
  if (!window.cutsTheMustard) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Blackscreen();
    new Pagination();
    new LazyLoad();
  });
})();
