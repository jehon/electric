
import ElectricalElement           from 'class/ElectricalElement';
import { OrthogonalFiliaireMixin } from 'class/ElectricalElement';

/*
  draw() -> draw a component, starting point being the line itself
    this, draw() will be naturally centered
*/

export class P extends OrthogonalFiliaireMixin(ElectricalElement) {
  constructor(data) {
    super(Object.assign({}, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Prise'
    }, data));
  }

  draw() {
    return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
  }
}

export class L extends ElectricalElement {
  constructor(data) {
    super(Object.assign({}, {
      width       : 20,
      height      : 20,
      innerHeight : 10,
      name        : 'Light'
    }, data));
  }

  draw() {
    return '<path d="M0,10 l5,5 l-10,-10 l5,5 l5,-5 l-10,10" />';
  }
}

export class Neon extends L {
  constructor(data) {
    super(Object.assign({}, {
      width       : 10,
      height      : 35,
      name        : 'Neon'
    }, data));
  }

  draw() {
    return '<path d="M0,5 l5,0 l-10,0 m5,0 l0,30 l5,0 l-10,0" />';
  }
}

export class S extends P {
  constructor(data) {
    super(Object.assign({}, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Interrupteur'
    }, data));
  }

  draw() {
    // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
    return '<path d="M0,0 L0,10 l8,8 l4,-4 m-4,4'
      + (this.data.options.bipol ? 'm -2,-2 l4,-4 m-4,4 m2,2' : '')
      + (this.data.options.bidir ? 'm-8,-8 l-8,-8' : '')
      + (this.data.options.light ? '' : '') // TODO: add light
      + '" /><circle cx=0 cy=10 r=3 fill="white" />';
  }
}

export class Disj extends ElectricalElement {
  constructor(data) {
    super(Object.assign({}, data, {
      width       : '20',
      height      : '60',
      name        : 'Disjoncteur'
    }));
  }

  draw() {
    return '<path d="M0,0 l0,10 l10,35 m-10,0 l0,15"/>';
  }
}

export class Diff extends Disj {
  constructor(data) {
    super(Object.assign({}, data, {
      name        : 'Differentiel'
    }));
  }
}

/* *********** TODO ************************/
export class Heater extends OrthogonalFiliaireMixin(ElectricalElement) {
  constructor(data) {
    super(Object.assign({}, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Prise'
    }, data));
  }

  draw() {
    return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
  }
}


/* *********** TODO ************************/
export class Boiler extends OrthogonalFiliaireMixin(ElectricalElement) {
  constructor(data) {
    super(Object.assign({}, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Prise'
    }, data));
  }

  draw() {
    return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
  }
}

/* *********** TODO ************************/
export class CookingPlates extends OrthogonalFiliaireMixin(ElectricalElement) {
  constructor(data) {
    super(Object.assign({}, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Prise'
    }, data));
  }

  draw() {
    return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
  }
}
