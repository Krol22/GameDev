export class GraphicsManager {
    private context: CanvasRenderingContext2D;

    constructor (canvasElementId: string, private width: number, private height: number) {
        let canvas = <HTMLCanvasElement> document.getElementById(canvasElementId);
        this.context = canvas.getContext("2d");
    }

    drawRectangle(x: number, y: number, w: number, h: number, color: string) {
        this.context.save();
        this.context.translate(x, y);

        // console.log(x, y, color);
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, w, h);
        this.context.stroke();

        this.context.restore();
    }

    drawCircle(x: number, y: number, r: number) {
        this.context.save();
        this.context.translate(x, y);

        this.context.beginPath();
        this.context.arc(0, 0, r, 0, 2 * Math.PI, false);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#003300';
        this.context.stroke();

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

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.save();
        this.context.translate(x1, y1);

        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(x2 - x1, y2 - y1);

        this.context.restore();
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
