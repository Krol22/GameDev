interface ElementToDraw {
    callback: Function,
    args: any[]
};

export const GraphicsManager = {
    context: null as CanvasRenderingContext2D,
    elementsToDraw: [] as ElementToDraw[],
    init (canvasElementId: string, width: number, height: number) {
        let canvas = <HTMLCanvasElement> document.getElementById(canvasElementId);
        this.context = canvas.getContext("2d");
        this.width = width;
        this.height = height;
    },

    draw() {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.forEach((elementsToDraw: ElementToDraw) => {
            elementsToDraw.callback.call(this, ...elementsToDraw.args);
        });

        this.elementsToDraw = [];
    },
    drawRectangle(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawRectangle,
                args
            }
        );
    },
    drawCircle(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawCircle,
                args: Array.from(arguments)
            }
        );
    },
    drawText(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawText,
                args: Array.from(arguments)
            }
        );
    },
    drawImage(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawImage,
                args: Array.from(arguments)
            }
        );
    },
    drawFragment(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawFragment,
                args: Array.from(arguments)
            }
        );
    },
    drawLine(...args: any[]) {
        if (!this.context) {
            throw new Error(`GraphicsManager have to be inited before usage!`);
        }

        this.elementsToDraw.push(
            {
                callback: this._drawLine,
                args: Array.from(arguments)
            }
        );
    },

    _drawRectangle(x: number, y: number, w: number, h: number, color: string) {
        this.context.save();
        this.context.translate(x, y);

        this.context.fillStyle = color;
        this.context.fillRect(0, 0, w, h);
        this.context.stroke();

        this.context.restore();
    },

    _drawCircle(x: number, y: number, r: number) {
        this.context.save();
        this.context.translate(x, y);

        this.context.beginPath();
        this.context.arc(0, 0, r, 0, 2 * Math.PI, false);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#003300';
        this.context.stroke();

        this.context.restore();
    },

    _drawText(x: number, y: number, text: string, color: string, font: string = '20px Arial') {
        this.context.save();
        this.context.translate(x, y);

        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, 0, 0);

        this.context.restore();
    },

    _drawImage(image: CanvasImageSource, x: number, y: number, dw: number, dh: number) {
        this.context.save();
        this.context.translate(x, y);

        this.context.drawImage(image, 0, 0, dw, dh)

        this.context.restore();
    },

    _drawFragment(image: CanvasImageSource, x: number, y: number, dw: number, dh: number, sx: number, sy: number, sw: number, sh: number, scaleX: number = 1) {
        this.context.save();
        this.context.translate(x, y);

        this.context.scale(scaleX, 1);
        this.context.drawImage(image, sx, sy, sw, sh, 0, 0, dw, dh);

        // this.context.strokeStyle = '#ff0000';
        // this.context.lineWidth = 2;
        // this.context.strokeRect(0, 0, dw, dh);

        this.context.restore();
    },

    _drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.save();
        this.context.translate(x1, y1);

        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(x2 - x1, y2 - y1);

        this.context.restore();
    },

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
