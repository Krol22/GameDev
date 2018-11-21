import { ANIMATION_STATES } from '../';

export const AnimationHelper = {
    update: (animationData: any) => {
        let numberOfFrames: number = Math.abs(animationData.to - animationData.from);
        let sign: number = Math.sign(animationData.to - animationData.from);

        if (animationData.step >= animationData.frameRate) {
            animationData.currentFrame += sign;

            if (sign > 0 && animationData.currentFrame > numberOfFrames + animationData.from ||
                sign < 0 && animationData.currentFrame < animationData.to) {
                animationData.currentFrame = animationData.from

                if (!animationData.loop) {
                    animationData.state = ANIMATION_STATES.IDLE;
                }
            }

            animationData.step = 0;
        }

        animationData.step += 1;
    }
}

