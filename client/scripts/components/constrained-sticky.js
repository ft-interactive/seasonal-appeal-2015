'use strict';

import fastdom from 'fastdom';
import ScrollComponent from './scroll-component';

class Sticky extends ScrollComponent {

  constructor(target) {
    super(target);

    this.parent = target.offsetParent;

    super.init();
  }

  checkPosition() {
    fastdom.read(() => {
      let boundaryTop = this.boundaryTopReached();
      let boundaryBottom = this.boundaryBottomReached();

      fastdom.write(() => {
        if (boundaryTop || boundaryBottom) {
          this.target.classList.remove('is-sticky');
          this.target.classList.toggle('is-bottom', boundaryBottom);
        } else {
          this.target.classList.add('is-sticky');
          this.target.classList.remove('is-bottom');
        }
      });
    });
  }

  boundaryTopReached() {
    let parentOffsetTop = this.parent.getBoundingClientRect().top;
    return parentOffsetTop > 0;
  }

  boundaryBottomReached() {
    let targetHeight = this.target.offsetHeight;
    let parentOffsetBottom = this.parent.getBoundingClientRect().bottom;

    return (parentOffsetBottom - targetHeight) <= 0;
  }

}

export default Sticky;
