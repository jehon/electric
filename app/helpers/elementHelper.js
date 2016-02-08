
export default class elementHelper {
  constructor(data) {
    this.data = data;
    this.element =
  }

  isValid() {
    return !(!this.data.type || !this.data.x & !this.data.y);
  }

  width() {
    return 1;
  }

  height() {
    return 1;
  }

  draw() {

  }
}
