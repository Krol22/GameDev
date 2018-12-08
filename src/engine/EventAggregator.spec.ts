import { EventAggregator } from './EventAggregator';

describe('EventAggregator', () => {
    it('should be defined', () => {
        expect(EventAggregator).toBeDefined();
    });

    it('should subscribe for an event and call callback on publish', () => {
        const testingEvent = 'TestingEvent';
        const fakeArg = 1

        const spyobj = jasmine.createSpyObj('spyobj', ['fakeMethod']);

        EventAggregator.subscribe(testingEvent, spyobj.fakeMethod);
        EventAggregator.publish(testingEvent, fakeArg);

        expect(spyobj.fakeMethod).toHaveBeenCalledWith(fakeArg);
    });
});
