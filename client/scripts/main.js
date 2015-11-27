'use strict';

import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';

(() => {
  if (!window.cutsTheMustard) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Blackscreen();
    new Pagination();
  });
})();
