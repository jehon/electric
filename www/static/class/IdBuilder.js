
IdBuilder = (function() {
	let uuidCounter = 1;

	class IdBuilder extends Builder {
		static nextUUID() {
			return uuidCounter;
		}

		static testResetUUID() {
			uuidCounter = 1;
		}

		buildSelf(uuid = false) {
			if (!("getId" in this._currentElement)) {
				// Copy the value to fix it
				const localUUID = uuidCounter++;
				this._currentElement.getId = () => localUUID;
			}
			if (uuid) {
				if (this._currentElement.getId() == uuid) {
					return this._currentElement;
				}
			}
			return false;
		}

		buildAssembly(self, next, alternate) {
			if (self) {
				return self;
			}
			let nv = next.reduce((acc, val) => (acc ? acc : (val ? val : false)), false);
			if (nv) {
				return nv;
			}
			let na = alternate.reduce((acc, val) => (acc ? acc : (val ? val : false)), false);
			return na;
		}

		findByUUID(uuid) {
			return this.build(uuid);
		}
	}

	return IdBuilder;
})();

