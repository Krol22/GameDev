import { EcsSystem } from '../../ECS';
import { SpriteHelper, IDrawComponent } from '../';
import { GraphicsManager } from '../GraphicsManager';

export class DrawSystem extends EcsSystem {

    /*
        Handles drawing for static elements and animated elements.

        // TODO: draw static images
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let isAnimatedEntity = entity.hasComponent('animation');
            let draw: IDrawComponent = entity.getComponent('draw').data;

            let frameToDraw: number;

            if (isAnimatedEntity) {
                frameToDraw = entity.getComponent('animation').data.currentFrame;
            } else {
                frameToDraw = draw.staticFrame;
            }

            let spriteFragmentVector = SpriteHelper.getFrame(draw.sprite, frameToDraw);

            GraphicsManager.drawFragment(
                draw.sprite.source,
                draw.position.x,
                draw.position.y,
                draw.sprite.frameWidth,
                draw.sprite.frameHeight,
                spriteFragmentVector.x,
                spriteFragmentVector.y,
                draw.sprite.frameWidth,
                draw.sprite.frameHeight,
            );
        });
    }

}
