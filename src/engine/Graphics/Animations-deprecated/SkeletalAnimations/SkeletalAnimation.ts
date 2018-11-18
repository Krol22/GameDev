import { Bone } from './';
import { AbstractAnimation, ANIMATION_STATES } from '../Animation';

export class SkeletalStep extends AbstractAnimation {
    private currentAngle: number;
    private sign: number;

    constructor(
        private bone: Bone,
        private fromAngle: number,
        private toAngle: number,
        frameRate: number
    ) {
        super();
        this.currentAngle = fromAngle;
        this.step = (toAngle - fromAngle) / frameRate;
    }

    update () {
        if (this.state === ANIMATION_STATES.IDLE) {
            return;
        }

        if (this.step >= 0 && this.currentAngle > this.toAngle) {
            this.state = ANIMATION_STATES.IDLE;
            return;
        } else if (this.step < 0 && this.currentAngle < this.toAngle) {
            this.state = ANIMATION_STATES.IDLE;
            return;
        }

        this.currentAngle += this.step;
        this.bone.setAngle(this.currentAngle);
    }

    restart () {
        this.state = ANIMATION_STATES.IDLE;
        this.currentAngle = this.fromAngle;
    }
}

export class SkeletalAnimation {
    private stepsIndex: number = 0;
    private state: ANIMATION_STATES = ANIMATION_STATES.IDLE;
    private numberOfSteps: number = 0;

    constructor(
        private steps: AbstractAnimation[][],
    ) {
        this.numberOfSteps = steps.length;
    }

    play () {
        this.state = ANIMATION_STATES.PLAYING;

        this.steps.forEach((steps: AbstractAnimation[]) => {
            steps.forEach((step: AbstractAnimation) => {
                step.play()
            });
        });
    }

    stop () {
        let skeletalSteps = this.steps[this.stepsIndex];
        skeletalSteps.forEach((animation: AbstractAnimation) => {
            animation.restart();
        });

        this.state = ANIMATION_STATES.IDLE;
        this.stepsIndex = 0;
    }

    update () {
        if (this.state !== ANIMATION_STATES.PLAYING) {
            return;
        }

        let skeletalSteps = this.steps[this.stepsIndex];
        skeletalSteps.forEach((animation: AbstractAnimation) => {
            animation.update();
        });

        let stepDone = skeletalSteps.every((animation: AbstractAnimation) => {
            return animation.state === ANIMATION_STATES.IDLE;
        });

        if (stepDone) {
            this.stepsIndex += 1;
        }

        if (this.stepsIndex === this.numberOfSteps) {
            this.state = ANIMATION_STATES.IDLE;
            this.stepsIndex = 0;
            this.steps.forEach((skeletalSteps) => {
                skeletalSteps.forEach((skeletalStep) => {
                    skeletalStep.restart();
                });
            });
        }
    }
}
