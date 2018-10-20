import { EventAggregator } from '../EventAggregator';
import { EcsEntity } from './EcsEntity';
import { EcsSystem } from './EcsSystem';

export class ECS {
    private isRunning: boolean = false;

    private entities: Array<EcsEntity> = [];
    private systems: Array<EcsSystem> = [];
    private inactiveSystems: Array<EcsSystem> = [];

    private afterUpdateEvents: Array<Function> = [];

    private componentTypes: Array<string> = [];

    constructor(private eventAggregator: EventAggregator) {
        this.componentTypes = [];

        this._subscribe();
    }

    update (delta: number) {
        this.isRunning = true;
        this.systems.forEach((system) => {
            system.tick(delta);
        });
        this._afterSystemsUpdate();
    }

    addEntity(newEntity: EcsEntity) {
        newEntity.id = this._nextId();
        this._runOrPushToAfterUpdateStack(this._addEntity, newEntity);

        return newEntity.id;
    }

    removeEntity(entityId: string) {
        this._runOrPushToAfterUpdateStack(this._removeEntity, entityId);
    }

    addSystem(newSystem: EcsSystem) {
        newSystem.id = this._nextId();
        this._runOrPushToAfterUpdateStack(this._addSystem, newSystem);

        return newSystem.id;
    }

    removeSystem(systemId: string) {
        this._runOrPushToAfterUpdateStack(this._removeSystem, systemId);
    }

    // importStateFromJSON() { }
    // exportStateToJSON() { }

    private _runOrPushToAfterUpdateStack(callback: Function, ...args: any[]) {
        callback = callback.bind(this);
        if (!this.isRunning) {
            callback(...args);
        } else {
            this.afterUpdateEvents.push(() => callback(...args));
        }
    }

    private _addSystem(newSystem: EcsSystem) {
        this.systems.push(newSystem);
    }

    private _removeSystem(systemId: string) {
        let systemIndex = this.systems.findIndex((system: EcsSystem) => systemId === system.id);

        if (!systemIndex) {
            systemIndex = this.inactiveSystems.findIndex((system: EcsSystem) => systemId === system.id);
        }

        this.systems.splice(systemIndex, 1);
    }

    private _addEntity(newEntity: EcsEntity) {
        this.entities.push(newEntity);
        this.eventAggregator.publish('onCreateEntity', newEntity);
    }

    private _removeEntity(entityId: string) {
        let entityIndex = this.entities.findIndex((entity) => {
            return entity.id === entityId;
        });

        this.entities.splice(entityIndex, 1);
        this.eventAggregator.publish('onRemoveEntity', entityId);
    }

    private _afterSystemsUpdate () {
        this.afterUpdateEvents.forEach((callback) => {
            callback();
        });

        this.afterUpdateEvents = [];
    }

    private _nextId () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private _subscribe ( ) {
        this.eventAggregator.subscribe('onDisableSystem', (systemId: string) => {
            this._runOrPushToAfterUpdateStack(() => {
                let systemIndex = this.systems.findIndex((system: EcsSystem) => {
                    return system.id === systemId;
                });

                this.inactiveSystems.push(this.systems[systemIndex]);
                this.systems.splice(systemIndex, 1);
            });
        });

        this.eventAggregator.subscribe('onEnableSystem', (systemId: string) => {
            this._runOrPushToAfterUpdateStack(() => {
                let systemIndex = this.inactiveSystems.findIndex((system: EcsSystem) => {
                    return system.id === systemId;
                });

                this.systems.push(this.inactiveSystems[systemIndex]);
                this.inactiveSystems.splice(systemIndex, 1);
            });
        });
    }

    public __getEntities (): EcsEntity[] { return this.entities; }
    public __getSystems (): EcsSystem[] { return this.systems; }
    public __getInactiveSystems (): EcsSystem[] { return this.inactiveSystems; }
}
