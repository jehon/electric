
dumpSchema = (function() {
	class DumpSchemaBuilder extends NameBuilder {
		constructor(...args) {
			super(...args);
			this._print = ' ';
		}

		_getBuilder(...args) {
			let el = super._getBuilder(...args);
			el._print = this._print;
			this._print = this._print + ' ';
			return el;
		}

		buildSelf(...args) {
			super.buildSelf(...args);
			console.log(
				(this._currentElement.getId() + "     ").substring(0, 1 + Math.ceil(Math.log10(SingleElementBuilder.nextUUID())))
				+ this._print 
				+ this._currentElement.getName() 
				+ ': ' 
				+ this._currentElement.type
				);
		}
	}

	return (schema) => (new DumpSchemaBuilder(schema)).build();
})();
