import { JoinPoint, BoneTexture } from './';
import { GraphicsManager } from '../../GraphicsManager';

export class Bone {
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

        if (!this.texture) {
            return;
        }

        this.texture.draw(this.childJoinPoint.position, graphicsManager);
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
    }
}
