import Analyzer from "./Analyzer";
import Simulator from "./Simulator";

class Graph {

    /**
     * @param nodes Array
     * @param edges Array
     * @param directed Boolean
     */
    constructor(nodes = [], edges = [], directed = false) {
        this._nodes = nodes;
        this._edges = edges;
        this._directed = directed;
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
}

// Trait method assigns
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Simulator);

export default Graph;
