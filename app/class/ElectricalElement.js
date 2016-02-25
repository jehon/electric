
import config from 'helpers/config';

export default class ElectricalElement {
  constructor(data) {
    this.internal = {
      filiaire: {
        x: [],
        width: 0,
        height: 0
      }
    };

    this.data = data;
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
    return this.data.next;
  }

  get alternate() {
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

  filiaireWidth() {
    return this.width;
  }

  array2XPosition(cacheName, array, i) {
    // Initialize the cache if necessary
    if (!this.internal.filiaire.x[cacheName]) {
      this.internal.filiaire.x[cacheName] = [];
    }
    // Cap it to the latest one...
    if (i > array.length || i === null) {
      i = array.length;
    }
    if (i < 0) {
      i = 0;
    }
    if (this.internal.filiaire.x[cacheName][i]) {
      return this.internal.filiaire.x[cacheName][i];
    }
    // Default response:
    if (i == 0) {
      // Let's start at left border
      this.internal.filiaire.x[cacheName][i] = 0;
    } else {
      this.internal.filiaire.x[cacheName][i] = this.array2XPosition(cacheName, array, i - 1)  // Take previous one starting point
        + array[i - 1].filiaireHierarchicalWidth()                                            // and its width
        + (i == array.length ? 0 : config.filiaire.spaceH);                                                             // add border
    }
    return this.internal.filiaire.x[cacheName][i];
  }


  fililaireRelativePositionX4Next(i = null) {
    return this.array2XPosition('next', this.data.next, i);
  }

  fililaireRelativePositionX4Alternate(i = null) {
    return this.array2XPosition('alternate', this.data.alternate, i);
  }

  // Calculate the width of the line
  filiaireHierarchicalWidth() {
    return Math.max(
        this.filiaireWidth(),
        this.fililaireRelativePositionX4Next()
      )
      + (this.alternate.length > 0
        ? (config.filiaire.spaceH + this.fililaireRelativePositionX4Alternate())
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
    return this.height + this.filiaireAlignX();
  }

  filiaireAlignX() {
    return 0;
  }
};
