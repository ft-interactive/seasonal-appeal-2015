'use strict';

import debounce from '../utils/debounce';

let initialised = false;

let lastFrameId = null;

let watchers = [];

function onMove() {
  if (lastFrameId) {
    return;
  }

  notify();
  lastFrameId = null;
}

const onResize = debounce(onMove, 100);

function addListeners() {
  window.addEventListener('resize', onResize, false);
  window.addEventListener('touchmove', onMove, false);
  window.addEventListener('scroll', onMove, false);

  initialised = true;
}

function removeListeners() {
  window.removeEventListener('resize', onResize, false);
  window.removeEventListener('touchmove', onMove, false);
  window.removeEventListener('scroll', onMove, false);

  initialised = false;
}

function notify() {
  for (let i = 0, len = watchers.length; i < len; i++) {
    watchers[i]();
  }
}

export function addWatcher(callback) {
  if (!initialised) {
    addListeners();
  }

  return watchers.push(callback);
}

export function removeWatcher(index) {
  watchers.splice(index, 1);

  if (!watchers.length) {
    removeListeners();
  }
}
