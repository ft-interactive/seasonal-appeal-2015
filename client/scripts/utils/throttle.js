'use strict';

function throttle(callback, wait) {
  let timeout;
  let args;

  return function () {
    if (timeout) return;

    args = arguments;

    timeout = setTimeout(function () {
      callback.apply(null, args);
      timeout = args = null;
    }, wait);
  };
}

export default throttle;
