import { EcsSystem, EcsComponent } from '../../ECS';
import { ANIMATION_STATES, GraphicsManager } from '../';
import { Vector2d } from '../../Math';
import { AnimationHelper } from './AnimationHelper';
import { SpriteHelper } from './SpriteHelper';

import { ISkeletonComponent, IJoinPoint, ISkeletonAnimation, ISkeletonAnimationStep, IBone } from './Components';

export const SkeletalAnimationHelper = {
    rotate(angle: number, rotatePoint: IJoinPoint, aroundPoint: IJoinPoint, skeleton: ISkeletonComponent) {
        let parentPosition = aroundPoint.position;
        let childPosition = rotatePoint.position;

        let r = Vector2d.magnitude(parentPosition, childPosition);
        let oldPosition = new Vector2d(childPosition.x, childPosition.y);

        childPosition.x = parentPosition.x + r * Math.cos(angle);
        childPosition.y = parentPosition.y + r * Math.sin(angle);

        if (!rotatePoint.childJoinPoints) {
            return;
        }

        rotatePoint.childJoinPoints.forEach((childJoinPointId: number) => {
            let childJoinPoint = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === childJoinPointId);
            let oxVector = new Vector2d(parentPosition.x + 500, parentPosition.y);

            let alphaPrime = Vector2d.findAngle(childPosition, parentPosition, oxVector);
            let alpha = Vector2d.findAngle(oldPosition, parentPosition, oxVector);
            let beta = Vector2d.findAngle(childJoinPoint.position, parentPosition, oxVector);

            let gamma = alpha - beta;
            let betaPrime = alphaPrime - gamma;

            betaPrime = -betaPrime;
            this.rotate(betaPrime, childJoinPoint, aroundPoint, skeleton);
        });
    }
}

export class SkeletalSystem extends EcsSystem {
    /*
        Handles ISkeletonComponent
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let skeleton: ISkeletonComponent = entity.getComponent('skeleton').data;

            skeleton.joinPoints.forEach((joinPoint: IJoinPoint) => {
                GraphicsManager.drawRectangle(joinPoint.position.x, joinPoint.position.y, 10, 10);
            });

            skeleton.bones.forEach((bone: IBone) => {
                if (bone.texture) {
                    let texture = bone.texture;
                    let parentJoinPoint = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.parentJoinPointId);
                    let spriteFragmentVector = SpriteHelper.getFrame(texture.sprite, texture.currentFrame);
                    GraphicsManager.drawFragment(
                        texture.sprite.source,
                        parentJoinPoint.position.x + texture.offsetX,
                        parentJoinPoint.position.y + texture.offsetY,
                        texture.sprite.frameWidth,
                        texture.sprite.frameHeight,
                        spriteFragmentVector.x,
                        spriteFragmentVector.y,
                        texture.sprite.frameWidth,
                        texture.sprite.frameHeight,
                    );
                }
            });

            skeleton.animations.forEach((animation: ISkeletonAnimation) => {
                if (animation.state === ANIMATION_STATES.IDLE) {
                    return;
                }

                let numberOfSteps = animation.steps.length;
                let animationSteps = animation.steps[animation.stepIndex];

                animationSteps.forEach((animation: ISkeletonAnimationStep) => {
                    AnimationHelper.update(animation);
                    let bone: IBone = skeleton.bones.find((bone: IBone) => bone.id === animation.boneId);
                    bone.texture.currentFrame = animation.from + animation.currentFrame;
                });

                let stepDone = animationSteps.every((animation: ISkeletonAnimationStep) => {
                    return animation.state === ANIMATION_STATES.IDLE;
                });

                if (stepDone) {
                    animation.stepIndex += 1;
                }

                if (animation.stepIndex === numberOfSteps) {
                    animation.state = ANIMATION_STATES.IDLE;
                    animation.stepIndex = 0;
                }
            });
        });
    }

}
