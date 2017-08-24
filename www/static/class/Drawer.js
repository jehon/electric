
function draw(data) {
	return new Drawer(data);
}

let Drawer = (function() {

    // Rotate: P, S, Heater, Boiler, CookingPlates, Transfo

	let extending = (name, what, data) => {
		List[name] = Object.assign({}, what, data);
	}

	let List = {
		PlaceHolder: {
	  		width        : 25,
	  		height       : 25,
	  		name         : 'Place vide',
			draw         : ''
		},
		P: { // Todo: Rotate
			width        : 25,
			height       : 20,
			innerHeight  : 15,
			name         : 'Prise',
			draw         : '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />'
		},
		L: {
			width        : 20,
			height       : 20,
			innerHeight  : 10,
			name         : 'Light',
			draw         : '<path d="M0,10 l5,5 l-10,-10 l5,5 l5,-5 l-10,10" />'
    	},
    	Dist: {
      		width        : '20',
      		height       : '60',
      		name         : 'Disjoncteur',
      		availOptions : [ 'I', 'Isec' ],
      		draw         : (options) => {
  			    return '<path d="M0,0 l0,10 l10,35 m-10,0 l0,15"/>'
			    + '<path d="M10,45 L14,43 L12.5,39 L9,41 z" fill="currentColor"/>'
			    + '<text x=10 y=20 font-family="Verdana" font-size="8" >'
			    + (options.I    ? 'I:' + options.I    + 'A '             : '' )
			    + (options.Isec ? '\u25B3' + options.Isec + 'mA ' : '' )
			    + '</text>';
      		}
    	},
    	Heater: /* TODO: rotate */ {
			width        : 20,
			height       : 20,
			name         : 'Chauffage',
      		draw         : '<rect x=-10 y=0 width=20 height=20 />'
				+ '<path d="M-10,0 l0,20 M-5,0 l0,20 M0,0 l0,20 M5,0 l0,20" />'
		},
    	Boiler: /* TODO: rotate */  /* *********** TODO hachuré ********************/ {
			width        : 25,
			height       : 20,
			innerHeight  : 15,
			name         : 'Boiler',
      		draw         : '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />'
		},

    	CookingPlates: /* TODO: rotate */ {
			width        : 25,
			height       : 20,
			innerHeight  : 15,
			name         : 'Cuisinière',
      		draw         : '<rect x=-10 y=0 width=20 height=20 />'
				+ '<circle cx=5  cy=15 r=2 fill="auto" />'
      			+ '<circle cx=-5 cy=5  r=2 fill="auto" />'
      			+ '<circle cx=-5 cy=15 r=2 fill="auto" />'
		},

    	KNX: {
			width        : '20',
      		height       : '35',
      		name         : 'Relais KNX',
			draw         : '<rect x=-10 y=0 width=20 height=35 />'
				+ '<path d="M-5,5 l0,10 l10,0" />'
				+ '<path d="M-5,30 l0,-10 l10,0" />'
		},
    	Bridge: {
			width        : '1',
			height       : '10',
			name         : 'Bridge',
			draw         : '<path d="M0,0 l0,10"/>'
  		},
    	Transfo: /* TODO: rotate */ {
			width        : '20',
			height       : '20',
			name         : 'Transformateur',
			draw         : '<line x1=0 x2=0 y1=0 y2=2 />'
				+ '<circle cx=0 cy=7 r=5 />'
				+ '<circle cx=0 cy=13 r=5 />'
				+ '<line x1=0 x2=0 y1=18 y2=20 />'
		},
    	Label: {
			width        : '20',
			height       : '20',
			name         : 'Label libre',
			availOptions : [ 'text' ],
			draw         : (options) => '<text x="0" y="10" font-family="Verdana" font-size="6">' + options.text + '</text>'
  		}
	}

	extending("Neon", List.L, {
		width            : 10,
		height           : 35,
		name             : 'Neon',
		draw             : '<path d="M0,5 l5,0 l-10,0 m5,0 l0,30 l5,0 l-10,0" />'
	});

	extending("S", List.P, {
		width            : 25,
		height           : 20,
		innerHeight      : 15,
		name             : 'Interrupteur',
		availOptions     : [ 'bipol', 'bidir', 'variator', 'light' ],
		draw             : (options) => {
			return  '<path d="M0,0 L0,10 l8,8 l4,-4 m-4,4'
	      	+ (options.bipol ? 'm -2,-2 l4,-4 m-4,4 m2,2 ' : '')
      		+ (options.bidir ? 'M0,8 l-8,-8 l-4,4 ' : '')
      		+ (options.inverter ? 'M0,8 l-8,-8 l-4,4 M0,8 l8,-8 l4,4 M0,8 l-8,8 l-4,-4 ' : '')
      		+ (options.variator ? 'M-6,15 l12,0 l0,4 l-12,-4 ' : '')
      		+ '" />'
      		+ '<circle cx=0 cy=10 r=3 fill="white" />'
      		+ (options.light ? '<path d="M0,10 l2,2 M0,10 l2,-2 M0,10 l-2,2 M0,10 l-2,-2" />' : '')
		}
    });

    extending("Hotte", List.P, {
		width           : '20',
		height          : '20',
		name            : 'Hotte',
		draw            : '<rect x=-10 y=0 width=20 height=20 />'
      		+ '<circle cx=0 cy=6  r=4 />'
      		+ '<circle cx=0 cy=14 r=4 />'
    });

	class Drawer {
		constructor(data) {
		    this.data = data;
		    this.internal = {
		      filiaire: {
		        x: [],
		        width: 0,
		        height: 0
		      }
		    };

		    if (!this.data.options) {
		      this.data.options = {};
		    }
		    if (!this.data.next) {
		      this.data.next = [];
		    }
		    if (!this.data.alternate) {
		      this.data.alternate = [];
		    }

		    if (this.data.availOptions && this.data.options) {
		    }
		}

		get width() {
			return parseFloat(this.data.width);
		}

		get height() {
			return parseFloat(this.data.height);
		}

		get alignX() {
			return this.width / 2;
		}

		rotate(angle) {

		}

		group() {

		}

		scale() {

		}

		build() {
		}
	}

	return Drawer;
})();


