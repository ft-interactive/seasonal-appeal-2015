'use strict';

import debounce from '../utils/debounce';
import fastdom from 'fastdom';

class Curtain {

  constructor(target) {
    this.target = target;
    this.sibling = target.nextElementSibling;

    if (this._inViewport()) {
      this.stick();
    }

    window.addEventListener('orientationchange', this._onResize.bind(this), false);
    window.addEventListener('resize', debounce(this._onResize.bind(this), 100), false);
    window.addEventListener('scroll', this._onScroll.bind(this), false);
  }

  stick() {
    if (this.isDown()) {
      return;
    }

    this._clearNextWrite();

    this._nextWriteId = fastdom.write(() => {
      this.target.classList.add('is-down');

      document.body.style.minHeight = `${this.sibling.offsetHeight}px`;

      this.sibling.style.position = 'fixed';
      this.sibling.style.marginTop = '';
      this.sibling.style.marginBottom = `${this.target.clientHeight}px`;
    });
  }

  unstick() {
    if (!this.isDown()) {
      return;
    }

    this._clearNextWrite();

    this._nextWriteId = fastdom.write(() => {
      this.target.classList.remove('is-down');

      document.body.style.minHeight = '';

      this.sibling.style.position = '';
      this.sibling.style.marginTop = `${this.target.clientHeight}px`;
      this.sibling.style.marginBottom = '';
    });
  }

  isDown() {
    return this.target.classList.contains('is-down');
  }

  _onScroll() {
    fastdom.read(() => {
      if (this._inViewport()) {
        this.stick();
      } else {
        this.unstick();
      }
    });
  }

  _onResize() {
    let targetHeight = this.target.clientHeight;
    this.sibling.style[this.isDown() ? 'marginBottom' : 'marginTop'] = `${targetHeight}px`;
  }

  _inViewport() {
    return this.target.getBoundingClientRect().bottom > 0;
  }

  _clearNextWrite() {
    if (this._nextWriteId) {
      fastdom.clear(this._nextWriteId);
      this._nextWriteId = null;
    }
  }

}

export default Curtain;
