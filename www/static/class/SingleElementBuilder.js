
SingleElementBuilder = (function() {
	let uuidCounter = 1;

	class SingleElementBuilder extends Builder {
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

			if (!("getVal" in element)) {
				element.getVal = function(name, def) {
					if (name in element) {
						return element[name];
					}
					if (name in element) {
						return element.getReference()[name];
					}
					return def;
				}
			}
		}

		// Param uuid is used when searching for an UUID
		buildSelf() {
			this.constructor.assignUUID(this._currentElement);
		}
	}

	return SingleElementBuilder;
})();

