import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { InputManager } from './engine/Input/InputManger';
import { Vector2d } from './engine/Math/Vector2d';

import {
    Bone,
    Skeleton,
    JoinPoint,
    SkeletalStep,
    SkeletalAnimation,
    BoneTexture
} from './engine/Graphics/Animations/SkeletalAnimations';

import { Sprite } from './engine/Graphics/Sprite';
import { AnimationManager } from './engine/Graphics/Animations/AnimationManager';
import { Animation } from './engine/Graphics/Animations/Animation';
import { BoneAnimation } from './engine/Graphics/Animations/SkeletalAnimations/BoneAnimation';

let graphicsManager: GraphicsManager;
let animationManager: AnimationManager;
let skeleton: Skeleton;
let bones: Bone[];

let animationSteps: SkeletalStep[][];
let animation: SkeletalAnimation;

let attackAnimation: SkeletalAnimation;
let walkAnimation: SkeletalAnimation;

let images: any = {};

function preload() {
    return new Promise((resolve, reject) => {
        let loaded = 0;

        images.head = new Image();
        images.head.src = './assets/NPC_Head_10.png';

        images.body = new Image();
        images.body.src = './assets/Armor_Body_1.png';

        images.legs = new Image();
        images.legs.src = './assets/Armor_Legs_1.png';

        images.head.onload = () => {
            loaded++;
            if (loaded === Object.keys(images).length) {
                resolve();
            }
        }

        images.body.onload = () => {
            loaded++;
            if (loaded === Object.keys(images).length) {
                resolve();
            }
        }

        images.legs.onload = () => {
            loaded++;
            if (loaded === Object.keys(images).length) {
                resolve();
            }
        }
    });
}

function init() {
    let bodySprite = new Sprite(images.body, 40, 56, 1);
    let legsSprite = new Sprite(images.legs, 40, 56, 1);

    let joinPoint2 = new JoinPoint(new Vector2d(200, 215));
    let joinPoint3 = new JoinPoint(new Vector2d(200, 230));
    let joinPoint4 = new JoinPoint(new Vector2d(200, 245));

    let bodyBoneTexture = new BoneTexture(
        bodySprite,
        0,
        5
    );

    let legsBoneTexture = new BoneTexture(
        legsSprite,
        0,
        -10
    )

    bones = [
        new Bone(joinPoint3, joinPoint2, bodyBoneTexture),
        new Bone(joinPoint4, joinPoint3, legsBoneTexture),
    ];

    skeleton = new Skeleton(bones, new Vector2d(300, 300));

    let walkAnimationSteps = [
        [ new BoneAnimation(bones[1], 8, 12, 10) ],
        [ new BoneAnimation(bones[0], 4, 8, 10) ]
    ];

    let attackAnimationSteps = [
        [ new BoneAnimation(bones[0], 4, 8, 10) ]
    ];

    let walkAnimation = new SkeletalAnimation(walkAnimationSteps);
    let attackAnimation = new SkeletalAnimation(attackAnimationSteps);

    skeleton.addAnimation('walk', walkAnimation);
    skeleton.addAnimation('attack', attackAnimation);

    graphicsManager = new GraphicsManager('graphics-test', 800, 800);

    InputManager.init('#graphics-test');

    loop();
}

function loop() {
    if (InputManager.keys[32]) {
        skeleton.play('attack');
    } else if (!InputManager.keys[32]) {
        skeleton.stop('attack');
    }

    if (InputManager.keys[39]) {
        skeleton.play('walk');
    } else if (!InputManager.keys[39]) {
        skeleton.stop('walk');
    }

    graphicsManager.clear();
    graphicsManager.draw();
    skeleton.draw(graphicsManager);
    skeleton.update();
    window.requestAnimationFrame(loop);
}

let i = 0;

preload().then(() => {
    init();
})

