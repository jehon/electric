// Coordonate system
//
// Y -> page width
// X -> page height
//

let draw = (function() {
	function draw(element) {
		return new Drawer(element);
	}

	class Drawer {
		constructor(element) {
		    this._element = element;

		    if (!this._element.type) {
		    	throw "Element.type not found on " + JSON.stringify(this._element);
		    }

		    this.type = drawReference(this._element.type);

		    // TODO: check options

		    this._svg = "";
		    if (typeof(this.type.draw) == "function") {
		    	this._svg = this.type.draw(this._element);
		    } else {
		    	this._svg = this.type.draw;
		    }
		    this._svg = `<g electrical-type='${this._element.type}' id='${"getId" in this._element ? this._element.getId() : ""}'>${this._svg}</g>`;
		}

		getParameter(name, def = 0) {
			if (!(name in this._element)) {
				return def;
			}
			return this._element[name];			
		}

		get width() {
			if (!("width" in this._element)) {
				return 0;
			}
			return parseFloat(this._element.width);
		}

		get height() {
			if (!("height" in this._element)) {
				return 0;
			}
			return parseFloat(this._element.height);
		}

		get alignX() {
			return this.getOption("alignX", this.width / 2);
		}

		// SVG transform the result

		label() {
			// TODO
			return this;
		}

		translate(x = 0, y = 0) {
			// TODO: check
			if (x == 0 && y == 0) {
				return this;
			}
			this._svg = `<g transform='translate(${x}, ${y})' stroke='black' fill='none' >\n  ${this._svg}\n</g>`;
			return this;
		}

		rotate(angle = 0) {
			// TODO: check
			if (angle == 0 || angle == 360) {
				return this;
			}
			this._svg = `<g transform='rotate(${angle})'>\n  ${this._svg}\n</g>`;
			return this;
		}

		scale(proportion) {
			// TODO: implement and check
			return this;
		}

		// Draw the result

		build() {
			return this._svg;
		}
	}

	return draw;
})();
