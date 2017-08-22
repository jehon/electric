
class Builder {
	constructor(schema) {
		this._schema = schema;
		this._builders = {};
	}

	_getBuilder(i, schema) {
		if (typeof(this._builders[i]) == "undefined") {
			this._builders[i] = new this.constructor(schema);
		}
		return this._builders[i];
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
		    next = this._schema.data.next.map((e, i) => this.getOneNext(i, e));
		}

		// Build for alternate
		let alternate = [];
		if (this._schema.data.alternate) {
		    alternate = this._schema.data.alternate.map((e, i) => this.getOneAlternate(i, this._schema.data.alternate[i]));
		}

		// Compose the whole stuff into one
		return this.buildAssembly(this.buildSelf(this._schema, ...args), next, alternate);
	}

	getOneNext(i, element, ...args) {
		let builder = this._getBuilder('next_' + i, element);
		return builder.build(...args);
	}

	getOneAlternate(i, element, ...args) {
		let builder = this._getBuilder('alt_' + i, element);
		return builder.build(...args);
	}

	buildSelf(element, ...args) {
		return "";
	}

	buildAssembly(self, next, alternate) {
		return self
		+ (next.length > 0 ? "\n" + next.join("\n") : "");
		+ (alternate.length > 0 ? "\n" + alternate.join("\n") : "");
	}
}
