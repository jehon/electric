
export default class ElectricalGeneric {
    #props;

    constructor(props: {
        type: string,
        label?: string,
        height: number,
        innerHeight?: number
        width: number,
    }) {
        Object.freeze(props);
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

    get innerHeight(): number {
        return this.#props.innerHeight ?? this.#props.height;
    }
}
