
import { Component } from '@angular/core';
import ElectricalGenericComponent from './electrical-generic.component';

@Component({
    selector: 'electrical-place-holder',
})
export class ElectricalPlaceHolderComponent extends ElectricalGenericComponent {
    constructor() {
        super({
            type: "PlaceHolder",
            label: "Place vide",
            width: 25,
            height: 25,
        })
    }
}
