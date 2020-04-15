import vis from "vis";
import Parser from "./Parser";
import Graph from "../graph/Graph";
import Node from "../graph/Node";
import Tools from "../graph/Tools";
import Edge from "../graph/Edge";

class DisplayedGraph {

    /**
     * @param container {string}
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
            nodes: Node.getDefaultOptions(),
            edges: Edge.getDefaultOptions(),
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
            // TODO: make own callbacks
            manipulation: {
                addNode(data, callback) {
                    eventHub.$emit('question', {
                        header: 'Add node',
                        body: [
                            {
                                type: 'form-group',
                                body: [
                                    {
                                        id: 'nodeLabel',
                                        type: 'input-text',
                                        label: 'Label'
                                    },
                                ],
                            },
                        ],
                        ok: {
                            text: 'Add',
                            callback(answer) {
                                data.label = answer.nodeLabel;

                                mainDisplayedGraph.graph.addNode(data);
                                callback(data);

                                eventHub.$emit('network-element-added');
                            }
                        }
                    });
                },
                editNode(data, callback) {
                    let node = mainDisplayedGraph.graph.nodesKeyedById[data.id];

                    eventHub.$emit('question', {
                        header: 'Edit node',
                        body: [
                            {
                                type: 'form-group',
                                body: [
                                    {
                                        id: 'nodeLabel',
                                        type: 'input-text',
                                        label: 'Label',
                                        value: data.label
                                    },
                                ],
                            },
                        ],
                        ok: {
                            text: 'Edit',
                            callback(answer) {
                                data.label = answer.nodeLabel;
                                callback(data);

                                node.label = answer.nodeLabel;
                                mainDisplayedGraph.graph.editNode(node);
                            },
                        },
                    });
                },
                deleteNode(data, callback) {
                    callback(data);
                    data.nodes.forEach(node => {
                        node = mainDisplayedGraph.graph.nodesKeyedById[node];
                        mainDisplayedGraph.graph.removeNode(node)
                    });
                },
                addEdge(data, callback) {
                    // TODO: make warning if graph wont be simple anymore + change graph property
                    let edge = new Edge(data.from, data.to);
                    mainDisplayedGraph.graph.addEdge(edge);
                    callback(edge);
                    eventHub.$emit('network-element-added');
                },
                editEdge: {
                    editWithoutDrag(data, callback) {
                        let edge = mainDisplayedGraph._graph.edgesKeyedById[data.id];

                        eventHub.$emit('question', {
                            header: 'Edit edge',
                            body: [
                                {
                                    type: 'form-group',
                                    body: [
                                        {
                                            id: 'edgeWeight',
                                            type: 'input-number',
                                            label: 'Weight',
                                            value: edge.weight
                                        },
                                    ],
                                },
                            ],
                            ok: {
                                text: 'Edit',
                                callback(answer) {
                                    edge.weight = parseInt(answer.edgeWeight);
                                    mainDisplayedGraph.graph.editEdge(edge);
                                    callback(edge);
                                }
                            }
                        })
                    }
                },
                deleteEdge(data, callback) {
                    data.edges.forEach(edge => {
                        edge = mainDisplayedGraph.graph.edgesKeyedById[edge];
                        mainDisplayedGraph.graph.removeEdge(edge)
                    });

                    callback(data);
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

        this._edgesDataSet.clear();
        this._nodesDataSet.clear();
    }

    /**
     * Updates the network to only show the given nodes and edges.
     *
     * @param graph {Graph}
     */
    display(graph) {
        this._graph = graph;

        this._removeMissing(this._edgesDataSet, graph.edgesKeyedById);
        this._removeMissing(this._nodesDataSet, graph.nodesKeyedById);

        this._nodesDataSet.update(graph.nodes);
        this._edgesDataSet.update(graph.edges);
    }

    /**
     * Removes the elements from a DataSet which are not present in the given object.
     *
     * @param networkDataset {vis.DataSet}
     * @param elements {Object}
     */
    _removeMissing(networkDataset, elements) {
        let toRemove = [];

        Object.keys(networkDataset._data).forEach(function (id) {
            if (elements[id] === undefined) {
                toRemove.push(id);
            }
        });

        networkDataset.remove(toRemove);
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
     * @param key {String}
     * @param value {Object}
     */
    changeOptions(key, value) {
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
     * @param allowed {Boolean}
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
     * Turns low gravity on/off.
     *
     * @param on {Boolean}
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
     * Shows degrees on/off.
     *
     * @param show {Boolean}
     */
    showDegrees(show) {
        if (show) {
            this.graph.showDegrees();
        } else {
            this.graph.hideDegrees();
        }

        this.display(this.graph);
    }

}

// Trait method assigns
Object.assign(DisplayedGraph.prototype, Parser);

export default DisplayedGraph;
