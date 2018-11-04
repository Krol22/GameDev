import { Vector2d } from '../../../Math';
import { GraphicsManager } from '../../GraphicsManager';
import { Bone, JoinPoint } from './';

export class Skeleton {
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
    }

    setBoneAngle(bone: Bone, angle: number): void {
        angle = -angle * Math.PI / 180;
        bone.childJoinPoint.rotate(angle, bone.parentJoinPoint.position);
    }
}
