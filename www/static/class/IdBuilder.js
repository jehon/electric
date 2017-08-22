
IdBuilder = (function() {
	let uuidCounter = 1;

	class IdBuilder extends Builder {
		static nextUUID() {
			return uuidCounter;
		}

		buildSelf(element, uuid = false) {
			if (!("getId" in element)) {
				// Copy the value to fix it
				const localUUID = uuidCounter++;
				element.getId = () => localUUID;
			}
			if (uuid) {
				if (element.getId() == uuid) {
					return element;
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

