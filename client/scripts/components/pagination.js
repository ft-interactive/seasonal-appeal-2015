'use strict';

import scrollMonitor from 'scrollMonitor';

const targetActiveClass = 'is-active';
const linkActiveClass = 'is-selected';

export default function () {
  const pagination = document.querySelector('.js-pagination');
  const paginationLinks = document.querySelectorAll('.js-pagination-link');
  const fragmentsArea = document.querySelector('.js-pagination-coverage');
  const fragments = (
    Array.prototype.map.call(paginationLinks, link => document.querySelector(link.hash))
  );

  // Show and hide pagination when coverage area is within viewport
  const areaMonitor = scrollMonitor.create(fragmentsArea, {
    bottom: -100,
    top: -100
  });

  areaMonitor.enterViewport(() => {
    if (!pagination.classList.contains(targetActiveClass)) {
      pagination.classList.add(targetActiveClass);
    }
  });

  areaMonitor.exitViewport(() => {
    if (pagination.classList.contains(targetActiveClass)) {
      pagination.classList.remove(targetActiveClass);
    }
  });

  // Highlight associated link when fragment is within view
  let activeIndex;

  Array.prototype.map.call(fragments, (fragment, index) => {
    const fragmentMonitor = scrollMonitor.create(fragment, {
      bottom: -200,
      top: -200
    });

    fragmentMonitor.enterViewport(() => {
      paginationLinks[index].classList.add(linkActiveClass);

      if (activeIndex) {
        paginationLinks[activeIndex].classList.remove(linkActiveClass);
      }

      activeIndex = index;
    });

    fragmentMonitor.exitViewport(() => {
      paginationLinks[index].classList.remove(linkActiveClass);

      if (index === activeIndex) {
        activeIndex = null;
      }
    });
  });
}
