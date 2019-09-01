import BaseSimulation from "../BaseSimulation";
import SimulationStep from "../SimulationStep";

class ExampleSimulation extends BaseSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        return 'Example simulation';
    }

    /**
     * Calculates the next step of the simulation from the given Graph.
     *
     * @param graph {Graph}
     *
     * @returns {SimulationStep}
     */
    _calculateNextStep(graph) {

        if (noMoreSteps) {
            return null;
        }

        // Do something with the graph

        return new SimulationStep(graph);
    }

    /**
     * Returns true if the linechart should be displayed.
     *
     * @returns {Boolean}
     */
    isLineChartDisplayed() {
        return true;
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
        return {
            x: stepNumber,
            y: graph.nodes.length
        };
    }

}
