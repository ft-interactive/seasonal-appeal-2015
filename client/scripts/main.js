'use strict';

import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';
import lazyLoad from './components/lazy-load';
import parallax from './components/parallax';

(() => {
  if (!window.cutsTheMustard) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Blackscreen();
    new Pagination();

    parallax();
    lazyLoad();
  });
})();
