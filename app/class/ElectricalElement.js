
export default class ElectricalElement {
  constructor(data) {
    this.data     = data;
  }

  get width() {
    return parseFloat(this.data.width);
  }

  get height() {
    return parseFloat(this.data.height);
  }

  get name() {
    return 'mymname';
  }

  get next() {
    return this.data.next;
  }

  /*************************************************
  // Specific for POSITION
  /*************************************************/
  positionMustDrawOnPlan(plan) {
    if (!this.data.x || !this.data.y || !this.data.plan || this.data.plan != plan) {
      return false;
    }
    return true;
  }

  get positionX() {
    return this.data.x;
  }

  get positionY() {
    return this.data.y;
  }

  get positionOrientation() {
    return this.data.orientation;
  }

  /*************************************************
  // Specific for FILIAIRE
  /*************************************************/
  filiaireDraw() {
    // return '<line x1="' + '" y1="' + '" x2="' + '" y2="' + '">';
  }

  get filiaireHeight() {
    // if (this.data.next) {
    // }
    return this.height;
  }

  get filiaireWidth() {
    // if (this.data.next) {
    // }
    return this.width;
  }

}
