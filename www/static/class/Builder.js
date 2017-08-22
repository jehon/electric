
class Builder {
	constructor(schema) {
		this._schema = schema;

		// Thinking: what should be a WeakMap: builder, schema?
		// Schema -> so some builder could live without a schema -> no way!
		// Builder -> if builder is not related anymore, we can build it again!
		// In fact, it shouldnt be a weakmap
		this._builders = new Map();
		// this._keys = new Map();
	}

	_getBuilder(range, i, element) {
		// let mk = range + '_' + i;
		// if (!this._keys.has(mk)) {
		// 	this._keys.set(mk, { range: range, i: i });
		// }
		// let k = this._keys.get(mk);
		let k = { range, i };
		if (!this._builders.has(k)) {
			this._builders.set(k, new this.constructor(element));
		}

		return this._builders.get(k);
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
		let builder = this._getBuilder('next', i, element);
		return builder.build(...args);
	}

	getOneAlternate(i, element, ...args) {
		let builder = this._getBuilder('alt', i, element);
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
