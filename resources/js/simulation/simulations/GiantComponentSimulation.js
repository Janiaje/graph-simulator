import SimulationStep from "../SimulationStep";
import DisplayedSimulation from "../DisplayedSimulation";
import Stopwatch from "../../Stopwatch/Stopwatch";
import Generator from "../../graph/Generator";

class GiantComponentSimulation extends DisplayedSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        return 'Giant Component';
    }

    /**
     * Returns the description for the simulation.
     *
     * @returns {string}
     */
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

    /**
     * Returns the starting Graph according to the answer given to the question.
     *
     * @param answer {Object}
     *
     * @returns {Graph}
     */
    static createStartGraphFromAnswer(answer) {
        return Generator.generateRandomGraph(answer.numberOfNodes, 0);
    }

    /**
     * Calculates the next step of the simulation from the given Graph.
     *
     * @param graph {Graph}
     *
     * @returns {SimulationStep}
     */
    _calculateNextStep(graph) {
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

    /**
     * Returns true if the linechart should be displayed.
     *
     * @returns {Boolean}
     */
    displayLineChart() {
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
