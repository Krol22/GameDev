import { UIManager } from './engine/UI/UIManager';

import { InputManager } from './engine/Input/InputManger';
import { GraphicsManager, ANIMATION_STATES, Sprite, ANIMATION_TYPES, BoneTextureAnimationComponent, AngleAnimationComponent } from './engine/Graphics';

import { ECS, EcsEntity, EcsComponent } from './engine/ECS';
import { EventAggregator } from './engine/EventAggregator';

import { SkeletalSystem, DrawSystem, StaticAnimationSystem } from './engine/Graphics/';
import { TextureAnimationComponent } from './engine/Graphics';
import { Vector2d } from './engine/Math';

import { AssetLoader, AssetManager, AssetType } from './engine/AssetsLoader';

let images: any = {};

function preload() {
    return AssetLoader.loadAssets(
        [
            { name: 'mana', type: AssetType.IMAGE, src: './assets/Mana.png' },
            { name: 'npc', type: AssetType.IMAGE, src: './assets/NPC_1.png' },
            { name: 'body', type: AssetType.IMAGE, src:  './assets/Armor_Body_1.png' },
            { name: 'legs', type: AssetType.IMAGE, src:  './assets/Armor_Legs_1.png' }
        ]
    );
};

let ecs = new ECS();
let skeletalEntity: any;
let ui = new UIManager();

