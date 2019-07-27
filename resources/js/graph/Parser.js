import vis from "vis";

let Parser = {

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
    },

    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getFormattedNodeList() {
        return this._formatObjectList(this._exportNodeListFormat, this._nodes.get());
    },

    /**
     * Returns an edgeList with only the properties specified in the _exportEdgeListFormat list.
     *
     * @returns {Array.<Object>}
     */
    _getFormattedEdgeList() {
        return this._formatObjectList(this._exportEdgeListFormat, this._edges.get());
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
     * @param nodeList Array.<Object>
     * @param edgeList Array.<Object>
     */
    importList(nodeList, edgeList) {
        this._updateGraph(nodeList, edgeList);
    },

    // CSV

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
    },

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportNodeCSV() {
        return this._createDataFile(",", this._exportNodeListFormat, this._getFormattedNodeList());
    },

    /**
     * Returns CSV representing the nodes of the graph.
     *
     * @returns {string}
     */
    exportEdgeCSV() {
        return this._createDataFile(",", this._exportEdgeListFormat, this._getFormattedEdgeList());
    },

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
    },

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
    },

    // Gephi JSON

    /**
     * Imports graph from the given CSVs.
     *
     * @param json String
     * @param fixed Boolean
     * @param parseColor Boolean
     */
    importGephiJSON(json, fixed = true, parseColor = true) {
        let options = {
            fixed: fixed,
            parseColor: parseColor
        };

        let parsed = vis.network.gephiParser.parseGephi(json, options);

        this._updateGraph(parsed.nodes, parsed.edges)
    }

};

export default Parser;
