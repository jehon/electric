
import references from 'build/references';

export default class elementHelper {
  constructor(data) {
    this.data = data;
    if (this.isValid()) {
      this.element = references[this.data.type];
      if (!this.element) {
        throw new Error('Element not found: ', this.data.type);
      }
    }
  }

  isValid() {
    return this.data.type;
  }

  isPositionned(plan = false) {
    if (!this.isValid()) {
      return false;
    }
    if (!this.data.x || !this.data.y) {
      return false;
    }
    if (plan && plan != this.data.plan) {
      return false;
    }
    return true;
  }

  width() {
    if (!this.isValid()) {
      return 0;
    }
    return parseFloat(this.element.width);
  }

  height() {
    if (!this.isValid()) {
      return 0;
    }
    return parseFloat(this.element.height);
  }

  draw() {
    if (!this.isValid()) {
      return '';
    }
    return this.element.path;
  }
}
