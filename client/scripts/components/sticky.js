'use strict';

import ScrollComponent from './scroll-component';

class Sticky extends ScrollComponent {

  constructor(target) {
    super(target);

    this.parent = target.offsetParent;

    super.init();
  }

  stick() {
    this.target.classList.add('is-sticky');
    this.target.classList.remove('is-bottom');
  }

  unstick(isBottom) {
    this.target.classList.remove('is-sticky');
    this.target.classList.toggle('is-bottom', isBottom);
  }

  isSticky() {
    return this.target.classList.contains('is-sticky');
  }

  _check() {
    let boundaryTop = this._boundaryTopReached();
    let boundaryBottom = this._boundaryBottomReached();

    if (boundaryTop) {
      this.unstick();
    } else if (boundaryBottom) {
      this.unstick(true);
    } else {
      this.stick();
    }
  }

  _boundaryTopReached() {
    let parentOffsetTop = this.parent.getBoundingClientRect().top;
    return parentOffsetTop > 0;
  }

  _boundaryBottomReached() {
    let targetHeight = this.target.offsetHeight;
    let parentOffsetBottom = this.parent.getBoundingClientRect().bottom;

    return (parentOffsetBottom - targetHeight) <= 0;
  }

}

export default Sticky;
