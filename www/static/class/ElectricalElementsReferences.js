
/*
  draw() -> draw a component, starting point being the line itself
    this, draw() will be naturally centered
*/

// class PlaceHolder extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 25,
//       height      : 25,
//       name        : 'Place vide'
//     }, data));
//   }

//   draw() {
//     return '';
//   }
// }

// class P extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 25,
//       height      : 20,
//       innerHeight : 15,
//       name        : 'Prise'
//     }, data));
//   }

//   draw() {
//     return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
//   }
// }

// class L extends ElectricalElement {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 20,
//       height      : 20,
//       innerHeight : 10,
//       name        : 'Light'
//     }, data));
//   }

//   draw() {
//     return '<path d="M0,10 l5,5 l-10,-10 l5,5 l5,-5 l-10,10" />';
//   }
// }

// class Neon extends L {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 10,
//       height      : 35,
//       name        : 'Neon'
//     }, data));
//   }

//   draw() {
//     return '<path d="M0,5 l5,0 l-10,0 m5,0 l0,30 l5,0 l-10,0" />';
//   }
// }

// class S extends P {
//   constructor(data) {
//     super(Object.assign({}, {
//       width        : 25,
//       height       : 20,
//       innerHeight  : 15,
//       name         : 'Interrupteur',
//       availOptions : [ 'bipol', 'bidir', 'variator', 'light' ]
//     }, data));
//   }

//   draw() {
//     // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
//     return '<path d="M0,0 L0,10 l8,8 l4,-4 m-4,4'
//       + (this.data.options.bipol ? 'm -2,-2 l4,-4 m-4,4 m2,2 ' : '')
//       + (this.data.options.bidir ? 'M0,8 l-8,-8 l-4,4 ' : '')
//       + (this.data.options.inverter ? 'M0,8 l-8,-8 l-4,4 M0,8 l8,-8 l4,4 M0,8 l-8,8 l-4,-4 ' : '')
//       + (this.data.options.variator ? 'M-6,15 l12,0 l0,4 l-12,-4 ' : '')
//       + '" />'
//       + '<circle cx=0 cy=10 r=3 fill="white" />'
//       + (this.data.options.light ? '<path d="M0,10 l2,2 M0,10 l2,-2 M0,10 l-2,2 M0,10 l-2,-2" />' : '')
//       ;
//   }
// }

// class Disj extends ElectricalElement {
//   constructor(data) {
//     super(Object.assign({},{
//       width        : '20',
//       height       : '60',
//       name         : 'Disjoncteur',
//       availOptions : [ 'I', 'Isec' ]
//     }, data));
//   }

//   draw() {
//     return '<path d="M0,0 l0,10 l10,35 m-10,0 l0,15"/>'
//     + '<path d="M10,45 L14,43 L12.5,39 L9,41 z" fill="currentColor"/>'
//     + '<text x=10 y=20 font-family="Verdana" font-size="8" >'
//     + (this.data.options.I    ? 'I:' + this.data.options.I    + 'A '             : '' )
//     + (this.data.options.Isec ? '\u25B3' + this.data.options.Isec + 'mA ' : '' )
//     + '</text>'
//     ;
//   }
// }

// class Hotte extends P {
//   constructor(data) {
//     super(Object.assign({}, data, {
//       width       : '20',
//       height      : '20',
//       name        : 'Hotte'
//     }));
//   }

//   draw() {
//     return '<rect x=-10 y=0 width=20 height=20 />'
//       + '<circle cx=0 cy=6  r=4 />'
//       + '<circle cx=0 cy=14 r=4 />'
//       ;
//   }
// }

// class Heater extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 20,
//       height      : 20,
//       name        : 'Chauffage'
//     }, data));
//   }

//   draw() {
//     return '<rect x=-10 y=0 width=20 height=20 />'
//       + '<path d="M-10,0 l0,20 M-5,0 l0,20 M0,0 l0,20 M5,0 l0,20" />';
//   }
// }


// /* *********** TODO hachuré ********************/
// class Boiler extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 25,
//       height      : 20,
//       innerHeight : 15,
//       name        : 'Boiler'
//     }, data));
//   }

//   draw() {
//     return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
//   }
// }

// class CookingPlates extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, {
//       width       : 25,
//       height      : 20,
//       innerHeight : 15,
//       name        : 'Cuisinière'
//     }, data));
//   }

//   draw() {
//     return '<rect x=-10 y=0 width=20 height=20 />'
//       + '<circle cx=5  cy=15 r=2 fill="auto" />'
//       + '<circle cx=-5 cy=5  r=2 fill="auto" />'
//       + '<circle cx=-5 cy=15 r=2 fill="auto" />'
//       + '';
//   }
// }

// class KNX extends ElectricalElement {
//   constructor(data) {
//     super(Object.assign({}, data, {
//       width       : '20',
//       height      : '35',
//       name        : 'Relais KNX'
//     }));
//   }

//   draw() {
//     return '<rect x=-10 y=0 width=20 height=35 />'
//       + '<path d="M-5,5 l0,10 l10,0" />'
//       + '<path d="M-5,30 l0,-10 l10,0" />'
//       ;
//   }
// }

// class Bridge extends ElectricalElement {
//   constructor(data) {
//     super(Object.assign({}, data, {
//       width       : '1',
//       height      : '10',
//       name        : 'Bridge'
//     }));
//   }

//   draw() {
//     return '<path d="M0,0 l0,10"/>';
//   }
// }

// class Transfo extends OrthogonalFiliaireMixin(ElectricalElement) {
//   constructor(data) {
//     super(Object.assign({}, data, {
//       width       : '20',
//       height      : '20',
//       name        : 'Transformateur'
//     }));
//   }

//   draw() {
//     return '<line x1=0 x2=0 y1=0 y2=2 />'
//       + '<circle cx=0 cy=7 r=5 />'
//       + '<circle cx=0 cy=13 r=5 />'
//       + '<line x1=0 x2=0 y1=18 y2=20 />'
//       ;
//   }
// }

// class Label extends ElectricalElement {
//   constructor(data) {
//     super(Object.assign({}, data, {
//       width       : '20',
//       height      : '20',
//       name        : 'Label libre',
//       availOptions : 'text'
//     }));
//   }

//   draw() {
//     return '<text x="0" y="10" font-family="Verdana" font-size="6">' + this.data.options.text + '</text>';
//   }
// }
