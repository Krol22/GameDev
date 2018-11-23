import { ANIMATION_STATES } from '../';
import { AnimationHelper, Animation } from '../';
import { EcsSystem } from '../../ECS';

export class StaticAnimationSystem extends EcsSystem {

    /*
    Handles animations normal static or bone texture animations.
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let animation: Animation = entity.getComponent('animation').data;

            if (animation.state === ANIMATION_STATES.IDLE) {
                return;
            }

            AnimationHelper.update(animation);
        });
    }

}

