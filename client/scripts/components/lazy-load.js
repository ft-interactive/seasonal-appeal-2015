'use strict';

import scrollMonitor from 'scrollMonitor';

export default function () {
  let targets = document.querySelectorAll('.js-lazy-load');

  Array.prototype.map.call(targets, target => {
    let monitor = scrollMonitor.create(target, {
      top: 200,
      bottom: 200
    });

    monitor.enterViewport(() => {
      // This can trigger even when the element is not visible (display:none)
      // because offsets = 0
      if (!target.offsetParent) {
        return;
      }

      target.classList.remove('js-lazy-load');
      monitor.destroy();
    });

    return monitor;
  });
}
