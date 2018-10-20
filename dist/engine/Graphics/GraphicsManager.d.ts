export declare class GraphicsManager {
    private context;
    constructor(canvasElementId: string);
    drawRectangle(x: number, y: number, w: number, h: number, color: string): void;
    drawText(x: number, y: number, text: string, color: string, font?: string): void;
    drawImage(x: number, y: number, image: CanvasImageSource): void;
}
