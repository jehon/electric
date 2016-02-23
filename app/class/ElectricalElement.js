
import config from 'helpers/config';

export default class ElectricalElement {
  constructor(data) {
    this.data = data;
    if (!this.data.options) {
      this.data.options = {};
    }
  }

  setNames(short, long) {
    this.getReferenceShort = function() {
      return short;
    };
    this.getReferenceLong = function() {
      return long;
    };
  }

  get width() {
    return parseFloat(this.data.width);
  }

  get alignX() {
    return this.width / 2;
  }

  get height() {
    return parseFloat(this.data.height);
  }

  get next() {
    if (!this.data.next) {
      return [];
    }
    return this.data.next;
  }

  get alternate() {
    if (!this.data.alternate) {
      return [];
    }
    return this.data.alternate;
  }

  draw() {
    console.log('empty draw');
  }

  /*************************************************
  // Specific for POSITION
  /*************************************************/
  positionMustDrawOnPlan(plan) {
    if (!this.data.x || !this.data.y || !this.data.plan || this.data.plan != plan) {
      return false;
    }
    return true;
  }

  get positionX() {
    return this.data.x;
  }

  get positionY() {
    return this.data.y;
  }

  get positionOrientation() {
    return this.data.orientation;
  }

  /*************************************************
  // Specific for FILIAIRE
  /*************************************************/
  filiaireDraw() {
    return this.draw();
  }

  // Calculate the height of the element
  filiaireHeight() {
    return this.height;
  }

  // Calculate the width of the line
  filiaireWidth() {
    var ln = 0;
    if (this.data.next) {
      for(var i in this.data.next) {
        ln += this.data.next[i].filiaireWidth() + config.filiaire.spaceH;
      }
      // ln -= config.filiaire.spaceH;
    }
    var la = 0;
    if (this.data.alternate) {
      for(var i in this.data.alternate) {
        la += this.data.alternate[i].filiaireWidth() + config.filiaire.spaceH;
      }
    }

    return Math.max(this.width, ln) + la;
  }

  filiaireAlignX() {
    return this.alignX;
  }
}


export var OrthogonalFiliaireMixin = Base => class extends Base {
  filiaireDraw() {
    return (`
      <g>
        <line x1=0 y1=0 x2=0 y2=${this.filiaireHeight()} />
        <g transform='translate(0, ${this.filiaireHeight() / 2})'>
          <g transform='rotate(270)'>
            ${this.draw()}
          </g>
        </g>
      </g>
    `);
  }

  filiaireHeight() {
    return this.width;
  }

  filiaireWidth() {
    return super.filiaireWidth() + this.height - this.width;
    // return this.height;
  }

  filiaireAlignX() {
    return 0;
  }
};
