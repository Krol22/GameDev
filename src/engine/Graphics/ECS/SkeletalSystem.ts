import { EcsSystem, EcsComponent } from '../../ECS';
import { ANIMATION_STATES } from '../';

/*
    skeleton: {
        joinPoints [
            {
                id: 1,
                position: vector2d()
            },
            {
                id: 2,
                position: vector2d()
            }
        ]
        bones: [
            {
                id: 1,
                joinPoints: [1, 2],
                texture: {
                    sprite: {
                        image,
                        frameWidth,
                        frameHeight,
                        frames
                    }
                }
            }
        ],
        animations: [
            {
                name: String
                steps: [
                    [
                        {
                            boneId: 1,
                            fromFrame: 4,
                            toFrame: 8,
                            frameRate: 10
                        }
                    ]
                ]
            }
        ]
    }
 */

export class SkeletalSystem extends EcsSystem {

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
        });
    }

}

export const AnimationHelper = {
    update: (animationData: any) => {
        animationData.step += 1;
        animationData.currentFrame = Math.floor(animationData.step / animationData.frameRate) + 1;

        if (animationData.step >= animationData.frameRate * animationData.numberOfFrames) {
            animationData.step = 0;
            animationData.currentFrame = animationData.from;
        }

        if (animationData.currentFrame + animationData.from >= animationData.to) {
            animationData.state = ANIMATION_STATES.IDLE;
        }
    }
}

export class AnimationSystem extends EcsSystem {

    /*
    Handles animations normal static or bone texture animations.

    AnimationComponent
    {
        state: ANIMATION_STATES,
        step: number,
        from: number,
        to: number,
        frameRate: number,
        currentFrame: number,
    }
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let animationComponent = entity.getComponent('animation');

            if (animationComponent.data.state === ANIMATION_STATES.IDLE) {
                return;
            }

            AnimationHelper.update(animationComponent.data);
        });
    }

}

export class DrawSystem extends EcsSystem {

    /*
        Handles drawing for static elements and animated elements.
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let isAnimatedEntity = entity.hasComponent('animation');
            // let isSpriteEntity = entity.hasComponent('sprite');

            if (isAnimatedEntity) {
                let animationComponent = entity.getComponent('animation');


            }
        });
    }

}
