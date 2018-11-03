import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { InputManager } from './engine/Input/InputManger';
import { Vector2d } from './engine/Math/Vector2d';

import { Bone, Skeleton, JoinPoint } from './engine/Graphics/Animations/SkeletalAnimations';

let graphicsManager: GraphicsManager;
let skeleton: Skeleton;
let bones: Bone[];

/*

*/

function init() {
    let joinPoint1 = new JoinPoint(new Vector2d(270, 360));
    let joinPoint2 = new JoinPoint(new Vector2d(220, 190));
    let joinPoint3 = new JoinPoint(new Vector2d(240, 90));
    let joinPoint4 = new JoinPoint(new Vector2d(280, 70));

    bones = [
        new Bone(joinPoint1, joinPoint2),
        new Bone(joinPoint2, joinPoint3),
        new Bone(joinPoint3, joinPoint4)
    ];

    skeleton = new Skeleton(bones, new Vector2d(250, 275));

    graphicsManager = new GraphicsManager('graphics-test', 800, 800);

    InputManager.init('#graphics-test');
    loop();
}

function loop() {
    graphicsManager.clear();
    skeleton.draw(graphicsManager);
    skeleton.update();
    window.requestAnimationFrame(loop);
}

let i = 0;

init();

