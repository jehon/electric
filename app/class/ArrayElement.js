
import ElectricalElement from 'class/ElectricalElement';
import config            from 'helpers/config';
import ElementFiliaire   from 'components/ElementFiliaire';
import ElementPosition   from 'components/ElementPosition';


export default class ArrayElement extends ElectricalElement {
  setPlace(previous, index) {
    this.previous = previous;
    this.index = index;
  }

  get width() {
    return 100;
  }

  get height() {
    return config.filiaire.marginV;
  }

  get name() {
    return 'aa';
  }

  get next() {
    return false;
  }

  draw() {
    console.log('draw all', this.data);
    for(let i of this.data) {
      console.log('draw array: ', i , '->', this.data[i]);
    }
  }

  /*************************************************
  // Specific for POSITION
  /*************************************************/
  positionMustDrawOnPlan() {
    return false;
  }

  /*************************************************
  // Specific for FILIAIRE
  /*************************************************/
  filiaireDraw() {
    return `
      <line x1=0 y1=0 x2=${100} y2=0>
    `;
  }
}
