import { EcsSystem } from './EcsSystem';
import { EventAggregator } from './EventAggregator';
import { EcsEntity } from './EcsEntity';
import { EcsComponent } from './EcsComponent';

class TestSystem extends EcsSystem {
    tick () { }
}

const fakeComponent1 = new EcsComponent('test', {});
const fakeComponent2 = new EcsComponent('test_type', {});
const fakeComponent3 = new EcsComponent('test_invalid_type', {});

const fakeEntitiy1 = new EcsEntity([fakeComponent1, fakeComponent2]);
const fakeEntitiy2 = new EcsEntity([fakeComponent2, fakeComponent3]);
const fakeEntitiy3 = new EcsEntity([fakeComponent1, fakeComponent3]);
const fakeEntitiy4 = new EcsEntity([fakeComponent1]);

const fakeEntities = [
    fakeEntitiy1,
    fakeEntitiy2,
    fakeEntitiy3,
    fakeEntitiy4,
];

describe('EcsSystem', () => {
    it('should be defined', () => {
        expect(EcsSystem).toBeDefined();
    });

    describe('Instance', () => {
        let eventAggregator: EventAggregator = new EventAggregator();
        let testInstance: TestSystem;

        beforeAll(() => {
            eventAggregator = new EventAggregator();
            spyOn(eventAggregator, 'publish');
        });

        describe('setEntities', () => {
            it('should get only entities that components are type test and test_type', () => {
                testInstance = new TestSystem(eventAggregator, ['test', 'test_type']);
                testInstance.setEntities(fakeEntities);

                expect(testInstance.__getSystemEntities()).toContain(fakeEntitiy1);
            });
        });

        describe('setActive', () => {
            it('should publish onEnableSystem event when isActive is changed to true', () => {
                testInstance = new TestSystem(eventAggregator, []);
                testInstance.setIsActive(true);

                expect(eventAggregator.publish).toHaveBeenCalledWith('onEnableSystem', jasmine.any(String));
            });

            it('should publish onDisableSystem event when isActive is changed to false', () => {
                testInstance = new TestSystem(eventAggregator, []);
                testInstance.setIsActive(false);

                expect(eventAggregator.publish).toHaveBeenCalledWith('onDisableSystem', jasmine.any(String));
            });
        });

        describe('events', () => {
            let eventCallbacks: Object;

            beforeEach(() => {
                eventCallbacks = {};
                spyOn(eventAggregator, 'subscribe').and.callFake((eventName: string, eventCallback: Function) => {
                    eventCallbacks[eventName] = eventCallback;
                });
            });

            it('should push entity if is valid on onCreateEntity event', () => {
                let eventName = 'onCreateEntity';
                testInstance = new TestSystem(eventAggregator, ['test']);

                eventCallbacks[eventName](fakeEntitiy4);
                eventCallbacks[eventName](fakeEntitiy3);

                expect(testInstance.__getSystemEntities()).toContain(fakeEntitiy4);
                expect(testInstance.__getSystemEntities()).not.toContain(fakeEntitiy3);
            });

            it('should remove entity from systemEntities on onRemoveEntity event', () => {
                let eventName = 'onRemoveEntity';
                testInstance = new TestSystem(eventAggregator, ['test', 'test_type']);

                eventCallbacks['onCreateEntity'](fakeEntitiy1);
                expect(testInstance.__getSystemEntities()).toContain(fakeEntitiy1);

                eventCallbacks['onRemoveEntity'](fakeEntitiy1.id);
                expect(testInstance.__getSystemEntities().length).toBe(0);
            });
        });
    });
});
