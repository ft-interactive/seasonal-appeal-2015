'use strict';

import {addWatcher, removeWatcher} from '../utils/scroll-watcher';

class ScrollComponent {

  constructor(target) {
    this.target = target;
  }

  init() {
    this.callbackId = addWatcher(this.checkPosition.bind(this));
    this.checkPosition();
  }

  teardown() {
    if (this.callbackId) {
      removeWatcher(this.callbackId);
      this.callbackId = null;
    }
  }

  checkPosition() {
    throw Error('Not implemented');
  }

}

export default ScrollComponent;
