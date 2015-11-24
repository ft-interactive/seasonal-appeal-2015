'use strict';

import debounce from '../utils/debounce';

class ScrollComponent {

  constructor(target) {
    this.target = target;
  }

  init() {
    this._onScrollStartCb = this._onScrollStart.bind(this);
    this._onScrollEndCb = debounce(this._onScrollEnd.bind(this), 100);

    window.addEventListener('resize', debounce(this._onResize.bind(this), 100), false);
    window.addEventListener('scroll', this._onScrollStartCb, false);

    this._check();
  }

  _onScrollStart() {
    window.removeEventListener('scroll', this._onScrollStartCb, false);
    window.addEventListener('scroll', this._onScrollEndCb, false);

    this._startLoop();
  }

  _onScrollEnd() {
    this._endLoop();

    window.addEventListener('scroll', this._onScrollStartCb, false);
    window.removeEventListener('scroll', this._onScrollEndCb, false);
  }

  _onResize() {
    this._check();
  }

  _startLoop() {
    if (this._loopFrameId) {
      window.cancelAnimationFrame(this._loopFrameId);
    }

    this._loopFrameId = window.requestAnimationFrame(() => {
      let currentScrollPosition = window.pageYOffset;

      if (this._lastScrollPosition !== currentScrollPosition) {
        this._lastScrollPosition = currentScrollPosition;
        this._check();
      }

      this._startLoop();
    });
  }

  _endLoop() {
    window.cancelAnimationFrame(this._loopFrameId);
  }

  _check() {
    throw Error('Not implemented');
  }

}

export default ScrollComponent;
