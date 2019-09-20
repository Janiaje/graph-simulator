import SimulationStep from "./SimulationStep";
import Graph from "../graph/Graph";
import Tools from "../graph/Tools";
import Stopwatch from "../Stopwatch/Stopwatch";

class BaseSimulation {

    get answer() {
        return this._answers;
    }

    /**
     * Calculate all the steps of the simulation.
     *
     * @param startGraph {Graph}
     * @param answers {Object}
     *
     * @returns {Array.<SimulationStep>}
     */
    simulate(startGraph, answers) {
        this._answers = answers;

        let steps = [];

        Stopwatch.start();

        for (
            let step = this._createFirstStep(startGraph);
            step !== null;
            step = this._calculateNextStep(Tools.clone(step.graph))
        ) {
            steps.push(step);
        }

        Stopwatch.results();

        this._lastStepHasNoNextStep(steps);

        if (this.displayLineChart()) {
            this._fillLineChartSeries(steps);
        }

        return steps;
    }

    /**
     * Creates the first step from the given Graph.
     *
     * @param graph {Graph}
     *
     * @returns {SimulationStep}
     */
    _createFirstStep(graph) {
        return new SimulationStep(graph, new Graph, false);
    }

    /**
     * Calculates the next step of the simulation from the given Graph.
     *
     * @param graph {Graph}
     *
     * @returns {SimulationStep}
     */
    _calculateNextStep(graph) {
        Tools.throwMethodNotImplemented(Tools.getClassName(this), '_calculateNextStep');
    }

    /**
     * Set the last SimulationStep's _hasNextStep flag to false.
     *
     * @param steps {Array.<SimulationStep>}
     */
    _lastStepHasNoNextStep(steps) {
        let lastStep = steps[steps.length - 1];
        lastStep.doesntHaveNextStep();
    }

    /**
     * Returns true if the linechart should be displayed.
     *
     * @returns {Boolean}
     */
    displayLineChart() {
        return false;
    };

    /**
     * Returns a coordinate for the given SimulationStep Graph for the lincechart.
     *
     * @param graph {Graph}
     * @param stepNumber {Number}
     *
     * @returns {Object}
     */
    _getLineChartCoordinate(graph, stepNumber) {
        Tools.throwMethodNotImplemented(Tools.getClassName(this), '_getLineChartCoordinate');
    }

    _fillLineChartSeries(steps) {
        let data = [];

        steps.forEach((step, index) => {
            data.push(this._getLineChartCoordinate(Tools.clone(step.graph), index + 1));

            step.lineChartData = [{
                name: 'Value',
                // name: 'Giant component fraction by connections',
                data: Tools.clone(data),
            }];
        })
    }

}

export default BaseSimulation;
