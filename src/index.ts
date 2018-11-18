import { InputManager } from './engine/Input/InputManger';
import { GraphicsManager, ANIMATION_STATES, Sprite } from './engine/Graphics';

import { ECS, EcsEntity, EcsComponent } from './engine/ECS';
import { EventAggregator } from './engine/EventAggregator';

import { SkeletalSystem, DrawSystem, StaticAnimationSystem } from './engine/Graphics/';
import { Vector2d } from './engine/Math';

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

let eventAggregator = new EventAggregator();
let ecs = new ECS(eventAggregator);
let skeletalEntity: any;

function init() {
    let animationSystem = new StaticAnimationSystem(eventAggregator, ['animation']);
    let drawSystem = new DrawSystem(eventAggregator, ['draw']);
    let skeletalSystem = new SkeletalSystem(eventAggregator, ['skeleton']);

    let animatedComponents: EcsComponent[] = [
        new EcsComponent('draw',
            {
                position: new Vector2d(100, 100),
                destWidth: 40,
                destHeight: 56,
                sprite: new Sprite(images.body, 40, 56, 1)
            }
        ),
        new EcsComponent('animation',
            {
                state: ANIMATION_STATES.PLAYING,
                step: 0,
                from: 4,
                to: 8,
                frameRate: 10,
                currentFrame: 0,
                loop: true
            }
        )
    ];

    let skeletalComponent = new EcsComponent('skeleton',
        {
            joinPoints: [
                {
                    id: 1,
                    position: new Vector2d(100, 150),
                    childJoinPoints: [2],
                },
                {
                    id: 2,
                    position: new Vector2d(120, 150),
                    parentJoinPoint: 1,
                    childJoinPoints: [3]
                },
                {
                    id: 3,
                    position: new Vector2d(140, 140),
                    parentJoinPoint: 2
                }
            ],
            bones: [
                {
                    id: 1,
                    parentJoinPointId: 1,
                    childJoinPointId: 2,
                    texture: {
                        sprite: new Sprite(images.legs, 40, 56, 1),
                        offsetX: 0,
                        offsetY: 0,
                        currentFrame: 1
                    }
                },
                {
                    id: 2,
                    parentJoinPointId: 2,
                    childJoinPointId: 3,
                    texture: {
                        sprite: new Sprite(images.body, 40, 56, 1),
                        offsetX: -20,
                        offsetY: 0,
                        currentFrame: 1
                    }
                }
            ],
            animations: [
                {
                    id: 0,
                    name: 'walk',
                    state: ANIMATION_STATES.PLAYING,
                    stepIndex: 0,
                    steps: [
                        [
                            {
                                animationId: 1,
                                boneId: 1,
                                state: ANIMATION_STATES.PLAYING,
                                from: 4,
                                to: 8,
                                currentFrame: 0,
                                frameRate: 10,
                                loop: true,
                                step: 0
                            },
                            {
                                animationId: 2,
                                boneId: 2,
                                state: ANIMATION_STATES.PLAYING,
                                from: 5,
                                to: 8,
                                currentFrame: 0,
                                frameRate: 10,
                                loop: true,
                                step: 0
                            }
                        ],
                    ]
                },
                {
                    id: 1,
                    name: 'attack',
                    state: ANIMATION_STATES.PLAYING,
                    stepIndex: 0,
                    steps: [
                        [
                            {
                                animationId: 1,
                                boneId: 2,
                                state: ANIMATION_STATES.PLAYING,
                                from: 0,
                                to: 4,
                                currentFrame: 8,
                                frameRate: 10,
                                loop: false,
                                step: 0
                            }
                        ]
                    ]
                }
            ]
        }
    );

    skeletalEntity = new EcsEntity([ skeletalComponent ]);
    let animatedEntity = new EcsEntity(animatedComponents);

    GraphicsManager.init('graphics-test', 800, 800);
    InputManager.init('#graphics-test');

    ecs.addEntity(animatedEntity);
    ecs.addEntity(skeletalEntity);

    ecs.addSystem(animationSystem);
    ecs.addSystem(drawSystem);
    ecs.addSystem(skeletalSystem);

    loop();
}

function loop() {
    if (InputManager.keys[32]) {
        skeletalEntity.getComponent('skeleton').data.animations[1].state = ANIMATION_STATES.PLAYING;
    } else if (!InputManager.keys[32]) {
        skeletalEntity.getComponent('skeleton').data.animations[1].state = ANIMATION_STATES.IDLE;
        skeletalEntity.getComponent('skeleton').data.animations[1].currentFrame = 8;
    }
    GraphicsManager.clear();
    ecs.update(0);
    GraphicsManager.draw();
    window.requestAnimationFrame(loop);
}

let i = 0;

preload().then(() => {
    init();
});
