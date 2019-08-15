import BaseSimulation from "./BaseSimulation";
import Tools from "../graph/Tools";

class DisplayedSimulation extends BaseSimulation {

    static getDisplayedName() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getSimulationName');
    }

    constructor(startGraph) {
        super();

        this._steps = this.simulate(startGraph);
        this.currentStepIndex = 0;
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

        if (this.currentStep.lineChartData !== undefined) {
            eventHub.$emit('simulation-step-changed', this.currentStep.lineChartData);
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

        this.currentStepIndex++;
    }

    lastStep() {
        this.currentStepIndex = this._steps.length - 1;
    }

}

export default DisplayedSimulation;
