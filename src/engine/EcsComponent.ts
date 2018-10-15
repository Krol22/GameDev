interface IData {
    [key: string]: any
};

export class EcsComponent {
    constructor(public type: string, public data: IData) {}
}
