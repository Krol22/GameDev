export enum ANIMATION_STATES {
    PLAYING, 
    IDLE
};

export enum ANIMATION_TYPES {
    TEXTURE,
    ANGLE
};

/*
    Base class for animations in game.

    Animation can be in 2 states: 
        - PLAYING -> it will be updated,
        - IDLE -> no update functions will be launched on this animation

    We distinguish 2 types of animations: 
        - TEXTURE -> standard texture/sprite animation,
        - ANGLE -> for skeleton animations, animate angle between bones

    from: frame or angle from animation will start, 
    from: frame or angle when animation should stop
    frameRate: defines frameRate,
    loop: when set to true animation will start over after finish

*/
export abstract class Animation {
    public state: ANIMATION_STATES;
    public type: ANIMATION_TYPES;
    public step: number;

    constructor(public from: number, public to: number, public frameRate: number, public loop: boolean) {}
}

/* 
    Class used for creating AngleAnimations (see above);
*/
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

/*
    Class used for creating TextureAnimations (non skeleton textures)
*/
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

/*
    Class used for creating BoneTexture animations (see ISkeletonComponent to learn more about skeleton);
*/
export class BoneTextureAnimationComponent extends TextureAnimationComponent {
    constructor(public from: number, public to: number, public frameRate: number, public boneId: number) {
        super(from, to, frameRate, false);

        this.state = ANIMATION_STATES.IDLE;
        this.type = ANIMATION_TYPES.TEXTURE;
    }
}
