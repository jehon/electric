
export default class OrientedPoint {
  constructor(x, y, orientation = 0, scale = 1) {
    this.ox = x;
    this.oy = y;
    this.orientation = orientation;
    this.scale = scale;

    switch(this.orientation) {
      case 'N':
        this.orientation = 0;
        break;
      case 'S':
        this.orientation = 180;
        break;
      case 'E':
        this.orientation = 270;
        break;
      case 'W':
        this.orientation = 90;
        break;
    }
  }

  x() {
    return this.ox;
  }

  y() {
    return this.oy;
  }

  coord() {
    return this.ox + ',' + this.oy;
  }

  away(x, y) {
    var dx = this.ox + x * this.scale;
    var dy = this.oy + y * this.scale;
    return new OrientedPoint(dx, dy, this.orientation, this.scale);
  }


}
