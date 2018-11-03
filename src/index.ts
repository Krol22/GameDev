import { GraphicsManager } from './engine/Graphics/GraphicsManager';
import { Vector2d } from './engine/Math/Vector2d';

let graphicsManager: GraphicsManager;
let skeleton: Skeleton;

const mousePosition = new Vector2d(0, 0);
let mouseClicked = false;

let testVector = new Vector2d(0, 0);

function findAngle(p0: Vector2d, p1: Vector2d, p2: Vector2d): number {
    let a = Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2);
    let b = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    let c = Math.pow(p2.x - p0.x, 2) + Math.pow(p2.y - p0.y, 2);

    let angle = Math.acos((a + b - c) / Math.sqrt(4 * a * b));

    if (p0.y > p1.y) {
        angle = 2 * Math.PI - angle;
    }

    return angle;
}

class JoinPoint {
    private hovered: boolean = false;
    private clicked: boolean = false;

    private oldPosition: Vector2d;

    public childJoinPoint?: JoinPoint;
    public parentJoinPoint?: JoinPoint;

    private width = 10;

    constructor (
        public position: Vector2d,
    ) {
    }

    draw () {
        graphicsManager.drawRectangle(this.position.x - 5, this.position.y - 5, this.width, this.width, this.hovered ? (this.clicked ? 'blue' : 'red') : 'green');
    }

    update () {
        this.handleInput();
    }

    handleInput () {
        if (
            mousePosition.x - this.width / 2 < this.position.x + this.width / 2 &&
            mousePosition.x - this.width / 2 > this.position.x - this.width / 2 &&
            mousePosition.y - this.width / 2 < this.position.y + this.width / 2 &&
            mousePosition.y - this.width / 2 > this.position.y - this.width / 2
        ) {
            this.hovered = true;
        } else {
            this.hovered = false;
        }

        if (this.hovered && mouseClicked) {
            this.clicked = true;
        }

        if (this.clicked && !mouseClicked) {
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
            let xb = mousePosition.x;
            let yb = mousePosition.y;

            let p = (ya - yb) / (xa - xb);

            let a = 1 + p * p;
            let b = -2 * xa * (1 + p * p)
            let c = xa * xa * (1 + p * p) - (r * r);

            let d = Math.sqrt((b * b) - (4 * a * c));

            if (Number.isNaN(d)) {
                return;
            }

            let x;
            if (this.parentJoinPoint.position.x - mousePosition.x > 0) {
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


            if (this.childJoinPoint) {
                let oxVector = new Vector2d(this.parentJoinPoint.position.x + 500, this.parentJoinPoint.position.y);

                let alphaPrime = findAngle(this.position, this.parentJoinPoint.position, oxVector);
                let alpha = findAngle(this.oldPosition, this.parentJoinPoint.position, oxVector);
                let beta = findAngle(this.childJoinPoint.position, this.parentJoinPoint.position, oxVector);

                let gamma = alpha - beta;
                let betaPrime = alphaPrime - gamma;

                betaPrime = -betaPrime;

                this.childJoinPoint.rotate(betaPrime, this.parentJoinPoint.position);
            }

        }
    }

    rotate(angle: number, aroundPoint: Vector2d) {
        let r = Vector2d.magnitude(aroundPoint, this.position);

        this.oldPosition = new Vector2d(this.position.x, this.position.y);

        this.position.x = aroundPoint.x + r * Math.cos(angle);
        this.position.y = aroundPoint.y + r * Math.sin(angle);

        if (this.childJoinPoint) {
            let oxVector = new Vector2d(aroundPoint.x + 500, aroundPoint.y);

            let alphaPrime = findAngle(this.position, aroundPoint, oxVector);
            let alpha = findAngle(this.oldPosition, aroundPoint, oxVector);
            let beta = findAngle(this.childJoinPoint.position, aroundPoint, oxVector);

            let gamma = alpha - beta;
            let betaPrime = alphaPrime - gamma;

            betaPrime = -betaPrime;
            this.childJoinPoint.rotate(betaPrime, aroundPoint);
        }
    }
}

class Bone {
    constructor (
        public parentJoinPoint: JoinPoint,
        public childJoinPoint: JoinPoint
    ) { }

    draw() {
        this.parentJoinPoint.draw();

        if (this.childJoinPoint) {
            this.childJoinPoint.draw();
        }

        // graphicsManager.drawLine(this.parentJoinPoint.position.x, this.parentJoinPoint.position.y, this.childJoinPoint.position.x, this.childJoinPoint.position.y);
    }

    update() {
        this.parentJoinPoint.update();
        if (this.childJoinPoint) {
            this.childJoinPoint.update();
        }
    }
}

class Skeleton {
    constructor (
        public bones: Bone[],
        public position: Vector2d
    ) { }

    draw() {
        this.bones.forEach((bone: Bone) => {
            bone.draw();
        });
    }

    update() {
        this.bones.forEach((bone: Bone) => {
            bone.update();
        });
    }
}

function init() {
    let joinPoint4;
    let joinPoint3;
    let joinPoint2;
    let joinPoint1;

    joinPoint1 = new JoinPoint(new Vector2d(270, 360));
    joinPoint2 = new JoinPoint(new Vector2d(220, 190));
    joinPoint3 = new JoinPoint(new Vector2d(240, 90));
    joinPoint4 = new JoinPoint(new Vector2d(280, 70));

    joinPoint2.parentJoinPoint = joinPoint1;
    joinPoint2.childJoinPoint = joinPoint3;

    joinPoint3.parentJoinPoint = joinPoint2;
    joinPoint1.childJoinPoint = joinPoint2;

    joinPoint4.parentJoinPoint = joinPoint3;
    joinPoint3.childJoinPoint = joinPoint4;

    const bones: Bone[] = [
        new Bone(joinPoint1, joinPoint2),
        new Bone(joinPoint2, joinPoint3),
        new Bone(joinPoint3, joinPoint4)
    ];

    skeleton = new Skeleton(bones, new Vector2d(250, 275));

    graphicsManager = new GraphicsManager('graphics-test', 800, 800);

    handleInput();

    loop();
}

function loop() {
    graphicsManager.clear();
    graphicsManager.drawRectangle(testVector.x, testVector.y, 10, 10, 'red');
    skeleton.draw();
    skeleton.update();
    window.requestAnimationFrame(loop);
}

function handleInput() {
    let canvas = document.querySelector('#graphics-test');
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
        let rect = canvas.getBoundingClientRect();
        mousePosition.x = e.clientX - rect.left;
        mousePosition.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', () => {
        mouseClicked = true;
    });

    canvas.addEventListener('mouseup', () => {
        mouseClicked = false;
    });
}

init();

