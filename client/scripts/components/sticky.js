'use strict';

import debounce from '../utils/debounce';
import throttle from '../utils/throttle';

class Sticky {

  constructor(target) {
    this.target = target;
    this.parent = target.parentNode;

    this._onScrollStartCb = this._onScrollStart.bind(this);
    this._onScrollCb = throttle(this._onScroll.bind(this), 10);
    this._onScrollEndCb = debounce(this._onScrollEnd.bind(this), 100);

    this.reset();

    window.addEventListener('resize', debounce(this._onResize.bind(this), 100), false);
  }

  reset() {
    window.addEventListener('scroll', this._onScrollStartCb, false);
  }

  stick() {
    this.target.classList.add('is-sticky');
    this.target.classList.remove('is-bottom');
  }

  unstick(isBottom) {
    this.target.classList.remove('is-sticky');
    this.target.classList.toggle('is-bottom', isBottom);
  }

  _onScrollStart() {
    if (!this._minHeight()) return;

    window.removeEventListener('scroll', this._onScrollStartCb, false);

    window.addEventListener('scroll', this._onScrollCb, false);
    window.addEventListener('scroll', this._onScrollEndCb, false);
  }

  _onScroll() {
    if (this.target.classList.contains('is-sticky')) {
      if (this._boundaryTopReached()) {
        this.unstick();
      }
      if (this._boundaryReachedBottom()) {
        this.unstick(true);
      }
    } else if (!this._boundaryTopReached() && !this._boundaryReachedBottom()) {
      this.stick();
    }
  }

  _onScrollEnd() {
    window.removeEventListener('scroll', this._onScrollCb, false);
    window.removeEventListener('scroll', this._onScrollEndCb, false);

    this.reset();
  }

  _onResize() {
    if (!this.target.classList.contains('is-sticky')) return;

    if (!this._minHeight()) {
      this.unstick();
    } else {
      this._onScroll();
    }
  }

  _minHeight() {
    let parentHeight = this.parent.clientHeight;
    let targetHeight = this.target.offsetHeight;

    // Tests if both the container and window have space to scroll into.
    return targetHeight < window.innerHeight && targetHeight < parentHeight;
  }

  _boundaryTopReached() {
    let parentOffsetTop = this.parent.getBoundingClientRect().top;
    return parentOffsetTop > 0;
  }

  _boundaryReachedBottom() {
    let targetHeight = this.target.offsetHeight;
    let parentOffsetBottom = this.parent.getBoundingClientRect().bottom;

    return (parentOffsetBottom - targetHeight) <= 0;
  }

}

export default Sticky;
