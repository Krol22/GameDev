import { Vector2d } from '../Math';

interface IKey {
    isPressed: boolean,
    wasPressed: boolean,
    isDown: boolean
};

interface IKeyboardState {
    [key: number] : IKey
}

interface IMouseState {
    pos: Vector2d,
    posInCanvas: Vector2d,
    mouse1: boolean,
    mouse2: boolean,
};

const restartKeyState = (key: IKey) => {
    key.isPressed = false;
    key.wasPressed = false;
    key.isDown = false;
};

export const InputManager = {
    _canvas: null as HTMLCanvasElement,

    keys: {} as IKeyboardState,
    mouseState: {
        pos: new Vector2d(0, 0),
        posInCanvas: new Vector2d(0, 0),
        mouse1: false,
        mouse2: false
    } as IMouseState,

    init (canvasSelector: string) : void {
        this._canvas = document.querySelector(canvasSelector);

        this._initKeyBoardEvents();
        this._initMouseEvents();
    },
    update() : void {
        Object.keys(this.keys).forEach(keyCode => {
            if (this.keys[keyCode].wasPressed) {
                this.keys[keyCode].isDown = true;
                this.keys[keyCode].isPressed = false;
            }

            if (!this.keys[keyCode].isDown) {
                this.keys[keyCode].wasPressed = this.keys[keyCode].isPressed;
            }
        });
    },
    _initKeyBoardEvents () : void {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!this.keys[e.keyCode]) {
                this.keys[e.keyCode] = {
                    isPressed: true,
                    wasPressed: false,
                    isDown: false
                };

                return;
            }

            if (!this.keys[e.keyCode].isDown) {
                this.keys[e.keyCode].isPressed = true;
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            restartKeyState(this.keys[e.keyCode]);
        });
    },
    _initMouseEvents () : void {
        window.addEventListener('mousemove', (e: MouseEvent) => { 
            const boundingRect = this._canvas.getBoundingClientRect();

            const pos = new Vector2d(Math.floor(e.clientX), Math.floor(e.clientY));
            const posInCanvas = new Vector2d(pos.x - Math.floor(boundingRect.x), pos.y - Math.floor(boundingRect.y));

            this.mouseState.pos = pos;
            this.mouseState.posInCanvas = posInCanvas;
        });

        // #TODO: finish after getting normal mouse
        window.addEventListener('mousedown', (e: MouseEvent) => {
        });

        window.addEventListener('mouseup', (e: MouseEvent) => {

        });
    }
}
