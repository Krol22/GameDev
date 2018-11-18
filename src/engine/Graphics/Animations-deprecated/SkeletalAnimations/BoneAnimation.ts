import { Animation, AbstractAnimation } from '../Animation';
import { Bone } from './'

export class BoneAnimation extends Animation {
    private animation: Animation;

    constructor (
        private bone: Bone,
        from: number,
        to: number,
        frameRate: number
    ) {
        super(bone.texture.sprite, from, to, frameRate);

        if (!bone.texture) {
            throw new Error (`Bone need to have texture to be animated!`);
        }
    }

    update () {
        super.update();
        this.bone.texture.setCurrentFrame(super.getCurrentFrame());
    }
}
