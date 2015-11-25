'use strict';

import fastdom from 'fastdom';
import {addWatcher} from '../utils/scroll-watcher';

class ConstrainedSticky {

  constructor(target) {
    this.target = target;
    this.watcherId = addWatcher(this.checkPosition.bind(this));

    this.checkPosition();
  }

  checkPosition() {
    let parent = this.target.offsetParent;

    if (!parent) {
      return;
    }

    let targetHeight = this.target.offsetHeight;
    let parentBoundingBox = parent.getBoundingClientRect();

    let boundaryTop = (parentBoundingBox.top > 0);
    let boundaryBottom = ((parentBoundingBox.bottom - targetHeight) <= 0);

    fastdom.write(() => {
      if (boundaryTop || boundaryBottom) {
        this.target.classList.remove('is-sticky');
        this.target.classList.toggle('is-bottom', boundaryBottom);
      } else {
        this.target.classList.add('is-sticky');
        this.target.classList.remove('is-bottom');
      }
    });
  }

}

export default ConstrainedSticky;
