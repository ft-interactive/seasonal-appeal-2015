'use strict';

import {subscribe} from 'minpubsub';

const targetActiveClass = 'is-active';
const linkActiveClass = 'is-selected';

class Pagination {

  constructor(target) {
    this.target = target;
    this.links = Array.prototype.slice.call(target.querySelectorAll('a'));

    subscribe('section/in-view', this.activate.bind(this));
    subscribe('section/out-of-view', this.deactivate.bind(this));
  }

  findLink(element) {
    return this.links.find(link => link.hash.replace('#', '') === element.id);
  }

  checkIfEnabled() {
    if (!this.target.classList.contains(targetActiveClass)) {
      this.target.classList.add(targetActiveClass);
    }
  }

  checkIfDisabled() {
    if (!this.current) {
      this.target.classList.remove(targetActiveClass);
    }
  }

  activate(element) {
    this.findLink(element).classList.add(linkActiveClass);

    if (this.current) {
      this.findLink(this.current).classList.remove(linkActiveClass);
    }

    this.current = element;

    this.checkIfEnabled();
  }

  deactivate(element) {
    this.findLink(element).classList.remove(linkActiveClass);

    if (element === this.current) {
      this.current = null;
    }

    this.checkIfDisabled();
  }

}

export default Pagination;
