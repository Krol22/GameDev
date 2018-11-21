export enum ANIMATION_STATES {
    PLAYING,
    IDLE
};

export enum ANIMATION_TYPES {
    TEXTURE,
    ANGLE
};

export abstract class Animation {
    public state: ANIMATION_STATES;
    public type: ANIMATION_TYPES;
    public step: number;

    constructor(public from: number, public to: number, public frameRate: number, public loop: boolean) {}
}

export class AngleAnimationComponent extends Animation {
    public currentAngle: number;

    constructor(fromAngle: number, toAngle: number, public frameRate: number, public boneId: number) {
        super(fromAngle, toAngle, frameRate, false);

        this.state = ANIMATION_STATES.IDLE;
        this.type = ANIMATION_TYPES.ANGLE;
        this.currentAngle = fromAngle;

        this.step = (toAngle - fromAngle) / this.frameRate;
    }
}

export class TextureAnimationComponent extends Animation {
    public currentFrame: number;

    constructor(public from: number, public to: number, public frameRate: number, public loop: boolean) {
        super(from, to, frameRate, loop);

        this.state = ANIMATION_STATES.IDLE;
        this.type = ANIMATION_TYPES.TEXTURE;
        this.step = 0;
        this.currentFrame = from;
    }
}

export class BoneTextureAnimationComponent extends TextureAnimationComponent {
    constructor(public from: number, public to: number, public frameRate: number, public boneId: number) {
        super(from, to, frameRate, false);

        this.state = ANIMATION_STATES.IDLE;
        this.type = ANIMATION_TYPES.TEXTURE;
    }
}
