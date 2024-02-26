
import { Component } from '@angular/core';
import ElectricalGenericComponent from './electrical-generic.component';

@Component({
    selector: 'electrical-outlet',
})
export class ElectricalOutletComponent extends ElectricalGenericComponent {
    constructor() {
        super({
            type: "Outlet",
            label: "Prise",
            width: 25,
            height: 25,
        })
    }
}
