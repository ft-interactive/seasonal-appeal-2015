'use strict';

import scrollMonitor from 'scrollMonitor';
import {addWatcher, removeWatcher} from '../utils/scroll-watcher';

class Blackscreen {

  constructor() {
    this.blackscreen = document.querySelector('.js-blackscreen');
    this.blackscreenBasis = document.querySelector('.js-blackscreen-basis');

    this.basisMonitor = (() => {
      let monitor = scrollMonitor.create(this.blackscreenBasis);

      monitor.enterViewport(this.enable.bind(this));
      monitor.exitViewport(this.disable.bind(this));

      return monitor;
    })();
  }

  enable() {
    this.watcherId = addWatcher(this.calculateOpacity.bind(this));
  }

  disable() {
    if (this.watcherId) {
      removeWatcher(this.watcherId);
      this.watcherId = null;
    }
  }

  calculateOpacity() {
    let ratio = (1 / window.innerHeight);
    let percent = (ratio * (window.pageYOffset + this.basisMonitor.height - this.basisMonitor.top));
    let limited = Math.max(0, Math.min(percent, 1));

    this.blackscreen.style.opacity = limited.toFixed(2);
  }

}

export default Blackscreen;
