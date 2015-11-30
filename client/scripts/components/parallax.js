'use strict';

// Parallax module doesn't export anything, it just gets attached to the window
import 'parallax/deploy/parallax';
import scrollMonitor from 'scrollMonitor';
import loadImages from '../utils/load-images';

export default function () {
  const scenes = document.querySelectorAll('.js-parallax');

  Array.prototype.map.call(scenes, scene => {
    let instance;
    let isLoading;

    const monitor = scrollMonitor.create(scene, {
      bottom: -100,
      top: -100
    });

    monitor.enterViewport(() => {
      // This can trigger even when the element is not visible (display:none)
      // because offsets = 0
      if (!scene.offsetParent || isLoading) {
        return;
      }

      if (instance) {
        instance.enable();
      } else {
        isLoading = true;

        loadImages(scene.querySelectorAll('img[data-src]'), () => {
          instance = new window.Parallax(scene);
          isLoading = false;
        });
      }
    });

    monitor.exitViewport(() => {
      if (instance && instance.enabled) {
        instance.disable();
      }
    });
  });
}
