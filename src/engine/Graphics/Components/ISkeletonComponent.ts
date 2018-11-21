import { Vector2d } from '../../Math';
import { Sprite } from '../';
import { Animation, ANIMATION_STATES } from './IAnimationComponent';

export interface IJoinPoint {
    id: number,
    position: Vector2d,
    childJoinPoints?: number[],
    parentJoinPoint?: number
};

export interface IBone {
    id: number,
    parentJoinPointId: number,
    childJoinPointId: number,
    texture: {
        sprite: Sprite,
        offsetX: number,
        offsetY: number,
        currentFrame: number
    }
};

export interface ISkeletonAnimation {
    id: 0,
    name: string,
    state: ANIMATION_STATES,
    stepIndex: 0,
    loop: boolean,
    steps: Animation[][]
};

export interface ISkeletonComponent {
    debug: boolean,
    joinPoints: IJoinPoint[],
    bones: IBone[],
    animations: ISkeletonAnimation[]
};
