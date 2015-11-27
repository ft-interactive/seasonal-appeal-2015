'use strict';

import scrollMonitor from 'scrollMonitor';

export default function () {
  let splash = document.querySelector('.js-splash');
  let coverage = document.querySelector('.js-splash-coverage');

  let monitor = scrollMonitor.create(coverage, {
    top: 200,
    bottom: 200
  });

  monitor.enterViewport(() => {
    splash.style.display = 'block';
  });

  monitor.exitViewport(() => {
    splash.style.display = 'none';
  });
}
