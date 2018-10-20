import { EcsEntity } from './EcsEntity';
import { EcsComponent } from './EcsComponent';

describe('EcsEntity', () => {
    const fakeComponents = [
        new EcsComponent('component1', { x: 1, y: 2 }),
        new EcsComponent('component2', { y: 2, z: 3 }),
    ];

    it('should be defined', () => {
        expect(EcsEntity).toBeDefined();
    });

    describe('hasComponent', () => {
        it('should return true if entity has component with provided type', () => {
            let ecsEntity = new EcsEntity(fakeComponents);

            expect(ecsEntity.hasComponent('component1')).toBe(true);
        });

        it('should return false if entity doesn\'t have component with provided type', () => {
            let ecsEntity = new EcsEntity(fakeComponents);

            expect(ecsEntity.hasComponent('component3')).toBe(false);
        });
    });

    describe('getComponent', () => {
        it('should return component from entity', () => {
            let ecsEntity = new EcsEntity(fakeComponents);

            expect(Object.assign({}, ecsEntity.getComponent('component1'))).toEqual({
                type: 'component1',
                data: {
                    x: 1,
                    y: 2
                }
            });
        });

        it('should throw an error when entity doesn\'t have component', () => {
            let ecsEntity = new EcsEntity(fakeComponents);

            expect(() => { ecsEntity.getComponent('no-component'); }).toThrowError('Entity with id:  doesn\'t have component: no-component');
        });
    });
});

