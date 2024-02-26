
import { Component } from '@angular/core';
import ElectricalGeneric from './electrical-generic';

export class ElectricalPlaceHolder extends ElectricalGeneric {
    constructor() {
        super({
            type: "PlaceHolder",
            label: "Place vide",
            width: 25,
            height: 25,
        })
    }
}
