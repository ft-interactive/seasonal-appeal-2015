'use strict';

import ScrollComponent from './scroll-component';

const THRESHOLD = 100;

class EnterViewport extends ScrollComponent {

  constructor(target) {
    super(target);
    super.init();
  }

  _check() {
    // Faster than array iteration methods
    for (let i = 0, len = this.target.length; i < len; i++) {
      let boundingBox = this.target[i].getBoundingClientRect();

      if (
        boundingBox.top >= 0 &&
        boundingBox.top < (window.innerHeight - THRESHOLD)) {
        this.target[i].classList.add('in-viewport');
      }
    }

    this._cleanUp();
  }

  _cleanUp() {
    this.target = Array.prototype.filter.call(
      this.target, target => !target.classList.contains('in-viewport')
    );
  }

}

export default EnterViewport;
