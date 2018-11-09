import { Bone } from './';
import { AbstractAnimation, ANIMATION_STATES } from '../Animation';

export class SkeletalStep extends AbstractAnimation {
    private currentAngle: number;
    private sign: number;

    constructor(
        private bone: Bone,
        private fromAngle: number,
        private toAngle: number,
        private frameRate: number
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
    private loop: boolean = true;

    constructor(
        private steps: AbstractAnimation[][],
    ) {
        this.numberOfSteps = steps.length;
    }

    play () {
        this.state = ANIMATION_STATES.PLAYING;

        this.steps.forEach((steps: SkeletalStep[]) => {
            steps.forEach((step: SkeletalStep) => {
                step.play()
            });
        });
    }

    update () {
        if (this.state !== ANIMATION_STATES.PLAYING) {
            return;
        }

        let skeletalSteps = this.steps[this.stepsIndex];
        skeletalSteps.forEach((skeletalStep: SkeletalStep) => {
            skeletalStep.update();
        });

        let stepDone = skeletalSteps.every((skeletalStep: SkeletalStep) => {
            return skeletalStep.state === ANIMATION_STATES.IDLE;
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
