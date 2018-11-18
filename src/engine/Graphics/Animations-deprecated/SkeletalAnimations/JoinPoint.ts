import { Vector2d } from '../../../Math';
import { GraphicsManager } from '../../GraphicsManager';
import { InputManager } from '../../../Input/InputManger';

export class JoinPoint {
    private hovered: boolean = false;
    private clicked: boolean = false;

    private oldPosition: Vector2d;

    public childJoinPoints?: JoinPoint[];
    public parentJoinPoint?: JoinPoint;

    private width = 10;

    constructor (
        public position: Vector2d,
    ) {
        this.childJoinPoints = [];
    }

    draw () {
        GraphicsManager.drawRectangle(this.position.x - 5, this.position.y - 5, this.width, this.width, this.hovered ? (this.clicked ? 'blue' : 'red') : 'green');
    }

    update () {
        this.handleInput();
    }

    handleInput () {
        if (
            InputManager.mousePosition.x - this.width / 2 < this.position.x + this.width / 2 &&
            InputManager.mousePosition.x - this.width / 2 > this.position.x - this.width / 2 &&
            InputManager.mousePosition.y - this.width / 2 < this.position.y + this.width / 2 &&
            InputManager.mousePosition.y - this.width / 2 > this.position.y - this.width / 2
        ) {
            this.hovered = true;
        } else {
            this.hovered = false;
        }

        if (this.hovered && InputManager.mouseClicked) {
            this.clicked = true;
        }

        if (this.clicked && !InputManager.mouseClicked) {
            this.clicked = false;
        }

        if (this.clicked) {
            this.setPosition();
        }
    }

    setPosition () {
        if (this.parentJoinPoint) {
            let r = Vector2d.magnitude(this.position, this.parentJoinPoint.position);
            let xa = this.parentJoinPoint.position.x;
            let ya = this.parentJoinPoint.position.y;
            let xb = InputManager.mousePosition.x;
            let yb = InputManager.mousePosition.y;

            let p = (ya - yb) / (xa - xb);

            let a = 1 + p * p;
            let b = -2 * xa * (1 + p * p)
            let c = xa * xa * (1 + p * p) - (r * r);

            let d = Math.sqrt((b * b) - (4 * a * c));

            if (Number.isNaN(d)) {
                return;
            }

            let x;
            if (this.parentJoinPoint.position.x - InputManager.mousePosition.x > 0) {
                x = (-1 * b - d) / (2 * a);
            } else {
                x = (-1 * b + d) / (2 * a);
            }

            this.oldPosition = new Vector2d(this.position.x, this.position.y);

            this.position.x = x;
            this.position.y = p * x + ya - p * xa;

            if (this.position.x === this.oldPosition.x && this.position.y === this.oldPosition.y) {
                return;
            }

            this.childJoinPoints.forEach((childJoinPoint: JoinPoint) => {
                let oxVector = new Vector2d(this.parentJoinPoint.position.x + 500, this.parentJoinPoint.position.y);

                let alphaPrime = Vector2d.findAngle(this.position, this.parentJoinPoint.position, oxVector);
                let alpha = Vector2d.findAngle(this.oldPosition, this.parentJoinPoint.position, oxVector);
                let beta = Vector2d.findAngle(childJoinPoint.position, this.parentJoinPoint.position, oxVector);

                let gamma = alpha - beta;
                let betaPrime = alphaPrime - gamma;

                betaPrime = -betaPrime;

                childJoinPoint.rotate(betaPrime, this.parentJoinPoint.position);
            });
        }
    }

    rotate(angle: number, aroundPoint: Vector2d) {
        let r = Vector2d.magnitude(aroundPoint, this.position);

        this.oldPosition = new Vector2d(this.position.x, this.position.y);

        this.position.x = aroundPoint.x + r * Math.cos(angle);
        this.position.y = aroundPoint.y + r * Math.sin(angle);

        if (Number.isNaN(this.position.x)) {
            // debugger;
        }

        this.childJoinPoints.forEach((childJoinPoint: JoinPoint) => {
            let oxVector = new Vector2d(aroundPoint.x + 500, aroundPoint.y);

            let alphaPrime = Vector2d.findAngle(this.position, aroundPoint, oxVector);
            let alpha = Vector2d.findAngle(this.oldPosition, aroundPoint, oxVector);
            let beta = Vector2d.findAngle(childJoinPoint.position, aroundPoint, oxVector);

            let gamma = alpha - beta;
            let betaPrime = alphaPrime - gamma;

            betaPrime = -betaPrime;
            childJoinPoint.rotate(betaPrime, aroundPoint);
        })
    }

    addChildJoinPoint(newJoinPoint: any) {
        this.childJoinPoints.push(newJoinPoint);
    }
}
