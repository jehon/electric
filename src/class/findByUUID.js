class IdFinderBuilder extends BuildSingleElement {
  build(params = {}) {
    this.uuid = params.uuid;
    return super.build(params);
  }

  getDescendantBuildParameters(params) {
    params.uuid = this.uuid;
    return super.getDescendantBuildParameters(params);
  }

  // Param uuid is used when searching for an UUID
  buildSelf() {
    // If we are looking by uuid, we should not generate new one !
    // super.buildSelf();

    // Return value to search by UUID
    if (
      typeof this._currentElement.getId == "function" &&
      this._currentElement.getId() == this.uuid
    ) {
      return this._currentElement;
    }
    return false;
  }

  buildAssembly(self, next, alternate) {
    // Return value to search by UUID
    if (self) {
      return self;
    }
    let nv = next.reduce((acc, val) => (acc ? acc : val ? val : false), false);
    if (nv) {
      return nv;
    }
    let na = alternate.reduce(
      (acc, val) => (acc ? acc : val ? val : false),
      false,
    );
    if (na) {
      return na;
    }
    return null;
  }
}

export default (uuid, schema = false) => {
  if (schema == false) {
    schema = installationDispatcher.getState().schema;
  }
  let builder = new IdFinderBuilder(schema);
  if (uuid[0] == "_") {
    uuid = uuid.substring(1);
  }
  return builder.build({ uuid });
};
