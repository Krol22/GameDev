export class GraphicsManager {
    private context: CanvasRenderingContext2D;

    constructor (canvasElementId: string, private width: number, private height: number) {
        let canvas = <HTMLCanvasElement> document.getElementById(canvasElementId);
        this.context = canvas.getContext("2d");
    }

    drawRectangle(x: number, y: number, w: number, h: number, color: string) {
        this.context.save();
        this.context.translate(x, y);

        this.context.fillStyle = color;
        this.context.fillRect(0, 0, w, h);

        this.context.restore();
    }

    drawText(x: number, y: number, text: string, color: string, font: string = '20px Arial') {
        this.context.save();
        this.context.translate(x, y);

        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, 0, 0);

        this.context.restore();
    }

    draw(image: CanvasImageSource, x: number, y: number, dw: number, dh: number) {
        this.context.save();
        this.context.translate(x, y);

        this.context.drawImage(image, 0, 0, dw, dh)

        this.context.restore();
    }

    drawFragment(image: CanvasImageSource, x: number, y: number, dw: number, dh: number, sx: number, sy: number, sw: number, sh: number) {
        this.context.save();
        this.context.translate(x, y);

        this.context.drawImage(image, sx, sy, sw, sh, 0, 0, dw, dh);

        this.context.restore();
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
