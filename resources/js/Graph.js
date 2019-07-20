import vis from 'vis'

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
     * Generate random graph.
     */
    generateRandomGraph(fullGraph) {
        let numberOfNodes = 5;

        let nodes = [...Array(numberOfNodes).keys()].map((value) => {
            return {id: value + 1, label: 'Node ' + value}
        });

        // let edges = [...Array(this.numberOfEdges).keys()].map((value) => {
        //     let from = Math.floor(Math.random() * numberOfNodes) + 1;
        //     let to = Math.floor(Math.random() * numberOfNodes) + 1;
        //
        //     return {from: from, to: to}
        // });

        let edges = this._generateEdgesForFullGraph(numberOfNodes);

        this._updateGraph(nodes, edges);
    }

    /**
     * Generate edges for full graph.
     *
     * @param numberOfNodes int
     */
    _generateEdgesForFullGraph(numberOfNodes) {
        let edges = [];

        this._range(1, numberOfNodes)
            .forEach((from) => {
                this._range(1, numberOfNodes)
                    .splice(from, numberOfNodes - from)
                    .forEach((to) => {
                        edges.push({
                            from: from,
                            to: to
                        })
                    })
            });

        return edges
    }

    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     * @param from int
     * @param to int
     *
     * @returns {Array.<int>}
     */
    _range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from)
    }


    // Parser part

    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @param propertyNamesArray Array.String
     * @param arrayOfObjects Array.<Object>
     *
     * @returns {Array.<Object>}
     */
    _formatObjectList(propertyNamesArray, arrayOfObjects) {
        return arrayOfObjects.map((object) => {
            let newObject = {};

            propertyNamesArray.forEach((key) => {
                newObject[key] = object[key];
            });

            return newObject;
        });
    }

    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getExportNodeList() {
        return this._formatObjectList(this._exportNodeListFormat, this._nodes.get());
    }

    /**
     * Returns an edgeList with only the properties specified in the _exportEdgeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getExportEdgeList() {
        return this._formatObjectList(this._exportEdgeListFormat, this._edges.get());
    }

    /**
     * Returns an node list.
     *
     * @returns {Array.<Object>}
     */
    exportNodeList() {
        return this._getExportNodeList();
    }

    /**
     * Returns an edge list.
     *
     * @returns {Array.<Object>}
     */
    exportEdgeList() {
        return this._getExportEdgeList();
    }

    /**
     * Imports graph from the given lists.
     *
     * @param nodeList Array.<Object>
     * @param edgeList Array.<Object>
     */
    importGraphFromList(nodeList, edgeList) {
        this._updateGraph(nodeList, edgeList);
    }

    /**
     * Returns data string with the given separator line by line for the header.
     *
     * @param separator string
     * @param header Array.<string>
     * @param rows Array.<Object>
     *
     * @returns {string}
     */
    _createDataFile(separator, header, rows) {
        rows = rows.map((node) => {
            let row = [];

            header.forEach((key) => {
                row.push(node[key]);
            });

            row = row.join(separator);

            return row;
        });

        header = header.join(separator);

        let csv = [header].concat(rows);
        csv = csv.join("\n");

        return csv;
    }

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportNodeCSV() {
        return this._createDataFile(",", this._exportNodeListFormat, this._getExportNodeList());
    }

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportEdgeCSV() {
        return this._createDataFile(",", this._exportEdgeListFormat, this._getExportEdgeList());
    }

    /**
     * Returns parsed data string.
     *
     * @param separator string
     * @param dataString string
     *
     * @returns {{nodes: *, header: *}}
     */
    _parseDataFile(separator, dataString) {
        dataString = dataString.split("\n");

        let header = dataString.shift().split(separator);

        return dataString.map((row) => {
            row = row.split(separator);
            let rowObject = {};

            for (let i = 0; i < header.length; i++) {
                rowObject[header[i]] = row[i];
            }

            return rowObject;
        });
    }

    /**
     * Imports graph from the given CSVs.
     *
     * @param nodeCSV string
     * @param edgeCSV string
     */
    importCSV(nodeCSV, edgeCSV) {
        let separator = ",";

        let nodes = this._parseDataFile(separator, nodeCSV);
        let edges = this._parseDataFile(separator, edgeCSV);

        this._updateGraph(nodes, edges);
    }
}

export default Graph;
