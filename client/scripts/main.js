'use strict';

import Sticky from './components/sticky';
import Curtain from './components/curtain';

document.addEventListener('DOMContentLoaded', () => {
  const ENHANCIFY_AT = 760;

  if (window.innerWidth >= ENHANCIFY_AT) {
    // Sticky section navigation
    new Sticky(document.querySelector('.js-sticky-thing'));

    // Opening cover section
    new Curtain(document.querySelector('.js-curtain'));
  }
});
