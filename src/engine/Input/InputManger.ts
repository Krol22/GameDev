import { Vector2d } from '../Math';

export const InputManager = {
    mousePosition: new Vector2d(0, 0),
    mouseClicked: false,
    init(canvasId: string) {
        let canvas = document.querySelector(canvasId);

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            let rect = canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mousedown', () => {
            this.mouseClicked = true;
        });

        canvas.addEventListener('mouseup', () => {
            this.mouseClicked = false;
        });
    }
}