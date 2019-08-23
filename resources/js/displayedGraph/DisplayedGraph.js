import vis from "vis";
import Parser from "./Parser";
import Graph from "../graph/Graph";
import Tools from "../graph/Tools";

class DisplayedGraph {

    /**
     * @param container HTML element
     */
    constructor(container) {
        // Graph
        this._graph = new Graph();

        // Simulation
        this._simulation = undefined;

        // Display
        this._nodesDataSet = new vis.DataSet();
        this._edgesDataSet = new vis.DataSet();
        this._options = {
            physics: {
                barnesHut: {
                    centralGravity: 0.35,
                    damping: 0.6,
                    avoidOverlap: 1
                },
                maxVelocity: 23,
                minVelocity: 0.75,
                timestep: 0.05
            },
            // TODO: move to edit actions
            // TODO: make own callbacks and edit the _graph too
            manipulation: {
                addNode(data, callback) {
                    eventHub.$emit('question', {
                        header: 'Add node',
                        fields: [
                            {
                                id: 'nodeLabel',
                                type: 'text',
                                label: 'Label'
                            }
                        ],
                        ok: {
                            text: 'Add',
                            callback(answer) {
                                data.label = answer.nodeLabel;
                                callback(data);
                                mainDisplayedGraph.graph.addNode(data);
                                eventHub.$emit('network-element-added');
                            }
                        }
                    });
                },
                editNode(data, callback) {
                    console.log('editNode', data, callback);
                },
                deleteNode(data, callback) {
                    callback(data);
                    data.nodes.forEach(node => {
                        node = mainDisplayedGraph.graph.nodesKeyedById[node];
                        mainDisplayedGraph.graph.removeNode(node)
                    });
                },
                addEdge(data, callback) {
                    // TODO: make warning if graph wont be simple anymore
                    callback(data);
                    mainDisplayedGraph.graph.addEdge(data);
                    eventHub.$emit('network-element-added');
                },
                editEdge: {
                    editWithoutDrag(data, callback) {
                        console.log('editWithoutDrag', data, callback);
                    }
                },
                deleteEdge(data, callback) {
                    callback(data);
                    data.edges.forEach(edge => {
                        edge = mainDisplayedGraph.graph.edgesKeyedById[edge];
                        mainDisplayedGraph.graph.removeEdge(edge)
                    });
                }
            }
        };

        this._network = new vis.Network(container, {
            nodes: this._nodesDataSet,
            edges: this._edgesDataSet
        }, this._options);

        this._network.on('click', data => eventHub.$emit('network-clicked', data));

        Object.assign(this._options, this._network.defaultOptions);
    }

    get graph() {
        return this._graph;
    }

    get network() {
        return this._network;
    }

    get simulation() {
        return this._simulation;
    }

    set simulation(value) {
        this._simulation = value;

        if (value === undefined) {
            this._graph.setToDefaultColor();
            this.display(this._graph);
        }
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
                        <li>Outgoing degree: ${this._graph.getAverageDegree('outgoingDegree')} </li>
                        <li>Incoming degree: ${this._graph.getAverageDegree('incomingDegree')} </li>
                    </ul>
                    ` :
                    this._graph.getAverageDegree('degree'),
                'helpLink': 'http://networksciencebook.com/chapter/2#degree',
            };

            analytics.push(averageDegree)
        }

        return analytics;
    }
}

// Trait method assigns
Object.assign(DisplayedGraph.prototype, Parser);

export default DisplayedGraph;
