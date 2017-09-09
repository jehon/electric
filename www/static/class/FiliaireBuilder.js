
const hmargin = 10;
const vmargin = 10;

class FiliaireBuilder extends NameBuilder {
	// Object sent back is:
	//  {
	//     svg:
	//     width:
	//     heigh:
	// }
	//

	// constructor(...args) {
	// 	super(...args);
	// }

	buildSelf(...args) {
		super.buildSelf(...args);

		// build up the block, but with (0,0) = top left corner
		// and (w, h) = bottom right corner

		let res = {
			width: this._currentElement.getVal("width", 0),
			height: this._currentElement.getVal("height", 0),
			svg: draw(this._currentElement)
				.label()
				.translate(0, this._currentElement.getVal("height", 0) / 2)
				.build()
		};

		// res.svg += `<rect x=0 y=0 width=${res.width} height=${res.height} stroke='blue' />`

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
			_svg += `<line x1=0 x2=0 y1=${+ this._currentElement.getVal("height") / 2} y2=0 />`

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
			_svg += `<line x1=${self.width} x2=${currentBlockWidth} y1=${self.height/2} y2=${self.height/2} stroke='black' />`
			_svg += `<line x1=${currentBlockWidth} x2=${currentBlockWidth} y1=${self.height/2} y2=${deltay} stroke='black' />`

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

	//
	// 
	// Additionnal helpers
	//
	//

	array2XPosition(cacheName, array, i) {
		// Initialize the cache if necessary
		if (!this._cache[cacheName]) {
			this._cache[cacheName] = [];
		}

		if (this._cache[cacheName][i]) {
			return this._cache[cacheName][i];
		}
		// Default response:
		if (i == 0) {
			// Let's start at left border
		  	this._cache[cacheName][i] = 0;
		} else {
		  	this._cache[cacheName][i] = this.array2XPosition(cacheName, array, i - 1)  // Take previous one starting point
		    	+ array[i - 1].filiaireHierarchicalWidth()                                          // and its width
		    	+ (i == array.length ? 0 : config.filiaire.spaceH);                                 // add border
		}
		return this._cache[cacheName][i];
	}


	fililaireRelativePositionX4Next(i) {
		return this.array2XPosition('next', this.data.next, i);
	}

	fililaireRelativePositionX4Alternate(i) {
		return this.array2XPosition('alternate', this.data.alternate, i);
	}

	// Calculate the width of the line
	filiaireHierarchicalWidth() {
		return Math.max(
				this.filiaireWidth(),
				this.fililaireRelativePositionX4Next()
			)
			+ (this.alternate.length > 0
				? (config.filiaire.spaceH + this.fililaireRelativePositionX4Alternate(0))
				: 0
			)
		;
	}

	filiaireAlignX() {
		return this.alignX;
	}

	filiaireAlignAlternateY() {
		return this.filiaireHeight() / 2;
	}
}



// let OrthogonalFiliaireMixin = Base => class extends Base {
//   filiaireDraw() {
//     return (`
//       <g>
//         <line x1=0 y1=0 x2=0 y2=${this.filiaireHeight()} />
//         <g transform='translate(0, ${this.filiaireHeight() / 2})'>
//           <g transform='rotate(270)'>
//             ${this.draw()}
//           </g>
//         </g>
//       </g>
//     `);
//   }

//   filiaireHeight() {
//     return this.width;
//   }

//   filiaireWidth() {
//     return this.height + this.filiaireAlignX();
//   }

//   filiaireAlignX() {
//     return 0;
//   }
// };
