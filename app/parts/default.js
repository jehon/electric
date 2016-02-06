

export default class {
  constructor(x, y, orientation = 'N', scale = 1) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.scale = scale;
  }

  width() {
    return 10 * this.scale;
  }

  height() {
    return 10 * this.scale;
  }
}
