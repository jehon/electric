
import ElectricalElement from 'class/ElectricalElement';

export default class ArrayElement extends ElectricalElement {
  constructor(data) {
    super(data);
    this.data     = data;
  }

  setPlace(previous, index) {
    this.previous = previous;
    this.index = index;
  }

  get width() {
    return 0;
  }

  get height() {
    return 0;
  }

  get name() {
    return 'aa';
  }

  get next() {
    return this.data.next;
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
    // return '<line x1="' + '" y1="' + '" x2="' + '" y2="' + '">';
  }

  get filiaireHeight() {
    // if (this.data.next) {
    // }
    return this.height;
  }

  get filiaireWidth() {
    // if (this.data.next) {
    // }
    return this.width;
  }

}
