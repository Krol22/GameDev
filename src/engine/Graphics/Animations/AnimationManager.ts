import { Animation } from './Animation';
import { GraphicsManager } from '../GraphicsManager';
import { Sprite } from '../Sprite';

export class AnimationManager {
    private animations: Object = {};

    constructor(
        private graphicsManager: GraphicsManager
    ) {}

    createAnimation(
        name: string,
        sprite: Sprite,
        frameRate: number,
        from: number,
        to: number
    ) {
        if (this.animations[name]) {
            throw new Error(`Animation with name: ${name} already exists.`);
        }

        this.animations[name] = new Animation(name, sprite, frameRate, from, to);
    }

    update() {
        Object.keys(this.animations).forEach((key: string) => {
            let animation: Animation = this.animations[key];
            animation.update();
        });
    }


    draw(name: string, x: number, y: number) {
        this.animations[name].play();
        let frame = this.animations[name].getFrame();
        this.graphicsManager.drawFragment(frame.source, x, y, 100, 100, frame.dx, frame.dy, frame.dw, frame.dh);
    }

    pause(name: string) {
        this.animations[name].pause();
    }

    stop(name: string) {
        this.animations[name].stop();
    }
}

