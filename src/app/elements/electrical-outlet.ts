
import ElectricalGeneric from './electrical-generic';

export class ElectricalOutlet extends ElectricalGeneric {
    constructor() {
        super({
            type: "P",
            label: "Prise",
            width: 20,
            height: 25,
            innerHeight: 15
        })
    }
}
