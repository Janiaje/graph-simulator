import SimulationStep from "../SimulationStep";
import DisplayedSimulation from "../DisplayedSimulation";
import Generator from "../../graph/Generator";
import Graph from "../../graph/Graph";

class RandomModelGNPSimulation extends DisplayedSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        return 'Random model - G(N,p) model';
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
                <li>Generate an edge between each node with the given probability</li>            
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
                id: 'probability',
                type: 'number',
                label: 'Probability for edge generation',
                min: 0,
                max: 100,
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

        if (this._steps === undefined) {
            this._steps = graph.remainingEdges;
        }

        // If all the remaining edges are checked
        if (this._steps.length === 0) {
            return null;
        }

        let remainingEdge = this._steps.shift();

        let nodes = [
            graph.nodesKeyedById[remainingEdge.from],
            graph.nodesKeyedById[remainingEdge.to]
        ];

        let edges = [];

        // Random boolean with the given probability of being true
        if (Math.random() < (this.answer.probability / 100)) {
            graph.addEdge(remainingEdge);
            edges.push(remainingEdge);
        }

        let graphToHighlight = new Graph(nodes, edges);

        return new SimulationStep(graph, graphToHighlight);
    }

}

export default RandomModelGNPSimulation;
