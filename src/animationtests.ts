import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { Animation } from './engine/Graphics/Animations/Animation';
import { Sprite } from './engine/Graphics/Sprite';
import { AnimationManager } from './engine/Graphics/Animations/AnimationManager';

let graphicsManager: GraphicsManager;
let animationManager: AnimationManager;

let walkImage: CanvasImageSource;
let attackImage: CanvasImageSource;

let walkStep = 0;
let attackStep = 0;

let state = 'STANDING';

let frameWidth = 902;
let frameHeight = 900;
let walkFrames = 24;
let attackFrames = 12;

let standingFrame = 21;

let x = 480;
let y = 480;

let vx = 0;

function init() {
    return new Promise((resolve, reject) => {
        let loaded = false;
        graphicsManager = new GraphicsManager('graphics-test', 800, 600);
        animationManager = new AnimationManager(graphicsManager);

        attackImage = new Image();
        attackImage.src = './assets/Slashing/slash_sprite.png';

        walkImage = new Image();
        walkImage.src = './assets/Walking/walk_sprite.png';
    });
}

function createAnimations() {
    let goblinSprite1 = new Sprite(
        walkImage,
        frameWidth,
        frameHeight,
        walkFrames,
    );
    animationManager.createAnimation('goblin_walk', goblinSprite1, 2, 1, walkFrames);

    let goblinSprite2 =  new Sprite(
        attackImage,
        frameWidth,
        frameHeight,
        attackFrames
    );
    animationManager.createAnimation('goblin_attack', goblinSprite2, 2, 1, attackFrames);
    animationManager.createAnimation('goblin_stand', goblinSprite1, 2, 19, 19);

    return new Promise((resolve) => { resolve(); });
}



function loop() {
    let frame;

    graphicsManager.clear();
    graphicsManager.drawRectangle(100, 100, 120, 80, '#ff0000');
    graphicsManager.drawText(60, 80, 'Test text', '#00ff00');

    if (state === 'STANDING') {
        animationManager.stop('goblin_walk');
        animationManager.stop('goblin_attack');

        animationManager.draw('goblin_stand', x, y);
    } else if (state === 'WALK') {
        animationManager.draw('goblin_walk', x, y);
        x = x + vx;
    } else if (state === 'ATTACK') {
        animationManager.draw('goblin_attack', x, y);
    }

    animationManager.update();
    window.requestAnimationFrame(loop);
}

init()
.then(function() {
    return createAnimations();
})
.then(function() {
    window.requestAnimationFrame(loop);
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.keyCode === 39) {
        state = 'WALK';
        vx = 1;
    } else if (event.keyCode === 37) {
        state = 'WALK';
        vx = -1;
    } else if (event.keyCode === 32) {
        state = 'ATTACK';
    }
});

window.addEventListener('keyup', (event: KeyboardEvent) => {
    vx = 0;
    state = 'STANDING';
});
