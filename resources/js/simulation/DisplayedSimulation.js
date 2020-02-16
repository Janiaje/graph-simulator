import BaseSimulation from "./BaseSimulation";
import Tools from "../graph/Tools";

class DisplayedSimulation extends BaseSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getSimulationName');
    }

    /**
     * Returns the description for the simulation.
     *
     * @returns {string}
     */
    static getDescription() {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'getDescription');
    }

    /**
     * Returns the alert text for the simulation.
     *
     * @returns {string}
     */
    static getAlertText() {
        return 'This action is going to delete your current graph! Save/download the graph if you need it later!';
    }

    /**
     * Returns the fields needed to run the simulation.
     *
     * @returns {Array.Object}
     */
    static getQuestionFields() {
        return [
            {
                id: 'numberOfNodes',
                type: 'number-with-boundaries',
                label: 'Number of starting nodes',
                min: 1,
                max: 150,
                value: 20
            }
        ];
    }

    /**
     * Asks question before running the simulation.
     *
     * @param okCallback {function(Object):void}
     */
    static askQuestionBeforeRun(okCallback) {
        eventHub.$emit('question', {
            header: `${this.getName()} simulation`,
            description: this.getDescription(),
            fields: this.getQuestionFields(),
            alertText: this.getAlertText(),
            ok: {
                text: 'Run',
                callback(answer) {
                    okCallback(answer);
                }
            }
        })
    }

    /**
     * Returns the starting Graph according to the answer given to the question.
     *
     * @param answer {Object}
     *
     * @returns {Graph}
     */
    static createStartGraphFromAnswer(answer) {
        Tools.throwMethodNotImplemented(Tools.getClassNameFromStaticScope(this), 'createStartGraphFromAnswer');
    }

    constructor(startGraph, answer) {
        super();

        this._steps = this.simulate(startGraph, answer);
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

    /**
     * Rewinds the simulation to the first step.
     */
    firstStep() {
        this.currentStepIndex = 0;
    }

    /**
     * Rewinds the simulation by 1 step.
     */
    previousStep() {
        if (!this.currentStep.hasPreviousStep) {
            return;
        }

        this.currentStepIndex--;
    }

    /**
     * Winds forward the simulation by the given steps.
     *
     * @param incrementWith {Number}
     */
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

    /**
     * Winds forward the simulation to the last step.
     */
    lastStep() {
        this.currentStepIndex = this._steps.length - 1;
    }

}

export default DisplayedSimulation;
