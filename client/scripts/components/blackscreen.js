'use strict';

import fastdom from 'fastdom';
import {addWatcher} from '../utils/scroll-watcher';

class Blackscreen {

  constructor(target) {
    this.target = target;
    this.watcherId = addWatcher(this.checkPosition.bind(this));

    this.checkPosition();
  }

  checkPosition() {
    let percent = (() => {
      let ratio = (1 / window.innerHeight);
      let percentage = (ratio * window.pageYOffset);

      return Math.max(0, Math.min(percentage, 1));
    })();

    fastdom.write(() => {
      this.target.style.opacity = percent.toFixed(2);
    });
  }

}

export default Blackscreen;
