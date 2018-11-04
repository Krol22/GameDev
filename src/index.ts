import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { InputManager } from './engine/Input/InputManger';
import { Vector2d } from './engine/Math/Vector2d';

import {
    Bone,
    Skeleton,
    JoinPoint,
    SkeletalStep,
    SkeletalAnimation
} from './engine/Graphics/Animations/SkeletalAnimations';

let graphicsManager: GraphicsManager;
let skeleton: Skeleton;
let bones: Bone[];

let animationSteps: SkeletalStep[][];
let animation: SkeletalAnimation;

/*
    Skeletal animation hsit (how should it work);
*/

function init() {
    let joinPoint1 = new JoinPoint(new Vector2d(270, 360));
    let joinPoint2 = new JoinPoint(new Vector2d(220, 190));
    let joinPoint3 = new JoinPoint(new Vector2d(240, 90));
    let joinPoint4 = new JoinPoint(new Vector2d(255, 65));
    let joinPoint5 = new JoinPoint(new Vector2d(230, 70));
    let joinPoint6 = new JoinPoint(new Vector2d(267, 85));

    bones = [
        new Bone(joinPoint1, joinPoint2),
        new Bone(joinPoint2, joinPoint3),
        new Bone(joinPoint3, joinPoint4),
        new Bone(joinPoint3, joinPoint5),
        new Bone(joinPoint3, joinPoint6)
    ];

    animationSteps = [
        [ new SkeletalStep(bones[1], 40, 180, 40), new SkeletalStep(bones[0], 20, 40, 40) ],
        [ new SkeletalStep(bones[1], 180, 40, 40), new SkeletalStep(bones[0], 40, 20, 40) ],
        // new SkeletalStep(bones[1], 40, 360, 80),
        // new SkeletalStep(bones[1], 360, 40, 80)
    ];

    animation = new SkeletalAnimation(animationSteps);
    skeleton = new Skeleton(bones, new Vector2d(250, 275));
    graphicsManager = new GraphicsManager('graphics-test', 800, 800);

    InputManager.init('#graphics-test');

    loop();
}

function loop() {
    graphicsManager.clear();
    skeleton.draw(graphicsManager);
    skeleton.update();
    animation.update();
    window.requestAnimationFrame(loop);
}

let i = 0;

init();

