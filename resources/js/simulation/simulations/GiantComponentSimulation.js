import SimulationStep from "../SimulationStep";
import DisplayedSimulation from "../DisplayedSimulation";
import Stopwatch from "../../Stopwatch/Stopwatch";
import Generator from "../../graph/Generator";

class GiantComponentSimulation extends DisplayedSimulation {

    static getDisplayedName() {
        return 'Giant Component';
    }

    static getDescription() {
        // TODO: descriptions + wiki links
        return `
            Steps:
            <ol>
                <li>Generate the given number of nodes</li>            
                <li>Randomly add edges one by one</li>            
                <li>If the giant component includes all the nodes: STOP</li>            
            </ol>
        `;
    }

    static createStartGraphFromAnswer(answer) {
        return Generator.generateRandomGraph(answer.numberOfNodes, 0);
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

    isLineChartDisplayed() {
        return true;
    };

    _getLineChartCoordinate(graph) {
        let numberOfNodes = graph.nodes.length;
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
