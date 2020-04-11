import vis from "vis";
import Tools from "../graph/Tools";
import Graph from "../graph/Graph";
import Node from "../graph/Node";
import Edge from "../graph/Edge";

let Parser = {

    /**
     * List of keys, what information to include use about a node.
     * @type {Array.<string>}
     */
    _exportNodeListFormat: [
        'id',
        'label',
    ],

    /**
     * List of keys, what information to include use about an edge.
     * @type {Array.<string>}
     */
    _exportEdgeListFormat: [
        'id',
        'from',
        'to',
        'label',
        '_weight',
        'arrows',
    ],

    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getFormattedNodeList() {
        return Tools.formatObjectList(this._exportNodeListFormat, this._nodesDataSet.get());
    },

    /**
     * Returns an edgeList with only the properties specified in the _exportEdgeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getFormattedEdgeList() {
        return Tools.formatObjectList(this._exportEdgeListFormat, this._edgesDataSet.get());
    },

    // List

    /**
     * Returns a node list.
     *
     * @returns {Array.<Object>}
     */
    exportNodeList() {
        return this._getFormattedNodeList();
    },

    /**
     * Returns an edge list.
     *
     * @returns {Array.<Object>}
     */
    exportEdgeList() {
        return this._getFormattedEdgeList();
    },

    /**
     * Imports graph from the given lists.
     *
     * @param nodeList {Array.<Object>}
     * @param edgeList {Array.<Object>}
     * @param directed {Boolean}
     */
    importList(nodeList, edgeList, directed) {
        // TODO: check if simple
        this.display(new Graph(nodeList, edgeList, directed));
    },

    // CSV

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportNodeCSV() {
        return Tools.createDataFile(",", this._exportNodeListFormat, this._getFormattedNodeList());
    },

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportEdgeCSV() {
        return Tools.createDataFile(",", this._exportEdgeListFormat, this._getFormattedEdgeList());
    },

    /**
     * Imports graph from the given CSVs.
     *
     * @param nodeCSV {string}
     * @param edgeCSV {string}
     * @param directed {Boolean}
     */
    importCSV(nodeCSV, edgeCSV, directed) {
        let separator = ",";

        let nodes = Tools.parseDataFile(separator, nodeCSV)
            .map(node => Node.createFromObject(node));
        let edges = Tools.parseDataFile(separator, edgeCSV)
            .map(edge => Edge.createFromObject(edge));

        // TODO: check if simple
        this.display(new Graph(nodes, edges, directed));
    },

    // Gephi JSON

    /**
     * Imports graph from the given CSVs.
     *
     * @param json {string}
     * @param directed {Boolean}
     * @param fixed {Boolean}
     * @param parseColor {Boolean}
     */
    importGephiJSON(json, directed, fixed = true, parseColor = true) {
        let options = {
            fixed: fixed,
            parseColor: parseColor
        };

        let parsed = vis.network.gephiParser.parseGephi(json, options);

        // TODO: check if simple
        this.display(new Graph(parsed.nodes, parsed.edges, directed))
    }

};

export default Parser;
