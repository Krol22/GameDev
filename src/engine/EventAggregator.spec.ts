import { EventAggregator } from './EventAggregator';

describe('EventAggregator', () => {
    it('should be defined', () => {
        expect(EventAggregator).toBeDefined();
    });

    it('should subscribe for an event and call callback on publish', () => {
        const eventAggregator = new EventAggregator();
        const testingEvent = 'TestingEvent';
        const fakeArg = 1

        const spyobj = jasmine.createSpyObj('spyobj', ['fakeMethod']);

        eventAggregator.subscribe(testingEvent, spyobj.fakeMethod);
        eventAggregator.publish(testingEvent, fakeArg);

        expect(spyobj.fakeMethod).toHaveBeenCalledWith(fakeArg);
    });
});
