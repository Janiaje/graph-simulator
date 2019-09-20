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
                <li>Generate the given number of nodes</li>            
                <li>Take a random node pair</li>            
                <li>Generate an edge between them</li>            
                <li>Repeat the last 2 steps until L number of edges reached</li>            
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
                type: 'number',
                label: 'Number of starting nodes',
                min: 1,
                max: 150,
                value: 20
            },
            {
                id: 'numberOfEdges',
                type: 'number',
                label: 'Number of edges',
                min: 0,
                max: 1000,
                value: 50
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
     *
     * @returns {SimulationStep}
     */
    _calculateNextStep(graph) {

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
