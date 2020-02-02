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
     */
    static generateRandomGraph(numberOfNodes, numberOfEdges, simpleGraph = true, directed = false) {
        let nodes = Generator._generateNodes(numberOfNodes);

        let edges;

        if (simpleGraph) {
            edges = Generator.generateEdgesForFullGraph(nodes, directed);
            edges = Generator._removeEdgesUntilCount(edges, numberOfEdges);
        } else {
            edges = Tools.range(1, numberOfEdges).map(() => {
                let from = Math.floor(Math.random() * numberOfNodes) + 1;
                let to = Math.floor(Math.random() * numberOfNodes) + 1;

                return {from: from, to: to}
            });
        }

        // TODO: create a menu option like Degrees/Physics
        if (directed) {
            edges.map(edge => {
                edge.arrows = 'to';
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
            let index = Math.floor(Math.random() * (edges.length - 1));
            edges.splice(index, 1);
        }

        return edges;
    }

}

export default Generator;
