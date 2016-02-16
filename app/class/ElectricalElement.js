
import React              from 'react';

export default class ElectricalElement {
  constructor(data) {
    this.data                = data;
    this.structuredReference = null;
  }

  setPrevious(previous) {
    this.previous = previous;
    if (this.data.reference) {
      // We have a specific reference
      this.structuredReference = {
        base:  this.data.reference,
        index: 0
      };
    } else {
      if (previous) {
        // We have a previous, let's have a look at it
        this.structuredReference = Object.assign({}, previous.structuredReference);
        this.structuredReference.index++;
      } else {
        // We don't have a previous, let's build a default one
        this.structuredReference = {
          base: 'main',
          index: 0
        };
      }
    }
  }

  getReference() {
    if (this.structuredReference.index == 0) {
      return this.structuredReference.base;
    } else {
      return this.structuredReference.base + '.' + this.structuredReference.index;
    }
    // return 'mymname';
  }

  get width() {
    return parseFloat(this.data.width);
  }

  get align() {
    return this.width / 2;
  }

  get height() {
    return parseFloat(this.data.height);
  }

  get next() {
    return this.data.next;
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
    console.log(this);
    return this.draw();
  }

  filiaireHeight() {
    return this.height;
  }

  filiaireWidth() {
    return this.width;
  }

}
