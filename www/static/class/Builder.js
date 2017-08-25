
class Builder {
	constructor(currentElement) {
		if (typeof(currentElement) != "object") {
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
		if (this._currentElement == null) {
			return;
		}

		// Here: let's cache the current state (not in partial ones)
		// let newJsonSchema = JSON.stringify(this._currentElement);
		// if (this._jsonSchema == newJsonSchema) {
		// 	return this._result;
		// }

		// Do the work
		// Some need the "self" to be build to calculate childrens (NameBuilder)
		let me = this.buildSelf(...args);

		// Build next's
		let next = [];
		if (this._currentElement.next) {
		    next = this._currentElement.next.map((e, i) => this.getOneNext(i, this._currentElement.next[i], ...args));
		}

		// Build for alternate
		let alternate = [];
		if (this._currentElement.alternate) {
		    alternate = this._currentElement.alternate.map((e, i) => this.getOneAlternate(i, this._currentElement.alternate[i], ...args));
		}

		// Compose the whole stuff into one
		return this.buildAssembly(me, next, alternate);
	}

	buildSelf(...args) {
		return this._currentElement.type + "|";
	}

	getOneNext(i, element, ...args) {
		return this._getBuilder('next', i, element).build(...args);
	}

	getOneAlternate(i, element, ...args) {
		return this._getBuilder('alt', i, element).build(...args);
	}

	buildAssembly(self, next, alternate) {
		return self
		+ (next.length > 0 ? next.join("") : "")
		+ (alternate.length > 0 ? alternate.join("") : "");
	}
}
