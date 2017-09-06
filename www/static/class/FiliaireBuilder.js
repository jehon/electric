
class FiliaireBuilder extends Builder {
	buildSelf(plan, space, ...args) {
		super.buildSelf(plan, space, ...args);

		return draw(this._currentElement)
			.label(("getName" in this._currentElement) ? this._currentElement.getName() : false, 
				this._currentElement.getVal("width"), 
				this._currentElement.getVal("height") / 2,
				this._currentElement.getVal("orientation", 0))
			.build();

		return space + str.split("\n").join("\n" + space) + "\n";
	}

	getOneNext(i, element, ...args) {
		return super.getOneNext(i, element, ...args);
	}

	getOneAlternate(i, element, ...args) {
		return super.getOneAlternate(i, element, ...args);
	}

	buildAssembly(self, next, alternate) {
		return super.buildAssembly(self, next, alternate);
	}

}
