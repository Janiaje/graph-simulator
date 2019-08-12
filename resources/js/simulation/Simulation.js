import Tools from "../graph/Tools";

class Simulation {

    constructor(startingSimulationStep, nextStepCalculationLambda, lineChartCalculationLambda = undefined) {
        startingSimulationStep.graph.savePositions();

        this.lineChartCalculationLambda = lineChartCalculationLambda;

        this._steps = [startingSimulationStep];
        this.currentStepIndex = 0;
        this._nextStepCalculationLambda = nextStepCalculationLambda;
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

        if (this.lineChartCalculationLambda !== undefined) {
            let data = this.lineChartCalculationLambda(Tools.clone(this.currentStep), Tools.clone(this._steps));
            eventHub.$emit('simulation-step-changed', data);
        }
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
            eventHub.$emit('simulation-pause');
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
}

export default Simulation;
