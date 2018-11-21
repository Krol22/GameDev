import { EcsSystem, EcsComponent } from '../../ECS';
import { Vector2d } from '../../Math';

import {
    AnimationHelper,
    SpriteHelper,
    ANIMATION_STATES,
    GraphicsManager,
    ISkeletonComponent,
    IJoinPoint,
    ISkeletonAnimation,
    IBone,
    AngleAnimationComponent,
    BoneTextureAnimationComponent,
    ANIMATION_TYPES,
    Animation
} from '../';

export const SkeletalAnimationHelper = {
    update(animation: AngleAnimationComponent) {
        if (animation.state === ANIMATION_STATES.IDLE) {
            return;
        }

        if (animation.step >= 0 && animation.currentAngle > animation.to) {
            animation.state = ANIMATION_STATES.IDLE;
            return;
        } else if (animation.step < 0 && animation.currentAngle < animation.to) {
            animation.state = ANIMATION_STATES.IDLE;
            return;
        }

        animation.currentAngle += animation.step;
    },
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

            // Skeleton debbuging,

            if (skeleton.debug) {
                skeleton.joinPoints.forEach((joinPoint: IJoinPoint) => {
                    GraphicsManager.drawRectangle(joinPoint.position.x, joinPoint.position.y, 4, 4);
                });

                skeleton.bones.forEach((bone: IBone) => {
                    let startPoint: Vector2d = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.parentJoinPointId).position;
                    let endPoint: Vector2d = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.childJoinPointId).position;

                    GraphicsManager.drawLine(startPoint.x + 2, startPoint.y + 2, endPoint.x + 2, endPoint.y + 2);
                });
            }

            // Skeleton texture drawing TODO: move to draw system!

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

            if (!skeleton.animations) {
                return;
            }

            skeleton.animations.forEach((animation: ISkeletonAnimation) => {
                if (animation.state === ANIMATION_STATES.IDLE) {
                    return;
                }

                let numberOfSteps = animation.steps.length;
                let animationSteps = animation.steps[animation.stepIndex];

                animationSteps.forEach((animation: any) => {
                    if (animation.type === ANIMATION_TYPES.ANGLE) {
                        animation = <AngleAnimationComponent> animation;

                        SkeletalAnimationHelper.update(animation);
                        let angle = animation.currentAngle * (Math.PI / 180);

                        let bone = skeleton.bones.find((bone: IBone) => bone.id === animation.boneId);
                        let aroundPoint = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.parentJoinPointId);
                        let rotatePoint = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.childJoinPointId);

                        SkeletalAnimationHelper.rotate(angle, rotatePoint, aroundPoint, skeleton);

                    } else if (animation.type === ANIMATION_TYPES.TEXTURE) {
                        animation = <BoneTextureAnimationComponent> animation;

                        AnimationHelper.update(animation);
                        let bone: IBone = skeleton.bones.find((bone: IBone) => bone.id === animation.boneId);
                        bone.texture.currentFrame = animation.from + animation.currentFrame;
                    }
                });

                let stepDone = animationSteps.every((animation: Animation) => {
                    return animation.state === ANIMATION_STATES.IDLE;
                });

                if (stepDone) {
                    animationSteps.forEach((animation: any) => {
                        if (animation.type === ANIMATION_TYPES.ANGLE) {
                            animation.currentAngle = animation.from;
                        } else if (animation.type === ANIMATION_TYPES.TEXTURE) {
                            animation.currentFrame = animation.from;
                        }
                        animation.state = ANIMATION_STATES.IDLE;
                    });

                    animation.stepIndex += 1;
                    if (animation.stepIndex === numberOfSteps) {
                        animation.state = ANIMATION_STATES.IDLE;
                        animation.stepIndex = 0;

                        if (animation.loop) {
                            animation.state = ANIMATION_STATES.PLAYING;
                            animation.steps[animation.stepIndex].forEach((animation: Animation) => {
                                animation.state = ANIMATION_STATES.PLAYING;
                            });
                        }
                    } else {
                        animation.steps[animation.stepIndex].forEach((animation: Animation) => {
                            animation.state = ANIMATION_STATES.PLAYING;
                        });
                    }
                }
            });
        });
    }

}
