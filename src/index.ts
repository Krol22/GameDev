import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { InputManager } from './engine/Input/InputManger';
import { Vector2d } from './engine/Math/Vector2d';
import { EasingFunctions } from './engine/Graphics/Animations/EasingFunctions';

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

let graphicsManager: GraphicsManager;
let animationManager: AnimationManager;
let skeleton: Skeleton;
let bones: Bone[];

let animationSteps: SkeletalStep[][];
let animation: SkeletalAnimation;

let attackAnimation: SkeletalAnimation;
let walkAnimation: SkeletalAnimation;

/*
    Bone should have texture!
*/

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
    let headSprite = new Sprite(images.head, 34, 42, 1);
    let bodySprite = new Sprite(images.body, 40, 56, 1);
    let legsSprite = new Sprite(images.legs, 40, 56, 1);

    let joinPoint1 = new JoinPoint(new Vector2d(200, 200));
    let joinPoint2 = new JoinPoint(new Vector2d(200, 215));
    let joinPoint3 = new JoinPoint(new Vector2d(200, 230));
    let joinPoint4 = new JoinPoint(new Vector2d(200, 245));

    let headBoneTexture = new BoneTexture(
        headSprite,
        32,
        0,
        -1
    );

    let bodyBoneTexture = new BoneTexture(
        bodySprite,
        1,
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

    graphicsManager = new GraphicsManager('graphics-test', 800, 800);
    animationManager = new AnimationManager(graphicsManager);

    let attackTextureAnimation = new Animation(bodyBoneTexture.sprite, 0, 4, 20);
    bones[0].addAnimation('attack', attackTextureAnimation);

    let walkTextureAnimation = new Animation(legsBoneTexture.sprite, 5, 7, 20);
    bones[1].addAnimation('walk', walkTextureAnimation);

    InputManager.init('#graphics-test');

    loop();
}

function loop() {
    if (InputManager.keys[32]) {
        bones[0].play('attack');
    } else if (!InputManager.keys[32]) {
        bones[0].stop('attack');
    }

    if (InputManager.keys[39]) {
        bones[1].play('walk');
    } else if (!InputManager.keys[39]) {
        bones[1].stop('walk');
    }

    graphicsManager.clear();
    graphicsManager.draw();
    skeleton.draw(graphicsManager);
    skeleton.update();
    animationManager.update();
    window.requestAnimationFrame(loop);
}

let i = 0;

preload().then(() => {
    init();
})

