'use strict';

import Parallax from 'parallax/deploy/parallax';
import scrollMonitor from 'scrollMonitor';

const options = {
  friction: 0.2
};

export default function () {
  let scenes = document.querySelectorAll('.js-parallax-scene');

  Array.prototype.map.call(scenes, scene => {
    let monitor = scrollMonitor.create(scene, {
      bottom: 200,
      top: 200
    });

    let instance;

    monitor.enterViewport(() => {
      if (instance) {
        instance.enable();
      } else {
        instance = new Parallax(scene, options);
      }
    });

    monitor.exitViewport(() => {
      if (instance) {
        instance.disable();
      }
    });

    return monitor;
  });
}