//   /*************************************************
//   // Specific for FILIAIRE
//   /*************************************************/
//   filiaireDraw() {
//     return this.draw();
//   }

//   // Calculate the height of the element
//   filiaireHeight() {
//     return this.height;
//   }

//   filiaireWidth() {
//     return this.width;
//   }

//   array2XPosition(cacheName, array, i) {
//     // Initialize the cache if necessary
//     if (!this.internal.filiaire.x[cacheName]) {
//       this.internal.filiaire.x[cacheName] = [];
//     }
//     // Cap it to the latest one...
//     if (i > array.length || i === null) {
//       i = array.length;
//     }
//     if (i < 0) {
//       i = 0;
//     }
//     if (this.internal.filiaire.x[cacheName][i]) {
//       return this.internal.filiaire.x[cacheName][i];
//     }
//     // Default response:
//     if (i == 0) {
//       // Let's start at left border
//       this.internal.filiaire.x[cacheName][i] = 0;
//     } else {
//       this.internal.filiaire.x[cacheName][i] = this.array2XPosition(cacheName, array, i - 1)  // Take previous one starting point
//         + array[i - 1].filiaireHierarchicalWidth()                                            // and its width
//         + (i == array.length ? 0 : config.filiaire.spaceH);                                                             // add border
//     }
//     return this.internal.filiaire.x[cacheName][i];
//   }


//   fililaireRelativePositionX4Next(i = null) {
//     return this.array2XPosition('next', this.data.next, i);
//   }

//   fililaireRelativePositionX4Alternate(i = null) {
//     return this.array2XPosition('alternate', this.data.alternate, i);
//   }

//   // Calculate the width of the line
//   filiaireHierarchicalWidth() {
//     return Math.max(
//         this.filiaireWidth(),
//         this.fililaireRelativePositionX4Next()
//       )
//       + (this.alternate.length > 0
//         ? (config.filiaire.spaceH + this.fililaireRelativePositionX4Alternate())
//         : 0
//         )
//     ;
//   }

//   filiaireAlignX() {
//     return this.alignX;
//   }

//   filiaireAlignAlternateY() {
//     return this.filiaireHeight() / 2;
//   }
// }


// let OrthogonalFiliaireMixin = Base =>     	extends Base {
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
