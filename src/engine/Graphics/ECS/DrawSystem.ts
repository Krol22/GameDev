import { EcsSystem } from '../../ECS';
import { SpriteHelper } from './SpriteHelper';
import { GraphicsManager } from '../GraphicsManager';
import { IDrawComponent } from './Components/IDrawComponent';

export class DrawSystem extends EcsSystem {

    /*
        Handles drawing for static elements and animated elements.

        // TODO: draw static images
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {
            let isAnimatedEntity = entity.hasComponent('animation');
            let draw: IDrawComponent = entity.getComponent('draw').data;

            if (isAnimatedEntity) {
                let animation = entity.getComponent('animation').data;
                let spriteFragmentVector = SpriteHelper.getFrame(draw.sprite, animation.currentFrame);
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
            }
        });
    }

}
