'use strict';

import scrollMonitor from 'scrollMonitor';

export default function () {
  let targets = document.querySelectorAll('.js-lazy-load');

  Array.prototype.map.call(targets, (target, index) => {
    let monitor = scrollMonitor.create(target, {
      top: 200,
      bottom: 200
    });

    monitor.enterViewport(() => {
      targets[index].classList.remove('js-lazy-load');
      monitor.destroy();
    });

    return monitor;
  });
}
