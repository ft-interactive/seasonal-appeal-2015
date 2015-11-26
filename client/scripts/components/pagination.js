'use strict';

import scrollMonitor from 'scrollMonitor';

const targetActiveClass = 'is-active';
const linkActiveClass = 'is-selected';

class Pagination {

  constructor() {
    this.pagination = document.querySelector('.js-pagination');
    this.paginationLinks = document.querySelectorAll('.js-pagination-link');
    this.main = document.querySelector('.js-main');
    this.mainSections = (
      Array.prototype.map.call(this.paginationLinks, link => {
        return document.querySelector(link.hash);
      })
    );

    this.mainMonitor = (() => {
      let monitor = scrollMonitor.create(this.main, {
        bottom: -100,
        top: -100
      });

      monitor.enterViewport(this.checkIfEnabled.bind(this));
      monitor.exitViewport(this.checkIfDisabled.bind(this));

      return monitor;
    })();

    this.mainSectionsMonitors = (
      Array.prototype.map.call(this.mainSections, (section, index) => {
        let monitor = scrollMonitor.create(section, {
          bottom: -200,
          top: -200
        });

        monitor.enterViewport(this.activateLink.bind(this, index));
        monitor.exitViewport(this.deactivateLink.bind(this, index));

        return monitor;
      })
    );
  }

  checkIfEnabled() {
    if (!this.pagination.classList.contains(targetActiveClass)) {
      this.pagination.classList.add(targetActiveClass);
    }
  }

  checkIfDisabled() {
    if (this.pagination.classList.contains(targetActiveClass)) {
      this.pagination.classList.remove(targetActiveClass);
    }
  }

  activateLink(index) {
    this.paginationLinks[index].classList.add(linkActiveClass);

    if (this.activeIndex) {
      this.paginationLinks[this.activeIndex].classList.remove(linkActiveClass);
    }

    this.activeIndex = index;
  }

  deactivateLink(index) {
    this.paginationLinks[index].classList.remove(linkActiveClass);

    if (index === this.activeIndex) {
      this.activeIndex = null;
    }
  }

}

export default Pagination;
