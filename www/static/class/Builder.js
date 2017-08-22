
class Builder {
	constructor(schema) {
		this._schema = schema;
	}
	
	build(...args) {
		// Here: let's cache the current state (not in partial ones)
		// let newJsonSchema = JSON.stringify(this._schema);
		// if (this._jsonSchema == newJsonSchema) {
		// 	return this._result;
		// }

		// Do the work

		// Build next's
		let next = [];
		if (this._schema.data.next) {
		    next = this._schema.data.next.map((e, i) => this.getOneNext(this._schema.data.next[i]));
		}

		// Build for alternate
		let alternate = [];
		if (this._schema.data.alternate) {
		    next = this._schema.data.alternate.map((e, i) => this.getOneAlternate(this._schema.data.alternate[i]));
		}

		// Compose the whole stuff into one
		return this.buildAssembly(this.buildSelf(this._schema, ...args), next, alternate);
	}

	getOneNext(element, ...args) {
		return "";
	}

	getOneAlternate(element, ...args) {
		return "";
	}

	buildSelf(element, ...args) {
		return element.draw();
	}

	buildAssembly(self, next, alternate) {
		return "";
	}
}
