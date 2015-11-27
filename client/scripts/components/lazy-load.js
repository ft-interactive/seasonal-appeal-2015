'use strict';

import scrollMonitor from 'scrollMonitor';

class LazyLoad {

  constructor() {
    this.targets = document.querySelectorAll('.js-lazy-load');

    this.targetMonitors = (
      Array.prototype.map.call(this.targets, (target, index) => {
        let monitor = scrollMonitor.create(target, {
          bottom: 200
        });

        monitor.enterViewport(() => {
          this.targets[index].classList.remove('js-lazy-load');
          monitor.destroy();
        });

        return monitor;
      })
    );
  }

}

export default LazyLoad;
