import Analyzer from "./Analyzer";
import Highlighter from "./Highlighter";
import Tools from "./Tools";
import Generator from "./Generator";

class Graph {

    /**
     * @param nodes Array
     * @param edges Array
     * @param directed Boolean
     * @param simple Boolean
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

    get remainingEdges() {
        if (this._remainingEdges === undefined) {
            let fullGraphEdges = Generator.generateEdgesForFullGraph(this.nodes, this.directed);
            this._remainingEdges = fullGraphEdges.filter(edge => !this.containsEdge(edge));
        }

        return this._remainingEdges;
    }

    get nodesKeyedById() {
        if (this._nodesKeyedById === undefined) {
            this._nodesKeyedById = Tools.sortArrayIntoObject(this._nodes);
        }

        return this._nodesKeyedById;
    }

    get edgesKeyedById() {
        if (this._edgesKeyedById === undefined) {
            this._edgesKeyedById = Tools.sortArrayIntoObject(this._edges);
        }

        return this._edgesKeyedById;
    }

    get edgesKeyedByFrom() {
        if (this._edgesKeyedByFrom === undefined) {
            this._edgesKeyedByFrom = Tools.groupBy(this._edges, 'from');
        }

        return this._edgesKeyedByFrom;
    }

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

    addRandomEdge() {
        let edge;

        if (this.simple) {
            if (this.remainingEdges.length === 0) {
                return undefined;
            }

            edge = this.remainingEdges[Math.floor(Math.random() * this.remainingEdges.length)];

            Tools.splice(this._remainingEdges, edge, (a, b) => a.id === b.id);
        } else {
            let from = this.nodes[Math.floor(Math.random() * this.nodes.length)].id;
            let to = this.nodes[Math.floor(Math.random() * this.nodes.length)].id;

            edge = Generator.generateEdge(from, to);
        }

        this.addEdge(edge);

        return edge;
    }

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

        this._components = undefined;
        this._largestComponent = undefined;
    }

}

// Trait method assigns
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Highlighter);

export default Graph;
