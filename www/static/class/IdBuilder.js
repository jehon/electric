
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

			if (!("getReference" in element)) {
				const ref = drawReference(element.type);
				element.getReference = () => ref;
			}
		}

		// Param uuid is used when searching for an UUID
		buildSelf() {
			this.constructor.assignUUID(this._currentElement);
		}
	}

	return IdBuilder;
})();

