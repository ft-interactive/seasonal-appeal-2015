'use strict';

import Sticky from './components/sticky';
import EnterViewport from './components/enter-viewport';

document.addEventListener('DOMContentLoaded', () => {
  const ENHANCIFY_AT = 760;

  new EnterViewport(document.querySelectorAll('.js-enter-viewport'));

  if (window.innerWidth >= ENHANCIFY_AT) {
    let stickyElements = document.querySelectorAll('.js-sticky-thing');
    Array.prototype.forEach.call(stickyElements, element => new Sticky(element));
  }
});
