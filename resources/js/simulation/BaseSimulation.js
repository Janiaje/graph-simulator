import SimulationStep from "./SimulationStep";
import Graph from "../graph/Graph";
import Tools from "../graph/Tools";
import Stopwatch from "../Stopwatch/Stopwatch";

class BaseSimulation {

    simulate(startGraph) {
        let steps = [];

        Stopwatch.start();

        for (
            let step = this._createFirstStep(Tools.clone(startGraph));
            step !== null;
            step = this._calculateNextStep(Tools.clone(step.graph))
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

    _calculateNextStep(graph) {
        Tools.throwMethodNotImplemented(Tools.getClassName(this), '_calculateNextStep');
    }

    _lastStepHasNoNextStep(steps) {
        let lastStep = steps[steps.length - 1];
        lastStep.doesntHaveNextStep();
    }

    _isLineChartDisplayed() {
        return false;
    };

    _getLineChartCoordinate(currentStep) {
        Tools.throwMethodNotImplemented(Tools.getClassName(this), '_getLineChartCoordinate');
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

}

export default BaseSimulation;
