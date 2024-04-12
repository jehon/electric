import Builder from "./Builder.js";

export default class BuildMigration extends Builder {
  buildSelf() {
    // Integrate options directly here
    if ("options" in this._currentElement) {
      Object.assign(this._currentElement, this._currentElement.options);
    }
    if ("reference" in this._currentElement) {
      this._currentElement.name = this._currentElement.reference;
    }
    if (this._currentElement.type == "Disj") {
      if (!("I" in this._currentElement)) {
        this._currentElement.I = "20";
      }
    }
    this._currentElement.orientation =
      ("orientation" in this._currentElement
        ? this._currentElement.orientation
        : 0) + 90;
    return super.buildSelf();
  }
}
