'use strict';

import fastdom from 'fastdom';
import debounce from '../utils/debounce';

class ScrollComponent {

  constructor(target) {
    this.target = target;
  }

  init() {
    this.onMoveCallback = this.onMove.bind(this);
    this.onResizeCallback = debounce(this.onMoveCallback, 100);

    window.addEventListener('resize', this.onResizeCallback, false);
    window.addEventListener('touchmove', this.onMoveCallback, false);
    window.addEventListener('scroll', this.onMoveCallback, false);

    this.checkPosition();
  }

  teardown() {
    window.removeEventListener('resize', this.onResizeCallback, false);
    window.removeEventListener('touchmove', this.onMoveCallback, false);
    window.removeEventListener('scroll', this.onMoveCallback, false);
  }

  onMove() {
    if (this._loopFrameId) {
      return;
    }

    this._loopFrameId = fastdom.read(() => {
      this.checkPosition();
      this._loopFrameId = null;
    });
  }

  checkPosition() {
    throw Error('Not implemented');
  }

}

export default ScrollComponent;
