import Analyzer from "./Analyzer";
import Highlighter from "./Highlighter";
import Tools from "./Tools";
import Generator from "./Generator";
import Edge from "./Edge";

class Graph {

    /**
     * @param nodes {Array.<Object>}
     * @param edges {Array.<Object>}
     * @param directed {Boolean}
     * @param simple {Boolean}
     */
    constructor(nodes = [], edges = [], directed = false, simple = true) {
        this._nodes = nodes;
        this._edges = edges;
        this._directed = directed;
        this._simple = simple;

        this._remainingEdges = undefined;

        this._nodesKeyedById = undefined;
        this._edgesKeyedById = undefined;
        this._edgesKeyedByFrom = undefined;
        this._edgesKeyedByTo = undefined;
    }

    get nodes() {
        return this._nodes;
    }

    set nodes(value) {
        this._nodesKeyedById = undefined;
        this._remainingEdges = undefined;

        this._nodes = value;
    }

    get edges() {
        return this._edges;
    }

    set edges(value) {
        this._edgesKeyedById = undefined;
        this._edgesKeyedByFrom = undefined;
        this._edgesKeyedByTo = undefined;
        this._remainingEdges = undefined;

        this._edges = value;
    }

    get directed() {
        return this._directed;
    }

    set directed(value) {
        this._remainingEdges = undefined;

        this._directed = value;
    }

    get simple() {
        return this._simple;
    }

    set simple(value) {
        this._remainingEdges = undefined;

        this._simple = value;
    }

    /**
     * Returns the remaining edges to make a simple full graph.
     *
     * @returns {Array.<Object>|undefined}
     */
    get remainingEdges() {
        if (!this.simple) {
            return undefined;
        }

        if (this._remainingEdges === undefined) {
            let fullGraphEdges = Generator.generateEdgesForFullGraph(this.nodes, this.directed);
            this._remainingEdges = fullGraphEdges.filter(edge => !this.containsEdge(edge));
        }

        return this._remainingEdges;
    }

    /**
     * Returns an Object keyed with the IDs of the nodes.
     *
     * @returns {Object}
     */
    get nodesKeyedById() {
        if (this._nodesKeyedById === undefined) {
            this._nodesKeyedById = Tools.sortArrayIntoObject(this._nodes);
        }

        return this._nodesKeyedById;
    }

    /**
     * Returns an Object keyed with the IDs of the edges.
     *
     * @returns {Object}
     */
    get edgesKeyedById() {
        if (this._edgesKeyedById === undefined) {
            this._edgesKeyedById = Tools.sortArrayIntoObject(this._edges);
        }

        return this._edgesKeyedById;
    }

    /**
     * Returns an Object keyed with the 'from' IDs of the edges.
     *
     * @returns {Object}
     */
    get edgesKeyedByFrom() {
        if (this._edgesKeyedByFrom === undefined) {
            this._edgesKeyedByFrom = Tools.groupBy(this._edges, 'from');
        }

        return this._edgesKeyedByFrom;
    }

    /**
     * Returns an Object keyed with the 'to' IDs of the edges.
     *
     * @returns {Object}
     */
    get edgesKeyedByTo() {
        if (this._edgesKeyedByTo === undefined) {
            this._edgesKeyedByTo = Tools.groupBy(this._edges, 'to');
        }

        return this._edgesKeyedByTo;
    }

    /**
     * Saves the positions of the nodes.
     */
    savePositions() {
        let positions = mainDisplayedGraph.network.getPositions();

        this.nodes.forEach(node => {
            let position = positions[node.id];

            node.x = position.x;
            node.y = position.y;
        });
    }

    /**
     * Adds a random edge to the Graph.
     *
     * @returns {Object|null}
     */
    addRandomEdge() {
        let edge;

        if (this.simple) {
            if (this.remainingEdges.length === 0) {
                return undefined;
            }

            edge = this.remainingEdges[Tools.randomIntBetween(0, this.remainingEdges.length)];

            Tools.spliceById(this._remainingEdges, edge);
        } else {
            let from = this.nodes[Tools.randomIntBetween(0, this.nodes.length)].id;
            let to = this.nodes[Tools.randomIntBetween(0, this.nodes.length)].id;

            edge = new Edge(from, to);
        }

        this.addEdge(edge);

        return edge;
    }

