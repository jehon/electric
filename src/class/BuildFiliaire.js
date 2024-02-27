
const hmargin = 10;
const vmargin = 10;

class BuildFiliaire extends BuildName {
	// Object sent back is:
	//  {
	//     svg:
	//     width:
	//     heigh:
	// }
	//

	buildSelf() {
		super.buildSelf();

		// build up the block, but with (0,0) = top left corner
		// and (w, h) = bottom right corner

		let res = {
			width: this._currentElement.getVal("width"),
			height: this._currentElement.getVal("height"),
			svg: `<g type='translate' transform='translate(0, ${this._currentElement.getVal("toTop")})'>
					${draw(this._currentElement).build()}
					${this.label()}
				</g>
				`
		};

		return res;
	}

	buildAssembly(self, next, alternate) {
		super.buildAssembly(self, next, alternate);

		// Line = one of next / alternate line starting from this element
		// Block = this element + each lines

		// (0,0) = top-left of "self/currentElement"

		let previousLineY = 0;
		let currentBlockWidth = 0;
		let maxHeightOfLine = 0;

		let _svg = '';

		// Add one array element
		let drawOneLine = (e, i, deltay) => {
			_svg += `<g transform="translate(${currentBlockWidth}, ${deltay})">`;
			// (0,0) = top left of first element of the line

			if (i > 0) {
				// If we are not the first element
				// - Horizontal line to the previous line (== "NEXT/ALTERNATE" LINE)
				_svg += `<line x1=${-previousLineY} x2=0 y1=0 y2=0 />`;
			}
			// In this block, we are suppose to be at the correct level to draw an element

			// Vertical line to the top of the line element
			_svg += `<line x1=0 x2=0 y1=${+ this._currentElement.getVal("toTop")} y2=0 />`

			// The element himself, with enough space on top
			_svg += `${e.svg}`;

			_svg += `</g>`;

			// Prepare for next line
			previousLineY = e.width;
			currentBlockWidth = currentBlockWidth + e.width + hmargin;
			maxHeightOfLine = Math.max(maxHeightOfLine, deltay + e.height);
		}

		let deltay = self.height + vmargin;

		if (next != null && next.length > 0) {

			// Vertical line from the "next" line to the center of self
			_svg += `<line x1=0 x2=0 y1=${self.height / 2} y2=${deltay} />`

			next.forEach((e, i) => drawOneLine(e, i, deltay));
		}

		if (alternate != null && alternate.length > 0) {

			// 	horizontal and vertical line to connect to the self
			_svg += `<line x1=${self.width} x2=${currentBlockWidth} y1=${self.height/2} y2=${self.height/2} />`
			_svg += `<line x1=${currentBlockWidth} x2=${currentBlockWidth} y1=${self.height/2} y2=${deltay} />`

			alternate.forEach((e, i) => drawOneLine(e, i, deltay));
		}

		// Draw the current element on top of all that
		return {
			svg: _svg + self.svg,
			// Width = position of next line
			width: Math.max(self.width, currentBlockWidth),
			height: Math.max(self.height, maxHeightOfLine)
		}
	}

	label() {
		if (!this._currentElement.getName()) {
			return this;
		}
		return `<text x="${2}" y="${-this._currentElement.getVal("toTop")}" font-family="Verdana" font-size="6">
				${this._currentElement.getName()}
			</text>`
	}
}
