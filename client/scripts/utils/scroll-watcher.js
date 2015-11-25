'use strict';

import debounce from '../utils/debounce';

let lastFrameId = null;

let watchers = [];

const onResize = debounce(function () {
  notify();
}, 100);

const onScrollEnd = debounce(function () {
  window.removeEventListener('scroll', onScrollEnd, false);
  stopAnimationLoop();
  addListeners();
}, 100);

function onScrollStart() {
  removeListeners();
  startAnimationLoop();
  window.addEventListener('scroll', onScrollEnd, false);
}

function startAnimationLoop() {
  lastFrameId = window.requestAnimationFrame(() => {
    notify();
    startAnimationLoop();
  });
}

function stopAnimationLoop() {
  if (lastFrameId) {
    window.cancelAnimationFrame(lastFrameId);
    lastFrameId = null;
  }
}

function addListeners() {
  window.addEventListener('resize', onResize, false);
  window.addEventListener('touchmove', onScrollStart, false);
  window.addEventListener('scroll', onScrollStart, false);
}

function removeListeners() {
  window.removeEventListener('resize', onResize, false);
  window.removeEventListener('touchmove', onScrollStart, false);
  window.removeEventListener('scroll', onScrollStart, false);
}

function notify() {
  // Faster than array iteration methods
  for (let i = 0, len = watchers.length; i < len; i++) {
    if (watchers[i]) {
      watchers[i]();
    }
  }
}

export function addWatcher(callback) {
  return watchers.push(callback);
}

export function removeWatcher(index) {
  // Fill the space so that references to other indexes don't need to change.
  watchers.splice(index, 1, null);
}

addListeners();
