import vis from "vis";
import Parser from "./Parser";
import Graph from "./Graph";
import Tools from "./Tools";
import Simulator from "./Simulator";

class DisplayedGraph {

    /**
     * @param container HTML element
     */
    constructor(container) {
        this._graph = new Graph();

        this._nodesDataSet = new vis.DataSet();
        this._edgesDataSet = new vis.DataSet();
        this._options = {
            physics: {
                barnesHut: {
                    centralGravity: 0.35,
                    springLength: 335,
                    springConstant: 1.2,
                    damping: 0.58
                },
                maxVelocity: 20,
                minVelocity: 0.75,
                timestep: 0.18
            }
        };

        this._network = new vis.Network(container, {
            nodes: this._nodesDataSet,
            edges: this._edgesDataSet
        }, this._options);

        Object.assign(this._options, this._network.defaultOptions);

        // Simulation part
        this._simulation = null;

        // var nodes = new vis.DataSet([
        //     {id: 1, label: 'html color', color: 'lime'},
        //     {id: 2, label: 'rgb color', color: 'rgb(255,168,7)'},
        //     {id: 3, label: 'hex color', color: '#7BE141'},
        //     {id: 4, label: 'rgba color', color: 'rgba(97,195,238,0.5)'},
        //     {id: 5, label: 'colorObject', color: {background: 'pink', border: 'purple'}},
        //     {
        //         id: 6,
        //         label: 'colorObject + highlight',
        //         color: {background: '#F03967', border: '#713E7F', highlight: {background: 'red', border: 'black'}}
        //     },
        //     {
        //         id: 7,
        //         label: 'colorObject + highlight + hover',
        //         color: {
        //             background: 'cyan',
        //             border: 'blue',
        //             highlight: {background: 'red', border: 'blue'},
        //             hover: {background: 'white', border: 'red'}
        //         }
        //     }
        // ]);

        // this._nodeColor = false;
        // this._nodeHoverColor = false;
        // this._nodeHighlightColor = false;
        // this._nodeSimulationStepColor = false;
        // this._nodeSimulationStepHoverColor = false;
        // this._nodeSimulationStepHighlightColor = false;

    }

    get network() {
        return this._network;
    }

    get simulation() {
        return this._simulation;
    }

    /**
     * Delete all nodes and edges.
     */
    clear() {
        this._graph = new Graph();

        this._nodesDataSet.clear();
        this._edgesDataSet.clear();
    }

    /**
     * Updates the graph to only show the given nodes and edges.
     *
     * @param graph Graph
     */
    display(graph) {
        this.clear();

        this._graph = graph;

        this._nodesDataSet.add(graph.nodes);
        this._edgesDataSet.add(graph.edges);
    }

    /**
     * Updates the graph's options.
     */
    _updateOptions() {
        this._network.setOptions(this._options);
    }

    /**
     * Change network options.
     *
     * @param key String
     * @param value
     */
    _changeOptions(key, value) {
        let keyParts = key.split('.');
        key = keyParts.pop();

        let parentString = keyParts.join('.');
        let parent = Tools.accessObjectPropertyByString(this._options, parentString);

        parent[key] = value;

        this._updateOptions();
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

    getAnalytics() {
        let analytics = [];

        if (this._graph.nodes.length !== 0) {
            let averageDegree = {
                'title': 'Average degree',
                'value': this._graph.directed ?
                    `
                    <ul>
                        <li>Outgoing degree: ${this._graph.getAverageDegree('outgoing')} </li>
                        <li>Incoming degree: ${this._graph.getAverageDegree('incoming')} </li>
                    </ul>
                    ` :
                    this._graph.getAverageDegree('degree'),
                'helpLink': 'http://networksciencebook.com/chapter/2#degree',
            };

            analytics.push(averageDegree)
        }

        return analytics;
    }
};

// Trait method assigns
Object.assign(DisplayedGraph.prototype, Parser);
Object.assign(DisplayedGraph.prototype, Simulator);

export default DisplayedGraph;
