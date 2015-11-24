'use strict';

import fastdom from 'fastdom';
import ScrollComponent from './scroll-component';

const THRESHOLD = 100;

class WithinViewport extends ScrollComponent {

  constructor(target) {
    super(target);
    super.init();
  }

  checkPosition() {
    let boundingBox = this.target.getBoundingClientRect();

    if (boundingBox.top >= 0 && boundingBox.top < (window.innerHeight - THRESHOLD)) {
      fastdom.write(() => {
        this.target.classList.add('in-viewport');
        this.teardown();
      });
    }
  }

}

export default WithinViewport;
