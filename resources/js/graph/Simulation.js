import Tools from "./Tools";

class Simulation {

    constructor(startingSimulationStep, nextStepCalculationLambda) {
        this._steps = [startingSimulationStep];
        this._currentStepIndex = 0;
        this._nextStepCalculationLambda = nextStepCalculationLambda;
    }

    get currentStep() {
        return this._steps[this._currentStepIndex];
    }

    firstStep() {
        this._currentStepIndex = 0;
        return this.currentStep;
    }

    previousStep() {
        if (!this.currentStep.hasPreviousStep) {
            return this.currentStep;
        }

        return this._steps[--this._currentStepIndex];
    }

    nextStep() {
        if (!this.currentStep.hasNextStep) {
            return this.currentStep;
        }

        if (
            this._currentStepIndex + 1 === this._steps.length
            && this.currentStep.hasNextStep
        ) {
            let nextStep = this._nextStepCalculationLambda(Tools.clone(this.currentStep));

            if (nextStep === null) {
                this.currentStep.doesntHaveNextStep();
                return this.currentStep;
            }

            this._steps.push(nextStep);
        }

        this._currentStepIndex++;
        return this.currentStep
    }

    lastStep() {
        this._currentStepIndex = this._steps.length - 1;
        return this.currentStep;
    }

};

export default Simulation;
