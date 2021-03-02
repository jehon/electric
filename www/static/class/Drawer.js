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
		    // this._svg = `<g electrical-type='${this._element.type}' id='${"getId" in this._element ? this._element.getId() : ""}'>${this._svg}</g>`;
		    this._svg = `<g electrical-type='${this._element.type}' id='_${"getId" in this._element ? this._element.getId() : ""}'>
		    		<rect x=0 y="-${this.type.getVal("toTop")}" width=${this.type.getVal("width")} height=${this.type.getVal("height")} fill='white' fill-opacity='0' stroke='none'></rect>
		    		${this._svg}
		    	</g>`;
		}

		get alignX() {
			return this.getOption("alignX", this.width / 2);
		}

		// SVG transform the result

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
