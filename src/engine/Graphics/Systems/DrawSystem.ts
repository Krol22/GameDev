import { EcsSystem } from '../../ECS';
import { SpriteHelper, IDrawComponent } from '../';
import { GraphicsManager } from '../GraphicsManager';
import { IBone, IJoinPoint } from '../Components/ISkeletonComponent';

export class DrawSystem extends EcsSystem {

    /*
        Handles drawing for static elements and animated elements.
    */

    tick(delta: number) {
        this.systemEntities.forEach((entity) => {

            // Drawing skeleton bone textures;
            if (entity.hasComponent('skeleton')){
                let skeleton = entity.getComponent('skeleton').data;
                skeleton.bones.forEach((bone: IBone) => {
                    if (bone.texture) {
                        let texture = bone.texture;
                        let parentJoinPoint = skeleton.joinPoints.find((joinPoint: IJoinPoint) => joinPoint.id === bone.parentJoinPointId);
                        let spriteFragmentVector = SpriteHelper.getFrame(texture.sprite, texture.currentFrame);
                        GraphicsManager.drawFragment(
                            texture.sprite.source,
                            parentJoinPoint.position.x + texture.offsetX,
                            parentJoinPoint.position.y + texture.offsetY,
                            texture.sprite.frameWidth,
                            texture.sprite.frameHeight,
                            spriteFragmentVector.x,
                            spriteFragmentVector.y,
                            texture.sprite.frameWidth,
                            texture.sprite.frameHeight,
                        );
                    }
                });

                return;
            }

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
