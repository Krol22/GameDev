import { Bone } from './';

export enum ANIMATION_STATES {
    INITIAL,
    PLAYING,
    IDLE,
    DONE
};

export class SkeletalStep {
    public state: ANIMATION_STATES = ANIMATION_STATES.INITIAL;

    private currentAngle: number;
    private step: number;
    private sign: number;

    constructor(
        private bone: Bone,
        private fromAngle: number,
        private toAngle: number,
        private frameRate: number
    ) {
        this.currentAngle = fromAngle;

        this.step = (toAngle - fromAngle) / frameRate;
    }

    update () {
        this.state = ANIMATION_STATES.PLAYING;

        if (this.step >= 0 && this.currentAngle > this.toAngle) {
            this.state = ANIMATION_STATES.DONE;
            return;
        } else if (this.step < 0 && this.currentAngle < this.toAngle) {
            this.state = ANIMATION_STATES.DONE;
            return;
        }

        this.currentAngle += this.step;
        this.bone.setAngle(this.currentAngle);
    }

    restart () {
        this.currentAngle = this.fromAngle;
    }
}

export class SkeletalAnimation {
    private stepsIndex: number = 0;
    private state: ANIMATION_STATES = ANIMATION_STATES.IDLE;
    private numberOfSteps: number = 0;
    private loop: boolean = true;

    constructor(
        private steps: SkeletalStep[][],
    ) {
        this.numberOfSteps = steps.length;
    }

    update () {
        if (this.state === ANIMATION_STATES.DONE) {
            return;
        }

        let skeletalSteps = this.steps[this.stepsIndex];
        skeletalSteps.forEach((skeletalStep: SkeletalStep) => {
            skeletalStep.update();
        });

        let stepDone = skeletalSteps.every((skeletalStep: SkeletalStep) => {
            return skeletalStep.state === ANIMATION_STATES.DONE;
        });

        if (stepDone) {
            this.stepsIndex += 1;
        }

        if (this.stepsIndex === this.numberOfSteps) {
            if (this.loop) {
                this.stepsIndex = 0;
                this.steps.forEach((skeletalSteps: SkeletalStep[]) => {
                    skeletalSteps.forEach((skeletalStep: SkeletalStep) => {
                        skeletalStep.restart();
                    });
                });
            }
        }
    }
}