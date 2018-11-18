import { Sprite, SpriteFragment } from '../../Sprite';
import { Vector2d } from '../../../Math';
import { GraphicsManager } from '../../GraphicsManager';

export class BoneTexture {

    private currentFrame: number;

    constructor(
        public sprite: Sprite,
        public offsetX: number,
        public offsetY: number,
        startingFrame: number = 0
    ) {
        this.currentFrame = startingFrame;
    }

    draw(position: Vector2d) {
        let spriteFragment: SpriteFragment = this.sprite.getFrame(this.currentFrame);

        GraphicsManager.drawFragment(
            spriteFragment.source,
            position.x + this.offsetX - (spriteFragment.dw / 2),
            position.y + this.offsetY - (spriteFragment.dh / 2),
            spriteFragment.dw,
            spriteFragment.dh,
            spriteFragment.dx,
            spriteFragment.dy,
            spriteFragment.dw,
            spriteFragment.dh
        );
    }

    setCurrentFrame(frame: number) {
        this.currentFrame = frame;
    }
}
