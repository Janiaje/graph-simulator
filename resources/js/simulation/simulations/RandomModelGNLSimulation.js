import SimulationStep from "../SimulationStep";
import DisplayedSimulation from "../DisplayedSimulation";
import Generator from "../../graph/Generator";
import Graph from "../../graph/Graph";

class RandomModelGNLSimulation extends DisplayedSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        return 'Random model - G(N,L) model';
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
                <li>Generate <b>N</b> number of nodes</li>
                <li>Take a random node pair</li>
                <li>Generate an edge between them</li>
                <li>Repeat the last 2 steps until <b>L</b> number of edges reached</li>
            </ol>
        `;
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
                col: 'col-6',
                type: 'input-number-with-boundaries',
                label: 'Number of starting nodes',
                prepend: 'N',
                min: 1,
                max: 150,
                value: 20,
                append: 'pcs',
            },
            {
                id: 'numberOfEdges',
                col: 'col-6',
                type: 'input-number-with-boundaries',
                label: 'Number of edges',
                prepend: 'L',
                min: 0,
                max: 1000,
                value: 50,
                append: 'pcs',
            }
        ];
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
     * @param previousStep {SimulationStep}
     *
     * @returns {SimulationStep}
     */
    _calculateNextStep(graph, previousStep) {

        if (this.answer.numberOfEdges <= graph.edges.length) {
            return null;
        }

        let randomEdge = graph.addRandomEdge();

        if (randomEdge === undefined) {
            return null;
        }

        let nodes = [
            graph.nodesKeyedById[randomEdge.from],
            graph.nodesKeyedById[randomEdge.to]
        ];

        let edges = [
            randomEdge
        ];

        let graphToHighlight = new Graph(nodes, edges);

        return new SimulationStep(graph, graphToHighlight);
    }

}

export default RandomModelGNLSimulation;
