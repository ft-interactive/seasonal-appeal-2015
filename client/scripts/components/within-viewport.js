'use strict';

import fastdom from 'fastdom';
import {publish} from 'minpubsub';
import {addWatcher} from '../utils/scroll-watcher';

// percentage the target element should be within the viewport before triggering
const percent = 0.2;

const targetActiveClass = 'in-viewport';

class WithinViewport {

  constructor(target) {
    this.target = target;
    this.watcherId = addWatcher(this.checkPosition.bind(this));

    this.checkPosition();
  }

  checkIfEnabled() {
    if (!this.target.classList.contains(targetActiveClass)) {
      publish('section/in-view', [this.target]);
      this.target.classList.add(targetActiveClass);
    }
  }

  checkIfDisabled() {
    if (this.target.classList.contains(targetActiveClass)) {
      publish('section/out-of-view', [this.target]);
      this.target.classList.remove(targetActiveClass);
    }
  }

  checkPosition() {
    let viewportHeight = window.innerHeight;
    let targetBoundingBox = this.target.getBoundingClientRect();
    let ratio = (viewportHeight * (1 - percent));

    fastdom.write(() => {
      if (targetBoundingBox.top < ratio &&
          targetBoundingBox.height + targetBoundingBox.top >= ratio) {
          this.checkIfEnabled();
      } else {
          this.checkIfDisabled();
      }
    });
  }

}

export default WithinViewport;
