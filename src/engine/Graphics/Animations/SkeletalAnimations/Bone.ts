import { JoinPoint, BoneTexture } from './';
import { Animation } from '../Animation';

import { GraphicsManager } from '../../GraphicsManager';
import { Sprite } from '../../Sprite';

export class Bone {
    private animations = {};
    private currentAnimation: string;

    constructor (
        public parentJoinPoint: JoinPoint,
        public childJoinPoint: JoinPoint,
        public texture: BoneTexture
    ) {
        parentJoinPoint.addChildJoinPoint(childJoinPoint);
        childJoinPoint.parentJoinPoint = parentJoinPoint;
    }

    draw(graphicsManager: GraphicsManager) {
        if (false) {
            this.parentJoinPoint.draw(graphicsManager);
            this.childJoinPoint.draw(graphicsManager);
            this.debug(graphicsManager);
        }

        if (this.texture) {
            if (!this.currentAnimation) {
                this.texture.draw(this.childJoinPoint.position, graphicsManager, 0);
            } else {
                let frame = this.animations[this.currentAnimation].getFrame();
                graphicsManager.drawFragment(
                    frame.source,
                    this.childJoinPoint.position.x + this.texture.offsetX - (frame.dw / 2),
                    this.childJoinPoint.position.y + this.texture.offsetY - (frame.dh / 2),
                    frame.dw,
                    frame.dh,
                    frame.dx,
                    frame.dy,
                    frame.dw,
                    frame.dh
                );
            }

        }
    }

    setAngle(angle: number) {
        angle = -angle * Math.PI / 180;
        this.childJoinPoint.rotate(angle, this.parentJoinPoint.position);
    }

    debug(graphicsManager: GraphicsManager) {
        graphicsManager.drawLine(
            this.parentJoinPoint.position.x,
            this.parentJoinPoint.position.y,
            this.childJoinPoint.position.x,
            this.childJoinPoint.position.y
        );
    }

    update() {
        this.parentJoinPoint.update();
        this.childJoinPoint.update();

        if (this.currentAnimation) {
            this.animations[this.currentAnimation].update();
        }
    }

    play(name: string) {
        this.currentAnimation = name;
        this.animations[this.currentAnimation].play();
    }

    stop(name: string) {
        if (!this.animations[this.currentAnimation]) return;
        this.animations[this.currentAnimation].restart();
        this.currentAnimation = null;
    }

    addAnimation(name: string, animation: Animation) {
        this.animations[name] = animation;
    }
}
