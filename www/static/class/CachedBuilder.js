
class CachedBuilder {
	constructor(schema) {
		this._schema = schema;
	}
	
	build() {
		// let newJsonSchema = JSON.stringify(this._schema);
		// if (this._jsonSchema == newJsonSchema) {
		// 	return this._result;
		// }

		// Do the work


		// Build next's
		// if (this._schema.data.next) {
		//     this._schema.data.next.map((e, i) => "");
		// }
		// ...

		// Build for alternate
		// ...

		// Archive this new point
		// this._jsonSchema = newJsonSchema;

		// Compose the whole stuff into one
		return this.buildAssembly(this.buildSelf(this._schema));
	}

	getOneNext(element) {
		return "";
	}

	getOneAlternate(element) {
		return "";
	}

	buildSelf(element) {
		return element.draw();
	}

	buildAssembly(self, next, alternate) {
		return "";
	}
}
