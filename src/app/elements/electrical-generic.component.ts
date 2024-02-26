
export default class ElectricalGenericComponent {
    #props;

    constructor(props: {
        type: string,
        label?: string,
        height: number,
        width: number,
        draw?: string
    }) {
        this.#props = props
    }

    get type(): string {
        return this.#props.type;
    }

    get label(): string {
        return this.#props.label ?? this.#props.type;
    }

    get width(): number {
        return this.#props.width;
    }

    get height(): number {
        return this.#props.height;
    }

    get draw(): string {
        return this.#props.draw ?? '';
    }
}
