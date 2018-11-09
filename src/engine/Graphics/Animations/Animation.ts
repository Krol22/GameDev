import { Sprite } from '../Sprite';

export enum ANIMATION_STATES {
    PLAYING,
    IDLE
};

export abstract class AbstractAnimation {
    public state: ANIMATION_STATES = ANIMATION_STATES.IDLE;

    protected step: number = 0;

    abstract update(): void;
    abstract restart(): void;

    play () {
        this.state = ANIMATION_STATES.PLAYING;
    }

    pause () {
        this.state = ANIMATION_STATES.IDLE;
    }
}

export class Animation extends AbstractAnimation {
    private currentFrame: number = 0;
    private numberOfFrames: number;

    constructor(
        private sprite: Sprite,
        private from: number,
        private to: number,
        private frameRate: number
    ) {
        super();
        this.currentFrame = from;
        this.numberOfFrames = this.to - this.from;
    }

    getFrame () {
        return this.sprite.getFrame(this.currentFrame + this.from);
    }

    update () {
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

    restart () {
        this.state = ANIMATION_STATES.IDLE;
        this.step = 0;
        this.currentFrame = this.from;
    }
}
