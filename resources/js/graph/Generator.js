import Tools from "./Tools";
import Graph from "./Graph";
import Node from "./Node";
import Edge from "./Edge";

class Generator {
    /**
     * Generate random graph.
     * .
     * @param numberOfNodes {Integer}
     * @param numberOfEdges {Integer}
     * @param simpleGraph {Boolean}
     * @param directed {Boolean}
     * @param weighted {Boolean}
     * @param minWeight {Integer}
     * @param maxWeight {Integer}
     */
    static generateRandomGraph(
        numberOfNodes,
        numberOfEdges,
        simpleGraph = true,
        directed = false,
        weighted = false,
        minWeight = 1,
        maxWeight = 100
    ) {
        let nodes = Generator._generateNodes(numberOfNodes);

        let edges;

        if (simpleGraph) {
            edges = Generator.generateEdgesForFullGraph(nodes, directed);
            edges = Generator._removeEdgesUntilCount(edges, numberOfEdges);
        } else {
            edges = Tools.range(1, numberOfEdges).map(() => {
                let from = Tools.randomIntBetween(1, numberOfNodes);
                let to = Tools.randomIntBetween(1, numberOfNodes);

                return new Edge(from, to);
            });
        }

        // TODO: create a menu option like Degrees/Physics
        // TODO: update mainDisplayGraph options instead of this
        if (directed) {
            edges = edges.map(edge => {
                edge.arrows = 'to';
                return edge;
            });
        }

        if (weighted) {
            edges = edges.map(edge => {
                edge.weight = Tools.randomIntBetween(minWeight, maxWeight);
                return edge;
            });
        }

        return new Graph(nodes, edges, directed);
    }

    /**
     * Generate nodes.
     *
     * @param numberOfNodes {Integer}
     */
    static _generateNodes(numberOfNodes) {
        return Tools.range(1, numberOfNodes).map(value => {
            return new Node(value, '#' + value);
        });
    }

    /**
     * Generate edges for full graph.
     *
     * @param nodes {Array}
     * @param directed {Boolean}
     */
    static generateEdgesForFullGraph(nodes, directed) {
        let edges = [];

        nodes.forEach((fromNode, index) => {
            let toNodes = Tools.clone(nodes);

            if (directed) {
                // Don't allow loop edges
                toNodes.splice(index, 1);
            } else {
                // Don't allow loop edges AND parallel edges
                toNodes.splice(0, index + 1);
            }

            toNodes.forEach(toNode => {
                edges.push(new Edge(fromNode.id, toNode.id))
            })
        });

        return edges;
    }

    /**
     * Deletes random elements of an array until the give count is reached.
     *
     * @param edges {Array.<Object>}
     * @param numberOfEdges {Integer}
     *
     * @returns {Array.<Object>}
     */
    static _removeEdgesUntilCount(edges, numberOfEdges) {
        while (edges.length > numberOfEdges) {
            let index = Tools.randomIntBetween(0, edges.length - 1);
            edges.splice(index, 1);
        }

        return edges;
    }

}

export default Generator;
