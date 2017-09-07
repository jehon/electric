
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

		return {
			svg: draw(this._currentElement)
				.label()
				.build(),
			width: this._currentElement.getVal("width", 0),
			height: this._currentElement.getVal("height", 0)
		};
	}



	buildAssembly(self, next, alternate) {
		super.buildAssembly(self, next, alternate);
		return self;
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
