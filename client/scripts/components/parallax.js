'use strict';

// Parallax doesn't export anything, it just gets attached to the window object.
import 'parallax/deploy/parallax';
import scrollMonitor from 'scrollMonitor';

const options = {
  friction: 0.2
};

export default function () {
  let scenes = document.querySelectorAll('.js-parallax');

  Array.prototype.map.call(scenes, scene => {
    let monitor = scrollMonitor.create(scene, {
      bottom: -100,
      top: -100
    });

    let instance;

    monitor.enterViewport(() => {
      // TODO: test if this triggers when element is display:none
      if (instance) {
        instance.enable();
      } else {
        instance = new window.Parallax(scene, options);
      }
    });

    monitor.exitViewport(() => {
      // TODO: test if this triggers when element is display:none
      if (instance) {
        instance.disable();
      }
    });

    // TODO: test for visibility change

    return monitor;
  });
}
