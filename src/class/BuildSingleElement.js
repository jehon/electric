import Builder from "./Builder.js";
import drawReference from "./DrawReference.js";

let uuidCounter = 1;

export default class BuildSingleElement extends Builder {
  static nextUUID() {
    return uuidCounter;
  }

  static testResetUUID() {
    uuidCounter = 1;
  }

  static assignUUID(element) {
    if (!("getId" in element)) {
      // Copy the value to fix it
      const localUUID = uuidCounter++;
      element.getId = () => localUUID;
    }

    if (!("getReference" in element)) {
      const ref = drawReference(element.type);
      element.getReference = () => ref;
    }

    if (!("getVal" in element)) {
      element.getVal = function (name) {
        if (name in element) {
          return element[name];
        }
        return element.getReference().getVal(name);
      };
    }
  }

  // Param uuid is used when searching for an UUID
  buildSelf() {
    this.constructor.assignUUID(this._currentElement);
  }
}