    /**
     * Adds the given edge to the Graph.
     *
     * @param edge {Object}
     */
    addEdge(edge) {
        this._edges.push(edge);

        if (this._edgesKeyedById !== undefined) {
            this._edgesKeyedById[edge.id] = edge
        }

        if (this._edgesKeyedByFrom !== undefined) {
            let fromEdges = this._edgesKeyedByFrom[edge.from];

            if (fromEdges === undefined) {
                fromEdges = [];
            }

            fromEdges.push(edge);

            this._edgesKeyedByFrom[edge.from] = fromEdges;
        }

        if (this._edgesKeyedByTo !== undefined) {
            let toEdges = this._edgesKeyedByTo[edge.to];

            if (toEdges === undefined) {
                toEdges = [];
            }

            toEdges.push(edge);

            this._edgesKeyedByTo[edge.to] = toEdges;
        }

        let edgeKey;
        if (
            this._remainingEdges !== undefined
            && (
                this._edgesKeyedById === undefined
                || this.edgesKeyedById[edge.id] !== undefined
            )
            && (
                false !== (edgeKey = this.edgeInList(edge, this._remainingEdges, this.directed))
            )
        ) {
            this._remainingEdges.splice(edgeKey, 1);
        }

        this._components = undefined;
        this._largestComponent = undefined;
    }

    /**
     * Updates the given edge.
     *
     * @param edge {Object}
     */
    editEdge(edge) {
        this.edgesKeyedById[edge.id] = edge;
    }

    /**
     * Removes the given edge from the Graph.
     *
     * @param edge {Object}
     */
    removeEdge(edge) {
        Tools.spliceById(this._edges, edge);

        if (this._edgesKeyedById !== undefined) {
            this._edgesKeyedById[edge.id] = undefined
        }

        if (
            this._edgesKeyedByFrom !== undefined
            && this._edgesKeyedByFrom[edge.from] !== undefined
        ) {
            Tools.spliceById(this._edgesKeyedByFrom[edge.from], edge);
        }

        if (
            this._edgesKeyedByTo !== undefined
            && this._edgesKeyedByFrom[edge.to] !== undefined
        ) {
            Tools.spliceById(this._edgesKeyedByFrom[edge.to], edge);
        }

        if (this._remainingEdges !== undefined) {
            this._remainingEdges.push(edge);
        }

        this._components = undefined;
        this._largestComponent = undefined;
    }

    /**
     * Adds the given node to the Graph.
     *
     * @param node {Object}
     */
    addNode(node) {
        this._nodes.push(node);

        if (this._nodesKeyedById !== undefined) {
            this._nodesKeyedById[node.id] = node;
        }

        if (this._components !== undefined) {
            this._components.push(new Graph([node, [], this.directed, this.simple]));
        }
    }

    /**
     * Updates the given node.
     *
     * @param node {Object}
     */
    editNode(node) {
        this.nodesKeyedById[node.id] = node;
    }

    /**
     * Removes the given node (and the associated edges) from the Graph.
     *
     * @param node {Object}
     */
    removeNode(node) {
        Tools.spliceById(this._nodes, node);

        if (this._nodesKeyedById !== undefined) {
            this._nodesKeyedById[node.id] = undefined;
        }

        if (this.edgesKeyedByFrom[node.id] !== undefined) {
            this.edgesKeyedByFrom[node.id].forEach(edge => this.removeEdge(edge));
        }

        if (this.edgesKeyedByTo[node.id] !== undefined) {
            this.edgesKeyedByTo[node.id].forEach(edge => this.removeEdge(edge));
        }

        this._components = undefined;
        this._largestComponent = undefined;
    }

    /**
     * Updates the nodes' titles to show the degrees of the nodes.
     */
    showDegrees() {
        this._fillDegrees();

        this._nodes.map(node => {
            node.originalLabel = node.label;

            if (this.directed) {
                node.label = `${node.label} (${node.outgoingDegree}|${node.incomingDegree})`
            } else {
                node.label = `${node.label} (${node.degree})`
            }
        });
    }

    /**
     * Updates the nodes' titles to hide the degrees of nodes.
     */
    hideDegrees() {
        this._nodes.map(node => {
            if (node.originalLabel === undefined) {
                return;
            }

            node.label = node.originalLabel;
        });
    }

}

// Trait method assigns
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Highlighter);

export default Graph;
