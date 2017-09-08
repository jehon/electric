
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

		res.svg += `<rect x=0 y=0 width=${res.width} height=${res.height} stroke='blue' />`

		return res;
	}

	buildAssembly(self, next, alternate) {
		super.buildAssembly(self, next, alternate);

		// Line = one of next / alternate line starting from this element
		// Block = this element + each lines

		let currentBlockWidth = 0;
		let maxHeightOfLine = 0;

		let _svg = '';

		// Add one array element
		let drawOneLine = (e, i, deltay) => {

			if (i == 0) {
				_svg += `<g transform="translate(${currentBlockWidth}, ${deltay})">`;
			} else {
				// If we are not the first element, we gain some place above
				_svg += `<g transform="translate(${currentBlockWidth}, ${deltay})">`;
			}
			// In this block, we are suppose to be at the correct level to draw an element

			// Link to the previous element
			// _svg += `<line x1=0 x2=0 y1=${- this._currentElement.getVal("height") / 2} y2=${vmargin} stroke='red'/>`

			// The element himself, with enough space on top
			_svg += `${e.svg}`;

			_svg += `</g>`;

			// Prepare for next line
			currentBlockWidth = currentBlockWidth + e.width + hmargin;
			maxHeightOfLine = Math.max(maxHeightOfLine, deltay + e.height);
		}

		let deltay = self.height + vmargin;

		if (next != null) {

		// 	// Add a line to the target level
		// 	res.svg += `<line x1=0 x2=0 y1=0 y2=${targety} stroke="green" />`

			// Add the sub-components at a h/2 + vmargin level


		// 	// TODO: link the first one
		// 	//res.svg += `<line x1=0 x2=0 y1=0 y2=${-this._currentElement.getVal("height")} stroke='red'/>`;

			// For the first element of the line, we gain some place
			next.forEach((e, i) => drawOneLine(e, i, deltay));

			// Close the group
			// _svg += `</g>`;
		}

		if (alternate != null) {
		// 	// TODO: link the first one
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
