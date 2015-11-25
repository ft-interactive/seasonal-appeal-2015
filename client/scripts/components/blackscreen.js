'use strict';

import fastdom from 'fastdom';
import {addWatcher} from '../utils/scroll-watcher';

class Blackscreen {

  constructor(target) {
    this.target = target;
    this.watcherId = addWatcher(this.checkPosition.bind(this));

    this.checkPosition();
  }

  checkPosition() {
    let viewportHeight = window.innerHeight;
    let targetBoundingBox = this.target.getBoundingClientRect();

    if (targetBoundingBox.top > viewportHeight || targetBoundingBox.bottom < 0) {
      return;
    }

    let ratio = (1 / viewportHeight);
    let value = (targetBoundingBox.height - Math.abs(targetBoundingBox.bottom));

    fastdom.write(() => {
      this.target.style.opacity = (ratio * value).toFixed(2);
    });
  }

}

export default Blackscreen;
