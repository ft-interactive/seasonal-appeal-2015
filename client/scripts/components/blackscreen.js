'use strict';

import fastdom from 'fastdom';
import ScrollComponent from './scroll-component';

class Blackscreen extends ScrollComponent {

  constructor(target) {
    super(target);
    super.init();
  }

  checkPosition() {
    fastdom.read(() => {
      let targetOffset = this.target.getBoundingClientRect();
      let viewportHeight = window.innerHeight;

      if (targetOffset.top > viewportHeight || targetOffset.bottom < 0) {
        return;
      }

      let ratio = (1 / viewportHeight);
      let percent = ratio * (targetOffset.height - Math.abs(targetOffset.bottom));

      this.target.style.opacity = percent.toFixed(2);
    });
  }

}

export default Blackscreen;
