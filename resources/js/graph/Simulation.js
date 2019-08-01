class Simulation {

    constructor(startingSimulationStep, nextStepCalculationLambda) {
        this._steps = [startingSimulationStep];
        this._currentStepIndex = 0;
        this._nextStepCalculationLambda = nextStepCalculationLambda;
    }

    getCurrentStep() {
        return this._steps[this._currentStepIndex];
    }

    firstStep() {
        this._currentStepIndex = 0;
        return this.getCurrentStep();
    }

    previousStep() {
        // if (this.getCurrentStep().hasPreviousStep === false) {
        //     return null;
        // }

        return this._steps[--this._currentStepIndex];
    }

    nextStep() {
        // if (this.getCurrentStep().hasNextStep === false) {
        //     return null;
        // }

        if (this.getCurrentStep().hasNextStep === null) {
            this._steps.push(this._nextStepCalculationLambda(this.getCurrentStep()));
            this.getCurrentStep().itHasNextStep();
        }

        this._currentStepIndex++;
        return this.getCurrentStep()
    }

    lastStep() {
        this._currentStepIndex = this._steps.length - 1;
        return this.getCurrentStep();
    }

};

export default Simulation;
