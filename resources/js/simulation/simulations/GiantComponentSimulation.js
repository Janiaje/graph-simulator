import SimulationStep from "../SimulationStep";
import Graph from "../../graph/Graph";
import DisplayedSimulation from "../DisplayedSimulation";
import Stopwatch from "../../Stopwatch/Stopwatch";

class GiantComponentSimulation extends DisplayedSimulation {

    _createFirstStep(graph) {
        // TODO: make question about only nodes
        graph.edges = [];

        return new SimulationStep(graph, new Graph, false);
    }

    _calculateNextStep(graph) {
        // TODO: not working correctly for simple directed graphs

        Stopwatch.newCycle();

        // If the giant component reached the graph's size
        if (graph.getLargestComponent().nodes.length === graph.nodes.length) {
            return null;
        }

        Stopwatch.checkpoint(111);

        let randomEdge = graph.addRandomEdge();

        if (randomEdge === undefined) {
            return null;
        }

        Stopwatch.checkpoint(222);

        let simulationStep = new SimulationStep(graph, graph.getLargestComponent());

        Stopwatch.checkpoint(333);

        return simulationStep;
    }

    _isLineChartDisplayed() {
        return true;
    };

    _getLineChartCoordinate(currentStep) {
        let numberOfNodes = currentStep.graph.nodes.length;
        let graph = currentStep.graph;
        let largestComponent = graph.getLargestComponent();
        let largestComponentPercentage = largestComponent.nodes.length / numberOfNodes;
        let connectionsPerNode = (graph.edges.length * 2) / graph.nodes.length;

        return {
            x: connectionsPerNode.toFixed(2),
            y: largestComponentPercentage.toFixed(2)
        };
    }

}

export default GiantComponentSimulation;
