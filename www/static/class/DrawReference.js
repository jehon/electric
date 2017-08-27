// Coordonate system
//
// Y -> page width
// X -> page height
//

let drawReference = (function() {
	let extending = (name, what, typeDef) => {
		List[name] = Object.assign({}, what, typeDef);
	}

	function rotate(height, svg) {
		return `
	        <g transform='translate(0, ${height / 2})'>
	          <g transform='rotate(270)'>
	            ${svg}
	          </g>
	        </g>
	    `;
	}

    // Rotate: P, S, Heater, Boiler, CookingPlates, Transfo

 	const List = {
		PlaceHolder: {
			// Todo: review
	  		width        : 25,
	  		height       : 25,
	  		name         : 'Place vide',
			draw         : ''
		},
		P: {
			// Todo: review
			// rotate 270, move -10
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Prise',
			draw         : rotate(25, '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" fill="none"/>')
		},
		L: {
			// Todo: review - en cours
			type         : "roof",
			width        : 20,
			height       : 20,
			name         : 'Light',
			draw         : '<path d="M0,0 l5,5 l-10,-10 l5,5 l5,-5 l-10,10" fill="none"/>'
    	},
    	Disj: {
			// Todo: review
      		width        : '20',
      		height       : '60',
      		name         : 'Disjoncteur',
      		availOptions : [ 'I', 'Isec' ],
      		draw         : (options) => {
  			    return '<path d="M0,0 l0,10 l10,35 m-10,0 l0,15" fill="none"/>'
			    + '<path d="M10,45 L14,43 L12.5,39 L9,41 z" fill="currentColor"/>'
			    + '<text x=10 y=20 font-family="Verdana" font-size="8" >'
			    + (options.I    ? 'I:' + options.I    + 'A '             : '' )
			    + (options.Isec ? '\u25B3' + options.Isec + 'mA ' : '' )
			    + '</text>';
      		}
    	},
    	Heater: {
			// Todo: review
			width        : 20,
			height       : 20,
			name         : 'Chauffage',
      		draw         : rotate(20, '<rect x=-10 y=0 width=20 height=20 fill="none" />'
				+ '<path d="M-10,0 l0,20 M-5,0 l0,20 M0,0 l0,20 M5,0 l0,20" fill="none" />')
		},
    	Boiler: {
			// Todo: review
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Boiler',
    		/* *********** TODO hachuré ********************/ 
    		draw         : '<circle cx=10 cy=0 r=5 fill="none" />'
    			+ '<circle cx=10 cy=0 r=10 fill="none" />'
		},

    	CookingPlates: /* TODO: rotate */ {
			// Todo: review
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Cuisinière',
      		draw         : rotate(25, '<rect x=-10 y=0 width=20 height=20 fill="none" />'
				+ '<circle cx=5  cy=15 r=2 fill="currentColor" />'
      			+ '<circle cx=-5 cy=5  r=2 fill="currentColor" />'
      			+ '<circle cx=-5 cy=15 r=2 fill="currentColor" />')
		},

    	KNX: {
			// Todo: review
			width        : 20,
      		height       : 35,
      		name         : 'Relais KNX',
			draw         : '<rect x=-10 y=0 width=20 height=35 fill="none" />'
				+ '<path d="M-5,5 l0,10 l10,0" fill="none" />'
				+ '<path d="M-5,30 l0,-10 l10,0" fill="none" />'
		},
    	Bridge: {
			// Todo: review
			width        : '1',
			height       : '10',
			name         : 'Bridge',
			draw         : '<path d="M0,0 l0,10" fill="none" />'
  		},
    	Transfo: {
			// Todo: review
			width        : 20,
			height       : 20,
			name         : 'Transformateur',
			draw         : rotate(20, '<line x1=0 x2=0 y1=0 y2=2 fill="none" />'
				+ '<circle cx=0 cy=7 r=5 fill="none" />'
				+ '<circle cx=0 cy=13 r=5 fill="none" />'
				+ '<line x1=0 x2=0 y1=18 y2=20 fill="none" />')
		},
    	Label: {
			// Todo: review
			width        : '20',
			height       : '20',
			name         : 'Label libre',
			availOptions : [ 'text' ],
			draw         : (options) => '<text x="0" y="10" font-family="Verdana" font-size="6">' + options.text + '</text>'
  		}
	}

	extending("Neon", List.L, {
		// Todo: review
		width            : 10,
		height           : 35,
		name             : 'Neon',
		draw             : '<path d="M0,5 l5,0 l-10,0 m5,0 l0,30 l5,0 l-10,0" fill="none" />'
	});

	extending("S", List.P, {
		// Todo: review
		width            : 25,
		height           : 20,
		innerHeight      : 15,
		name             : 'Interrupteur',
		availOptions     : [ 'bipol', 'bidir', 'variator', 'light' ],
		draw             : (options) => rotate(25,
			'<path d="M0,0 L0,10 l8,8 l4,-4 m-4,4'
		      	+ (options.bipol ? 'm -2,-2 l4,-4 m-4,4 m2,2 ' : '')
	      		+ (options.bidir ? 'M0,8 l-8,-8 l-4,4 ' : '')
	      		+ (options.inverter ? 'M0,8 l-8,-8 l-4,4 M0,8 l8,-8 l4,4 M0,8 l-8,8 l-4,-4 ' : '')
	      		+ (options.variator ? 'M-6,15 l12,0 l0,4 l-12,-4 ' : '')
	      		+ '" fill="none" />'
	      		+ '<circle cx=0 cy=10 r=3 fill="white" fill="none" />'
	      		+ (options.light ? '<path d="M0,10 l2,2 M0,10 l2,-2 M0,10 l-2,2 M0,10 l-2,-2" fill="none" />' : '')
   		)
    });

    extending("Hotte", List.P, {
		// Todo: review
		width           : '20',
		height          : '20',
		name            : 'Hotte',
		draw            : '<rect x=-10 y=0 width=20 height=20 fill="none" />'
      		+ '<circle cx=0 cy=6  r=4 fill="none" />'
      		+ '<circle cx=0 cy=14 r=4 fill="none" />'
    });

	return function(type) {
		if (!(type in List)) {
	    	throw "Type not found: " + type;
		}
		return Object.freeze(List[type]);
	};
})();
