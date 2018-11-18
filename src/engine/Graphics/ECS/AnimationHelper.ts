import { ANIMATION_STATES } from '../';

export const AnimationHelper = {
    update: (animationData: any) => {
        let numberOfFrames: number = animationData.to - animationData.from;

        animationData.step += 1;
        animationData.currentFrame = Math.floor(animationData.step / animationData.frameRate) + 1;

        if (animationData.step >= animationData.frameRate * numberOfFrames) {
            animationData.step = 0;
            animationData.currentFrame = animationData.from;
            if (!animationData.loop) {
                animationData.state = ANIMATION_STATES.IDLE;
            }
        }
    }
}

