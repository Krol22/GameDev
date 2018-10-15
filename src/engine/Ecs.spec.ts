import { ECS } from './Ecs';
import { EcsSystem } from './EcsSystem';
import { EventAggregator } from './EventAggregator';
import { EcsEntity } from './EcsEntity';

class TestSystem extends EcsSystem {
    tick() {}
}

const eventAggregator = new EventAggregator();
const fakeSystem = new TestSystem(new EventAggregator(), []);
const fakeEntity = new EcsEntity([]);

describe('ECS', () => {
    it('should be defined', () => {
        expect(ECS).toBeDefined();
    });

    describe('when is running', () => {
        it('should add entities or systems to ECS after the update cycle is finished', () => {
            let testEcs = new ECS(eventAggregator);

            testEcs.update(0); // set ECS as running

            testEcs.addEntity(fakeEntity);
            testEcs.addSystem(fakeSystem);

            expect(testEcs.__getEntities().length).toBe(0);
            expect(testEcs.__getSystems().length).toBe(0);

            testEcs.update(0);

            expect(testEcs.__getEntities()).toContain(fakeEntity);
            expect(testEcs.__getSystems()).toContain(fakeSystem);
        });

        it('should remove entities or systems from ECS after the update cycle is finished', () => {
            let testEcs = new ECS(eventAggregator);

            let entityId = testEcs.addEntity(fakeEntity);
            let systemId = testEcs.addSystem(fakeSystem);

            expect(testEcs.__getEntities()).toContain(fakeEntity);
            expect(testEcs.__getSystems()).toContain(fakeSystem);

            testEcs.update(0); // set ECS as running

            testEcs.removeEntity(entityId);
            testEcs.removeSystem(systemId);

            expect(testEcs.__getEntities()).toContain(fakeEntity);
            expect(testEcs.__getSystems()).toContain(fakeSystem);

            testEcs.update(0);

            expect(testEcs.__getEntities().length).toBe(0);
            expect(testEcs.__getSystems().length).toBe(0);
        });
    });

    describe('when is not running', () => {
        it('should add entities or system to ECS immediately', () => {
            let testEcs = new ECS(eventAggregator);

            testEcs.addEntity(fakeEntity);
            testEcs.addSystem(fakeSystem);

            expect(testEcs.__getEntities()).toContain(fakeEntity);
            expect(testEcs.__getSystems()).toContain(fakeSystem);
        });

        it('should remove entities or system from ECS immediately', () => {
            let testEcs = new ECS(eventAggregator);

            let entityId = testEcs.addEntity(fakeEntity);
            let systemId = testEcs.addSystem(fakeSystem);

            expect(testEcs.__getEntities()).toContain(fakeEntity);
            expect(testEcs.__getSystems()).toContain(fakeSystem);

            testEcs.removeEntity(entityId);
            testEcs.removeSystem(systemId);

            expect(testEcs.__getEntities().length).toBe(0);
            expect(testEcs.__getSystems().length).toBe(0);
        });
    });

    describe('udpate', () => {
        it('should call tick function with delta for each system', () => {
            let testEcs = new ECS(eventAggregator);
            let fakeDelta = 123;

            let mockSystem1 = new TestSystem(eventAggregator, []);
            let mockSystem2 = new TestSystem(eventAggregator, []);

            spyOn(mockSystem1, 'tick');
            spyOn(mockSystem2, 'tick');

            testEcs.addSystem(mockSystem1);
            testEcs.addSystem(mockSystem2);

            testEcs.update(fakeDelta);

            expect(mockSystem1.tick).toHaveBeenCalledWith(fakeDelta);
            expect(mockSystem2.tick).toHaveBeenCalledWith(fakeDelta);
        });
    });

    describe('events', () => {
        it('should remove system from active and push to inactiveSystems on onDisableSystem event', () => {

        });

        it('should system from inactiveSystems and push to systems on onEnableSystem event', () => {

        });
    });
});
