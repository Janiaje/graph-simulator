import vis from 'vis'
import Analyzer from "./Analyzer";
import Generator from "./Generator";
import Parser from "./Parser";
import Tools from "./Tools";
import Simulator from "./Simulator";

class Graph {

    /**
     * @param container HTML element
     * @param options Object
     */
    constructor(container, options = {}) {
        this._options = options;

        this._nodes = new vis.DataSet();
        this._edges = new vis.DataSet();
        this._directed = false;

        this._network = new vis.Network(container, {
            nodes: this._nodes,
            edges: this._edges
        }, this._options);

        if (Object.entries(this._options).length === 0) {
            this._options = this._network.defaultOptions;
        }

        // Parser part

        this._exportNodeListFormat = [
            'id',
            'label',
        ];

        this._exportEdgeListFormat = [
            'id',
            'from',
            'to',
            'arrows',
        ];

        // Simulation part

        var nodes = new vis.DataSet([
            {id: 1, label: 'html color', color: 'lime'},
            {id: 2, label: 'rgb color', color: 'rgb(255,168,7)'},
            {id: 3, label: 'hex color', color: '#7BE141'},
            {id: 4, label: 'rgba color', color: 'rgba(97,195,238,0.5)'},
            {id: 5, label: 'colorObject', color: {background: 'pink', border: 'purple'}},
            {
                id: 6,
                label: 'colorObject + highlight',
                color: {background: '#F03967', border: '#713E7F', highlight: {background: 'red', border: 'black'}}
            },
            {
                id: 7,
                label: 'colorObject + highlight + hover',
                color: {
                    background: 'cyan',
                    border: 'blue',
                    highlight: {background: 'red', border: 'blue'},
                    hover: {background: 'white', border: 'red'}
                }
            }
        ])

        this._nodeColor = false;
        this._nodeHoverColor = false;
        this._nodeHighlightColor = false;
        this._nodeSimulationStepColor = false;
        this._nodeSimulationStepHoverColor = false;
        this._nodeSimulationStepHighlightColor = false;

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
        let parent = Tools.accessObjectPropertyByString(this._options, parentString);

        parent[key] = value;

        this._updateOptions();
    }

}

// TODO: Graph should only contain methods to handle UI calls?

// Trait method assigns
Object.assign(Graph.prototype, Parser);
Object.assign(Graph.prototype, Generator);
Object.assign(Graph.prototype, Analyzer);
Object.assign(Graph.prototype, Simulator);

export default Graph;
