import Tools from "./Tools";

class Simulation {

    constructor(startingSimulationStep, nextStepCalculationLambda) {
        startingSimulationStep.graph.savePositions();

        this._steps = [startingSimulationStep];
        this.currentStepIndex = 0;
        this._nextStepCalculationLambda = nextStepCalculationLambda;

        this._speed = 5;
        this._maxSpeed = 10;
        this._minSpeed = 1;

        this._interval = undefined;
        this._intervalHandler = () => {
            this.nextStep();
        };
    }

    get currentStep() {
        return this._steps[this._currentStepIndex];
    }

    get currentStepIndex() {
        return this._currentStepIndex;
    }

    set currentStepIndex(value) {
        this._currentStepIndex = value;
        mainDisplayedGraph.display(this.currentStep.graph);
    }

    set speed(value) {
        this._speed = value;

        if (this._interval === undefined) {
            return;
        }

        this._restartInterval();
    }

    get speed() {
        return this._speed;
    }

    firstStep() {
        this.currentStepIndex = 0;
    }

    previousStep() {
        if (!this.currentStep.hasPreviousStep) {
            return;
        }

        this.currentStepIndex--;
    }

    nextStep() {
        if (!this.currentStep.hasNextStep) {
            this.pause();
            return;
        }

        if (
            this.currentStepIndex + 1 === this._steps.length
        ) {
            this.currentStep.graph.savePositions();

            let nextStep = this._nextStepCalculationLambda(Tools.clone(this.currentStep));

            if (nextStep === null) {
                this.currentStep.doesntHaveNextStep();
                return;
            }

            this._steps.push(nextStep);
        }

        this.currentStepIndex++;
    }

    lastStep() {
        this.currentStepIndex = this._steps.length - 1;
    }

    play() {
        this._setInterval();
    }

    _setInterval() {
        this._interval = setInterval(this._intervalHandler, (this._maxSpeed + this._minSpeed - this.speed) * 300);
    }

    pause() {
        this._clearInterval();
        eventHub.$emit('paused');
    }

    _clearInterval() {
        this._interval = clearInterval(this._interval);
    }

    _restartInterval() {
        this._clearInterval();
        this._setInterval();
    }

    faster() {
        if (this.speed >= this._maxSpeed) {
            return;
        }

        this.speed++;
    }

    slower() {
        if (this.speed <= this._minSpeed) {
            return;
        }

        this.speed--;
    }
}

export default Simulation;
