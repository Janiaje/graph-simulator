import Analyzer from "./Analyzer";
import Simulator from "./Simulator";

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
}

// Trait method assigns
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Simulator);

export default Graph;
