
class NameBuilder extends Builder {
	constructor(...args) {
		super(...args);
		this._print = false;
	}

	buildWithPrint() {
		this._print = ' ';
		this.build();
		this._print = false;
	}

	_getBuilder(...args) {
		let el = super._getBuilder(...args);
		el._print = this._print;
		if (this._print !== false) {
			this._print = this._print + ' ';
		}
		return el;
	}


	// Set initial values
	// Build by one object, to allow buildSelf to modify it
	build(ref = { base : "main", index : 0 }) {
		super.build(ref);
	}

	buildSelf(ref) {
		let _setNames = (long, short) => {
			const short_ = short;
			const long_ = long;
			this._currentElement.getShortName = function() { return short_ };
			this._currentElement.getName = function() { return long_ };
		}

		if ("name" in this._currentElement) {
		    _setNames(this._currentElement.name, this._currentElement.name);
		    ref.base = this._currentElement.name;
		    ref.index = 0;
		} else {
    		_setNames(ref.base + (ref.index == 0 ? '' : '.' + ref.index), ref.index);
		}
		if (this._print !== false) {
			console.log(
				(("getId" in this._currentElement ? (this._currentElement.getId()) : "") + "     ").substring(0, 1 + Math.ceil(Math.log10(SingleElementBuilder.nextUUID())))
				+ this._print 
				+ this._currentElement.getName() 
				+ ': ' 
				+ this._currentElement.type);
		}

		return super.buildSelf(ref);
	}

	getOneNext(i, element, ref) {
    	if (this._currentElement.next && this._currentElement.next.length == 1) {
        	// Continue numerotation if only one element is found
        	return super.getOneNext(i, element, { base: ref.base, index: ref.index + 1 })
      	} else {
        	// Index by row
        	return super.getOneNext(i, element, { base: this._currentElement.getName() + '.' + i, index: 1 });
      	}
	}

	getOneAlternate(i, element, ref) {
		if (!this._currentElement.next || this._currentElement.next.length == 0) {
			// We don't have a 'next', we treat alternate as a 'next'
	    	if (this._currentElement.alternate && this._currentElement.alternate.length == 1) {
	        	// Continue numerotation if only one element is found
	        	return super.getOneAlternate(i, element, { base: ref.base, index: ref.index + 1 })
	      	} else {
	        	// Index by row
	        	return super.getOneAlternate(i, element, { base: this._currentElement.getName() + '.' + i, index: 1 });
	      	}
		}
	    if (this._currentElement.alternate.length == 1) {
			// We continue the numerotation
			return super.getOneAlternate(i, element, { base: this._currentElement.getName() + 'a', index: 1 });
        } else {
			// We are on an alternate flow
			return super.getOneAlternate(i, element,{ base: this._currentElement.getName() + 'a' + i,  index: 1 });
        }
	}
}
