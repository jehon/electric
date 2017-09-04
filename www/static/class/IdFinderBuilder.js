
IdFinderBuilder = (function() {
	let uuidCounter = 1;

	class IdFinderBuilder extends IdBuilder {
		// Param uuid is used when searching for an UUID
		buildSelf(uuid) {
			super.buildSelf();

			// Return value to search by UUID
			if (this._currentElement.getId() == uuid) {
				return this._currentElement;
			}
			return false;
		}

		buildAssembly(self, next, alternate) {
			// Return value to search by UUID
			if (self) {
				return self;
			}
			let nv = next.reduce((acc, val) => (acc ? acc : (val ? val : false)), false);
			if (nv) {
				return nv;
			}
			let na = alternate.reduce((acc, val) => (acc ? acc : (val ? val : false)), false);
			if (na) {
				return na;
			}
			return null;
		}

		findByUUID(uuid) {
			// Use the return value sent by the iterator
			return this.build(uuid);
		}
	}

	return IdFinderBuilder;
})();

