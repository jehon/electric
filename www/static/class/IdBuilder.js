
IdBuilder = (function() {
	let uuidCounter = 1;

	return class IdBuilder extends Builder {
		buildSelf(element, uuid = false) {
			if (!("getId" in element)) {
				// Copy the value to fix it
				const localUUID = uuidCounter++;
				element.getId = () => localUUID;
			}
			if (uuid) {
				if (element.getId() == uuid) {
					return uuid;
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

		static nextUUID() {
			return uuidCounter;
		}
	}
})();

function findByUUID(uuid) {

}