import BaseSimulation from "./BaseSimulation";
import Tools from "../graph/Tools";

class DisplayedSimulation extends BaseSimulation {

    static getName() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getSimulationName');
    }

    static getDescription() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getDescription');
    }

    static askQuestionBeforeRun(okCallback) {
        eventHub.$emit('question', {
            header: `${this.getName()} simulation`,
            description: this.getDescription(),
            fields: [
                {
                    id: 'numberOfNodes',
                    type: 'number',
                    label: 'Number of starting nodes',
                    min: 1,
                    max: 150,
                    value: 20
                }
            ],
            alertText: 'This action is going to delete your current graph! Save/download the graph if you need it later!',
            ok: {
                text: 'Run',
                callback(answer) {
                    okCallback(answer);
                }
            }
        })
    }

    static createStartGraphFromAnswer(answer) {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'createStartGraphFromAnswer');
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

        let data = {
            currentStep: this._currentStepIndex + 1,
            maxStep: this._steps.length,
            series: this.currentStep.lineChartData
        };

        eventHub.$emit('simulation-step-changed', data);
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

    nextStep(incrementWith = 1) {
        if (!this.currentStep.hasNextStep) {
            eventHub.$emit('simulation-pause');
            return;
        }

        if (this.currentStepIndex + incrementWith > (this._steps.length - 1)) {
            this.currentStepIndex = (this._steps.length - 1);
            return;
        }

        this.currentStepIndex += incrementWith;
    }

    lastStep() {
        this.currentStepIndex = this._steps.length - 1;
    }

}

export default DisplayedSimulation;
