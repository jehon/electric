// For override: see findByUUID !

// Problem: how to initialize default values correctly? See BuildName init
// If builder start with some parameters, they prevent initialization of ref...
// --> build initial should pass the initial value?

export default class Builder {
  constructor(currentElement) {
    if (typeof currentElement != "object") {
      throw "No schema given in Builder: " + this.constructor.name;
    }
    this._currentElement = currentElement;

    // Thinking: what should be a WeakMap: builder, currentElement?
    // Schema -> so some builder could live without a currentElement -> no way!
    // Builder -> if builder is not related anymore, we can build it again!
    // In fact, it shouldnt be a weakmap
    this._builders = new Map();
    // this._keys = new Map();
  }

  getDescendantBuildParameters(params) {
    return params;
  }

  _getBuilder(element, isDirect, index) {
    // Caching should be done here...

    return new this.constructor(element).build(
      this.getDescendantBuildParameters({ isDirect, index })
    );
  }

  build() {
    if (this._currentElement == null) {
      return;
    }

    // Here: let's cache the current state (not in partial ones)
    // let newJsonSchema = JSON.stringify(this._currentElement);
    // if (this._jsonSchema == newJsonSchema) {
    // 	return this._result;
    // }

    // Do the work
    // Some need the "self" to be build to calculate childrens (BuildName)
    let me = this.buildSelf();

    // Build next's
    let next = [];
    if (this._currentElement.next) {
      next = this._currentElement.next.map((e, i) =>
        this._getBuilder(this._currentElement.next[i], true, i)
      );
    }

    // Build for alternate
    let alternate = [];
    if (this._currentElement.alternate) {
      alternate = this._currentElement.alternate.map((e, i) =>
        this._getBuilder(this._currentElement.alternate[i], false, i)
      );
    }

    // Compose the whole stuff into one and clean it
    return this.buildAssembly(me, next, alternate);
  }

  buildSelf() {
    return this._currentElement.type + "|";
  }

  buildAssembly(self, next, alternate) {
    return (
      self +
      (next.length > 0 ? next.join("") : "") +
      (alternate.length > 0 ? alternate.join("") : "")
    );
  }
}
