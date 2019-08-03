import Tools from "./Tools";
import Graph from "./Graph";

class Generator {
    /**
     * Generate random graph
     * .
     * @param numberOfNodes Integer
     * @param numberOfEdges Integer
     * @param simpleGraph Boolean
     * @param directed Boolean
     */
    static generateRandomGraph(numberOfNodes, numberOfEdges, simpleGraph = true, directed = false) {
        let nodes = Generator._generateNodes(numberOfNodes);

        let edges;

        if (simpleGraph) {
            edges = this._generateEdgesForFullGraph(nodes, directed);
            edges = Generator._removeEdgesUntilCount(edges, numberOfEdges);
        } else {
            edges = Tools.range(1, numberOfEdges).map(() => {
                let from = Math.floor(Math.random() * numberOfNodes) + 1;
                let to = Math.floor(Math.random() * numberOfNodes) + 1;

                return {from: from, to: to}
            });
        }

        if (directed) {
            edges.map((edge) => {
                edge.arrows = 'to';
                return edge;
            });
        }

        return new Graph(nodes, edges, directed);
    }

    /**
     * Generate nodes.
     *
     * @param numberOfNodes Integer
     */
    static _generateNodes(numberOfNodes) {
        return Tools.range(1, numberOfNodes).map((value) => {
            return {id: value, label: 'Node ' + value}
        });
    }

    /**
     * Generate edges for full graph.
     *
     * @param nodes Array
     * @param directed Boolean
     */
    static _generateEdgesForFullGraph(nodes, directed) {
        let edges = [];

        nodes.forEach((fromNode, index) => {
            let toNodes = Tools.clone(nodes);

            if (directed) {
                // Don't allow loop edges
                toNodes.splice(index - 1, 1);
            } else {
                // Don't allow loop edges AND parallel edges
                toNodes.splice(0, index + 1);
            }

            toNodes.forEach((toNode) => {
                edges.push({
                    from: fromNode.id,
                    to: toNode.id
                })
            })
        });

        return edges;
    }

    /**
     * Deletes random elements of an array until the give count is reached.
     *
     * @param edges Array.<Object>
     * @param numberOfEdges Integer
     *
     * @returns {Array.<Object>}
     */
    static _removeEdgesUntilCount(edges, numberOfEdges) {
        while (edges.length > numberOfEdges) {
            let index = Math.floor(Math.random() * (edges.length - 1));
            edges.splice(index, 1);
        }

        return edges;
    }

    /**
     * Generates a random edge to the given graph.
     *
     * @param graph Graph
     *
     * @returns {{from: *, to: *}}
     */
    static randomEdge(graph) {
        if (!graph.simple) {
            let from = graph.nodes[Math.floor(Math.random() * graph.nodes.length)].id;
            let to = graph.nodes[Math.floor(Math.random() * graph.nodes.length)].id;

            return {
                id: `from${from}-to${to}-${Tools.getEpochTime()}`,
                from: from,
                to: to,
            };
        }

        let fullGraphEdges = this._generateEdgesForFullGraph(graph.nodes, graph.directed);
        let existingEdges = graph.edges;
        let remainingEdges = fullGraphEdges.filter((edge) => {
            return !Tools.edgeInArray(existingEdges, edge);
        });

        return remainingEdges[Math.floor(Math.random() * remainingEdges.length)];
    }
}

export default Generator;
