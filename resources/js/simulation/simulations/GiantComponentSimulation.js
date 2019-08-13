import SimulationStep from "../SimulationStep";
import Graph from "../../graph/Graph";
import Generator from "../../graph/Generator";
import DisplayedSimulation from "../DisplayedSimulation";

class GiantComponentSimulation extends DisplayedSimulation {

    _createFirstStep(graph) {
        // TODO: make question about only nodes
        graph.edges = [];

        return new SimulationStep(graph, new Graph, false);
    }

    _calculateNextStep(currentStep) {
        // TODO: not working correctly for simple directed graphs

        let graph = currentStep.graph;

        // If the giant component reached the graph's size
        if (graph.getLargestComponent().nodes.length === graph.nodes.length) {
            return null;
        }

        let randomEdge = Generator.randomRemainingEdge(graph);

        if (randomEdge === undefined) {
            return null;
        }

        // Must call the setter to clear cache !!!
        graph.edges = graph.edges.concat(randomEdge);

        return new SimulationStep(graph, graph.getLargestComponent());
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
