
MigrationBuilder = (function() {
	class MigrationBuilder extends Builder {
		buildSelf(...args) {
			// Integrate options directly here
			if ("options" in this._currentElement) {
				Object.assign(this._currentElement, this._currentElement.options);	
			}
			if ("reference" in this._currentElement) {
				this._currentElement.name = this._currentElement.reference;
			}
			this._currentElement.orientation = ("orientation" in this._currentElement ? this._currentElement.orientation : 0 ) + 90;
			return super.buildSelf(...args);
		}
	}

	return MigrationBuilder;
})();
