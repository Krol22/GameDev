import { Vector2d } from '../../../Math';
import { GraphicsManager } from '../../GraphicsManager';
import { Bone, JoinPoint, SkeletalAnimation } from './';

export class Skeleton {

    private animations: Object = {};

    constructor (
        public bones: Bone[],
        public position: Vector2d
    ) { }

    draw(graphicsManager: GraphicsManager) {
        this.bones.forEach((bone: Bone) => {
            bone.draw(graphicsManager);
        });
    }

    update() {
        this.bones.forEach((bone: Bone) => {
            bone.update();
        });

        Object.keys(this.animations).forEach((key: string) => {
            this.animations[key].update();
        });
    }

    play (name: string) {
        if (!this.animations[name]) {
            throw new Error(`${name} animation doesn't exist.`);
        }

        this.animations[name].play();
    }

    addAnimation (name: string, animation: SkeletalAnimation) {
        if (this.animations[name]) {
            throw new Error(`${name} animation already exists!`);
        }

        this.animations[name] = animation;
    }

    setBoneAngle(bone: Bone, angle: number): void {
        angle = -angle * Math.PI / 180;
        bone.childJoinPoint.rotate(angle, bone.parentJoinPoint.position);
    }
}