function init() {
    let animationSystem = new StaticAnimationSystem(['animation']);
    let drawSystem = new DrawSystem(['draw', 'skeleton']);
    let skeletalSystem = new SkeletalSystem(['skeleton']);

    let staticDrawComponents: EcsComponent[] = [
        new EcsComponent('draw',
            {
                position: new Vector2d(350, 130),
                destWidth: 22,
                destHeight: 25,
                sprite: new Sprite(AssetManager.getAsset('mana').asset, 33, 24, 1),
                staticFrame: 0
            }
        )
    ]

    let animatedComponents: EcsComponent[] = [
        new EcsComponent('draw',
            {
                position: new Vector2d(50, 130),
                destWidth: 40,
                destHeight: 56,
                sprite: new Sprite(AssetManager.getAsset('npc').asset, 33, 24, 1)
            }
        ),
        new EcsComponent('animation',
            new TextureAnimationComponent(0, 1, 20, true)
        )
    ];

    animatedComponents[1].data.state = ANIMATION_STATES.PLAYING;

    let textureLessSkeletalComponent = new EcsComponent('skeleton',
        {
            debug: true,
            joinPoints: [
                {
                    id: 1,
                    position: new Vector2d(500, 130),
                    childJoinPoints: [2],
                },
                {
                    id: 2,
                    position: new Vector2d(520, 140),
                    parentJoinPoint: 1,
                    childJoinPoints: [3]
                },
                {
                    id: 3,
                    position: new Vector2d(540, 120),
                    parentJoinPoint: 2,
                    childJoinPoints: [4]
                },
                {
                    id: 4,
                    position: new Vector2d(560, 130),
                    parentJoinPoint: 3
                }
            ],
            bones: [
                {
                    id: 1,
                    parentJoinPointId: 1,
                    childJoinPointId: 2,
                },
                {
                    id: 2,
                    parentJoinPointId: 2,
                    childJoinPointId: 3,
                },
                {
                    id: 3,
                    parentJoinPointId: 3,
                    childJoinPointId: 4,
                }
            ],
            animations: [
                {
                    id: 0,
                    name: 'wave',
                    state: ANIMATION_STATES.PLAYING,
                    stepIndex: 0,
                    loop: true,
                    steps: [
                        [ new AngleAnimationComponent(0, 360, 120, 1), new AngleAnimationComponent(0, 720, 120, 2), new AngleAnimationComponent(0, 1080, 120, 3) ],
                        [ new AngleAnimationComponent(360, 0, 120, 1), new AngleAnimationComponent(720, 0, 120, 2), new AngleAnimationComponent(1080, 0, 120, 3) ],
                    ]
                }

            ]
        }
    );

    textureLessSkeletalComponent.data.animations[0].steps[0][0].state = 0;
    textureLessSkeletalComponent.data.animations[0].steps[0][1].state = 0;
    textureLessSkeletalComponent.data.animations[0].steps[0][2].state = 0;

    let skeletalComponent = new EcsComponent('skeleton',
        {
            joinPoints: [
                {
                    id: 1,
                    position: new Vector2d(200, 100),
                    childJoinPoints: [2],
                },
                {
                    id: 2,
                    position: new Vector2d(220, 100),
                    parentJoinPoint: 1,
                    childJoinPoints: [3]
                },
                {
                    id: 3,
                    position: new Vector2d(240, 140),
                    parentJoinPoint: 2
                }
            ],
            bones: [
                {
                    id: 1,
                    parentJoinPointId: 1,
                    childJoinPointId: 2,
                    texture: {
                        sprite: new Sprite(AssetManager.getAsset('legs').asset, 40, 56, 1),
                        offsetX: 0,
                        offsetY: 0,
                        currentFrame: 4
                    }
                },
                {
                    id: 2,
                    parentJoinPointId: 2,
                    childJoinPointId: 3,
                    texture: {
                        sprite: new Sprite(AssetManager.getAsset('body').asset, 40, 56, 1),
                        offsetX: -20,
                        offsetY: 0,
                        currentFrame: 6
                    }
                }
            ],
            animations: [
                {
                    id: 0,
                    name: 'walk',
                    state: ANIMATION_STATES.PLAYING,
                    stepIndex: 0,
                    loop: true,
                    steps: [
                        [
                            new BoneTextureAnimationComponent(4, 8, 10, 1),
                            new BoneTextureAnimationComponent(4, 8, 10, 2),
                        ],
                    ]
                },
                {
                    id: 1,
                    name: 'attack',
                    state: ANIMATION_STATES.PLAYING,
                    stepIndex: 0,
                    loop: true,
                    steps: [
                        [
                            new BoneTextureAnimationComponent(0, 4, 10, 2),
                        ]
                    ]
                }
            ]
        }
    );

    skeletalEntity = new EcsEntity([ skeletalComponent ]);
    let animatedEntity = new EcsEntity(animatedComponents);
    let drawEntity = new EcsEntity(staticDrawComponents);
    let textureLessEntity = new EcsEntity([ textureLessSkeletalComponent ]);

    GraphicsManager.init('graphics-test', 800, 800);
    InputManager.init('#graphics-test');

    ecs.addEntity(animatedEntity);
    ecs.addEntity(skeletalEntity);
    ecs.addEntity(drawEntity);
    ecs.addEntity(textureLessEntity);

    ecs.addSystem(animationSystem);
    ecs.addSystem(drawSystem);
    ecs.addSystem(skeletalSystem);

    loop();
}

let a = false;

EventAggregator.subscribe('button-walk-click', () => {
    a = !a;
    skeletalEntity.getComponent('skeleton').data.animations[0].state = a ? ANIMATION_STATES.PLAYING : ANIMATION_STATES.IDLE;
});

function loop() {
    if (InputManager.keys[32]) {
        skeletalEntity.getComponent('skeleton').data.animations[1].state = ANIMATION_STATES.PLAYING;
    } else if (!InputManager.keys[32]) {
        skeletalEntity.getComponent('skeleton').data.animations[1].state = ANIMATION_STATES.IDLE;
    }

    if (InputManager.keys[39]) {
        // skeletalEntity.getComponent('skeleton').data.animations[0].state = ANIMATION_STATES.PLAYING;
    } else if (!InputManager.keys[39]) {
        // skeletalEntity.getComponent('skeleton').data.animations[0].state = ANIMATION_STATES.IDLE;
    }

    InputManager.update();
    GraphicsManager.clear();
    ecs.update(0);
    GraphicsManager.draw();
    window.requestAnimationFrame(loop);
}

let i = 0;

preload().then(() => {
    init();
});
