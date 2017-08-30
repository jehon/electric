
IdBuilder = (function() {
	let uuidCounter = 1;

	class IdBuilder extends Builder {
		static nextUUID() {
			return uuidCounter;
		}

		static testResetUUID() {
			uuidCounter = 1;
		}

		static assignUUID(element) {
			if (!("getId" in element)) {
				// Copy the value to fix it
				const localUUID = uuidCounter++;
				element.getId = () => localUUID;
			}

			if (!("getType" in element)) {
				const ref = drawReference(element.type);
				element.getType = () => ref;
			}
		}

		buildSelf(uuid = false) {
			this.constructor.assignUUID(this._currentElement);

			// Return value to search by UUID
			if (uuid) {
				if (this._currentElement.getId() == uuid) {
					return this._currentElement;
				}
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
			return na;
		}

		findByUUID(uuid) {
			// Use the return value sent by the iterator
			return this.build(uuid);
		}
	}

	return IdBuilder;
})();

