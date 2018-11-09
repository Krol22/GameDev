/*
    PROBABLY NOT NEEDED IN FURTHER DEV.
 */

export class DebuggingCanvas {

    private canvas: HTMLCanvasElement;

    constructor(originalCanvas: HTMLCanvasElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = '#debugging-canvas';
        this.canvas.classList.add(...Array.from(originalCanvas.classList));
        this.canvas.width = originalCanvas.width;
        this.canvas.height = originalCanvas.height;
    }

}
