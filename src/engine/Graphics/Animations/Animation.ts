import { Sprite } from '../Sprite';

export enum ANIMATION_STATES {
    PLAYING,
    IDLE
};

export class Animation {
    private state: ANIMATION_STATES = ANIMATION_STATES.IDLE;

    private step: number = 0;
    private currentFrame: number = 0;
    private numberOfFrames: number;

    constructor(
        private name: string,
        private sprite: Sprite,
        private frameRate: number,
        private from: number,
        private to: number
    ) {
        this.currentFrame = from;
        this.numberOfFrames = this.to - this.from;
    }

    play() {
        this.state = ANIMATION_STATES.PLAYING;
    }

    getFrame() {
        return this.sprite.getFrame(this.currentFrame);
    }

    update() {
        if (this.state === ANIMATION_STATES.IDLE) {
            return;
        }

        this.step += 1;
        this.currentFrame = Math.floor(this.step / this.frameRate) + 1;

        if (this.step >= this.frameRate * this.numberOfFrames) {
            this.step = 0;
            this.currentFrame = this.from;
        }
    }

    pause() {
        this.state = ANIMATION_STATES.IDLE;
    }

    stop() {
        this.state = ANIMATION_STATES.IDLE;
        this.step = 0;
        this.currentFrame = this.from;
    }
}
