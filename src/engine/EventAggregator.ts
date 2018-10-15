export class EventAggregator {
    private topics: Object;

    constructor() {
        this.topics = { };
    }

    publish(eventName: string, ...args: any) {
        if (!this.topics[eventName]) {
            return;
        }

        this.topics[eventName].forEach((callback: Function) => {
            callback(...args);
        });
    }

    subscribe(eventName: string, callback: Function) {
        if (!this.topics[eventName]) {
            this.topics[eventName] = [];
        }

        this.topics[eventName].push(callback);
    }
}
