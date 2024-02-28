let drawReference = (function() {
	let extending = (name, what, typeDef) => {
		List[name] = Object.assign({}, what, typeDef);
	}

 	let List = {
		PlaceHolder: {
	  		width        : 25,
	  		height       : 25,
	  		name         : 'Place vide',
			draw         : ''
		},
		P: {
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Prise',
			draw         : '<path d="M0,0 L10,0 m0,-7.5 l0,15 m7.5,-20 l0,5 a7.5 7.5 0 0 0 0 15 l0,5" fill="none"/>'
		},
		S: {
			width        : 22,
			height       : 20,
			innerHeight  : 15,
			name         : 'Interrupteur',
			availOptions : [ 'bipol', 'bidir', 'variator', 'light' ],
			draw         : (options) => { return '<path d="M0,0 L10,0 l8,8 l4,-4 m-4,4'
			      	+ (options.bipol ? 'm -2,-2 l4,-4 m-4,4 m2,2 ' : '')
		      		+ (options.bidir ? 'M8,0 l-8,-8 l-4,4 ' : '')
		      		+ (options.inverter ? 'M8,0 l-8,-8 l-4,4 M8,0 l8,-8 l4,4 M8,0 l-8,8 l-4,-4 ' : '')
		      		+ (options.variator ? 'M15,-6 l0,12 l4,0 l-4,-12 ' : '')
		      		+ '" fill="none" />'
		      		+ '<circle cx=10 cy=0 r=3 fill="white" fill="none" />'
		      		+ (options.light ? '<path d="M10,0 l2,2 M10,0 l2,-2 M10,0 l-2,2 M10,0 l-2,-2" fill="none" />' : '')
	   		}
	    },
		PB: {
			width        : 22,
			height       : 20,
			innerHeight  : 15,
			name         : 'Bouton poussoir',
			availOptions : [ 'light' ],
			draw         : (options) => { return ''
				+ '<path d="M0,0 L10,0" fill="none" />'
				+ '<circle cx=10 cy=0 r=3 fill="white" fill="none" />'
				+ (options.light ? '<path d="M10,0 l2,2 M10,0 l2,-2 M10,0 l-2,2 M10,0 l-2,-2" fill="none" />' : '')
			}
	    },
		L: {
			type         : "roof",
			width        : 10,
			height       : 10,
			name         : 'Light',
			draw         : '<path d="M5,0 l5,5 l-10,-10 l5,5 l5,-5 l-10,10" fill="none"/>'
    	},
    	Neon: {
			width        : 30,
			height       : 10,
			name         : 'Neon',
			draw         : '<path d="M0,0 l0,5 l0,-10 m0,5 l30,0 l0,5 l0,-10" fill="none" />'
		},
    	Disj: { // Rotate ?
      		width        : 20,
      		height       : 60,
      		name         : 'Disjoncteur',
      		availOptions : [ 'I', 'Isec' ],
      		draw         : (options) => {
  			    return '<rect x=-1 y=-25 width=3 height=50 fill="white" stroke="none" />' /* To prevent lines to be drawn accros it */
  			    + '<path d="M0,-30 l0,10 l10,35 m-10,0 l0,15" fill="none"/>'
			    + '<path d="M10,15 L14,13 L12.5,9 L9,11 z" fill="currentColor"/>'
			    + '<text x=10 y=-10 font-family="Verdana" font-size="8" >'
			    + (options.I    ? 'I:' + options.I    + 'A '             : '' )
			    + (options.Isec ? '\u25B3' + options.Isec + 'mA ' : '' )
			    + '</text>';
      		}
    	},
    	Heater: {
			width        : 20,
			height       : 20,
			name         : 'Chauffage',
      		draw         : '<rect x=0 y=-10 width=20 height=20 fill="none" />'
				+ '<path d="M0,-10 l20,0 M0,-5 l20,0 M0,0 l20,0 M0,5 l20,0" fill="none" />'
		},
    	Boiler: {
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Boiler',
    		/* *********** TODO hachuré ********************/ 
    		draw         : '<circle cx=10 cy=0 r=5 fill="none" >'
				+ '<path d="M0,-10 l20,0 M0,-5 l20,0 M0,0 l20,0 M0,5 l20,0" fill="none" />'
    			+ '</circle>'
    			+ '<circle cx=10 cy=0 r=10 fill="none" />'
		},

    	CookingPlates: {
			width        : 20,
			height       : 25,
			innerHeight  : 15,
			name         : 'Cuisinière',
      		draw         : '<rect x=0 y=-10 width=20 height=20 fill="none" />'
				+ '<circle cx=15 cy=5  r=2 fill="currentColor" />'
      			+ '<circle cx=5  cy=-5 r=2 fill="currentColor" />'
      			+ '<circle cx=15 cy=-5 r=2 fill="currentColor" />'
		},
    	KNX: { // TODO: offshift !!!
			width        : 20,
      		height       : 36,
      		name         : 'Relais KNX',
			draw         : '<rect x=0 y=-18 width=20 height=36 fill="white" />'
				+ '<path d="M5,-13 l0,10 l10,0" fill="none" />'
				+ '<path d="M5,13 l0,-10 l10,0" fill="none" />'
		},
    	Relais: { // TODO: offshift !!!
			width        : 20,
      		height       : 36,
      		name         : 'Relais',
			draw         : '<rect x=0 y=-18 width=20 height=36 fill="white" />'
				+ '<path d="M5,-13 l0,10 l10,0" fill="none" />'
				+ '<path d="M5,13 l0,-10 l10,0" fill="none" />'
		},
    	Bridge: {
			width        : 10,
			height       : 1,
			name         : 'Bridge',
			draw         : '<path d="M0,0 l10,0" fill="none" />'
  		},
    	Transfo: {
			width        : 20,
			height       : 20,
			name         : 'Transformateur',
			draw         : '<line x1=0 x2=2 y1=0 y2=0 fill="none" />'
				+ '<circle cx=7 cy=0 r=5 fill="none" />'
				+ '<circle cx=13 cy=0 r=5 fill="none" />'
				+ '<line x1=18 x2=20 y1=0 y2=0 fill="none" />'
		},
    	Label: {
			width        : '20',
			height       : '20',
			name         : 'Label libre',
			availOptions : [ 'text' ],
			draw         : (options) => '<text x="0" y="10" font-family="Verdana" font-size="6">' + options.text + '</text>'
  		},
  		Hotte: {
			width        : 20,
			height       : 20,
			name         : 'Hotte',
			draw         : '<rect x=0 y=-10 width=20 height=20 fill="none" />'
      		+ '<circle cx=6 cy=0  r=4 fill="none" />'
      		+ '<circle cx=14 cy=0 r=4 fill="none" />'
      	}
	}

	let getVal = function(name) {
		if (name in this) {
			return this[name];
		}
		switch(name) {
			case "height":
			case "width":
			case "orientation":
			case "x":
			case "y":
				return 0;
			case "plan":
			case "name":
				return "";
			case "toTop":
				return Math.floor(this.getVal("height") / 2);
		}
		throw ("No default value for DrawReference.getVal: " + name);
	}

	return function(type) {
		if (!(type in List)) {
	    	throw "Type not found: " + type;
		}

		// TODO: build not specified values... => build up an object

		let ref = List[type];

		return Object.freeze(Object.assign({ 
			type: type,
			availOptions: [],
			innerHeight: ref.height,
			getVal: getVal
		}, ref));
	};
})();
