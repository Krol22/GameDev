import { Sprite } from '../../Sprite';
import { Bone } from './';
import { Vector2d } from '../../../Math';
import { GraphicsManager } from '../../GraphicsManager';

export class BoneTexture {

    constructor(
        public sprite: Sprite,
        public offsetX: number,
        public offsetY: number,
        public scaleX: number = 1
    ) {

    }

    draw(position: Vector2d, graphicsManager: GraphicsManager, currentFrame: number) {
        let frame = this.sprite.getFrame(currentFrame);
        graphicsManager.drawFragment(
            frame.source,
            position.x + this.offsetX - (frame.dw / 2),
            position.y + this.offsetY - (frame.dh / 2),
            frame.dw,
            frame.dh,
            frame.dx,
            frame.dy,
            frame.dw,
            frame.dh,
            this.scaleX
        );
    }
}
