import SimulationStep from "../SimulationStep";
import Graph from "../../graph/Graph";
import DisplayedSimulation from "../DisplayedSimulation";

class DijkstraSimulation extends DisplayedSimulation {

    /**
     * Returns the name to display for the simulation.
     *
     * @returns {string}
     */
    static getName() {
        return 'Dijkstra algorithm';
    }

    /**
     * Returns the description for the simulation.
     *
     * @returns {string}
     */
    static getDescription() {
        // TODO: descriptions + wiki links
        return `
            TODO description
        `;
    }

    /**
     * Returns the fields needed to run the simulation.
     *
     * @returns {Array.Object}
     */
    static getQuestionFields() {
        // TODO: preconditionCheck!!!!
        let options = mainDisplayedGraph.graph.nodes.map((node) => {
            return {
                text: node.label,
                value: node.id
            };
        });
        return [
            {
                id: 'startingPoint',
                type: 'select',
                label: 'Choose starting point',
                options: options,
                value: options[0].value
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
        return mainDisplayedGraph.graph;
    }

    /**
     * Creates the first step from the given Graph.
     *
     * @param graph {Graph}
     * @param answers {Object}
     *
     * @returns {SimulationStep}
     */
    _createFirstStep(graph, answers) {
        let reachedNodes = {};
        reachedNodes[answers.startingPoint] = true;
        graph.dijkstra_reachedNodes = reachedNodes;

        graph.dijkstra_unReachedNodes = graph.nodes
            .filter((node) => node.id !== answers.startingPoint)
            .map((node) => node.id);

        let distances = {};
        graph.nodes.forEach((node) => {
            return distances[node.id] = {
                value: null,
                usingEdgeId: null
            };
        });
        distances[answers.startingPoint] = {
            value: 0,
            usingEdgeId: null
        };
        this._updateDistances(graph, answers.startingPoint, distances, reachedNodes);
        graph.dijkstra_distances = distances;


        let nodes = [graph.nodesKeyedById[answers.startingPoint]];
        let toHighlight = new Graph(nodes);
        return new SimulationStep(graph, toHighlight, false);
    }

    _updateDistances(graph, startingPoint, distances, reachedNodes) {
        let edgesKeyedByFrom = graph.edgesKeyedByFrom[startingPoint];
        if (edgesKeyedByFrom !== undefined) {
            this._updateDistancesByDirection(edgesKeyedByFrom, distances, reachedNodes, "to");
        }

        let edgesKeyedByTo = graph.edgesKeyedByTo[startingPoint];
        if (!graph.directed && edgesKeyedByTo !== undefined) {
            this._updateDistancesByDirection(edgesKeyedByTo, distances, reachedNodes, "from");
        }
    }

    _updateDistancesByDirection(edges, distances, reachedNodes, direction) {
        edges.forEach((edge) => {
            let currentDistance = distances[edge[direction]].value;
            if (
                (currentDistance != null && currentDistance <= edge.weight)
                || reachedNodes[edge[direction]]

            ) {
                return;
            }

            distances[edge[direction]] = {
                value: edge.weight,
                usingEdgeId: edge.id
            };
        });
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
        let distances = graph.dijkstra_distances;
        let reachedNodes = graph.dijkstra_reachedNodes;
        let unReachedNodes = graph.dijkstra_unReachedNodes;

        let cannotReachMore = true;
        unReachedNodes.forEach((nodeId) => {
            if (distances[nodeId].value !== null) {
                cannotReachMore = false;
            }
        });

        if (unReachedNodes.length === 0 || cannotReachMore) {
            return null;
        }

        let minDistance = {
            toNode: null,
            value: null,
            usingEdgeId: null
        };

        unReachedNodes.forEach((nodeId) => {
            let distance = distances[nodeId];
            if (
                distance.value !== null
                && (
                    minDistance.value === null
                    || distance.value < minDistance.value
                )
            ) {
                minDistance = distance;
                minDistance.toNode = nodeId;
            }
        });

        reachedNodes[minDistance.toNode] = true;
        unReachedNodes.splice(unReachedNodes.indexOf(minDistance.toNode), 1);
        distances[minDistance.toNode] = {
            value: 0,
            usingEdgeId: null
        };

        this._updateDistances(graph, minDistance.toNode, distances, reachedNodes);

        let nodes = previousStep.highLighted.nodes;
        nodes.push(graph.nodesKeyedById[minDistance.toNode]);
        let edges = previousStep.highLighted.edges;
        edges.push(graph.edgesKeyedById[minDistance.usingEdgeId]);
        let toHighLight = new Graph(nodes, edges);

        return new SimulationStep(graph, toHighLight);
    }

    /**
     * Returns true if the linechart should be displayed.
     *
     * @returns {Boolean}
     */
    displayLineChart() {
        return false;
    };

}

export default DijkstraSimulation;
