'use strict';

import Sticky from './components/sticky';

document.addEventListener('DOMContentLoaded', () => {

  // Sticky section navigation
  new Sticky(document.querySelector('.js-sticky-thing'), {});

});
