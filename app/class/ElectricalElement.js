
export default class ElectricalElement {
  constructor(data, context) {
    this.data     = data;
    this.context  = context;
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
    return (plan && plan == this.data.plan);
  }

  width() {
    if (!this.isValid()) {
      return 0;
    }
    return parseFloat(this.data.width);
  }

  height() {
    if (!this.isValid()) {
      return 0;
    }
    return parseFloat(this.data.height);
  }

  /*************************************************
  // Specific for filiaire
  /*************************************************/
  isVertical() {
    if (this.data.children) {
      return !(this.context.vertical);
    }
    return this.context.vertical;
  }

  filiaireHeight() {
    if (this.data.children) {
      return 100;
    }
    return this.isVertical() ? this.height() : this.width();
  }

  filiaireWidth() {
    if (this.data.children) {
      return 100;
    }
    return this.isVertical() ? this.width() : this.height();
  }

}
