
import ElectricalElement  from 'class/ElectricalElement';
import CaseElement        from 'class/CaseElement';

export class P extends ElectricalElement {
  constructor(data) {
    super(Object.assign({}, data, {
      width       : 25,
      height      : 20,
      innerHeight : 15,
      name        : 'Prise'
    }));
  }

  draw() {
    return '<path d="M0,0 L0,10 m-7.5,0 l15,0 m-20,7.5 l5,0 a7.5 7.5 0 0 1 15 0 l5,0" />';
  }
}

export class Disj extends CaseElement {
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
