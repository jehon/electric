import BuildSingleElement from "./BuildSingleElement.js";

export default class BuildName extends BuildSingleElement {
  // Set initial values
  // Build by one object, to allow buildSelf to modify it
  build(params = {}) {
    if (params.naming) {
      this.ref = params.naming;
    } else {
      this.ref = { base: "main", index: 0 };
    }
    return super.build(params);
  }

  buildSelf() {
    let _setNames = (long, short) => {
      const short_ = short;
      const long_ = long;
      this._currentElement.getShortName = function () {
        return short_;
      };
      this._currentElement.getName = function () {
        return long_;
      };
    };

    if ("name" in this._currentElement) {
      _setNames(this._currentElement.name, this._currentElement.name);
      this.ref.base = this._currentElement.name;
      this.ref.index = 0;
    } else {
      _setNames(
        this.ref.base + (this.ref.index == 0 ? "" : "." + this.ref.index),
        this.ref.index,
      );
    }
    return super.buildSelf();
  }

  getDescendantBuildParameters(params) {
    params.naming = this._getNewNamingReference(params.isDirect, params.index);
    return super.getDescendantBuildParameters(params);
  }

  _getNewNamingReference(isDirect, i) {
    if (isDirect) {
      if (this._currentElement.next && this._currentElement.next.length == 1) {
        // Continue numerotation if only one element is found
        return { base: this.ref.base, index: this.ref.index + 1 };
      } else {
        // Index by row
        return { base: this._currentElement.getName() + "." + i, index: 1 };
      }
    } else {
      if (!this._currentElement.next || this._currentElement.next.length == 0) {
        // We don't have a 'next', we treat alternate as a 'next'
        if (
          this._currentElement.alternate &&
          this._currentElement.alternate.length == 1
        ) {
          // Continue numerotation if only one element is found
          return { base: this.ref.base, index: this.ref.index + 1 };
        } else {
          // Index by row
          return { base: this._currentElement.getName() + "." + i, index: 1 };
        }
      }
      if (this._currentElement.alternate.length == 1) {
        // We continue the numerotation
        return { base: this._currentElement.getName() + "a", index: 1 };
      } else {
        // We are on an alternate flow
        return { base: this._currentElement.getName() + "a" + i, index: 1 };
      }
    }
  }
}
