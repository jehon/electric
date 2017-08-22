
class Builder {
	constructor(schema) {
		this._schema = schema;
		this._builders = {};
	}

	_getBuilder(i, element) {
		if (typeof(this._builders[i]) == "undefined") {
			this._builders[i] = new this.constructor(element);
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
		if (this._schema.next) {
		    next = this._schema.next.map((e, i) => this.getOneNext(i, this._schema.next[i], ...args));
		}

		// Build for alternate
		let alternate = [];
		if (this._schema.alternate) {
		    alternate = this._schema.alternate.map((e, i) => this.getOneAlternate(i, this._schema.alternate[i], ...args));
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
		return element.type + "|";
	}

	buildAssembly(self, next, alternate) {
		return self
		+ (next.length > 0 ? next.join("") : "")
		+ (alternate.length > 0 ? alternate.join("") : "");
	}
}
