import { Vector2d } from '../../Math';

export const SpriteHelper = {
    getFrame(sprite: any, frame: number) {
        let sourceX: number;
        let sourceY: number;

        sourceX = (Math.floor(frame % sprite.framesX)) * sprite.frameWidth;
        sourceY = (Math.floor(frame / sprite.framesX)) * sprite.frameHeight;

        return new Vector2d(sourceX, sourceY);
    }
}

