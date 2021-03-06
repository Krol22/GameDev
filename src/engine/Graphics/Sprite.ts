/*
    Load static width sprite
 */

export interface SpriteFragment {
    source: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number
}

export class Sprite {
    constructor(
        public source: CanvasImageSource,
        public frameWidth: number,
        public frameHeight: number,
        public framesX: number,
    ) { }

    getFrame(frame: number): SpriteFragment {
        let dx: number;
        let dy: number;

        dx = (Math.floor(frame % this.framesX)) * this.frameWidth;
        dy = (Math.floor(frame / this.framesX)) * this.frameHeight;

        let dw: number = this.frameWidth;
        let dh: number = this.frameHeight;

        return {
            source: this.source,
            dx,
            dy,
            dw,
            dh
        };
    }



}
