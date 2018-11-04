import { JoinPoint } from './';
import { GraphicsManager } from '../../GraphicsManager';

export class Bone {
    constructor (
        public parentJoinPoint: JoinPoint,
        public childJoinPoint: JoinPoint
    ) {
        parentJoinPoint.addChildJoinPoint(childJoinPoint);
        childJoinPoint.parentJoinPoint = parentJoinPoint;
    }

    draw(graphicsManager: GraphicsManager) {
        this.parentJoinPoint.draw(graphicsManager);

        this.childJoinPoint.draw(graphicsManager);

        graphicsManager.drawLine(
            this.parentJoinPoint.position.x,
            this.parentJoinPoint.position.y,
            this.childJoinPoint.position.x,
            this.childJoinPoint.position.y
        );
    }

    setAngle(angle: number) {
        angle = -angle * Math.PI / 180;
        this.childJoinPoint.rotate(angle, this.parentJoinPoint.position);
    }

    update() {
        this.parentJoinPoint.update();
        this.childJoinPoint.update();
    }

}
