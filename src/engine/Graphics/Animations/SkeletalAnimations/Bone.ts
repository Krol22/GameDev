import { JoinPoint } from './';
import { GraphicsManager } from '../../GraphicsManager';

export class Bone {
    constructor (
        public parentJoinPoint: JoinPoint,
        public childJoinPoint: JoinPoint
    ) {
        parentJoinPoint.childJoinPoint = childJoinPoint;
        childJoinPoint.parentJoinPoint = parentJoinPoint;
    }

    draw(graphicsManager: GraphicsManager) {
        this.parentJoinPoint.draw(graphicsManager);

        if (this.childJoinPoint) {
            this.childJoinPoint.draw(graphicsManager);
        }

        graphicsManager.drawLine(this.parentJoinPoint.position.x, this.parentJoinPoint.position.y, this.childJoinPoint.position.x, this.childJoinPoint.position.y);
    }

    update() {
        this.parentJoinPoint.update();
        if (this.childJoinPoint) {
            this.childJoinPoint.update();
        }
    }

}
