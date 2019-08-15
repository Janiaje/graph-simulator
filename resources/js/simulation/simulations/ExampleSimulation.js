import BaseSimulation from "../BaseSimulation";
import SimulationStep from "../SimulationStep";

class ExampleSimulation extends BaseSimulation {

    static getDisplayedName() {
        return 'Example simulation';
    }

    _calculateNextStep(graph) {

        if (noMoreSteps) {
            return null;
        }

        // Do something with the graph

        return new SimulationStep(graph);
    }

    _isLineChartDisplayed() {
        return true;
    };

    _getLineChartCoordinate(graph, stepNumber) {
        return {
            x: stepNumber,
            y: graph.nodes.length
        };
    }

}
