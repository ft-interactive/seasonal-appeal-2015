'use strict';

import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';

document.addEventListener('DOMContentLoaded', () => {

  let blackscreenEls = document.querySelectorAll('.js-blackscreen');
  Array.prototype.forEach.call(blackscreenEls, el => new Blackscreen(el));

  new Pagination();
});
