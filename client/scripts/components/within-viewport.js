'use strict';

import fastdom from 'fastdom';
import {addWatcher, removeWatcher} from '../utils/scroll-watcher';

// Amount of element that should be visible before triggering (px)
const THRESHOLD = 100;

class WithinViewport {

  constructor(target) {
    this.target = target;
    this.watcherId = addWatcher(this.checkPosition.bind(this));

    this.checkPosition();
  }

  checkPosition() {
    let targetBoundingBox = this.target.getBoundingClientRect();

    if (targetBoundingBox.top >= 0 && targetBoundingBox.top < (window.innerHeight - THRESHOLD)) {
      fastdom.write(() => {
        this.target.classList.add('in-viewport');
        removeWatcher(this.watcherId);
      });
    }
  }

}

export default WithinViewport;
