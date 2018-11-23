import { Vector2d } from '../../Math';
import { Sprite } from '../';
import { Animation, ANIMATION_STATES } from './IAnimationComponent';

/*
    IJoinPoint is basic element of skeleton. 
    Single joinpoint can have only one parent but can have multiple child join points. 

    id: unique id of joinpoint,
    position: position of joinpoint,
    childJoinPoints: array of Ids that points to joinpoints that are child to this one
    parentJoinPoint: id of parent join point
*/
export interface IJoinPoint {
    id: number,
    position: Vector2d,
    childJoinPoints?: number[],
    parentJoinPoint?: number
};

/*
    IBone is used for creating textures on the skeleton,

    id: unique id of bone 
    parentJoinPointId: id of parent join point in bone,
    childJoinPointId: id of child join point in bone,
    texture: {
        sprite: Sprite that will be drawn on bone,
        offsetX: offset used for correct alignment of texture on bone (X),
        offsetY: offset used for correct alignment of texture on bone (Y),
        currentFrame: frame that will be draw from sprite
    }
*/
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

/*
    ISkeletonAnimation defines animations for skeleton, see file: IAnimationComponent.ts 

    It takes steps that will be animated one by one. One step can have multiple animations 
    that will animate multiple bones at the same time. F.e. for walking you can animate bone 
    texture on "torso" and on "legs" separatly. You can also rotate bone by an angle arount
    OX. More in IAnimationComponent.ts

    id: unique id of SkeletonAnimation,
    name: animation name (further it will be used for launching animation),
    state: see IAnimationComponent => ANIMATION_STATES,
    stepIndex: defines which step is animating,
    loop: defines if animation will start over after finish,
    steps: defines animation steps. Example in AnimationsDemo.ts
*/
export interface ISkeletonAnimation {
    id: 0,
    name: string,
    state: ANIMATION_STATES,
    stepIndex: 0,
    loop: boolean,
    steps: Animation[][]
};

/*
    Main component of skeleton that gather information about joinPoints, bones, textures animation of 
    a skeleton.

    debug: when setted on true -> join points and bones will be drawed on top of bones for checking
    if position is ok.
*/
export interface ISkeletonComponent {
    debug: boolean,
    joinPoints: IJoinPoint[],
    bones: IBone[],
    animations: ISkeletonAnimation[]
};
