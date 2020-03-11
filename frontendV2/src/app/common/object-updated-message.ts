export class ObjectUpdatedMessage {
    constructor(public type: { new (...args: any[]) }, public object: {}) { }
}
