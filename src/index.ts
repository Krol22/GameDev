import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { InputManager } from './engine/Input/InputManger';
import { Vector2d } from './engine/Math/Vector2d';
import { EasingFunctions } from './engine/Graphics/Animations/EasingFunctions';

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

let attackAnimation: SkeletalAnimation;
let walkAnimation: SkeletalAnimation;

function init() {
    /*
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
            [
                new SkeletalStep(bones[1], 70, 140, 40),
                new SkeletalStep(bones[0], 40, 60, 40)
            ],
            [
                new SkeletalStep(bones[1], 140, 70, 40),
                new SkeletalStep(bones[0], 60, 40, 40)
            ]
        ];

        animation = new SkeletalAnimation(animationSteps);
        skeleton = new Skeleton(bones, new Vector2d(250, 275));
    */

    let joinPoint1 = new JoinPoint(new Vector2d(200, 200));
    let joinPoint2 = new JoinPoint(new Vector2d(200, 240));
    let joinPoint3 = new JoinPoint(new Vector2d(180, 280));
    let joinPoint5 = new JoinPoint(new Vector2d(220, 280));
    let joinPoint7 = new JoinPoint(new Vector2d(160, 220));

    bones = [
        new Bone(joinPoint1, joinPoint2),
        new Bone(joinPoint2, joinPoint3),
        new Bone(joinPoint2, joinPoint5),
        new Bone(joinPoint1, joinPoint7),
    ];

    attackAnimation = new SkeletalAnimation([
        [
            new SkeletalStep(bones[3], 330, -30, 20)
        ]
    ]);

    walkAnimation = new SkeletalAnimation([
        [
            new SkeletalStep(bones[1], 300, 240, 20),
            new SkeletalStep(bones[2], 240, 300, 20),
        ]
    ]);

    skeleton = new Skeleton(bones, new Vector2d(300, 300));

    skeleton.addAnimation('attack', attackAnimation);
    skeleton.addAnimation('walk', walkAnimation);

    graphicsManager = new GraphicsManager('graphics-test', 800, 800);

    InputManager.init('#graphics-test');

    loop();
}

function loop() {
    if (InputManager.keys[32]) {
        skeleton.play('attack');
    }

    if (InputManager.keys[39]) {
        skeleton.play('walk');
    }
    graphicsManager.clear();
    skeleton.draw(graphicsManager);
    skeleton.update();
    window.requestAnimationFrame(loop);
}

let i = 0;

init();

