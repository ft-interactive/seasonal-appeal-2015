'use strict';

export default function (images, callback) {
  let todo = images.length;

  function onload() {
    todo--;

    this.classList.add('is-loaded');

    if (todo === 0) {
      callback();
    }
  }

  for (let i = 0, len = images.length; i < len; i++) {
    let image = images[i];

    image.onload = onload;
    image.src = image.getAttribute('data-src');
    image.removeAttribute('data-src');
  }
}
