'use strict';

// import parallaxScenes from './components/parallax-scenes';
import Blackscreen from './components/blackscreen';
import Pagination from './components/pagination';
import lazyLoad from './components/lazy-load';
import splash from './components/splash';

(() => {
  if (!window.cutsTheMustard) {
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Blackscreen();
    new Pagination();

    splash();
    lazyLoad();
    // parallaxScenes();
  });
})();
