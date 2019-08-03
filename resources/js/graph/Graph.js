import Analyzer from "./Analyzer";
import Highlighter from "./Highlighter";
import Tools from "./Tools";

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
    }

    get nodes() {
        return this._nodes;
    }

    set nodes(value) {
        this._nodes = value;
    }

    get edges() {
        return this._edges;
    }

    set edges(value) {
        this._edges = value;
    }

    get directed() {
        return this._directed;
    }

    set directed(value) {
        this._directed = value;
    }

    get simple() {
        return this._simple;
    }

    set simple(value) {
        this._simple = value;
    }

    /**
     * Saves the positions of the nodes.
     */
    savePositions() {
        let positions = mainDisplayedGraph.network.getPositions();

        this.nodes.forEach((node) => {
            let position = positions[node.id];

            node.x = position.x;
            node.y = position.y;
        });
    }

    fillDegrees() {
        this._nodes.map((node) => {
            node.outgoingDegree = Tools.clone(this._edges).filter((edge) => {
                return edge.from === node.id;
            }).length;

            node.incomingDegree = Tools.clone(this._edges).filter((edge) => {
                return edge.to === node.id;
            }).length;

            node.degree = node.outgoingDegree + node.incomingDegree;

            return node;
        });
    }
}

// Trait method assigns
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Highlighter);

export default Graph;
