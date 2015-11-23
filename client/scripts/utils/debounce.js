'use strict';

function debounce(callback, wait) {
  let timeout;
  let args;

  return function () {
    clearTimeout(timeout);

    args = arguments;

    timeout = setTimeout(function () {
      callback.apply(null, args);
      args = null;
    }, wait);
  };
}

export default debounce;
