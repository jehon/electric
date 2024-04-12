import BuildName from "./BuildName.js";

class DumpSchemaBuilder extends BuildName {
  build(params = {}) {
    this.print = params.print || " ";
    super.build(params);
  }

  getDescendantBuildParameters(params) {
    params.print = this.print + " ";
    return super.getDescendantBuildParameters(params);
  }

  buildSelf() {
    super.buildSelf();
    console.info(
      (this._currentElement.getId() + "     ").substring(
        0,
        1 + Math.ceil(Math.log10(BuildSingleElement.nextUUID()))
      ) +
        this.print +
        this._currentElement.getName() +
        ": " +
        this._currentElement.type
    );
  }
}

export default (schema) => new DumpSchemaBuilder(schema).build();
