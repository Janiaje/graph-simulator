import vis from 'vis'
import Analyzer from "./Analyzer";
import Generator from "./Generator";
import Parser from "./Parser";
import Tools from "./Tools";

class Graph {

    /**
     * @param container HTML element
     * @param options Object
     */
    constructor(container, options = {}) {
        this._options = options;

        this._nodes = new vis.DataSet();
        this._edges = new vis.DataSet();

        this._network = new vis.Network(container, {
            nodes: this._nodes,
            edges: this._edges
        }, this._options);

        // Parser part

        this._exportNodeListFormat = [
            'id',
            'label',
        ];

        this._exportEdgeListFormat = [
            'id',
            'from',
            'to',
        ];
    }

    /**
     * Delete all nodes and edges.
     */
    clearGraph() {
        this._nodes.clear();
        this._edges.clear();
    }

    /**
     * Updates the graph to only show the given nodes and edges.
     *
     * @param nodes Array.<Object>
     * @param edges Array.<Object>
     */
    _updateGraph(nodes, edges) {
        this.clearGraph();

        this._nodes.add(nodes);
        this._edges.add(edges);
    }

    /**
     * Updates the graph's options.
     */
    _updateOptions() {
        this._network.setOptions(this._options);
    }

    /**
     * Turns physics on/off.
     *
     * @param allowed Boolean
     */
    physicsAllowed(allowed) {
        let physics = this._options.physics;

        if (physics === undefined) {
            physics = {};
        }

        physics.enabled = allowed;

        this._options.physics = physics;

        this._updateOptions();
    }

    /**
     * Turns physics on/off.
     *
     * @param on Boolean
     */
    lowGravity(on) {
        let physics = {};

        if (on === true) {
            physics = {
                stabilization: false,
                barnesHut: {
                    gravitationalConstant: -10000,
                    springConstant: 0.002,
                    springLength: 150
                }
            };
        } else {
            physics = {
                stabilization: {
                    enabled: true,
                    iterations: 1000,
                    updateInterval: 50,
                    onlyDynamicEdges: false,
                    fit: true,
                },
                barnesHut: {
                    gravitationalConstant: -2000,
                    springConstant: 0.04,
                    springLength: 95
                }
            };
        }

        this._options.physics = physics;

        this._updateOptions();
    }

    /**
     * Change network options.
     *
     * @param key String
     * @param value
     */
    changeOptions(key, value) {
        let keyParts = key.split('.');
        key = keyParts.pop();

        let parentString = keyParts.join('.');
        let parent = this.accessObjectByString(parentString);

        parent[key] = value;

        this._updateOptions();
    }

}

// Trait method assigns
Object.assign(Graph.prototype, Tools);
Object.assign(Graph.prototype, Parser);
Object.assign(Graph.prototype, Generator);
Object.assign(Graph.prototype, Analyzer);

export default Graph;
