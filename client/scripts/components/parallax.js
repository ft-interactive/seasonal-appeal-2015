'use strict';

// Parallax module doesn't export anything, it just gets attached to the window
import 'parallax/deploy/parallax';
import scrollMonitor from 'scrollMonitor';
import loadImages from '../utils/load-images';

export default function () {
  let scenes = document.querySelectorAll('.js-parallax');

  Array.prototype.map.call(scenes, scene => {
    let instance;

    const monitor = scrollMonitor.create(scene, {
      bottom: 100,
      top: 100
    });

    monitor.enterViewport(() => {
      // This can trigger even when the element is not visible (display:none)
      // because offsets = 0
      if (!scene.offsetParent) {
        return;
      }

      if (instance) {
        instance.enable();
      } else {
        loadImages(scene.querySelectorAll('img[data-src]'), () => {
          instance = new window.Parallax(scene);
        });
      }
    });

    monitor.exitViewport(() => {
      if (instance && instance.enabled) {
        instance.disable();
      }
    });

    // This covers resizing and orientation change in case the breakpoint
    // 'medium' or larger becomes active.
    monitor.stateChange(() => {
      if (instance && instance.enabled && !scene.offsetParent) {
        instance.disable();
      }

      if (instance && !instance.enabled && scene.offsetParent) {
        instance.enable();
      }
    });

    return monitor;
  });
}
