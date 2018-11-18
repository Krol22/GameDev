export enum ANIMATION_STATES {
    PLAYING,
    IDLE
};


export interface IAnimationComponent {
    state: ANIMATION_STATES,
    step: number,
    from: number,
    to: number,
    frameRate: number,
    currentFrame: number,
    loop: boolean
}
