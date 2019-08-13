import SimulationStep from "./SimulationStep";
import Graph from "../graph/Graph";
import Tools from "../graph/Tools";
import Stopwatch from "../Stopwatch/Stopwatch";

class BaseSimulation {

    simulate(startGraph) {
        let steps = [];

        for (
            let step = this._createFirstStep(Tools.clone(startGraph));
            step !== null;
            step = this._calculateNextStep(Tools.clone(step))
        ) {
            // TODO: rearrange the graph?

            steps.push(step);
        }

        Stopwatch.results();

        this._lastStepHasNoNextStep(steps);

        if (this._isLineChartDisplayed()) {
            this._fillLineChartSeries(steps);
        }

        return steps;
    }

    _createFirstStep(graph) {
        return new SimulationStep(graph, new Graph, false);
    }

    _calculateNextStep(currentStep) {
        BaseSimulation._throwMethodNotImplemented('_calculateNextStep');
    }

    _lastStepHasNoNextStep(steps) {
        let lastStep = steps[steps.length - 1];
        lastStep.doesntHaveNextStep();
    }

    _isLineChartDisplayed() {
        return false;
    };

    _getLineChartCoordinate(currentStep) {
        BaseSimulation._throwMethodNotImplemented('_getLineChartCoordinate');
    }

    _fillLineChartSeries(steps) {
        let data = [];

        steps.forEach((step) => {
            data.push(this._getLineChartCoordinate(Tools.clone(step)));

            step.lineChartData = [{
                name: 'Value',
                // name: 'Giant component fraction by connections',
                data: Tools.clone(data),
            }];
        })
    }

    static _throwMethodNotImplemented(methodName) {
        throw `'${methodName}' static method is not implemented in the simulation`;
    }

}

export default BaseSimulation;
