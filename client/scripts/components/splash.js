'use strict';

// Parallax module doesn't export anything, it just gets attached to the window
import 'parallax/deploy/parallax';
import debounce from '../utils/debounce';
import loadImages from '../utils/load-images';

export default function () {
  const splash = document.querySelector('.js-splash');

  let instance;
  let isLoading;

  function toggle() {
    const scrollDepth = window.pageYOffset;
    const splashHeight = splash.clientHeight;

    // Assume element is not displayed if height = 0
    if (!splashHeight || isLoading) {
      return;
    }

    if (scrollDepth <= splashHeight) {
      if (instance) {
        instance.enable();
      } else {
        isLoading = true;

        loadImages(splash.querySelectorAll('img[data-src]'), () => {
          instance = new window.Parallax(splash);
          isLoading = false;
        });
      }
    } else if (instance && instance.enabled) {
      instance.disable();
    }
  }

  window.addEventListener('scroll', debounce(toggle, 100), false);
  window.addEventListener('resize', debounce(toggle, 100), false);

  toggle();
}
