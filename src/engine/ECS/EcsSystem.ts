import { EventAggregator } from '../EventAggregator';
import { EcsEntity } from './EcsEntity';

/*
    EcsSystem recives information about entities when is added to ECS.
*/

export abstract class EcsSystem {

    public id: string = '';
    private isActive: boolean = true;
    private systemEntities: Array<EcsEntity> = [];

    abstract tick(delta: number): void;

    constructor(
        private eventAggregator: EventAggregator,
        private componentTypes: Array<string>
        ) {

        this._subscribe();
    }

    setComponentTypes(componentTypes: Array<string>): void {
        this.componentTypes = componentTypes;
    }

    setIsActive(active: boolean): void {
        this.isActive = active;
        this.eventAggregator.publish(active ? 'onEnableSystem' : 'onDisableSystem', this.id);
    }

    getisActive(): boolean {
        return this.isActive;
    }

    setEntities(entities: Array<EcsEntity>): void {
        this.systemEntities = [];
        this.systemEntities = entities.filter(this._isEntityForSystem.bind(this));
    }

    private _isEntityForSystem(entity: EcsEntity): boolean {
        let isSystemEntity = this.componentTypes.every(componentType => {
            return entity.hasComponent(componentType);
        });

        if (!isSystemEntity) {
            return false;
        }

        let isAlreadyInSystem = this.systemEntities.some(systemEntity => entity.id === systemEntity.id);

        if (isAlreadyInSystem) {
            return false;
        }

        return true;
    }

    private _subscribe(): void {
        this.eventAggregator.subscribe('onCreateEntity', (entity: EcsEntity) => {
            if (this._isEntityForSystem(entity)) {
                this.systemEntities.push(entity);
            }
        });

        this.eventAggregator.subscribe('onRemoveEntity', (entityId: string) => {
            let entityIndex = this.systemEntities.findIndex((entity: EcsEntity) => {
                return entity.id === entityId;
            });

            this.systemEntities.splice(entityIndex, 1);
        });
    }

    // For testing
    public __getComponentTypes() { return this.componentTypes; }
    public __getSystemEntities() { return this.systemEntities; }
}
