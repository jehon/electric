
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import GenericElectricalComponent from '../elements/electrical-generic';
import { ElectricalOutlet } from '../elements/electrical-outlet';
import { ElectricalPlaceHolder } from '../elements/electrical-place-holder';

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
        new ElectricalPlaceHolder(),
        new ElectricalOutlet()
    ];

    ngOnInit(): void {

    }
}
