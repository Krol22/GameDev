import { ANIMATION_STATES } from '../';
import { AnimationHelper } from './AnimationHelper';
import { EcsSystem } from '../../ECS';

import { IAnimationComponent } from './Components/IAnimationComponent';

export class StaticAnimationSystem extends EcsSystem {

    /*
    Handles animations normal static or bone texture animations.
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let animation: IAnimationComponent = entity.getComponent('animation').data;

            if (animation.state === ANIMATION_STATES.IDLE) {
                return;
            }

            AnimationHelper.update(animation);
        });
    }

}

