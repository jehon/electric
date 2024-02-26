
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import GenericElectricalComponent from './elements/electrical-generic.component';
import { ElectricalOutletComponent } from './elements/electrical-outlet.component';
import { ElectricalPlaceHolderComponent } from './elements/electrical-place-holder.component';

@Component({
    standalone: true,
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.css'],
    imports: [
        NgFor
    ]
})
export class LegendComponent implements OnInit {
    elements: GenericElectricalComponent[] = [
        new ElectricalPlaceHolderComponent(),
        new ElectricalOutletComponent()
    ];

    ngOnInit(): void {

    }
}
